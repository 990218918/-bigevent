$(function(){
    getUserInfo()
    $('#btnLogout').on('click',function(){
        layer.confirm('确定退出登录？', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token')
            location.href='/login.html'
            layer.close(index);
          });
          //eg2

    })
})

function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',

        success:function(res){
            if(res.status!==0){
                return layui.layer.msg('获取用户信息失败')
            }
            // 调用renderAvatar渲染用户头像
            renderAvatar(res.data)
        },
        // complete:function(res){
        //     // console.log('shibai')
        //     // console.log(res)
        //     if(res.responseJSON.status===1 && res.responseJSON.message==='身份认证失败！'){
        //         localStorage.removeItem('token')
        //         location.href='/login.html'
        //     }
        // }
    })
}

function renderAvatar(user){
    var name=user.nickname||user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
    if(user.user_pic!==null){
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else{
        $('.layui-nav-img').hide()
        // 获取用户名第一个字并大写
        var first=name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}