// user.js 用来控制和用户相关的请求

var User = require('../models/user');

//signup page
exports.ShowSignup = function(req, res){
    res.render('signup',{
        title:'注册页面'
    });
}

//signin page
exports.ShowSignin = function(req, res){
    res.render('signin',{
        title:'登录页面'
    });
}


 //signup page 设置注册路由
 exports.signup = function(req,res){
    var _userid = req.params.userid; 
    // /user/sigup/1111?userid=1112
    //var _userid = req.query.user;
    //var _userid = req.body.userid;

    //避免用户名重复注册
    User.findOne({name:_user.name}, function(err, user){
        if(err){
            console.log(err);
        }
        if(user){ //注册的用户名已经存在了
            return res.redirect('/signin'); //如果用户名重复，跳转到登录页面
        }else{
            var user = new User(_user);
            user.save(function(err,user){
                if(err){
                    console.log(err);
                }
                res.redirect('/'); //重定向到首页
            });
        }
    });

};

// signin page 设置登录路由
exports.signin = function(req,res){
    var _user =req.body.user;
    var name = _user.name;
    var password = _user.password;

    //从数据中查找用户是否存在
    User.findOne({name:name}, function(err,user){
        if(err){
            console.log(err);
        }
        if(!user){
            return res.redirect('/signup');
        }

        //对比密码是否匹配
        user.comparePassword(password, function(err,isMatch){
            if(err){
                console.log(err);
            }
            if(isMatch){  //匹配
                //console.log('Password is matched .')

                //在服务器中保存用户的登录状态，避免页面刷新时又需要重新登录
                req.session.user = user;

                return res.redirect('/'); //登录成功，跳转到首页
            }else{        //不匹配
                 return res.redirect('/signin'); //密码不对，重新登录
                //console.log('Password is not matched !');
            }
        })
    })

};

// logout page 设置登出路由
exports.logout = function(req,res){
    delete req.session.user;
    //delete app.locals.user;
    
    res.redirect('/');
};

//userlist page 设置用户列表路由
exports.list = function(req, res){	
    //从数据看获取数据
    User.fetch(function (err, users) {
        if (err) {
            console.log(err);
        }
        res.render('userlist', {
            title: 'Movie 用户列表页',
            movies: users
        })
    });
};

//midware for user 用户是否登录
exports.signinRequired = function(req, res, next){	
    var user = req.session.user;
    if(!user){ //用户没有登录
        return res.redirect('/signin');
    }
    next();
}; 

//midware for user 用户是否是管理员
exports.adminRequired = function(req, res, next){	
    var user = req.session.user;
    if(user.role <= 10){ 
        return res.redirect('/signin');
    }
    next();
};