/**
 * Trims the original shout object to properties we care about
 * @param {Array} shouts
 * @return {Array}
 */
export default function(shouts) {
  return shouts.map((shout, i) => {
    const { id, body } = shout;
    const { nick } = shout.owner;
    const { url } = shout.attachment || { url: null };

    return {
      id,
      body,
      nick,
      url,
      queueOrder: i, // basic throttling strategy for image analysis
    };
  });
}
