/**
 * 解析文件，提取目标信息
 */
var fs = require("fs");

function getAllFileName(dirPath) {
    // 定义排序规则，按文件名的数字大小进行排序
    function sortByNum(a, b) {
        var a = a.match(/[0-9]+([.]{1}[0-9]+){0,1}/)[0];
        var b = b.match(/[0-9]+([.]{1}[0-9]+){0,1}/)[0];
        return a - b;
    }
    var data = fs.readdirSync(dirPath);
    // 完成排序
    data.sort(sortByNum);
    return data;
}

// 并发用户0
var concurrencyLevel = [];
//  完成全部测试所需的时间1
var timeForTest = [];
// 失败请求数3
var failedRequests = [];
//  吞吐量6/7
var requestPerSecond = [];
// 用户平均请求等待时间7/8
var userTimePerRequest = [];
//  服务器平均请求等待时间8/9
var serverTimePerRequest = [];

/**
 * 解析一个文件，并返回目标数据数组
 * @param filePath
 * @returns {Array.<T>}
 */
function parseOneFile(filePath) {
    let data = fs.readFileSync(filePath).toString().split("\n");
    let os = filePath.match(/linux/);
    let temp = []
    if(os){
        temp = data.slice(14, 26);
    }else{
        temp = data.slice(14, 24);
    }
    let result = [];
    let j = 0;
    for (let i = 0; i < temp.length; i++) {
        // 去掉\r
        temp[i] = temp[i].replace(/[\'\"\\\/\b\f\n\r\t]/g, "");
        if(temp[i]){
            temp[i] = temp[i].match(/[0-9]+([.]{1}[0-9]+){0,1}/)[0];
            result[j++] = temp[i];
            if (i === 3 && temp[i] != "0") {
                i = i + 1;
            }
            
        }
    }
    return result;
}

function parseAll(dirPath) {
    // 获取所有文件名称（已排序）
    var fileNames = getAllFileName(dirPath);
    for (let i = 0; i < fileNames.length; i++) {
        var temp = parseOneFile(dirPath + "/" + fileNames[i]);
        let os = dirPath.match(/linux/);
        if(os){
            concurrencyLevel[i] = temp[0];
            timeForTest[i] = temp[1];
            failedRequests[i] = temp[3];
            requestPerSecond[i] = temp[8];
            userTimePerRequest[i] = temp[6];
            serverTimePerRequest[i] = temp[10];
        }else{
            concurrencyLevel[i] = temp[0];
            timeForTest[i] = temp[1];
            failedRequests[i] = temp[3];
            requestPerSecond[i] = temp[6];
            userTimePerRequest[i] = temp[6];
            serverTimePerRequest[i] = temp[8];
        }
    }
}

let parse = {
    /**
     * 获取并发量数组
     * @param {*} dirPath 
     */
    getConcurrencyLevel: function(dirPath){
        if(concurrencyLevel.length === 0){
            parseAll(dirPath);
            return concurrencyLevel;
        }
        return concurrencyLevel;
    },
    /**
     * 获取完成全部测试所需的时间数组
     */
    getTimeForTest: function(dirPath){
        if(timeForTest.length === 0){
            parseAll(dirPath);
            return timeForTest;
        }
        return timeForTest;
    },
    /**
     * 获取失败请求数数组
     */
    getFailedRequests: function(dirPath){
        if(failedRequests.length === 0){
            parseAll(dirPath);
            return failedRequests;
        }
        return failedRequests;
    },
    /**
     * 获取吞吐量数组
     */
    getRequestPerSecond: function(dirPath){
        if (requestPerSecond.length === 0){
            parseAll(dirPath);
            return requestPerSecond;
        }
        return requestPerSecond;
    },
    /**
     * 获取用户请求平均等待时间
     */
    getUserTimePerRequest: function(dirPath){
        if (userTimePerRequest.length === 0){
            parseAll(dirPath);
            return userTimePerRequest;
        }
        return userTimePerRequest;
    },
    /**
     * 获取服务器请求平均等待时间
     */
    getServerTimePerRequest: function(dirPath){
        if(serverTimePerRequest.length === 0){
            parseAll(dirPath);
            return serverTimePerRequest;
        }
        return serverTimePerRequest;
    }
}

module.exports = parse;

