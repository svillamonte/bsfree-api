import { assert, expect } from 'chai';
import buildRequestOptions from '~/normalise-shouts/storageOptionsBuilder';

describe('storageOptionsBuilder', () => {
  describe('#buildRequestOptions()', () => {
    it('throws an error if shout is null', () => {
      const shout = null;

      expect(() => buildRequestOptions(shout)).to.throw;
    });

    it('returns 60 for queueOrder = 1', () => {
      const shout = {
        id: 'randomid',
        queueOrder: 1,
      };

      const result = buildRequestOptions(shout);

      assert.deepEqual(result, { visibilityTimeout: 60 });
    });

    it('returns 180 for queueOrder = 3', () => {
      const shout = {
        id: 'randomid',
        queueOrder: 3,
      };

      const result = buildRequestOptions(shout);

      assert.deepEqual(result, { visibilityTimeout: 180 });
    });
  });
});
