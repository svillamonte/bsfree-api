import { assert, expect } from 'chai';
import cleanShout from '~/retrieve-shouts/shoutCleaner';

describe('shoutCleaner', () => {
  describe('#cleanShout()', () => {
    it('returns empty list for empty shouts list', () => {
      const result = cleanShout([]);

      assert.equal(result.length, 0);
    });

    it('throws exception for null array', () => {
      expect(() => cleanShout(null)).to.throw;
    });

    it('returns cleaned shouts for shouts', () => {
      const shoutOne = {
        id: 'idone',
        body: 'bodyone',
        owner: {
          nick: 'ownernickone',
        },
        attachment: {
          url: 'http://one.basic.url/with/image.jpg',
        },
      };
      const shoutTwo = {
        id: 'idtwo',
        body: 'bodytwo',
        owner: {
          nick: 'ownernicktwo',
        },
      };
      const shoutThree = {
        id: 'idthree',
        body: 'bodythree',
        owner: {
          nick: 'ownernickthree',
        },
        attachment: {
          url: 'http://three.basic.url/with/image.jpg',
        },
      };

      const result = cleanShout([shoutOne, shoutTwo, shoutThree]);
      const expectedOne = {
        id: 'idone',
        body: 'bodyone',
        nick: 'ownernickone',
        url: 'http://one.basic.url/with/image.jpg',
        queueOrder: 0,
      };
      const expectedTwo = {
        id: 'idtwo',
        body: 'bodytwo',
        nick: 'ownernicktwo',
        url: null,
        queueOrder: 1,
      };
      const expectedThree = {
        id: 'idthree',
        body: 'bodythree',
        nick: 'ownernickthree',
        url: 'http://three.basic.url/with/image.jpg',
        queueOrder: 2,
      };

      assert.deepEqual(result[0], expectedOne);
      assert.deepEqual(result[1], expectedTwo);
      assert.deepEqual(result[2], expectedThree);
    });
  });
});
