import { COGNITIVE_SERVICES_KEY } from '../common/settings';

import { CognitiveServicesCredentials } from 'ms-rest-azure';
import { ComputerVisionAPIClient } from 'azure-cognitiveservices-computervision';
import isDog from './dogFilter';

/**
 * Analyses image by calling cognitive services
 * @param {string} url
 * @return {Promise}
 */
function analyseImage(url) {
  const credentials = new CognitiveServicesCredentials(COGNITIVE_SERVICES_KEY);
  const client = new ComputerVisionAPIClient(credentials, 'australiaeast');

  const options = {
    visualFeatures: ['Categories', 'Tags', 'Adult'],
    details: ['Celebrities'],
  };

  const promise = new Promise((resolve, reject) => {
    client
      .analyzeImage(url, options)
      .then((imageAnalysis) => resolve(isDog(imageAnalysis)))
      .catch((error) => reject(error));
  });

  return promise;
}

export default analyseImage;
