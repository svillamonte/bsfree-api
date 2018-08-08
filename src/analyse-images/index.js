import analyseImage from './imageAnalyser';

/**
 * Handles the image analysis function. If image passes, it is added to the whitelist.
 * @param {any} context
 * @param {any} shout
 */
export default function(context, shout) {
  const { url } = shout;

  context.log('Beginning image analysis.');
  analyseImage(url)
    .then((result) => {
      if (result) {
        context.log('Image checks out');
        context.bindings.whitelistedShout = shout;
      } else {
        context.log('Image does not pass');
      }

      context.done();
    })
    .catch((error) => {
      context.log.error(error);
      context.done();
    });
}
