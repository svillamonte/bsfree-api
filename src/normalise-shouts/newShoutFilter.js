import { getByRowKey } from '../common/filteredShoutStorage';

export default function(shout) {
  // If exists => filter fails
  return getByRowKey(shout.id)
    .then(results => 
      results.length > 0 ? false : true)
    .catch(() => true);
};