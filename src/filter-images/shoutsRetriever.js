const axios = require('axios');

const TARINGA_URL = 'http://api.taringa.net/';

function processResponse(response) {
  return response.map(item => {
    const { nick } = item.owner;
    const { url } = item.attachment || { url: null };
    const { body } = item;

    return {
      nick,
      url,
      body
    };
  })
}

async function getLatestShouts() {
  const client = axios.create({
    baseURL: TARINGA_URL
  });

  try {
    const response = await client({
      url: 'shout/trends/view/1h'
    });

    return processResponse(response.data);
  } catch (error) {
    console.error(error);
  }
}

module.exports = getLatestShouts;