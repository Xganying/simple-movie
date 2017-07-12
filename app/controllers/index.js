// index.js 负责和首页进行交互

var Movie = require('../models/movie');
 
//index page 设置主页的路由
exports.index = function(req, res){
    console.log('user in session : '); //登录登出信息显示
    console.log(req.session.user);

    //从数据库获取数据
    Movie.fetch(function (err, movies) {
        if(err){
            console.log(err);
        }
        res.render('index',{
            title:'Movie 首页',
            movies:movies
        });
    });

    /*//  伪造的数据
    res.render('index', {
        title:'Movie 首页',
        movies:[{
            title:'机械战警',
            _id:1,
            poster:'http://image3.xyzs.com/upload/cf/67/520/20150506/143085697071282_0.jpg'
        },{
            title:'机械战警',
            _id:2,
            poster:'http://image3.xyzs.com/upload/cf/67/520/20150506/143085697071282_0.jpg'
        },{
            title:'机械战警',
            _id:3,
            poster:'http://image3.xyzs.com/upload/cf/67/520/20150506/143085697071282_0.jpg'
        },{
            title:'机械战警',
            _id:4,
            poster:'http://image3.xyzs.com/upload/cf/67/520/20150506/143085697071282_0.jpg'
        },{
            title:'机械战警',
            _id:5,
            poster:'http://image3.xyzs.com/upload/cf/67/520/20150506/143085697071282_0.jpg'
        },{
            title:'机械战警',
            _id:6,
            poster:'http://image3.xyzs.com/upload/cf/67/520/20150506/143085697071282_0.jpg'
        }]
    })*/
}
