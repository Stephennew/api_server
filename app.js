/*
 * @Author: jswang
 * @Date: 2021-06-21 15:57:31
 * @LastEditTime: 2021-06-21 15:57:44
 */
//导入express包
const express = require('express');

//调用express 创建实例对象
const app = express();











//监听8089端口,开动web服务
app.listen(8089, () => {
    console.log('server running at 127.0.0.1:8089');
});