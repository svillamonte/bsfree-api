// Exclude gifs for now. We can exclude by file size later on.
export default function (shout) {
  const { url } = shout;

  return !url.endsWith('.gif');
}