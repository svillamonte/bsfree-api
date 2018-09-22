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
  return ticks.toString().padStart(16, '0');
};

export { getCurrentDate, getPaddedTicksToMaxDate };
