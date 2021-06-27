/*
 * @Author: jswang
 * @Date: 2021-06-21 18:11:38
 * @LastEditTime: 2021-06-27 09:54:32
 */

const joi = require('@hapi/joi');


/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */
const username = joi.string().alphanum().min(3).max(30).required();
const password = joi.string().regex(/^[\S]{6,16}$/);
/*  access_token: [Joi.string(), Joi.number()],
 birthyear: Joi.number().integer().min(1900).max(2013),
 email: Joi.string().email(), */
//定义id nickname email 的验证规则
const id = joi.number().integer().min(1).required();
const nickname = joi.string().required();
const email = joi.string().email().required();

//定义头像验证规则
// dataUri() 指的是如下格式的字符串数据：
// data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
const avater = joi.string().dataUri().required();
exports.reg_login_schema = {
    // 表示需要对 req.body 中的数据进行验证
    body: {
        username,
        password,
    }

}

exports.update_userinfo_schema = {
    body: {
        id: id,
        nickname: nickname,
        email: email,
    }
}

exports.update_password_schema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password),
    }
}

exports.update_avater_schema = {
    body: {
        avater
    }
}