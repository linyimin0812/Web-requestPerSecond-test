var express = require("express");
var parse = require("./parse");
var app = express();
var dirPath = "/home/linyimin/practice/Web-requestPerSecond-test/linux/result";
// 允许跨域访问
app.all("*", function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.use(express.static('public'))
app.use("/result", function(req, res){
    var result = {};
    result.concurrencyLevel = parse.getConcurrencyLevel(dirPath);
    result.timeForTest = parse.getTimeForTest(dirPath);
    result.failedRequests = parse.getFailedRequests(dirPath);
    result.requestPerSecond = parse.getRequestPerSecond(dirPath);
    result.userTimePerRequest = parse.getUserTimePerRequest(dirPath);
    result.serverTimePerRequest = parse.getServerTimePerRequest(dirPath);
    res.json(result);
});

app.listen(8000);