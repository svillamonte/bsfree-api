import { AZURE_STORAGE_KEY, AZURE_STORAGE_ACCOUNT } from './../common/settings';
import azure from 'azure-storage';
import getCurrentDate from './currentDateBuilder';

const TABLE_NAME = 'FilteredShouts';

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

export default registerShout;