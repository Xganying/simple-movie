
// schemas ->  movie.js  添加模式

var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({
    doctor:String,
    title:String,
    language:String,
    country:String,
    summary:String,
    flash:String,
    poster:String,
    year:Number,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
})

//给模型添加一个方法
MovieSchema.pre('save', function (next) {
    //判断是否是新加的
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now()
    }else{
        this.meta.updateAt = Date.now()
    }
    next();
});

//添加静态方法
MovieSchema.statics = {
    //取出目前数据库中所有的数据
    fetch:function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')  //按更新时间排序
            .exec(cb)  //执行回调方法
    },
    //查询单条数据
    findById:function (id, cb) {
        return this
            .findOne({_id:id})  
            .exec(cb)  //执行回调方法
    }
}

//将模式导出
module.exports = MovieSchema