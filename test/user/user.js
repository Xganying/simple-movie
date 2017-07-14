// test -> user -> user.js  测试用例

var crypto = require('crypto');
var bcrypt = require('bcrypt');

function getRandomString(len) {
    if(!len){
        len = 16;
    }
    return crypt.randomBytes(Math.ceil(len / 2)).toString('hex');
}

var should = require('should');
var app = require('../../app');
var mongoose = require('mongoose');
// var User = require('../../app/models/user');
var User = mongoose.model('User');

//test
describe('<Unit Test', function () {
   describe("Model User : " , function () {

       before(function (done) {
           user = { // 全局变量
               name: getRandomString(),
               password: 'password'
           }
           done();
       });

       describe('Before Method save', function () {
           it('Should begin without test user ', function (done) {
               User.find({name: user.name}, function (err,users) {
                   user.should.have.length(0);
                   done();
               });
           });
       });

       describe('User save', function () {
           it('Should save without problems ', function (done) {
               var _user = new User(user);
               _user.save(function (err) {
                   should.not.exist(err);
                   _user.remove(function (err) {
                       should.not.exist(err);
                       done();
                   });
               });
           });

           it('Should password be hashed correctly ', function (done) {
               var password = user.password;
               var _user = new User(user);

               _user.save(function (err) {
                   should.not.exist(err);
                   _user.password.should.not.have.length(0);
                   bcrypt.compare(password, _user.password, function (err, isMatch) {
                       should.not.exist(err);
                       isMatch.should.equal(true);
                       _user.remove(function (err) {
                           should.not.exist(err);
                           done();
                       });
                   });
               });
           });
            //权限单元测试
           it('Should have default role 0 ', function (done) {
               var _user = new User(user);
               _user.save(function (err) {
                   _user.role.should.equal(0);
                   _user.remove(function (err) {
                       done();
                   });
               });
           });

           it('Should fail to save an existing user ', function (done) {
               var _user1 = new User(user);
               _user1.save(function (err) {
                   should.exists(err);

                   var _user2 = new User(user);
                   _user2.save(function (err) {
                       should.exists(err);

                       _user1.remove(function (err) {
                           if(!err){
                               _user2.remove(function (err) {
                                   done();
                               });
                           }
                           done();
                       });
                   });

               });

           });
       });
   });
});

