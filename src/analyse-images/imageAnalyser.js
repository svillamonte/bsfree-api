const { COGNITIVE_SERVICES_KEY } = require('../common/settings');

const { CognitiveServicesCredentials } = require('ms-rest-azure');
const { ComputerVisionAPIClient } = require('azure-cognitiveservices-computervision');
const isDog = require('./dogFilter');

async function analyseImage(url) {
  const credentials = new CognitiveServicesCredentials(COGNITIVE_SERVICES_KEY);
  const client = new ComputerVisionAPIClient(credentials, "australiaeast");

  const options = {
    visualFeatures: [ "Categories", "Tags", "Adult" ],
    details: [ "Celebrities" ]
  };

  const imageAnalysis = await client.analyzeImage(url, options);
  
  return isDog(imageAnalysis);
}

module.exports = analyseImage;