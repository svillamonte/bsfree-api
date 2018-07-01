const { getByRowKey } = require('../common/filteredShoutStorage');

function existsInStorage(shout) {
  return getByRowKey(shout.id)
    .then(results => 
      results.length > 0 ? true : false)
    .catch(() => false);
};

module.exports = function(shout) {
  return !existsInStorage(shout);
}