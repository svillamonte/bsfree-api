import { getByRowKey } from '../common/filteredShoutStorage';

/**
 * Checks if shout exists in storage to avoid re-processing it.
 * @param {object} shout
 * @return {boolean} True if shout doesn't exist in storage.
 */
export default function(shout) {
  return getByRowKey(shout.id)
    .then((results) => (results.length > 0 ? false : true))
    .catch(() => true);
}
