import { AZURE_STORAGE_KEY, AZURE_STORAGE_ACCOUNT } from './../common/settings';
import azure from 'azure-storage';

const QUEUE_NAME = 'normalised-shouts';
const BASE_VISIBILITY_TIMEOUT = 60;
const { QueueMessageEncoder } = azure;

function buildRequestOptions(shout) {
  const { queue_order } = shout;

  return {
    visibilityTimeout: queue_order * BASE_VISIBILITY_TIMEOUT
  };
}

function enqueueShout(shout) {
  const storage = azure.createQueueService(
    AZURE_STORAGE_ACCOUNT,
    AZURE_STORAGE_KEY
  );
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
      callback);
  });

  return promise;  
}

export default enqueueShout;