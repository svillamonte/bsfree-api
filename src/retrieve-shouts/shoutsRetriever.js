const TARINGA_URL = 'http://api.taringa.net/';

const axios = require('axios');
const normaliseShouts = require('./shoutsNormaliser');

function getLatestShouts() {
  const axiosSettings = {
    method: 'GET',
    baseURL: TARINGA_URL,
    url: 'shout/trends/view/1h'
  };
  
  const promise = new Promise((resolve, reject) => {
    axios(axiosSettings)
      .then(response => {
        const normalisedList = normaliseShouts(response.data);

        resolve(normalisedList);
      })
      .catch(error => reject(error));
  });

  return promise;  
}

module.exports = getLatestShouts;