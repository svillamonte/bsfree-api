var retrieveShouts = require('./shoutsRetriever');
var enqueueShout = require('./shoutEnqueuer');

module.exports = function (context, myTimer) {
  context.log('Retrieving shouts...');

  retrieveShouts()
    .then(shouts => {
      context.log('Enqueueing shouts...');

      shouts.forEach(shout => 
        enqueueShout(shout)
          .then(timeNextVisible => 
            context.log(`Message enqueued. Next visible: ${timeNextVisible}`))
          .catch((error) => context.log.error(`Error on enqueueing (${error})`)))

      context.done();
    })
    .catch(error => {
      context.log.error(error);
      context.done();
    });
};