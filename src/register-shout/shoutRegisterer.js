import azure from 'azure-storage';
import getCurrentDate from './currentDateBuilder';
import { insertShout } from '../common/filteredShoutStorage';

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
  const shoutEntity = createShoutEntity(shout, imageBlobUri);
  
  return new Promise((resolve, reject) => {
    insertShout(shoutEntity)
      .then(() => resolve())
      .catch(() => reject())
  });
};

export default registerShout;