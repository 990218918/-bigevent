$(function(){
    var layer=layui.layer
    initArtCateList()
    function initArtCateList(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                var htmlStr=template('tpl-table',res)
                $('tbody').html(htmlStr)
            }
        })
    }

    $('#btnAddCate').on('click',function(){
        layer.open({
            type:1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })

    // 代理形式绑定事件
    $('body').on('submit','#form-add',function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
                console.log(res.status)
            }
        })
    })
})