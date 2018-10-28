import { TableUtilities } from 'azure-storage';
import { getNowTicks, getYearTicks } from './dateHelper';
import { insertShout } from '../common/filteredShoutStorage';

/**
 * Creates table storage object to persist shout
 * @param {object} shout
 * @param {string} imageBlobUri
 * @return {object}
 */
function createShoutEntity(shout, imageBlobUri) {
  const { entityGenerator } = TableUtilities;
  const { id, nick, body } = shout;

  return {
    PartitionKey: entityGenerator.String(getYearTicks()),
    RowKey: entityGenerator.String(getNowTicks()),
    ShoutId: entityGenerator.String(id),
    Nick: entityGenerator.String(nick),
    Body: entityGenerator.String(body),
    ImageUri: entityGenerator.String(imageBlobUri),
  };
}

/**
 * Persists shout into table storage
 * @param {object} shout
 * @param {string} imageBlobUri
 * @return {Promise}
 */
function registerShout(shout, imageBlobUri) {
  const shoutEntity = createShoutEntity(shout, imageBlobUri);

  return new Promise((resolve, reject) => {
    insertShout(shoutEntity)
      .then(() => resolve())
      .catch(() => reject());
  });
}

export default registerShout;
