var express = require("express");
var parse = require("./parse");
var app = express();
var dirPath = "F://项目/test/linux/";
// 允许跨域访问
app.all("*", function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})
app.use("/result", function(req, res){
    var result = {};
    var serviceName = req.query.serviceName || "questionBase";
    var path = dirPath + serviceName + "/";
    result.concurrencyLevel = parse.getConcurrencyLevel(path);
    result.timeForTest = parse.getTimeForTest(path);
    result.failedRequests = parse.getFailedRequests(path);
    result.requestPerSecond = parse.getRequestPerSecond(path);
    result.userTimePerRequest = parse.getUserTimePerRequest(path);
    result.serverTimePerRequest = parse.getServerTimePerRequest(path);
    res.json(result);
});

app.listen(8000);