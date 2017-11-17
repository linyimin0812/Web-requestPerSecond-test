/**
 * 执行系统命令ab完成压力测试，并将测试结果重定向到指定文件下
 */
var fs = require("fs");
var step = 0;
var exec = require('child_process').execSync;
for (let i = 1 ; i <= 10000; i = i + step) {
    if (i <= 100) {
        step = 10;
    } else if (i <= 1000) {
        step = 100;
    } else if (i <= 10000) {
        step = 500;
    }
    var cmdStr = `ab -n 50000 -c ${i} http://111.207.243.71:3210/QuestionBase/baseDetail/getAllQuestions?appId=10008 > ${i}.txt`;
    var cmd = cmdStr.toString();
    exec(cmdStr, function (err, stdout, stderr) {
        if (err) {
            console.log('test error:' + stderr);
        } else {
            var writeStream = fs.createWriteStream(i + ".txt");
            console.log("Hello");
            writeStream.end(stdout);
        }
    });
}