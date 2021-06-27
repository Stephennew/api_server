/*
 * @Author: jswang
 * @Date: 2021-06-21 16:24:54
 * @LastEditTime: 2021-06-25 13:40:46
 */
const db = require('../db/index');
//导入bcryptjs 包 加密
const bcrypt = require('bcryptjs');
//导入 jsonwebtoken 包 生成token字符串
const jwt = require('jsonwebtoken');
//导入秘钥配置
const config = require('../config');
// 通过exports 暴露出去,要使用直接导入即可
exports.regUser = (req, res) => {
    const userinfo = req.body;
    // 检测表单数据是否合法
    if (!userinfo.username || !userinfo.password) {
        // return res.send({
        //     status: 1,
        //     meg: '用户名或密码不合法!',
        // });
        return res.cc('用户名或密码不合法');
    }
    // 检测用户名是否被占用
    const sqlStr = 'select username from ev_users where username=?';
    db.query(sqlStr, userinfo.username, (err, result) => {
        if (err) {
            // return res.send({
            //     status: 1,
            //     msg: err.message,
            // });
            return res.cc(err);
        }
        //判断用户名是否被占用
        if (result.length > 0) {
            // return res.send({
            //     status: 1,
            //     msg: '用户名被占用,请更换用户名!',
            // });
            return res.cc('用户名被占用,请更换用户名!');
        }
    });
    // 对密码进行加密处理  第二个参数是随机盐  一般是10
    userinfo.password = bcrypt.hashSync(userinfo.password, 10);
    // 插入新用户
    const sql = 'insert into ev_users set ?';
    db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, result) => {
        if (err) {
            // return res.send({
            //     status: 1,
            //     msg: err.message,
            // });
            return res.cc(err);
        }

        //成功
        if (result.affectedRows !== 1) {
            // return res.send({
            //     status: 1,
            //     msg: '注册失败,请稍后再试!',
            // });
            return res.cc('注册失败,请稍后再试!');
        }
        // res.send({
        //     status: 0,
        //     msg: '注册成功!'
        // });
        res.cc('注册成功!', 0);
    });
};

exports.loginUser = (req, res) => {
    //接受表单中的数据
    const userinfo = req.body;
    if (!userinfo.username || !userinfo.password) {
        // return res.send({
        //     status: 1,
        //     msg: '用户名密码不合法!'
        // });
        return res.cc('用户名不合法!');

    }
    //定义sql
    const sql = `select * from ev_users where username=?`;
    //执行sql
    db.query(sql, userinfo.username, function(err, results) {  // 执行 SQL 语句失败
        if (err) return res.cc(err)  // 执行 SQL 语句成功，但是查询到数据条数不等于 1
        if (results.length !== 1) return res.cc('登录失败！');
        //TODO:判断用户密码是否正确
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password);
        if (!compareResult) {
            return res.cc('密码不对,登录失败');
        }
        //TODO: 登录成功后生成token字符串
        //1. 通过 ES6 的高级语法，快速剔除  密码 和  头像 的值：
        const user = {...results[0], password: '', user_pac: '' };
        //安装生成 Token 字符串的包：
        //4. 创建  config.js 文件，并向外共享 加密 和 还原 Token 的  jwtSecretKey 字符串：
        //5. 将用户信息对象加密成 Token 字符串：
        const token = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn });
        //6. 将生成的 Token 字符串响应给客户端：
        res.send({
            status: 0,
            message: '登录成功!',
            token: 'Bearerr ' + token,
        });

    });

};