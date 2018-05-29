const assert = require('assert');
const isDog = require('../dogFilter');

describe('dogFilter', () => {
  describe('isDog', () => {
    it('should return false', () => {
      const data = {
        tags: []
      };

      const result = isDog(data);
      assert.equal(result, false);
    });
  });
});