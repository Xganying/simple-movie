## Movie

node + express + mongodb 快速搭建的简单电影网站

### 1、 所用技术

（1）后端 ：采用Node驱动，Express框架，MongoDB数据库存储，jade模板引擎，Moment.js时间和日期格式化

（2）前端 ：Query + Bootstrap 

（3）开发环境 ：Grunt

![技术](http://img.blog.csdn.net/20170710121354410?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZ2FueWluZ3hpZTEyMzQ1Ng==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

### 2、 开发步骤

(1) 需求分析

(2) 项目依赖初始化

(3) 入口文件编码

(4) 创建视图

(5) 测试前端流程

(6) 样式开发，伪造模板数据

(7) 设计数据库模型

(8) 开发后端逻辑

(9) 配置依赖文件，网站开发结束

### 3、运行
clone到本地 -> 安装依赖：npm install -> 确保mongodb数据库服务开启 -> 运行：node app.js -> 在浏览器打开：localhost:3001（刚开始可能主页面
什么都没有，因为数据库是空的，在localhost:3001/admin/new添加了新数据之后就会有东西了）

### 4、 初期完成Demo

主页面：

![主页](http://img.blog.csdn.net/20170711200127004?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZ2FueWluZ3hpZTEyMzQ1Ng==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

列表页：

![列表页](http://img.blog.csdn.net/20170710114906212?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZ2FueWluZ3hpZTEyMzQ1Ng==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

后台录入页：

![后台录入页](http://img.blog.csdn.net/20170710114916927?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZ2FueWluZ3hpZTEyMzQ1Ng==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)


**后期不断完善中。。。**


### 5、功能完善：

#### (1)使用Grunt集成自动重启
  
   clone项目到本地后，启动命令：grunt 
   
#### (2)添加登录/注册/登出功能
  
#### (3)完成用户权限设置
  
#### (4)添加评论功能

#### (5)添加电影分类、图片上传功能

#### (6)Jsonp同步豆瓣的电影数据

#### (7)添加搜索功能

#### (8)添加海报上传、统计访问量的功能

#### (9)添加单元测试

#### (10)使用Grunt集成服务


**PS:由于所学知识有限，项目依然还存在很多问题，后续不断完善ing...**
