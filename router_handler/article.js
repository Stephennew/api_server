/*
 * @Author: jswang
 * @Date: 2021-06-27 12:29:44
 * @LastEditTime: 2021-06-27 13:22:01
 */
//文章的处理函数模块\
const path = require('path');
const db = require('../db/index');
exports.addArticle = (req, res) => {
    const article = req.body;
    console.log
    if (!article.title || !article.content || !article.state || !article.cate_id) {
        return res.cc('不能为空');
    }
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面必须上传');

    //进行业务处理
    const articleInfo = {
        //将这个对象 展开 赋值 给articleInfo
        ...req.body,
        cover_img: path.join('/uploads', req.file.fieldname),
        pub_date: +new Date(),
        author_id: req.user.id,
    }
    sql = `insert into ev_articles set ?`;
    db.query(sql, articleInfo, (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('新增文章失败!');
        res.cc('发布文章成功!', 0);
    });
}