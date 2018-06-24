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

  const blobSettings = {
    blockIdPrefix: 'block'
  };
  const axiosSettings = {
    method: 'GET',
    responseType: 'stream',
    url
  };

  const callback = (error, resolve, reject) => {
    if (error) reject(error);
    resolve();
  }

  const promise = new Promise((resolve, reject) => {
    axios(axiosSettings)
      .then(response => 
        response.data.pipe(storage.createWriteStreamToBlockBlob(
          CONTAINER_NAME,
          buildFilename(url),
          blobSettings,
          error => callback(error, resolve, reject)
        )))
      .catch(error => reject(error));
  });

  return promise;
}

module.exports = uploadImage;