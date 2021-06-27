/*
 * @Author: jswang
 * @Date: 2021-06-25 21:39:04
 * @LastEditTime: 2021-06-27 09:59:59
 */
//导入数据模块
const db = require('../db/index');
const bcrypt = require('bcryptjs');
exports.getUserInfo = (req, res) => {
    //定义sql
    // 根据用户的 id，查询用户的基本信息
    // 注意：为了防止用户的密码泄露，需要排除 password 字段
    const sql = `select id,username,nickname,email,user_pic from ev_users where id=?`;
    //执行sql
    // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
    db.query(sql, req.user.id, (err, results) => {
        if (err) {
            res.cc(err);
        }
        if (results.length !== 1) {
            res.cc('获取用户失败');
        }
        res.send({
            status: 0,
            msg: '获取用户基本信息成功!',
            data: results[0],
        });
    });
}
exports.updateUserInfo = (req, res) => {
    //验证数据
    const userinfo = req.body;
    if (!userinfo.id || !userinfo.nickname || !userinfo.email) {
        return res.cc('用户id,昵称,邮箱不合法');
    }
    if (userinfo.id < 1) {
        return res.cc('不能小于1');
    }
    let index = String(userinfo.id).indexOf('.') + 1;
    if (index > 0) {
        return res.cc('id不能是小数');
    }
    //定义sql
    const sql = `update ev_users set ? where id=?`;
    db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('更新用户的基本信息失败!');
        //成功
        res.cc('更新用户的基本信息成功!');
    });
}

exports.updatepwd = (req, res) => {
    //查询用户是否存在
    const sql = `select * from ev_users where id=?`;
    db.query(sql, [req.body.id], (err, results) => {
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc('该用户不存在');
        // TODO判断提交的旧密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password);
        if (!compareResult) return res.cc('原密码错误!');
        //更新密码
        const sql = `update ev_users set password=? where id=?`;
        //对新密码进行加密
        const newPwd = bcrypt.hashSync(req.body.newPwd);
        db.query(sql, [newPwd, req.body.id], (err, results) => {
            if (err) return res.cc(err);
            if (results.affectedRows !== 1) return res.cc('更新密码失败!');
            //更新密码成功
            res.cc('更新密码成功!');
        });
    });
}

exports.updateAvater = (req, res) => {
    if (!req.body.avater) return res.cc('用户头像不合法');
    if (res.body.id) return res.cc('必须提供id');
    const sql = `update ev_users set user_pic=? where id=?`;
    db.query(sql, [req.body.avater, req.body.id], (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('更新头像失败!');
        //成功
        res.cc('更新头像成功', 0);
    });

}