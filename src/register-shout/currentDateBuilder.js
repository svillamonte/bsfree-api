export default function () {
  const currentDateTime = new Date().toISOString();

  return currentDateTime.slice(0, 10).replace(/-/g, '');
};