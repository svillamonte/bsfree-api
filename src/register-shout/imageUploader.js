import { createBlobService } from 'azure-storage';
import buildFilename from './filenameBuilder';
import getImageStream from './imageStreamDownloader';

const {
  AZURE_STORAGE_KEY,
  AZURE_STORAGE_ACCOUNT,
} = require('./../common/settings');
const CONTAINER_NAME = 'filtered-images';
const storage = createBlobService(AZURE_STORAGE_ACCOUNT, AZURE_STORAGE_KEY);

/**
 * Gets the current date and returns it in yyyyMMdd format
 * @param {string} url
 * @return {string}
 */
function uploadImage(url) {
  const blobName = buildFilename(url);
  const blobSettings = {
    blockIdPrefix: 'block',
  };

  const promise = new Promise((resolve, reject) => {
    const callback = (error) => {
      if (error) reject(error);
      resolve(storage.getUrl(CONTAINER_NAME, blobName));
    };

    getImageStream(url)
      .then((response) =>
        response.data.pipe(
          storage.createWriteStreamToBlockBlob(
            CONTAINER_NAME,
            blobName,
            blobSettings,
            callback
          )
        )
      )
      .catch((error) => reject(error));
  });

  return promise;
}

export default uploadImage;
