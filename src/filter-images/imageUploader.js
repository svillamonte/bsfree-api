const { AZURE_STORAGE_ACCESS_KEY, AZURE_STORAGE_ACCOUNT } = require('./config');
const CONTAINER_NAME = 'filtered-images';

const axios = require('axios');
const azure = require('azure-storage');
const buildFilename = require('./filenameBuilder');

function storageCallback(error) {
  if (error) {
    throw error;
  }

  console.log('done');
}

async function uploadImage(url) {
  try {
    const response = await axios({
      method: 'GET',
      responseType: 'stream',
      url: url
    });
  
    const storage = azure.createBlobService(
      AZURE_STORAGE_ACCOUNT, 
      AZURE_STORAGE_ACCESS_KEY);    
    
    const blobSettings = { 
      blockIdPrefix: 'block'
    };

    response.data.pipe(storage.createWriteStreamToBlockBlob(
      CONTAINER_NAME, 
      buildFilename(url), 
      blobSettings, 
      storageCallback));
  } catch (error) {
    console.error(error);
  }  
}

module.exports = uploadImage;