const uploadImage = require('./imageUploader');
const registerShout = require('./shoutRegisterer');

module.exports = function (context, shout) {
  const { url } = shout;
  
  try {
    uploadImage(url)
      .then(imageUri => {
        context.log('Image uploaded into blob storage.');

        registerShout(shout, imageUri)
          .then(() => {
            context.log('Shout saved into table storage.');
            
            context.done(); 
          });      
      });
  } catch (error) {
    context.log.error(error);
    context.done();
  }  
};