/*
 * @Author: jswang
 * @Date: 2021-06-21 15:57:31
 * @LastEditTime: 2021-06-21 16:24:14
 */
//导入express包
const express = require('express');
//调用express 创建实例对象
const app = express();
//导入cors中间件
const cors = require('cors');
//注册 全局可用跨域
app.use(cors());
//配置解析 表单数据的中间件 只能 解析 application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

//导入并使用路由模块
const userRouter = require('./router/user');
app.use('/api', userRouter);










//监听8089端口,开动web服务
app.listen(80, () => {
    console.log('server running at 127.0.0.1:80');
});