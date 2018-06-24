const uploadImage = require('./imageUploader');

module.exports = function (context, shout) {
  const { url } = shout;
  
  uploadImage(url)
    .then(() => {
      context.log('Shout registered.');
      context.done();
    })
    .catch(error => {
      context.log.error(error);
      context.done();
    });
};