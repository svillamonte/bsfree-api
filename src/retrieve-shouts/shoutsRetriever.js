const TARINGA_URL = 'http://api.taringa.net/';

const axios = require('axios');
const cleanShouts = require('./shoutCleaner');

function getLatestShouts() {
  const axiosSettings = {
    method: 'GET',
    baseURL: TARINGA_URL,
    url: 'shout/trends/view/1h'
  };
  
  const promise = new Promise((resolve, reject) => {
    axios(axiosSettings)
      .then(response => {
        const cleanedList = cleanShouts(response.data);

        resolve(cleanedList);
      })
      .catch(error => reject(error));
  });

  return promise;  
}

module.exports = getLatestShouts;