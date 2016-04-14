var express = require('express');
var jxm = require('jxm');

console.log("Integration server has received ", process.argv);
console.log("JSON", JSON.parse(process.argv[2]));
