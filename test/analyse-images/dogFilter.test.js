import { assert } from 'chai';
import isDog from '~/analyse-images/dogFilter';

describe('dogFilter', () => {
  describe('#isDog()', () => {
    it('returns false if no tags', () => {
      const data = {
        tags: [],
      };

      const result = isDog(data);
      assert.isFalse(result);
    });

    it('returns false if dog tag is below threshold', () => {
      const data = {
        tags: [
          {
            name: 'something',
            confidence: 0.9,
          },
          {
            name: 'dog',
            confidence: 0.3,
          },
        ],
      };

      const result = isDog(data);
      assert.isFalse(result);
    });

    it('returns true if dog tag is above threshold', () => {
      const data = {
        tags: [
          {
            name: 'something',
            confidence: 0.9,
          },
          {
            name: 'dog',
            confidence: 0.51,
          },
        ],
      };

      const result = isDog(data);
      assert.isTrue(result);
    });
  });
});
