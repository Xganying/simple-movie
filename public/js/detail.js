// public -> js -> detail.js

$(function () {
    $('comment').click(function (e) {
        var target = $(e.target);
        var toId = target.data('tid');
        var commentId = target.data('cid');

        //动态插入隐藏域:判断是否已经插入过
        if($('#toId').length > 0){
            $('#toId').val(toId)
        }else{
             $('<input>').attr({
                type:'hidden',
                id:'toId',
                name:'comment[tid]',
                value:toId
            }).appendTo('#commentFrom');
        }

        if($('#commentId').length > 0){
            $('#commentId').val(commentId)
        }else{
            $('<input>').attr({
                type:'hidden',
                id:'commentId',
                name:'comment[cid]',
                value:toId
            }).appendTo('#commentFrom');
        }
    });

});