//入口文件

var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var _ = require('underscore')
var Movie = require('./models/movie')
var port = process.env.PORT || 3001
var app = express()

//连接数据库
//mongoose.connect('mongodb://localhost/Movie')
//开启数据库
mongoose.connect('mongodb://localhost:27018/Movie',function (err) {
    if(err){
        console.log("数据库连接失败！");
    }else{
        console.log("数据库连接成功！");
        //监听http请求
        app.listen(port);
    }
});
// 设置视图的根目录
app.set('views', "./views/pages")
//设置默认的模板引擎
app.set('view engine','jade')
//格式化表单数据
app.use(bodyParser.json())
//获取静态资源
app.use(express.static(path.join(__dirname, 'public')))
app.locals.moment = require('moment')

//监听端口
//app.listen(port)

//打印日志，查看服务是否启动
console.log('moive start on port ' + port)

//设置主要页面的路由 index.jade
app.get('/', function(req, res){
    Movie.fetch(function (err, movies) {
       if(err){
           console.log(err)
       }
       res.render('index',{
           title:'Movie 首页',
           movies:movies
       })
   })

    /*伪造的数据
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
})

//admin update movie 将更新的数据初始化到列表中
app.get('/admin/update/:id', function (req, res) {
    var id= req.params.id
    if(id){  //判断是否已经存在
        Movie.findById(id, function (err, movie) {
            res.render('admin', {
                title:'Movie 后台更新页',
                movie:movie
            })
        })
    }
})

//admin post  movie 拿到从后台录入页拿到的数据
app.post('/admin/movie/new', function (req, res) {
    var id = req.body.movie._id
    var movieObj = req.body.movie
    var _movie

    if(id !== 'undefined'){  //数据已经存在，只需要更新
        movie.findById(id, function (err, movie) {
            if(err){
                console.log(err)
            }
            //用更新的数据替换老数据
            _movie = _.extend(movie, movieObj)
            _movie.save(function (err, movie) {
                if(err){
                    console.log(err)
                }
                //如果电影的数据更新了，也保存成功了，就将页面重定向到详情页
                res.redirect('/movie/' + movie._id)
            })
        })
    }else{ //电影是新加的
        _movie = new Movie({
            doctor:movieObj.doctor,
            title:movieObj.title,
            country:movieObj.country,
            language:movieObj.language,
            year:movieObj.year,
            poster:movieObj.poster,
            summary:movieObj.summary,
            flash:movieObj.flash
        })
        _movie.save(function (err, movie) {
            if(err){
                console.log(err)
            }
            //如果电影的数据保存成功了，就将页面重定向到详情页
            res.redirect('/movie/' + movie._id)
        })
    }
})

//detail.jade
app.get('/movie/:id', function(req, res){
    var id = req.params.id
    Movie.findById(id, function (err, movie) {
        res.render('detail',{
            title:'Movie ' + movie.title,
            movie:movie
        })
    })
    /* 未连接数据库之前使用的伪造数据
    res.render('detail', {
        title:'Movie 详情页',
        movie:{
            doctor:'何塞.帕迪里亚',
            country:'美国',
            title:'机械战警',
            year:'2014',
            poster:'http://image3.xyzs.com/upload/cf/67/520/20150506/143085697071282_0.jpg',
            language:'英语',
            flash:'http://tv.cntv.cn/video/VSET100171772908/3a5adc97878447e6ad420e0343fc81d3',
            summary:'机械战警是由保罗·范霍文执导，彼得·威勒、南茜·艾伦、丹·奥赫里奇、罗尼·考克斯、' +
            '柯特伍德·史密斯等人主演的科幻电影。影片于1987年07月17日正式上映。' +
            '影片讲述了一名警察在一次执行任务的过程中遭遇不幸，后来经过科学家的改造，' +
            '成为了一名人与机器相结合的警察，并展开了与罪犯的斗争的故事。'
        }
    })*/
})

//admin.jade
app.get('/admin/movie', function(req, res){
    res.render('admin', {
        title:'Movie 后台录入页',
        movie:{
            title:'',
            doctor:'',
            country:'',
            year:'',
            poster:'',
            flash:'',
            summary:'',
            language:''
        }
    })
})

//list.jade
app.get('/admin/list', function(req, res){
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err)
        }
        res.render('list', {
            title: 'Movie 列表页',
            movies: movies
        })
    })
   /* res.render('list', {
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
    })*/
})

//list delete movie
app.delete('/admin/list', function (req, res) {
    var id = req.query.id
    if(id){
        Movie.remove({_id:id}, function (err, movie) {
            if(err){
                console.log(errr)
            }else{
                res.json({success:1})
            }
        })
    }
})