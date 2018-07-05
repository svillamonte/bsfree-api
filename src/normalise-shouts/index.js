const checksOut = require('./shoutNormaliser');
const enqueueShout = require('./shoutEnqueuer');

module.exports = function (context, shout) {
  context.log('Applying filters to shout...');

  checksOut(shout)
    .then(result => {
      if (!result) {
        context.log('Does not check out.');
        context.done();
        
        return;
      }

      context.log('Checks out. Enqueuing it...');      
      enqueueShout(shout)
        .then(nextVisibleTime => {
          context.log(`Enqueued. Next visible time: ${nextVisibleTime}`);
          context.done();
        })            
        .catch(error => {
          context.log.error(`Error while enqueuing: ${error}`);
          context.done();
        });
    })
    .catch(error => {
      context.log.error(`Error while filtering: ${error}`);
      context.done();
    });
};