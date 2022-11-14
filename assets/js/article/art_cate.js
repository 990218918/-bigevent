$(function(){
    var layer=layui.layer
    initArtCateList()
    // 获取文章分类列表
    function initArtCateList(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                // console.log(res)
                var htmlStr=template('tpl-table',res)
                $('tbody').html(htmlStr)
            }
        })
    }

    var indexAdd=null

    $('#btnAddCate').on('click',function(){
        indexAdd=layer.open({
            type:1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
          })            
    })

    // 通过代理的形式绑定事件
    $('body').on('submit','#form-add',function(e){
        e.preventDefault()
        console.log(1)
        $.ajax({
            method:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){              
                if(res.status !== 0){
                    return layer.msg('新增文章分类失败！')
                }
                initArtCateList()
                layer.msg('新增文章分类成功！')
                layer.close(indexAdd)
            }
        })
    })

    var indexEdit=null

    $('tbody').on('click','btn-edit',function(){
        indexEdit=layer.open({
            type:1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
          })  
    })
})