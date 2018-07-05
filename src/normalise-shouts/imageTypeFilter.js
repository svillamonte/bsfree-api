// Exclude gifs for now. We can exclude by file size later on.
module.exports = function(shout) {
  const { url } = shout;

  return !url.endsWith('.gif');
}