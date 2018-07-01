const newShoutFilter = require('./newShoutFilter');
const imageTypeFilter = require('./imageTypeFilter');

function cleanShouts(shouts) {
  return shouts.map(shout => {
    const { id, body } = shout;
    const { nick } = shout.owner;
    const { url } = shout.attachment || { url: null };

    return {
      id,
      body,
      nick,
      url
    };
  });
}

function applyFilters(shout) {
  const filters = [ 
    newShoutFilter, 
    imageTypeFilter 
  ];

  const results = filters.map(filter => filter(shout));
  return !results.some(result => !result);
}

function normaliseShouts(shouts) {
  const filtered = shouts.filter(item => applyFilters(item));
  return cleanShouts(filtered);
}

module.exports = normaliseShouts;