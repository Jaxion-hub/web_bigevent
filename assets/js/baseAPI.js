// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给 ajax 提供的配置对象
$.ajaxPrefilter(function(options) {
    // 在发起真正的 ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    // console.log(options.url);

    // 统一为有权限的接口设置 headers 请求头
    // 判断路径中是否有 /my/ 这个路径
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    };

    // 全局统一挂载 complete 函数
    // ajax请求无论成功还是失败都会调用 complete 回调函数
    options.complete = function(res) {
        // console.log('执行了complete函数');
        // console.log(res);
        // 在 complete 函数中可以通过 res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1.将 token 清空
            localStorage.removeItem('token');
            // 2.返回到登录界面
            location.href = '/login.html'
        }
    }

})