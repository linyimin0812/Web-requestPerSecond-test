/**
 * 执行系统命令ab完成压力测试，并将测试结果重定向到指定文件下
 */
var fs = require("fs");
var step = 0;
var exec = require('child_process').execSync;
for (let i = 1 ; i <= 500; i = i + step) {
    if (i <= 100) {
        step = 10;
    } else if (i <= 1000) {
        step = 100;
    } else if (i <= 10000) {
        step = 500;
    }
    var cmdStr = `ab -n 500 -c ${i} https://openapi.10jqka.com.cn/databank/v1/market_change?date=20180202&access_token=0001.2bbc539e08a5c816e1b1f601010c0216.1546666804.005098-10001254 > ${i}.txt`;
    var cmd = cmdStr.toString();
    console.log(cmd)
    const result = exec(cmdStr)
    fs.writeFileSync(`${i}.txt`, result)
}