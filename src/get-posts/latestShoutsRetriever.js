import { getLatestShouts } from '../common/filteredShoutStorage';
import mapShoutResult from './shoutResultMapper';

const PAGE_SIZE = 10;

export default (continuationToken) => {
  const promise = new Promise((resolve, reject) => {
    getLatestShouts(continuationToken, PAGE_SIZE)
      .then((result) => resolve(mapShoutResult(result)))
      .catch((error) => reject(error));
  });

  return promise;
};
