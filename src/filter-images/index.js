require('dotenv').config();

const { analyzeImage, getClient } = require('./imageAnalyzer');

module.exports = function (context) {
  const imageUrl = 'https://k62.kn3.net/taringa/E/8/C/7/0/1/isma62/348.jpg';
  
  analyzeImage(imageUrl, getClient())
    .then(data => context.log(data));

  context.res = { 
    status: 200 
  };
  
  context.done();
}

// var RateLimiter = require('limiter').RateLimiter;
// var limiter = new RateLimiter(20, 'minute');

// const getLatestShouts = require('./shoutsRetriever');
// const { analyzeImage, getClient } = require('./imageAnalyzer');
// const imageUploader = require('./imageUploader');

// (async () => {
//   const shouts = await getLatestShouts();
//   const cognitiveClient = getClient();

//   shouts.push({ url: 'https://k62.kn3.net/taringa/E/8/C/7/0/1/isma62/348.jpg'});

//   shouts.forEach(shout => {

//     while (!limiter.tryRemoveTokens(1)) {
//       continue;
//     }

//     const { url } = shout;

//     console.log(`Processing ${url}`);

//     if (url) {
//       analyzeImage(url, cognitiveClient)
//         .then(response => {
//           console.log(`${url} => is ${response ? '' : 'NOT '}a dog`);

//           if (response) {
//             imageUploader(url)
//               .then(x => console.log(`Uploaded ${url}`))
//               .catch(x => console.error('Chan! ' + url));
//           }
//         })
//         .catch(error => console.error('Chan! ' + url));
//     }

//   });
// })();