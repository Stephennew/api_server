/*
 * @Author: jswang
 * @Date: 2021-06-27 10:15:55
 * @LastEditTime: 2021-06-27 12:04:29
 */
const express = require('express');
const router = express.Router();

//导入验证数据中间件
const expressJoi = require('@escook/express-joi');
//导入添加文章分类的验证规则
const { add_cate_schema, delete_cate_schema, get_cate_schema, update_cate_schema } = require('../schema/artcate');
const artcate_handler = require('../router_handler/artcate');
//获取文章分类数据列表的路由
router.get('/article/cates', artcate_handler.getArtCates);

//添加分类
// router.post('/addcates', expressJoi(add_cate_schema), artcate_handler.addArticleCates);
router.post('/addcates', artcate_handler.addArticleCates);
//根据id删除文章分类
// router.get('/deletecate/:id', expressJoi(delete_cate_schema), artcate_handler.deleteCateById)
router.get('/deletecate/:id', artcate_handler.deleteCateById);
//根据id获取文章分类
// router.get('/cates/:id', expressJoi(get_cate_schema), artcate_handler.getArtCatesById);
router.get('/cates/:id', artcate_handler.getArtCatesById);
//根据id更新文章分类
// router.post('/updatecate', expressJoi(update_cate_schema), artcate_handler.updateCateById);
router.post('/updatecate', artcate_handler.updateCateById);
module.exports = router;