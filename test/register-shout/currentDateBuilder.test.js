import { assert } from 'chai';
import getCurrentDate from '~/register-shout/currentDateBuilder';

const now = new Date().toISOString();
const currentYear = now.slice(0, 4);
const currentMonth = now.slice(5, 7);
const currentDay = now.slice(8, 10);

describe('currentDateBuilder', () => {
  describe('#getCurrentDate()', () => {
    it('formats current date', () => {
      const currentDate = getCurrentDate();
      const expectedDate = `${currentYear}${currentMonth}${currentDay}`;

      assert.equal(currentDate, expectedDate);
    });
  });
});
