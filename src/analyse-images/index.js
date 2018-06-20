const { COGNITIVE_SERVICES_KEY } = require('../common/settings');

module.exports = function (context, imageUrl) {
    context.log('JavaScript queue trigger function processed work item', imageUrl);
    context.log(COGNITIVE_SERVICES_KEY);
    context.done();
};