var start;
exports.start = function() {
 start = Date.now();
};

exports.end = function(failed){
  var msg = "SUCCESS"
  if (failed)
    msg = "FAILED";
  Mobile.toggleBluetooth(false, function() {
    Mobile.toggleWiFi(false, function() {
      console.log("****TEST TOOK: ", Date.now() - start, " ms ****" );
      console.log("****TEST_LOGGER:[PROCESS_ON_EXIT_" + msg + "]****");
    });
  });
};
