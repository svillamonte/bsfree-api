/**
 * Gets the current date and returns it in yyyyMMdd format
 * @return {string}
 */
export default function() {
  const currentDateTime = new Date().toISOString();

  return currentDateTime.slice(0, 10).replace(/-/g, '');
}
