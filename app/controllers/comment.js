//controllers -> comment.js
var Comment = require('../models/comment');

//comment
exports.save = function(req,res){
    var _comment =req.body.comment;
    var movieId = _comment.movie;

    //判断提交的评论是直接评论还是回复的评论
    if(_comment.cid){
        Com.findById(_comment.cid, function(err,comment){
            var reply = {
                from:  _comment.from,
                to: _comment.tid,
                content: _comment.content
            }
            comment.reply.push(reply);
            comment.save(function(err, comment){
                if(err){
                    console.log(err);
                }
                res.redirect('/movie/' + movieId);
            });
        });
    }else{ //直接的评论
        var comment = new Comment(_comment);
        comment.save(function(err, comment){
            if(err){
                console.log(err);
            }
            res.redirect('/movie/' + movieId);
        });
    }

}