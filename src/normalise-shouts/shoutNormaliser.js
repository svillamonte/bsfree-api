import newShoutFilter from './newShoutFilter';
import imageTypeFilter from './imageTypeFilter';
import evalFilters from './filtersEvaluator';

const asyncFilters = [newShoutFilter];
const syncFilters = [imageTypeFilter];

/**
 * Evaluates filters against the shout
 * @param {object} shout
 * @return {Promise}
 */
export default (shout) => {
  const promise = new Promise((resolve, reject) => {
    evalFilters(shout, asyncFilters, syncFilters)
      .then((result) => resolve(result))
      .catch(() => reject(true));
  });

  return promise;
};
