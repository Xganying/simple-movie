// public -> js -> admin.js

//删除文件的逻辑
$(function () {
    $('.del').click(function (e) {
        var target = $(e.target);
        var id = target.data('id');
        var tr = $('.item-id-' + id);
        //调用ajax
        $.ajax({
            type:'DELETE',
            url:'/admin/list?id' + id  //提交的地址
        })
        .done(function (results) {     //服务器返回的状态
            if(results.success === 1){ //删除成功
                if(tr.length > 0){
                    tr.remove();
                }
            }
        })
    })
});