var fs = require("fs");
var globalConfig = {};
var conf = fs.readFileSync("./server.conf");
var configArr = conf.toString().split("\n");
configArr.forEach((ei, ii, si) => {
    globalConfig[ei.split("=")[0]] = ei.split("=")[1].trim();
});

module.exports = globalConfig;
