import moment from 'moment';
import { assert } from 'chai';
import getTicksToMaxDate from '~/register-shout/invertedTicksHelper';

describe('invertedTicksHelper', () => {
  describe('#getTicksToMaxDate()', () => {
    it('pads ticks with leading zeros', () => {
      const date = moment('2018-10-29');
      const ticks = getTicksToMaxDate(date);

      assert.equal('0008638459275600', ticks);
    });

    it('returns zeros for max date', () => {
      const maxDate = moment(8640000000000000);
      const ticks = getTicksToMaxDate(maxDate);

      assert.equal('0000000000000000', ticks);
    });
  });
});
