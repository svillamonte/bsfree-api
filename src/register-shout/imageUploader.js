const { AZURE_STORAGE_KEY, AZURE_STORAGE_ACCOUNT } = require('./../common/settings');
const CONTAINER_NAME = 'filtered-images';

const axios = require('axios');
const azure = require('azure-storage');
const buildFilename = require('./filenameBuilder');

function uploadImage(url) {
  const storage = azure.createBlobService(
    AZURE_STORAGE_ACCOUNT,
    AZURE_STORAGE_KEY
  );
  const axiosSettings = {
    method: 'GET',
    responseType: 'stream',
    url
  };
  
  const blobName = buildFilename(url);
  const blobSettings = {
    blockIdPrefix: 'block'
  };

  const promise = new Promise((resolve, reject) => {
    const callback = (error) => {
      if (error) reject(error);
      resolve(storage.getUrl(CONTAINER_NAME, blobName));
    };

    axios(axiosSettings)
      .then(response => 
        response.data.pipe(storage.createWriteStreamToBlockBlob(
          CONTAINER_NAME,
          blobName,
          blobSettings,
          callback
        )))
      .catch(error => reject(error));
  });

  return promise;
}

module.exports = uploadImage;