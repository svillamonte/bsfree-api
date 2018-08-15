// queue_order is used as a basic throttling strategy when enqueuing
// normalised items, before the image analysis kicks in.
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
      queueOrder: i,
    };
  });
}
