var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var port = process.env.PORT || 3001
var app = express()

// 设置视图的根目录
app.set('views', "./views/pages")
//设置默认的模板引擎
app.set('view engine','jade')
//格式化表单数据
app.use(bodyParser.json())
//获取静态资源
app.use(express.static(path.join(__dirname, 'bower_components')))
//监听端口
app.listen(port)

//打印日志，查看服务是否启动
console.log('moive start on port ' + port)

//设置主要页面的路由 index.jade
app.get('/', function(req, res){
    res.render('index', {
        title:'Movie 首页',
        movies:[{
            title:'机械战警',
            _id:1,
            poster:'http://movie.mtime.com/98199/posters_and_images/2334500/'
        },{
            title:'机械战警',
            _id:2,
            poster:'http://movie.mtime.com/98199/posters_and_images/2334500/'
        },{
            title:'机械战警',
            _id:3,
            poster:'http://movie.mtime.com/98199/posters_and_images/2334500/'
        },{
            title:'机械战警',
            _id:4,
            poster:'http://movie.mtime.com/98199/posters_and_images/2334500/'
        },{
            title:'机械战警',
            _id:5,
            poster:'http://movie.mtime.com/98199/posters_and_images/2334500/'
        },{
            title:'机械战警',
            _id:6,
            poster:'http://movie.mtime.com/98199/posters_and_images/2334500/'
        }]
    })
})

//detail.jade
app.get('/movie/:id', function(req, res){
    res.render('detail', {
        title:'Movie 详情页',
        movie:{
            doctor:'何塞.帕迪里亚',
            country:'美国',
            title:'机械战警',
            year:'2014',
            poster:'http://movie.mtime.com/98199/posters_and_images/2334500/',
            language:'英语',
            flash:'http://v.youku.com/v_show/id_XNjY3NDA2NjMy.html?spm=a2h1n.8261147.0.0',
            summary:'机械战警》是由保罗·范霍文执导，彼得·威勒、南茜·艾伦、丹·奥赫里奇、罗尼·考克斯、' +
            '柯特伍德·史密斯等人主演的科幻电影。影片于1987年07月17日正式上映。' +
            '影片讲述了一名警察在一次执行任务的过程中遭遇不幸，后来经过科学家的改造，' +
            '成为了一名人与机器相结合的警察，并展开了与罪犯的斗争的故事。'
        }
    })
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
    res.render('list', {
        title:'Movie 列表页',
        movies:[{
            title:'机械战警',
            _id:1,
            doctor:'何塞.帕迪里亚',
            country:'美国',
            year:2014,
            language:'英语',
            flash:'http://v.youku.com/v_show/id_XNjY3NDA2NjMy.html?spm=a2h1n.8261147.0.0',
        }]
    })
})