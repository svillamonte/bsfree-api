import moment from 'moment';

const MAX_DATE_TICKS = 8640000000000000;

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

export default (date) => {
  const maxDate = moment(MAX_DATE_TICKS);

  const ticks = maxDate.unix() - date.unix();
  padStartPolyfill(); // Azure Functions runtime is outdated.
  return ticks.toString().padStart(16, '0');
};
