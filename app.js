/*
 * @Author: jswang
 * @Date: 2021-06-21 15:57:31
 * @LastEditTime: 2021-06-27 13:26:37
 */
//导入express包
const express = require('express');
const joi = require('@hapi/joi');
//调用express 创建实例对象
const app = express();
//导入cors中间件
const cors = require('cors');
//托管静态资源
app.use('/uploads', express('./uploads'));
//导入 token 配置文件
const config = require('./config');
//导入 解析token中间件
const expressJWT = require('express-jwt');
//注册 全局可用跨域
app.use(cors());
//配置解析 表单数据的中间件 只能 解析 application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
const db = require('./db/index');
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }));
//路由之前
// 响应数据的中间件
app.use(function(req, res, next) {  // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
     
    res.cc = function(err, status = 1) {
        res.send({    // 状态
            status,
                // 状态描述，判断 err 是 错误对象 还是 字符串
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
});
//导入并使用路由模块
const userRouter = require('./router/user');
app.use('/api', userRouter);

const userinfoRouter = require('./router/userinfo');
app.use('/my', userinfoRouter);

const artCateRouter = require('./router/artcate');
app.use('/my/article', artCateRouter);

const articleRouter = require('./router/article');
app.use('/my/article', articleRouter);
//定义错误级别中间件

app.use((err, req, res, next) => {
    //验证失败导致错误
    if (err instanceof joi.ValidationError) {
        return res.cc(err);
    }
    //捕获身份认证失败的错误
    if (err.name === 'UnauthorizedError') {
        return res.send({
            status: 1,
            msg: '身份认证失败!',
        })
    };
    //未知错误
    res.cc(err);
});







//监听80端口,开动web服务
app.listen(80, () => {
    console.log('server running at 127.0.0.1:80');
});