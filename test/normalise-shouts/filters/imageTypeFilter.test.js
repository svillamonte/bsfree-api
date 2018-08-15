import { assert, expect } from 'chai';
import imageTypeFilter from '~/normalise-shouts/filters/imageTypeFilter';

describe('imageTypeFilter', () => {
  describe('#filter()', () => {
    it('throws an error if shout is null', () => {
      const shout = null;

      expect(() => imageTypeFilter(shout)).to.throw;
    });

    it('throws an error if url is null', () => {
      const shout = {
        id: 'randomid',
      };

      expect(() => imageTypeFilter(shout)).to.throw;
    });

    it('returns false if url has GIF', () => {
      const shout = {
        id: 'randomid',
        url: 'http://some.domain/randomimage.gif',
      };
      const result = imageTypeFilter(shout);

      assert.isFalse(result);
    });

    it('returns true if url has PNG', () => {
      const shout = {
        id: 'randomid',
        url: 'http://some.domain/randomimage.png',
      };
      const result = imageTypeFilter(shout);

      assert.isTrue(result);
    });
  });
});
