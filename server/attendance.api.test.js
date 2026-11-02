import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

let root;
let server;
let base;
let api;
let tokenEmployee;
let tokenHr;
let tokenSupervisor;

before(async () => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'feedmill-api-test-'));
  process.env.ATTENDANCE_DATA_PATH = path.join(root, 'data.json');
  api = (await import(pathToFileURL(path.resolve('server/attendance.js')).href)).default;
  const app = express();
  app.use(express.json());
  app.use('/api', api);
  server = app.listen(0);
  await new Promise(resolve => server.once('listening', resolve));
  base = `http://127.0.0.1:${server.address().port}/api`;
  tokenEmployee = await login('karyawan', 'Feedmill123!');
  tokenHr = await login('hrd', 'Feedmill123!');
  tokenSupervisor = await login('supervisor', 'Feedmill123!');
});

after(async () => {
  if (server) await new Promise(resolve => server.close(resolve));
  if (root) fs.rmSync(root, { recursive: true, force: true });
  delete process.env.ATTENDANCE_DATA_PATH;
});

async function login(username, password) {
  const response = await fetch(`${base}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) });
  assert.equal(response.status, 200);
  return (await response.json()).token;
}

function auth(token) { return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }; }

test('record access is scoped by role and employee', async () => {
  const mine = await fetch(`${base}/attendance`, { headers: auth(tokenEmployee) });
  const rows = await mine.json();
  assert.equal(mine.status, 200);
  assert.ok(rows.length > 0);
  assert.ok(rows.every(row => row.employeeId === 'e001'));

  const managementToken = await login('manajemen', 'Feedmill123!');
  const denied = await fetch(`${base}/attendance`, { headers: auth(managementToken) });
  assert.equal(denied.status, 403);
});

test('HRD receives the sample email-style leave notification', async () => {
  const response = await fetch(`${base}/notifications`, { headers: auth(tokenHr) });
  const items = await response.json();
  assert.equal(response.status, 200);
  assert.ok(items.some(item => item.sample && item.type === 'leave_request' && item.sender.includes('KRY-001') && item.subject.includes('Permohonan cuti')));
});

test('pending and approved leave share one annual allocation and block day six', async () => {
  const created = await fetch(`${base}/leaves`, { method: 'POST', headers: auth(tokenEmployee), body: JSON.stringify({ startDate: '2026-12-21', endDate: '2026-12-23', reason: 'Pengujian kuota' }) });
  assert.equal(created.status, 201);
  const leave = await created.json();
  assert.equal(leave.days, 3);
  const hrInbox = await fetch(`${base}/notifications`, { headers: auth(tokenHr) });
  const hrMessages = await hrInbox.json();
  assert.ok(hrMessages.some(item => item.leaveId === leave.id && item.type === 'leave_request' && item.sender.includes('KRY-001')));

  const balance = await fetch(`${base}/leave/balance`, { headers: auth(tokenEmployee) });
  assert.deepEqual(await balance.json(), { year: 2026, allowance: 5, approved: 0, pending: 5, remaining: 0 });

  const sixth = await fetch(`${base}/leaves`, { method: 'POST', headers: auth(tokenEmployee), body: JSON.stringify({ startDate: '2026-12-24', endDate: '2026-12-24', reason: 'Melebihi kuota' }) });
  assert.equal(sixth.status, 400);

  const decision = await fetch(`${base}/leaves/${leave.id}`, { method: 'PATCH', headers: auth(tokenHr), body: JSON.stringify({ status: 'Approved' }) });
  assert.equal(decision.status, 200);
  const finalBalance = await fetch(`${base}/leave/balance`, { headers: auth(tokenEmployee) });
  assert.deepEqual(await finalBalance.json(), { year: 2026, allowance: 5, approved: 3, pending: 2, remaining: 0 });

  const cancelRequest = await fetch(`${base}/leaves/${leave.id}/cancel`, { method: 'POST', headers: auth(tokenEmployee) });
  assert.equal((await cancelRequest.json()).status, 'Cancellation_pending');
  const cancellation = await fetch(`${base}/leaves/${leave.id}`, { method: 'PATCH', headers: auth(tokenSupervisor), body: JSON.stringify({ status: 'Cancelled' }) });
  assert.equal((await cancellation.json()).status, 'Cancelled');
  const released = await fetch(`${base}/leave/balance`, { headers: auth(tokenEmployee) });
  assert.deepEqual(await released.json(), { year: 2026, allowance: 5, approved: 0, pending: 2, remaining: 3 });
});

test('simultaneous submissions cannot over-allocate the same employee quota', async () => {
  const periods = [['2026-12-01','2026-12-02'], ['2026-12-03','2026-12-04'], ['2026-12-07','2026-12-08']];
  const results = await Promise.all(periods.map(([startDate,endDate]) => fetch(`${base}/leaves`, { method: 'POST', headers: auth(tokenHr), body: JSON.stringify({ startDate, endDate, reason: 'Uji transaksi bersamaan' }) })));
  assert.deepEqual(results.map(r => r.status).sort(), [201, 201, 400]);
  const created = await Promise.all(results.map(r => r.json()));
  const ownRequest = created.find(r => r.id);
  const selfApproval = await fetch(`${base}/leaves/${ownRequest.id}`, { method: 'PATCH', headers: auth(tokenHr), body: JSON.stringify({ status: 'Approved' }) });
  assert.equal(selfApproval.status, 403);
  const balance = await fetch(`${base}/leave/balance?year=2026`, { headers: auth(tokenHr) });
  const value = await balance.json();
  assert.ok(value.approved + value.pending <= value.allowance);
});
