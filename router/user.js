/*
 * @Author: jswang
 * @Date: 2021-06-21 16:15:39
 * @LastEditTime: 2021-06-21 16:29:28
 */
const express = require('express');
const user_handler = require('../router_handler/user');

const userRouter = express.Router();

//挂载两个路由  导出

userRouter.post('/login', user_handler.regUser);


userRouter.post('/reguser', user_handler.loginUser);

module.exports = userRouter;