/*
 * @Author: jswang
 * @Date: 2021-06-21 16:24:54
 * @LastEditTime: 2021-06-21 16:30:00
 */
const express = require('express');
const router = express.Router();

// 通过exports 暴露出去,要使用直接导入即可
exports.regUser = (req, res) => {
    res.send('login ok')
};

exports.loginUser = (req, res) => {
    res.send('register ok');
};