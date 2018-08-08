const TAG_NAME = 'dog';
const CONFIDENCE_THRESHOLD = 0.5;

/**
 * Checks whether the image analysis has found a dog
 * @param {object} imageAnalysis
 * @return {boolean} true
 */
export default function(imageAnalysis) {
  const { tags } = imageAnalysis;
  const dogTag = tags.find((tag) => tag.name === TAG_NAME);

  if (dogTag && dogTag.confidence > CONFIDENCE_THRESHOLD) {
    return true;
  }

  return false;
}
