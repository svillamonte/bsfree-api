import { assert } from 'chai';
import mapShoutResult from '~/get-posts/shoutResultMapper';

describe('shoutResultMapper', () => {
  describe('#mapShoutResult()', () => {
    it('keeps continuationToken and cleans table rows', () => {
      const entryOne = {
        PartitionKey: { _: 'partitionkey' },
        RowKey: { _: 'rowkeyone' },
        ShoutId: { _: 'idone' },
        Nick: { _: 'nickone' },
        Body: { _: 'bodyone' },
        ImageUri: { _: 'imageurione' },
      };
      const entryTwo = {
        PartitionKey: { _: 'partitionkey' },
        RowKey: { _: 'rowkeytwo' },
        ShoutId: { _: 'idtwo' },
        Nick: { _: 'nicktwo' },
        Body: { _: 'bodytwo' },
        ImageUri: { _: 'imageuritwo' },
      };

      const result = {
        entries: [entryOne, entryTwo],
        continuationToken: {
          nextPartitionKey: 'nextpartitionkey',
          nextRowKey: 'nextrowkey',
          targetLocation: 0,
        },
      };

      const mapped = mapShoutResult(result);
      const { continuationToken, shouts } = mapped;

      const expectedEntryOne = {
        shoutId: 'idone',
        nick: 'nickone',
        body: 'bodyone',
        imageUri: 'imageurione',
      };
      const expectedEntryTwo = {
        shoutId: 'idtwo',
        nick: 'nicktwo',
        body: 'bodytwo',
        imageUri: 'imageuritwo',
      };

      assert.deepEqual(continuationToken, result.continuationToken);
      assert.deepEqual(shouts[0], expectedEntryOne);
      assert.deepEqual(shouts[1], expectedEntryTwo);
    });
  });
});
