const { CognitiveSubscriptionKey } = require('./config');
const axios = require('axios');
const isDog = require('./dogFilter');

const COGNITIVE_URL = 'https://australiaeast.api.cognitive.microsoft.com/vision/v1.0/';

function getClient() {
  return axios.create({
    baseURL: COGNITIVE_URL,
    headers: {
      'Ocp-Apim-Subscription-Key': CognitiveSubscriptionKey,
      'Content-Type': 'application/json'
    }
  });
}

async function analyzeImage(url, client) {
  try {
    const response = await client({
      url: 'analyze',
      method: 'POST',
      params: {
        'visualFeatures': 'categories,tags,adult',
        'details': 'celebrities'
      },
      data: { url }
    });

    return isDog(response.data);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getClient,
  analyzeImage
};