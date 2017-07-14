// schemas  -> comment.js 评论

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CommentSchema = new mongoose.Schema({
   movie:{
        type:Object,
        ref:"Movie"
   },
   from:{
        type:Object,
        ref:"User"
   },
   reply:[{
       from:{type:ObjectId, ref:'User'},
       to:{type:ObjectId, ref:'User'},
       content:String
   }],
   content:String, //评论的具体内容
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
});

//给模型添加一个方法
CommentSchema.pre('save', function (next) {
    //判断是否是新加的
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now()
    }else{
        this.meta.updateAt = Date.now()
    }
    next();
});

//添加静态方法
CommentSchema.statics = {
    //取出目前数据库中所有的数据
    fetch:function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')  //按更新时间排序
            .exec(cb); //执行回调方法
    },
    //查询单条数据
    findById:function (id, cb) {
        return this
            .findOne({_id:id})  
            .exec(cb);  //执行回调方法
    }
};

//将模式导出
module.exports = CommentSchema;