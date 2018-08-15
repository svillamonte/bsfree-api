import uploadImage from './imageUploader';
import registerShout from './shoutRegisterer';

/**
 * Uploads image into BLOB and adds a new entry into table storage to register it.
 * @param {object} context
 * @param {object} shout
 */
export default function(context, shout) {
  const { url } = shout;

  try {
    uploadImage(url).then((imageUri) => {
      context.log('Image uploaded into blob storage.');

      registerShout(shout, imageUri).then(() => {
        context.log('Shout saved into table storage.');

        context.done();
      });
    });
  } catch (error) {
    context.log.error(error);
    context.done();
  }
}
