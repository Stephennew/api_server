/*
 * @Author: jswang
 * @Date: 2021-06-21 16:15:39
 * @LastEditTime: 2021-06-24 23:46:08
 */
const express = require('express');
const user_handler = require('../router_handler/user');

const userRouter = express.Router();

//导入验证数据中间件
const expressJoi = require('@escook/express-joi');
//导入需要验证的规则对象
//解构赋值
const { reg_login_schema } = require('../schema/user');

//挂载两个路由  导出

userRouter.post('/reguser', user_handler.regUser);

userRouter.post('/login', user_handler.loginUser);

module.exports = userRouter;