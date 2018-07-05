const { getByRowKey } = require('../common/filteredShoutStorage');

module.exports = function(shout) {
  // If exists => filter fails
  return getByRowKey(shout.id)
    .then(results => 
      results.length > 0 ? false : true)
    .catch(() => true);
};