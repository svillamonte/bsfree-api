const { AZURE_STORAGE_KEY, AZURE_STORAGE_ACCOUNT } = require('./../common/settings');
const QUEUE_NAME = 'latest-shouts';

const azure = require('azure-storage');

function enqueueShout(shout) {
  const storage = azure.createQueueService(
    AZURE_STORAGE_ACCOUNT,
    AZURE_STORAGE_KEY
  );
  
  const options = {
    visibilityTimeout: 60
  };

  const promise = new Promise((resolve, reject) => {
    const callback = (error, result) => {
      if (error) reject(error);
      resolve(result.timeNextVisible);
    };

    // Apparently the message has to be of type string
    storage.createMessage(QUEUE_NAME, JSON.stringify(shout), options, callback);
  });

  return promise;  
}

module.exports = enqueueShout;