const MAX_DATE_TICKS = 8640000000000000;

/**
 * Gets the current date and returns it in yyyyMMdd format
 * @return {string}
 */
const getCurrentDate = () => {
  const currentDateTime = new Date().toISOString();

  return currentDateTime.slice(0, 10).replace(/-/g, '');
};

/**
 * Gets the milliseconds until the max date supported.
 * @return {number}
 */
const getPaddedTicksToMaxDate = () => {
  const maxDate = new Date(MAX_DATE_TICKS);
  const now = new Date();

  const ticks = maxDate.getTime() - now.getTime();

  padStartPolyfill(); // Azure Functions runtime is outdated.
  return ticks.toString().padStart(16, '0');
};

/* eslint no-extend-native:0 */
const padStartPolyfill = () => {
  if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
      targetLength = targetLength >> 0; // truncate if number, or convert non-number to 0;
      padString = String(typeof padString !== 'undefined' ? padString : ' ');
      if (this.length >= targetLength) {
        return String(this);
      } else {
        targetLength = targetLength - this.length;
        if (targetLength > padString.length) {
          padString += padString.repeat(targetLength / padString.length); // append to original to ensure we are longer than needed
        }
        return padString.slice(0, targetLength) + String(this);
      }
    };
  }
};

export { getCurrentDate, getPaddedTicksToMaxDate };
