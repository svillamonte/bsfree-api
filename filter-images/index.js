var { analyzeImage, getClient } = require('./imageAnalyzer');

// (async () => {
//   const hola = await analyzeImage(
//     'https://k62.kn3.net/taringa/E/8/C/7/0/1/isma62/348.jpg', 
//     getClient());

//   console.log(hola);
// })();

module.exports = function (context) {
  const imageUrl = 'https://k62.kn3.net/taringa/E/8/C/7/0/1/isma62/348.jpg';
  
  analyzeImage(imageUrl, getClient())
    .then(data => context.log(data));

  context.res = { 
    status: 200 
  };
  
  context.done();
}