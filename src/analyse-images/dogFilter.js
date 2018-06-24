const TAG_NAME = 'dog';
const CONFIDENCE_THRESHOLD = 0.5;

module.exports = function isDog(imageAnalysis) {
  const { tags } = imageAnalysis;

  var dogTag = tags.find(tag => tag.name === TAG_NAME);
  if (dogTag && dogTag.confidence > CONFIDENCE_THRESHOLD) {
    return true;
  }

  return false;
}