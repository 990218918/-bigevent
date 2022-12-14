$(function(){
    // 注册链接
    $('#link-reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 登录链接
    $('#link-login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })

    var form=layui.form
    var layer=layui.layer

    form.verify({
         pwd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'] ,
         repwd:function(value){
            var pwd=$('.reg-box [name=password]').val()
            if(pwd!==value){
                return '密码不一致'
            }

         }
    })

    // 监听注册提交

    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        var data={username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()}
        $.post('/api/reguser',data,function(res){
            if(res.status!==0){
                return layer.msg(res.message)             
            }
            layer.msg('注册成功，请登录！')
            $('#link-login').click()
        })
    })

    // 监听登录提交1
    // $('#form_login').on('submit',function(e){
    //     e.preventDefault()
    //     var data={username:$('#form_login [name=username]').val(),password:$('#form_login [name=password]').val()}
    //     $.post('/api/login',data,function(res){
    //         if(res.status!==0){
    //             return layer.msg(res.message)
    //         }
    //         layer.msg('登录成功')
    //         location.href='/index.html'
    //     })
    // })

    // 监听登录提交2
    $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                // console.log(res.token)
                localStorage.setItem('token',res.token)
                location.href='/index.html'
            }
        })
    })
})