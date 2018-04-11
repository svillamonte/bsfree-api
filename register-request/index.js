module.exports = function (context) {
  context.log('Incoming request processed');

  context.bindings.incomingRequest = 'New incoming request';
  context.res = { status: 200 };
  
  context.done();
}