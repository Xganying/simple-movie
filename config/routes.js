//routes.js 路由文件

var Index = ('../app/controllers/index');
var User = ('../app/controllers/user');
var Movie = ('../app/controllers/movie');
var Comment = ('../app/controllers/comment');
var Category = ('../app/controllers/category');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

module.exports = function(app){

    //pre handle user  做预处理
    app.use(function(req, res, next){
        var _user = req.session.user;

        app.locals.user = _user;
        
        next();
    });
   
   //Index page
   app.get('/',Index.index);

   //User
   app.post('/user/signup', User.signup);   
   app.post('/user/signin', User.signin);  
   app.get('/signin', User.ShowSignin);
   app.get('/signup', User.ShowSignup);   
   app.get('/logout', User.logout);         
   app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.list);   

   //Movie
   app.get('/movie/:id', Movie.detail);       //detail page
   app.get('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.new);            
   app.get('/admin/movie/update/:id',  User.signinRequired, User.adminRequired, Movie.update); 
   app.post('/admin/movie',  multipartMiddleware, User.signinRequired, User.adminRequired,Movie.savePoster, Movie.save);
   app.get('/admin/movie/list',  User.signinRequired, User.adminRequired, Movie.list);        
   app.delete('/admin/list',  User.signinRequired, User.adminRequired, Movie.del);           

   //Comment
   app.get('/user/comment',  User.signinRequired, Comment.save);

   //Catetory
   app.get('/admin/category/new', User.signinRequired, User.adminRequired, Category.new);
   app.get('/admin/category', User.signinRequired, User.adminRequired, Category.save);
   app.get('/admin/category/list', User.signinRequired, User.adminRequired, Category.list);
    app.get('/results', Index.search);

};

