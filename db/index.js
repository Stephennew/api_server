/*
 * @Author: jswang
 * @Date: 2021-06-21 17:04:50
 * @LastEditTime: 2021-06-25 12:41:56
 */
//导入mysql模块
const mysql = require('mysql');

const db = mysql.createPool({
    host: "127.0.0.1",
    user: 'root',
    password: '123456',
    database: 'api_server',
});

module.exports = db;