/*
 * @Author: jswang
 * @Date: 2021-06-27 10:38:18
 * @LastEditTime: 2021-06-27 12:03:52
 */
const joi = require('@hapi/joi');

// 定义  name alias 验证规则
const name = joi.string().required();
const alias = joi.string().alphanum().required();
//id的校验规则
const id = joi.number().integer().min(1).required();
exports.add_cate_schema = {
    body: {
        name,
        alias,
    }
};
//删除分裂
exports.delete_cate_schema = {
    params: {
        id,
    }
}

//根据id获取文章分类
exports.get_cate_schema = {
    params: {
        id,
    }
};

//根据id更新分类
exports.update_cate_schema = {
    body: {
        id,
        name,
        alias,
    }
}