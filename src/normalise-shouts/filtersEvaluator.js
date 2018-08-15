const runFilters = (filters, shout) => filters.map((filter) => filter(shout));

const resultsPass = (results) => !results.some((result) => !result);

/**
 * Runs all filters and fails if one of them fails.
 * @param {object} shout
 * @param {Array} asyncFilters
 * @param {Array} syncFilters
 * @return {Promise} True if all filters pass
 */
export default (shout, asyncFilters, syncFilters) => {
  let asyncResults = runFilters(asyncFilters, shout);

  const promise = new Promise((resolve, reject) => {
    Promise.all(asyncResults)
      .then((asyncResults) => {
        if (!resultsPass(asyncResults)) {
          resolve(false);
        }

        const syncResults = runFilters(syncFilters, shout);
        resolve(resultsPass(syncResults));
      })
      .catch(() => reject(true));
  });

  return promise;
};
