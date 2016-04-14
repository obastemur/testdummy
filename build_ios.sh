#!/bin/sh

### START - JXcore Test Server --------
### Testing environment prepares separate packages for each node.
### Package builder calls this script with each node's IP address
### Make sure multiple calls to this script file compiles the application file

NORMAL_COLOR='\033[0m'
RED_COLOR='\033[0;31m'
GREEN_COLOR='\033[0;32m'
GRAY_COLOR='\033[0;37m'

LOG() {
  COLOR="$1"
  TEXT="$2"
  echo -e "${COLOR}$TEXT ${NORMAL_COLOR}"
}


ERROR_ABORT() {
  if [[ $? != 0 ]]
  then
    LOG $RED_COLOR "compilation aborted\n"
    exit -1 
  fi
}
### END - JXcore Test Server   --------

cordova platform remove ios;ERROR_ABORT
cordova platform remove android;ERROR_ABORT
cordova plugin remove io.jxcore.node;ERROR_ABORT
cordova plugin add io.jxcore.node/;ERROR_ABORT
cordova platform add ios;ERROR_ABORT
cordova build ios --device;ERROR_ABORT
