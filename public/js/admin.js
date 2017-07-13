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
            url:'/admin/movie/list?id' + id  //提交的地址
        })
        .done(function (results) {     //服务器返回的状态
            if(results.success === 1){ //删除成功
                if(tr.length > 0){
                    tr.remove();
                }
            }
        })
    })

    //jsonp 同步豆瓣数据api
    $('#douban').blur(function () {
        var douban = $(this);
        var id = douban.val();

        if(id){
            $.ajax({
                url: 'https://api.douban.com/v2/movie/subject/' + id,
                cache: true,
                type:'get',
                dataType:'jsonp',
                crossDomain: true,
                jsonp:'callback',
                success: function (data) {
                    $('#inputTitle').val(data.title)
                    $('#inputDoctor').val(data.directors[0].name)
                    $('#inputCountry').val(data.conutries[0])
                    $('#inputPoster').val(data.images.large)
                    $('#inputYear').val(data.year)
                    $('#inputSummary').val(data.summary)
                }
            });
        }

    });

});