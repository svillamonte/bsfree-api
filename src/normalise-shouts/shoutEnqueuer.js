const { AZURE_STORAGE_KEY, AZURE_STORAGE_ACCOUNT } = require('./../common/settings');
const QUEUE_NAME = 'normalised-shouts';

const azure = require('azure-storage');
const { QueueMessageEncoder } = azure;

function enqueueShout(shout) {
  const storage = azure.createQueueService(
    AZURE_STORAGE_ACCOUNT,
    AZURE_STORAGE_KEY
  );
  storage.messageEncoder = new QueueMessageEncoder.TextBase64QueueMessageEncoder();
  
  const options = {
    visibilityTimeout: 60
  };

  const promise = new Promise((resolve, reject) => {
    const callback = (error, result) => {
      if (error) reject(error);
      resolve(result.timeNextVisible);
    };

    // Apparently the message has to be of type string
    const message = JSON.stringify(shout);
    storage.createMessage(QUEUE_NAME, message, options, callback);
  });

  return promise;  
}

module.exports = enqueueShout;