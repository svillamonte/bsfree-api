import { assert, expect } from 'chai';
import buildFilename from '~/register-shout/filenameBuilder';

describe('filenameBuilder', () => {
  describe('#buildFilename()', () => {
    it('throws an error if URL empty', () => {
      const url = '';

      expect(() => buildFilename(url)).to.throw;
    });

    it('throws an error if dot is not found', () => {
      const url = 'somethingrandom';

      expect(() => buildFilename(url)).to.throw;
    });

    it('returns expected extension', () => {
      const url = 'something.random';
      const result = buildFilename(url);

      assert.isTrue(result.endsWith('.random'));
    });
  });
});
