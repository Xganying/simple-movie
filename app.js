//项目入口文件

//引入模块依赖
var express = require('express'); 
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(express);

var port = process.env.PORT || 3001; //设置端口
var app = express(); //将实例赋给一个变量
var fs = require('fs');
var dbUrl = 'mongodb://localhost/movie';

//开启数据库,连接数据库，并监听端口
mongoose.connect(dbUrl,{useMongoClient:true},function (err) {
    if(err){
        console.log("数据库连接失败！");
    }else{
        console.log("数据库连接成功！");
        app.listen(port);  //监听http请求 
        console.log('moive start on port ' + port);  //打印日志，查看服务是否启动
    }
});

// models loading
var models_path = __dirname + '/app/models';
var walk = function (path) {
    fs
        .readdirSync(path)
        .forEach(function (file) {
            var newPath = path + '/' + file;
            var stat = fs.statSync(newPath);

            if(stat.isFile()){
                if(/(.*)\.(js|coffee)/.test(file)){
                    require(newPath);
                }
            }else if(stat.isDirectory){
                walk(newPath);
            }
        });
};
walk(models_path);

app.set('views', "./app/views/pages"); // 设置视图的根目录
app.set('view engine','jade');         //设置默认的模板引擎

//app.use(bodyParser.json());      //格式化表单数据
app.use(bodyParser.urlencoded({extended:true}));
//app.use(express.bodyParser());

app.use(express.cookieParser());
app.use(express.multiple);
app.use(express.session({
    secret:'movie',  //会话持久化
    store: new mongoStore({
        url:dbUrl,
        collection:'sessions'
    })
}));

//配置入口文件 (在网页查看源代码时，不时乱码)
if('development' === app.get('env')){
    app.set('ShowStackError', true); 
    app.use(express.logger(':method :url :status'));
    app.locals.pretty = true; //代码格式化
    mongoose.set('debug', true);
}

require('./config/routes')(app);

app.use(express.static(path.join(__dirname, 'public')));  //获取静态资源
app.locals.moment = require('moment');

