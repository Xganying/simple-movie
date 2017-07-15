// models -> catetory.js  添加模型
var mongoose = require('mongoose');
var CategorySchema = require('../schemas/category'); 
var Category = mongoose.model('Category', CategorySchema); 

//导出构造函数
module.exports = Category;