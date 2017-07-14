//routes.js 路由文件

var INdex = ('../app/controllers/index');
var User = ('../app/controllers/user');
var Movie = ('../app/controllers/movie');
var comment = ('../app/controllers/comment');
var Category = ('../app/controllers/category');

module.exports = function(app){

    //pre handle user  做预处理
    app.use(function(req, res, next){
        var _user = req.session.user;

        app.locals.user = _user;
        
        next();
    });
   
   //Index page
   app.get('/',INdex.index);

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
   app.post('/admin/movie',  User.signinRequired, User.adminRequired,Movie.savePoster, Movie.save);
   app.get('/admin/movie/list',  User.signinRequired, User.adminRequired, Movie.list);        
   app.delete('/admin/list',  User.signinRequired, User.adminRequired, Movie.del);           

   //Comment
   app.get('/user/comment',  User.signinRequired, comment.save);

   //Catetory
   app.get('/admin/category/new', User.signinRequired, User.adminRequired, Category.new);
   app.get('/admin/category', User.signinRequired, User.adminRequired, Category.save);
   app.get('/admin/category/list', User.signinRequired, User.adminRequired, Category.list);
    app.get('/results', INdex.search);

};

