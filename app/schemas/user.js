
// schemas user.js  添加用户模式

var mongoose = require('mongoose');
var bcrypt = require('bcrypt'); //引入库：专门为密码存储设计的方法
var SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
    name:{            //用户名
        unique:true,
        type:String
    },
    password:String,  //密码
    //role: String, //user, admin, super andmin
    //0: nomal user , 1: verified user , 2: professional user, >10:admin, >50:super admin
    role:{ //用户权限
        type:Number,
        default:0
    },
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
UserSchema.pre('save', function (next) {
    var user = this;
    //判断是否是新加的
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }
    //生成一个随机的‘盐’
    bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
        if(err){
            return next(err);
        }
        bcrypt.hash(user.password, salt, function(err,hash){
            if(err){
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
    next();
});

//添加实例方法 (密码校验)
UserSchemas.methods = {
    comparePassword:function(_pasword,cb){
        bcrypt.compare(_password, this.password, function(err, isMatch){
            if(err) return cb(err);
            cb(null, isMatch);
        })
    }
}

//添加静态方法
UserSchema.statics = {
    //取出目前数据库中所有的数据
    fetch:function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')   //按更新时间排序
            .exec(cb)                //执行回调方法
    },
    //查询单条数据
    findById:function (id, cb) {
        return this
            .findOne({_id:id})  
            .exec(cb)                //执行回调方法
    }
}

//将模式导出
module.exports = UserSchema