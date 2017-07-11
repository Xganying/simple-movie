//routes.js 路由文件

var Index = ('../app/controllers/index');
var User = ('../app/controllers/user');
var Movie = ('../app/controllers/movie');
var Comment = ('../app/controllers/comment');

module.exports = function(app){

    //pre handle user  做预处理
    app.use(function(req, res, next){
        var _user = req.session.user;
        //if(_user){
            app.locals.user = _user;
       // }
        //return next();
        next();
    });
   
   //Index page
   app.get('/',Index.index);

   //User
   app.post('/user/signup', User.singup);   //signup
   app.post('/user/signin', User.signin);   //signin
   app.get('/signin', User.ShowSignin);
   app.get('/signup', User.ShowSignup);   
   app.get('/logout', User.logout);         //logout
   app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.list);   //userlist page

   //Movie
   app.get('/movie/:id', Movie.detail);       //detail page
   app.get('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.new);            //admin new page
   app.get('/admin/movie/update:id',  User.signinRequired, User.adminRequired, Movie.update); //admin update page
   app.post('/admin/movie',  User.signinRequired, User.adminRequired, Movie.save);            //admin post movie
   app.get('/admin/movie/list',  User.signinRequired, User.adminRequired, Movie.list);        //list page
   app.delete('/admin/list',  User.signinRequired, User.adminRequired, Movie.del);            //list delete

   //Comment
   app.get('/user/comment',  User.signinRequired,Comment.save);        
   
}

