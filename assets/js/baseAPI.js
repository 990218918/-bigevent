$.ajaxPrefilter(function(options){
    // console.log(options.url)
    options.url='http://www.liulongbin.top:3007'+options.url
    
    if(options.url.indexOf('/my/')!==-1){
        options.headers={Authorization:localStorage.getItem('token')||''}
    }
})