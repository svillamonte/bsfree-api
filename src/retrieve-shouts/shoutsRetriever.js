import axios from 'axios';
import cleanShouts from './shoutCleaner';

const TARINGA_URL = 'http://api.taringa.net/';

/**
 * Grabs trending Taringa shouts for the last hour.
 * @return {Promise}
 */
function getLatestShouts() {
  const axiosSettings = {
    method: 'GET',
    baseURL: TARINGA_URL,
    url: 'shout/trends/view/1h',
  };

  const promise = new Promise((resolve, reject) => {
    axios(axiosSettings)
      .then((response) => {
        const cleanedList = cleanShouts(response.data);

        resolve(cleanedList);
      })
      .catch((error) => reject(error));
  });

  return promise;
}

export default getLatestShouts;
