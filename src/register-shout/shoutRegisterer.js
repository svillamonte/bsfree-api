const { AZURE_STORAGE_KEY, AZURE_STORAGE_ACCOUNT } = require('./../common/settings');
const TABLE_NAME = 'FilteredShouts';

const azure = require('azure-storage');
const getCurrentDate = require('./currentDateBuilder');

function createShoutEntity(shout, imageBlobUri) {
  const { entityGenerator } = azure.TableUtilities;
  const { id, nick, body } = shout;

  return {
    PartitionKey: entityGenerator.String(getCurrentDate()),
    RowKey: entityGenerator.String(id),
    ShoutId: entityGenerator.String(id),
    Nick: entityGenerator.String(nick),
    Body: entityGenerator.String(body),
    ImageUri: entityGenerator.String(imageBlobUri)
  };
}

function registerShout(shout, imageBlobUri) {
  const tableStorage = azure.createTableService(
    AZURE_STORAGE_ACCOUNT,
    AZURE_STORAGE_KEY
  );
  
  const promise = new Promise((resolve, reject) => {
    const shoutEntity = createShoutEntity(shout, imageBlobUri);

    const callback = (error) => {
      if (error) reject(error);
      resolve();
    };

    tableStorage.insertEntity(TABLE_NAME, shoutEntity, callback);
  });

  return promise;
};

module.exports = registerShout;