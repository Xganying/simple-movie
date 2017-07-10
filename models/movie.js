// movie.js  添加模型
var mongoose = require('mongoose');
var MovieSchema = require('../schemas/movie'); //引入模式文件
var Movie = mongoose.model('Movie', MovieSchema); //编译生成movie模型

//导出构造函数
module.exports = Movie;