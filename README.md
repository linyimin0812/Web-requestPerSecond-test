##使用说明
执行abTest.js，进行压力测试, 
```
node abTest.js
```
通过修改
```
var cmdStr = `ab -n 50000 -c ${i} http://111.207.243.71:3210/QuestionBase/baseDetail/getAllQuestions?appId=10008 > ${i}.txt`;
```
指定并发连接数、并发用户数、测试的url和测试结果保存的路径

测试完成后，执行app.js,解析生成的测试结果，并画图
```
node app.js
```
通过修改
```
var dirPath = "F://项目/test/linux/";
```
指定测试结果的文件目录路径