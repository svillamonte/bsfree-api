import { assert } from 'chai';
import {
  getCurrentDate,
  getPaddedTicksToMaxDate,
} from '~/register-shout/dateHelper';

const now = new Date().toISOString();
const currentYear = now.slice(0, 4);
const currentMonth = now.slice(5, 7);
const currentDay = now.slice(8, 10);

describe('dateHelper', () => {
  describe('#getCurrentDate()', () => {
    it('formats current date', () => {
      const currentDate = getCurrentDate();
      const expectedDate = `${currentYear}${currentMonth}${currentDay}`;

      assert.equal(currentDate, expectedDate);
    });
  });

  describe('#getPaddedTicksToMaxDate()', () => {
    it('returns padded ticks', () => {
      const ticks = getPaddedTicksToMaxDate();
      const now = new Date();

      const ticksTime = new Date(Number(ticks));

      assert.isTrue(ticksTime.getTime() > now.getTime());
    });
  });
});
