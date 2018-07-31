import retrieveShouts from './shoutsRetriever';

export default function (context) {
  context.log('Retrieving shouts...');

  retrieveShouts()
    .then(shouts => {
      context.log('Enqueueing shouts...');

      context.bindings.shouts = [];
      shouts.forEach(shout => context.bindings.shouts.push(shout));

      context.log('Shouts enqueued.')
      context.done();
    })
    .catch(error => {
      context.log.error(error);
      context.done();
    });
};