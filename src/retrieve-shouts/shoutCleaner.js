module.exports = function(shouts) {
  return shouts.map(shout => {
    const { id, body } = shout;
    const { nick } = shout.owner;
    const { url } = shout.attachment || { url: null };

    return {
      id,
      body,
      nick,
      url
    };
  });
};