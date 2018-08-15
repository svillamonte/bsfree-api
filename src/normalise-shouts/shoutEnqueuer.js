import { AZURE_STORAGE_KEY, AZURE_STORAGE_ACCOUNT } from './../common/settings';
import buildRequestOptions from './storageOptionsBuilder';
import { createQueueService, QueueMessageEncoder } from 'azure-storage';

const QUEUE_NAME = 'normalised-shouts';

/**
 * Enqueues the shout in queue storage.
 * @param {object} shout
 * @return {Promise} Promise with the next visible time for the shout
 */
function enqueueShout(shout) {
  const storage = createQueueService(AZURE_STORAGE_ACCOUNT, AZURE_STORAGE_KEY);
  storage.messageEncoder = new QueueMessageEncoder.TextBase64QueueMessageEncoder();

  const promise = new Promise((resolve, reject) => {
    const callback = (error, result) => {
      if (error) reject(error);
      resolve(result.timeNextVisible);
    };

    // Apparently the message has to be of type string
    const message = JSON.stringify(shout);
    storage.createMessage(
      QUEUE_NAME,
      message,
      buildRequestOptions(shout),
      callback
    );
  });

  return promise;
}

export default enqueueShout;
