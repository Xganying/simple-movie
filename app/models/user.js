// models user.js  添加模型
var mongoose = require('mongoose');
var UserSchema = require('../schemas/movie'); //引入模式文件
var User = mongoose.model('Movie', MovieSchema); //编译生成movie模型

//导出构造函数
module.exports = Movie;