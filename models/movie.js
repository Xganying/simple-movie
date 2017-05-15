/**
 * Created by Administrator on 2017/5/13.
 */

//添加模型
var mongoose = require('mongoose')
var MovieSchema = require('../schemas/movie')
var Movie = mongoose.model('Movie', MovieSchema) //编译生成模型

//导出构造函数
module.exports = Movie