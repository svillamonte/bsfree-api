module.exports = function (context) {
  const imageUrl = 'https://k62.kn3.net/taringa/E/8/C/7/0/1/isma62/348.jpg';
  
  analyzeImage(imageUrl, getClient())
    .then(data => context.log(data));

  context.res = { 
    status: 200 
  };
  
  context.done();
}

// const getLatestShouts = require('./shoutsRetriever');
// const { analyzeImage, getClient } = require('./imageAnalyzer');

// (async () => {
//   const shouts = await getLatestShouts();

//   const cognitiveClient = getClient();
//   shouts.forEach(shout => {
//     const { url } = shout;

//     console.log(url);
//     if (url) {
//       analyzeImage(url, cognitiveClient)
//         .then(response => console.log(`${url} => ${response}`));
//     }
//   });
// })();