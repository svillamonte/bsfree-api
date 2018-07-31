import newShoutFilter from './newShoutFilter';
import imageTypeFilter from './imageTypeFilter';

const asyncFilters = [
  newShoutFilter
];

const syncFilters = [
  imageTypeFilter
];

function evalSyncFilters(asyncResults, shout) {
  if (asyncResults.some(result => !result)) {
    return false;
  }

  const results = syncFilters.map(filter => filter(shout));
  return !results.some(result => !result);
}

function normaliseShout(shout) {
  var asyncResults = asyncFilters.map(filter => filter(shout));

  const promise = new Promise((resolve, reject) => {
    Promise.all(asyncResults)
      .then(results => {
        const finalResult = evalSyncFilters(results, shout);

        resolve(finalResult);
      })
      .catch(() => reject(true));  
  })
  
  return promise;
}

export default normaliseShout;