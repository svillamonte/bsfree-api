// Exclude gifs for now. We can exclude by file size later on.
module.exports = function(shout) {
  if (shout.attachment) {
    const { url } = shout.attachment;

    return !url.endsWith('.gif');
  }

  return true;
}