/*
 * @Author: jswang
 * @Date: 2021-06-27 10:22:03
 * @LastEditTime: 2021-06-27 12:16:40
 */
//路由处理模块
const db = require('../db/index');
exports.getArtCates = (req, res) => {
    const sql = `select * from ev_article_cate where is_delete = 0  order by id asc`;
    db.query(sql, (err, results) => {
        if (err) return res.cc(err);
        res.send({
            status: 0,
            msg: '获取文章分类数据成功',
            data: results
        });
    });
}

exports.addArticleCates = (req, res) => {
    const artcate = req.body;
    if (!artcate.name || !artcate.alias) {
        return res.cc('分类名与别名不能为空!');
    }
    const sql = `select * from ev_article_cate where name=? or alias=?`;
    db.query(sql, [artcate.name, artcate.alias], (err, results) => {
        if (err) return res.cc(err);
        //判断数据的lenth
        if (results.length === 2) return res.cc('分类名称与别名被占用,请更换');
        //length 等于1的三种情况
        if (results.length === 1 && results[0].name === artcate.name && results[0].alias === artcate.alias)
            return res.cc('分类名称与别名被占用,请更换');
        if (results.length === 1 && results[0].name === artcate.name) return res.cc('分类名称被占用,请更换');
        if (results.length === 1 && results[0].alias === artcate.alias) return res.cc('分类别名被占用,请更换');
        //添加文章分类
        const sql = `insert into ev_article_cate set ?`;
        db.query(sql, artcate, (err, results) => {
            if (err) return res.cc(err);
            if (results.affectedRows !== 1) return res.cc('新增文章分类失败');
            res.cc('新增文章分类成功!', 0)
        });
    });
}

exports.deleteCateById = (req, res) => {
    if (!req.params.id) return res.cc('id不能为空');
    //定义标记删除的sql语句
    const sql = `update ev_article_cate set is_delete=1 where id=?`;
    db.query(sql, req.params.id, (err, results) => {
        if (err) res.cc(err);
        if (results.affectedRows !== 1) return res.cc('删除文章分类失败!');
        res.cc('删除文章分类成功!', 0)
    });
}

//根据id 获取文章分类
exports.getArtCatesById = (req, res) => {
    if (!req.params.id) return res.cc('id不能为空');
    const sql = `select * from ev_article_cate where id=?`;
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc('获取文章分类失败!');
        res.send({
            status: 0,
            msg: '获取文章分类数据成功!',
            data: results[0]
        });
    });

}

//根据id更新文章分类
exports.updateCateById = (req, res) => {
    if (!req.body.id || !req.body.name || !req.body.alias) {
        return res.cc('不能为空!');
    }
    const artcate = req.body;
    const sql = `select * from ev_article_cate where id<>? and (name=? or alias=?)`;
    db.query(sql, [req.body.id, req.body.name, req.body.alias], (err, results) => {
        //执行sql失败
        if (err) return res.cc(err);
        //判断数据的lenth
        if (results.length === 2) return res.cc('分类名称与别名被占用,请更换');
        //length 等于1的三种情况
        if (results.length === 1 && results[0].name === artcate.name && results[0].alias === artcate.alias)
            return res.cc('分类名称与别名被占用,请更换');
        if (results.length === 1 && results[0].name === artcate.name) return res.cc('分类名称被占用,请更换');
        if (results.length === 1 && results[0].alias === artcate.alias) return res.cc('分类别名被占用,请更换');

        //更新文章分类sql
        const sql = `update ev_article_cate set ? where id=?`;
        db.query(sql, [req.body, req.body.id], (err, results) => {
            if (err) return res.cc(err);
            if (results.affectedRows !== 1) return res.cc('更新文章分类失败!');
            res.cc('更新文章分类成功!', 0);
        });
    });
}