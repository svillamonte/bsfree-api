const analyseImage = require('./imageAnalyser');

module.exports = function (context, shout) {
  const { url } = shout;

  context.log('Beginning image analysis.');    
  analyseImage(url)
    .then(result => {
      if (result) {
        context.log('Image checks out');
        context.bindings.whitelistedShout = shout;
      }
      else {
        context.log('Image does not pass');
      }

      context.done();
    })
    .catch(error => {
      context.log.error(error);
      context.done();
    });
};