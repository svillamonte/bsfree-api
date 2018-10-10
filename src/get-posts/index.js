import getLatestShouts from './latestShoutsRetriever';

/**
 * Returns the latest shouts from table storage
 * @param {any} context Azure Functions context
 * @param {any} request HTTP request
 */
export default function(context, request) {
  const { continuationToken } = request.body;

  context.log('Getting latest shouts...');

  getLatestShouts(continuationToken)
    .then((result) => {
      context.log('Shouts retrieved.');

      context.res = {
        body: result,
      };

      context.done();
    })
    .catch((error) => {
      context.log.error(error);
      context.done();
    });
}
