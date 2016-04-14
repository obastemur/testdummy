#### Details on setting up the test application

First, you need a `mobile_test.json` file at the root folder of repository.

```
{
  "build": { "ios": "./build_ios.sh", "android": "./build_droid.sh" },
  "binary_path": { 
    "ios": "platforms/ios/build/device/HelloWorld.app", 
    "android": "platforms/android/build/outputs/apk/android-release-unsigned.apk" 
  },
  "target": "all",
  "priority": "normal",
  "csname": { "android": "com.example.hello", "ios": "com.example.hello" },
  "timeout": 150,
  "serverScript": "serverApp/"
}
```
```
build : Build script
binary_path: The location of the compiled app (relative to repository root)
target: test target -> all, android, ios
priority: normal, asap (normal or as soon as possible)
csname: application identifier name
timeout: max time for test in seconds (consider 150 as min)
serverScript: script folder location (to run during the test) (i.e. coordonation server)
```

#### About Integration Server
- serverScript path should have an `index.js` for the server application entry point

- serverScript receives a JSON command line parameter as given below;
```
jx index.js "{devices:{ios:4, android:5}}"
```

- serverScript default host ip is `192.168.1.150`

- serverScript server's port `8060` is reserved 

#### Toggle WiFi and Bluetooth on Android!!!

By Default Bluetooth and WiFi is disabled for all the Android devices and test is expected to turn them off on exit.

See Below; (Use that function to finalize the test!)

#### Basics of using CI
- You should tell the testing system that application is ready to exit. See sample code below.
```
var end = function(failed){
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
```

- Add Test System's IP address to Repository->Settings->Web Hook->Add Webhook

- !!!!Select only Pull Request!!!! 

That's all (see this repo's webhook for IP address)

#### Important
See `build_android.sh` and `build_ios.sh` files for `ERROR_ABORT` approach. It's important to exit 
the script with an error code in order to notify node manager.

When a new webhook is defined on a repository, test system tests the master branch first and reports the issues by 
creating a new issue on the repo.

Make sure any test is no longer than 35 mins
