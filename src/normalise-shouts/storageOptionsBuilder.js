const BASE_VISIBILITY_TIMEOUT = 60;

/**
 * Sets the enqueuing options to hide the shout until the processor is ready
 * @param {object} shout
 * @return {object} Storage queue options
 */
export default (shout) => {
  const { queueOrder } = shout;

  return {
    visibilityTimeout: queueOrder * BASE_VISIBILITY_TIMEOUT,
  };
};
