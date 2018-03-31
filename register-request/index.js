module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.name || (req.body && req.body.name)) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello " + (req.query.name || req.body.name)
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
    context.done();
};

/**
 * Function A takes care of registering the request for shouts from an HTTP request
 *  It saves that request in queue A.
 * Function B is activated from a new message in the queue.
 *  Calls cognitive services and serves the result to the UI.
 *  (Also, a third queue could be used to handle this).
 */