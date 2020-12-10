define([], () => {
    return {
        init: function() {
            const $username = $('#username');
            const $password = $('#password');
            const $login = $('#login'); //登录按钮

            $login.on('click', function() {
                $.ajax({
                    type: 'post',
                    url: 'http://localhost/dashboard/%e4%bb%a3%e7%a0%81/DAY%2034/AMD/php/login.php',
                    data: {
                        user: $username.val(),
                        pass: $password.val()
                    }
                }).done(function(data) {
                    if (!data) { //登录失败
                        alert('用户名或者密码有误!');
                        $password.val(''); //密码清空
                    } else {
                        location.href = 'index1.html';
                        localStorage.setItem('loginname', $username.val());
                    }
                })
            });
        }
    }
});