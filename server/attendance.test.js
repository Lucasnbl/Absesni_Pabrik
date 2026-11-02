import test from 'node:test';
import assert from 'node:assert/strict';
import { daysInRange, allocationByYear, fitsAnnualQuota, validISODate } from './attendance.js';

test('cuti menghitung hanya hari kerja dan mengecualikan akhir pekan', () => {
  assert.deepEqual(daysInRange('2026-10-26', '2026-11-01'), ['2026-10-26', '2026-10-27', '2026-10-28', '2026-10-29', '2026-10-30']);
});

test('kalender perusahaan dapat mengecualikan hari libur', () => {
  assert.deepEqual(daysInRange('2026-10-26', '2026-10-28', ['2026-10-27']), ['2026-10-26', '2026-10-28']);
});

test('rentang cuti lintas tahun dialokasikan ke masing-masing tahun kalender', () => {
  const days = daysInRange('2026-12-31', '2027-01-04');
  assert.deepEqual(allocationByYear(days), { '2026': 1, '2027': 2 });
});

test('tanggal terbalik atau format tidak valid ditolak', () => {
  assert.equal(daysInRange('2026-10-28', '2026-10-26'), null);
  assert.equal(daysInRange('besok', '2026-10-26'), null);
});

test('rentang akhir pekan saja tidak mengalokasikan kuota', () => {
  assert.deepEqual(daysInRange('2026-10-31', '2026-11-01'), []);
});

test('batas tahunan mengizinkan tepat lima hari dan menolak hari keenam', () => {
  assert.equal(fitsAnnualQuota(5, 2, 3), true);
  assert.equal(fitsAnnualQuota(5, 2, 4), false);
});

test('tanggal kalender mustahil tidak diterima sebagai tanggal cuti', () => {
  assert.equal(validISODate('2026-02-31'), false);
  assert.equal(daysInRange('2026-02-31', '2026-03-05'), null);
});
