//movie.js 用来控制和电影相关的请求

var Category = require('../models/category');

//admin new page 设置后台页的路由
exports.new = function(req, res){
    res.render('category_admin', {
        title:'Movie 后台分类录入页',
        category:{}
    });
};

//admin post movie   拿到从后台录入页拿到的数据
exports.save = function (req, res) {
    var _category = req.body.category;
    var category = new Catetory(_category);

    Category.save(function (err, category) {
        if(err){
            console.log(err);
        }
        res.redirect('/admin/category/list');
    });

};

//catetorylist page 设置后台分类列表路由
exports.list = function(req, res){
    User.fetch(function (err, categories) {
        if (err) {
            console.log(err);
        }
        res.render('categorylist', {
            title: 'Movie 分类列表页',
            categories: categories
        })
    });
};
