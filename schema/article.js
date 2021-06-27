/*
 * @Author: jswang
 * @Date: 2021-06-27 12:44:22
 * @LastEditTime: 2021-06-27 12:48:17
 */
const joi = require('@hapi/joi');

const title = joi.string().required();
const cate_id = joi.number().integer().min(1).required();
const content = joi.string().required().allow();
const state = joi.string().valid('已发布,草稿').required();
exports.add_article_schema = {
    body: {
        title,
        cate_id,
        content,
        state,
    }
}