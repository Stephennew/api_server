/*
 * @Author: jswang
 * @Date: 2021-06-27 12:24:02
 * @LastEditTime: 2021-06-27 13:05:07
 */
const express = require('express');
const router = express.Router();
const article_handler = require('../router_handler/article');
const expressJoi = require('@escook/express-joi');
const { add_article_schema } = require('../schema/article');
//导入 multer  解析 form-data数据
const multer = require('multer');
const path = require('path');
//创建multer 实例
const uploads = multer({ dest: path.join(__dirname, '../uploads') });
//发布文章的路由
// 发布新文章的路由
// upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
// 将文件类型的数据，解析并挂载到 req.file 属性中
// 将文本类型的数据，解析并挂载到 req.body 属性中
// router.post('/add', uploads.single('conver_img'), expressJoi(add_article_schema), article_handler.addArticle);
router.post('/add', uploads.single('cover_img'), article_handler.addArticle);


module.exports = router;