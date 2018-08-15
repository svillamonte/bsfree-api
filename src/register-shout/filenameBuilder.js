/**
 * Builds a filename based on the current time and the file extension.
 * @param {string} url
 * @return {string}
 */
export default function(url) {
  const currentTime = new Date().getTime();

  const dotIndex = url.lastIndexOf('.');
  if (dotIndex < 0) {
    throw new Error('No file extension found.');
  }

  const extension = url.substring(url.lastIndexOf('.') + 1, url.length);
  return `${currentTime}.${extension}`;
}
