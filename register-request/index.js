module.exports = function (context) {
  context.log('Incoming request registered');

  context.bindings.incomingRequest = 'New incoming request';
  context.res = { 
    status: 200, 
    message: 'All good' 
  };
  
  context.done();
}