/*
 * @Author: jswang
 * @Date: 2021-06-25 21:22:26
 * @LastEditTime: 2021-06-27 09:50:03
 */
const express = require('express');
const router = express.Router();
const expressJoi = require('@escook/express-joi');
const { update_userinfo_schema, update_password_schema } = require('../schema/user');
const userinfo_handler = require('../router_handler/userinfo');
router.get('/userinfo', userinfo_handler.getUserInfo);
//更新用户信息
// router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo);
router.post('/userinfo', userinfo_handler.updateUserInfo);
//重制密码
router.post('/updatepwd', userinfo_handler.updatepwd);
//更新用户头像
router.post('/update/avater', userinfo_handler.updateAvater);
module.exports = router;