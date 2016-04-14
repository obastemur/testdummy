var fs = require('fs');
var log = require('./TestingEnvironment/log');
log.start();

Mobile('log').call("JXcore is up and running!");

Mobile('getBuffer').registerSync(function() {
  console.log("getBuffer is called!!!!");
  var buffer = new Buffer(25000);
  buffer.fill(45);

  // send back a buffer
  return buffer;
});

Mobile('asyncPing').registerAsync(function(message, callback){
  setTimeout(function() {
    callback("Pong:" + message);
  }, 500);
});

Mobile.getDeviceName(function(err, name){
  console.error(">>", name);
});

var os = require('os');
console.log("Total memory", os.totalmem());
console.log("Free memory", os.freemem());

// execpath
console.log("execPath", process.execPath);

// cwd
console.log("process.cwd", process.cwd());

// iOS user directory
console.log("userPath", fs.readdirSync(process.userPath));

Mobile('fromJXcore').registerToNative(function(param1, param2){
  // this method is reachable from Java or ObjectiveC
  // OBJ-C : [JXcore callEventCallback:@"fromJXcore" withParams:arr_parms];
  // Java  : jxcore.CallJSMethod("fromJXcore", arr_params);
});

// calling this custom native method from JXcoreExtension.m / .java
Mobile('ScreenInfo').callNative(function(width, height){
  console.log("Size", width, height);
});

Mobile('ScreenBrightness').callNative(function(br){
  console.log("Screen Brightness", br);
  log({END:1, test_name: "BASIC"});
});

console.error("Dummy Error Log.")

setTimeout(function(){
  // calling STOP will kill the application i.e. iOS uninstalls
  log.end(false);
},5000);
