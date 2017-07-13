// models -> catetory.js  添加模型
var mongoose = require('mongoose');
var CategorySchema = require('../schemas/category'); //引入模式文件
var Category = mongoose.model('Movie', CategorySchema); //编译生成movie模型

//导出构造函数
module.exports = Category;