/**
 * Rejects shouts holding GIF images. More robust logic will be implemented later on.
 * @param {object} shout
 * @return {boolean} True if shout doesn't contain GIF.
 */
export default function(shout) {
  const { url } = shout;

  return !url.endsWith('.gif');
}
