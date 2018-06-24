const { COGNITIVE_SERVICES_KEY } = require('../common/settings');

const { CognitiveServicesCredentials } = require('ms-rest-azure');
const { ComputerVisionAPIClient } = require('azure-cognitiveservices-computervision');
const isDog = require('./dogFilter');

function analyseImage(url) {
  const credentials = new CognitiveServicesCredentials(COGNITIVE_SERVICES_KEY);
  const client = new ComputerVisionAPIClient(credentials, 'australiaeast');

  const options = {
    visualFeatures: [ 'Categories', 'Tags', 'Adult' ],
    details: [ 'Celebrities' ]
  };

  const promise = new Promise((resolve, reject) => {
    client.analyzeImage(url, options)
      .then(imageAnalysis => 
        resolve(isDog(imageAnalysis)))
      .catch(error => 
        reject(error));
  });

  return promise;
}

module.exports = analyseImage;