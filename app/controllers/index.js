// index.js 负责和首页进行交互

var Movie = require('../models/movie');
var Catetory = require('../models/category');

 
//index page 设置主页的路由
exports.index = function(req, res){

    Catetory
        .find({})
        .populate({path: 'movies', options:{limit:6}})
        .exec(function (err, catetory) {
            if(err){
                console.log(err);
            }
            res.render('index',{
                title:'Movie 首页',
                catetories: catetories
            });
        });

    //console.log('user in session : '); //登录登出信息显示
    //console.log(req.session.user);

    //从数据库获取数据
    /*Movie.fetch(function (err, movies) {
        if(err){
            console.log(err);
        }
        res.render('index',{
            title:'Movie 首页',
            movies:movies
        });
    });
*/
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
};


//search page
exports.search = function(req, res) {
    var catId = req.query.cat;
    var q = req.query.q;
    var page = parseInt(req.query.p, 10) || 0;
    var count = 2;
    var oIndex = page * count;

    if(catId){
        Catetory
            .find({_id:catId})
            .populate({
                path: 'movies',
                // options: {limit: 2, ship:index}
            })
            .exec(function (err, categories) {
                if (err) {
                    console.log(err);
                }
                var category = categories[0] || {};
                var movies = category.movies || [];
                var results = movies.slice(oIndex, oIndex + count);

                res.render('results', {
                    title: 'Movie 结果列表页',
                    keyword:category.name,
                    currentPage: (page + 1),
                    query: 'cat=' + catId,
                    totalPage: Math.ceil(movies.length / 2),
                    results: results
                });
            });
    }else{
        Movie
            .find({title: new RegExp(q + '.*', 'i')})
            .exec(function (err, movies) {
                if (err) {
                    console.log(err);
                }

                var results = movies.slice(oIndex, oIndex + count);

                res.render('results', {
                    title: 'Movie 结果列表页',
                    keyword:q,
                    currentPage: (page + 1),
                    query: 'q=' + q,
                    totalPage: Math.ceil(movies.length / 2),
                    results: results
                });
            })
    }

};
