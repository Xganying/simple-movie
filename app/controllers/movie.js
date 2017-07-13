//movie.js 用来控制和电影相关的请求

var _ = require('underscore');
var Movie = require('../models/movie');
var oComment = require('../models/comment');
var Category = require('../models/category');

//detail page 设置详情页的路由
exports.detail = function(req, res){  
    //从数据库获取数据
    var id = req.params.id;
    Movie.findById(id, function (err, movie) {
        oComment
            .find({movie:id})
            .populate('reply.from  reply.to','name')
            .exec(function(err, comments){
                res.render('detail',{
                    title:'Movie 详情页',
                    movie:movie,
                    comments:comments
                });
            });
    });
};

//admin new page 设置后台页的路由
exports.new = function(req, res){
    Category.find({}, function (err, categories) {
        res.render('admin', {
            title:'Movie 后台录入页',
            categories:categories,
            movie:{}
            /* movie:{
             title:'',
             doctor:'',
             country:'',
             year:'',
             poster:'',
             flash:'',
             summary:'',
             language:''
             }*/
        });
    });
};

//admin update movie   将更新的数据初始化到列表中
exports.update = function (req, res) {
    var id= req.params.id; //先获取id
    if(id){  //判断id是否已经存在
        Movie.findById(id, function (err, movie) {
            Category.find({}, function (err, movie) {
                res.render('update', {
                    title:'Movie 后台更新页',
                    movie:movie,
                    categories:categories
                });
            });
        });
    }
};

//admin post movie   拿到从后台录入页拿到的数据
exports.save = function (req, res) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;
    //数据已经存在，只需要更新
    if(id/* !== 'undefined'*/){
        movie.findById(id, function (err, movie) {
            if(err){
                console.log(err);
            }
            //用更新的数据替换旧数据
            _movie = _.extend(movie, movieObj);
            _movie.save(function (err, movie) {
                if(err){
                    console.log(err);
                }
                //如果电影的数据更新了，也保存成功了，就将页面重定向到详情页
                res.redirect('/movie/' + movie._id);
            });
        });
    }else{  //电影是新加的（直接调用模型的构造函数）
       /* _movie = new Movie({
            doctor: movieObj.doctor,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            summary: movieObj.summary,
            flash: movieObj.flash
        });*/
        _movie = new Movie({movieObj});
        var categoryId = movieObj.category;
        var categoryName = movieObj.categoryName;
        
        _movie.save(function (err, movie) {
            if(err){
                console.error(err);
            }
            if(categoryId){
                Category.findById(categoryId, function (err, category ) {
                    if(err){
                        console.log(err);
                    }
                    category.movies.push(movie._id);
                    category.save(function (err, category) {
                        if(err){
                            console.log(err);
                        }
                        //如果电影的数据保存成功了，就将页面重定向到详情页
                        res.redirect('/movie/' + movie._id);
                    });
                });
            }else if(categoryName){
                var category = new Category({
                    name:categoryName,
                    movies:[movie._id]
                });
                category.save(function (err, category) {
                    movie.category = category._id;
                    movie.save(function (err, movie) {
                        res.redirect('/movie/' + movie._id);
                    })
                });
            }

        });
    }
};

//list page 设置电影列表页的路由
exports.list = function(req, res){
    
    //从数据看获取数据
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('list', {
            title: 'Movie 列表页',
            movies: movies
        })
    });
    
    /*//伪造的数据
    res.render('list', {
        title:'Movie 列表页',
        movies:[{
            title:'机械战警',
            _id:1,
            doctor:'何塞.帕迪里亚',
            country:'美国',
            year:2014,
            language:'英语',
            flash:'http://tv.cntv.cn/video/VSET100171772908/3a5adc97878447e6ad420e0343fc81d3',
        }]
    });*/
};

//list delete movie 删除列表中的电影
exports.del = function (req, res) {
    var id = req.query.id;
    if(id){
        Movie.remove({_id:id}, function (err, movie) {
            if(err){
                console.log(err);
                res.json({success:0});
            }else{
                res.json({success:1});
            }
        });
    }
};