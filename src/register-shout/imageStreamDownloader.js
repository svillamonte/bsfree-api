import axios from 'axios';

export default (url) => {
  const axiosSettings = {
    method: 'GET',
    responseType: 'stream',
    url,
  };

  const promise = new Promise((resolve, reject) => {
    axios(axiosSettings)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });

  return promise;
};
