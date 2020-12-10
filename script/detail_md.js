define(['jcookie'], () => {
    return {
        init: function() {
            let $sid = location.search.substring(1).split('=')[1];
            if (!$sid) {
                $sid = 1;
            }


            $.ajax({
                url: 'http://localhost/dashboard/%e4%bb%a3%e7%a0%81/DAY%2034/AMD/php/detail.php',
                data: {
                    sid: $sid
                },
                dataType: 'json'
            }).done(function(data) {
                console.log(data);
                console.log(data.urls);

                $('#smallpic').attr('src', data.url);
                $('.loadtitle').html(data.title);
                $('.loadpcp').html(data.price);


                let $picurl = data.urls.split(','); //将数据转换成数组。
                let $strhtml = '';
                const $list = $('#list');
                console.log($picurl);
                $.each($picurl, function(index, value) {
                    $strhtml += `
                <li>
                    <img src="${value}"/>
                </li>
            `;
                });

                $list.html($strhtml);

            });






            let arrsid = []; //存储商品的sid
            let arrnum = []; //存储商品的数量
            function getcookietoarray() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    arrsid = $.cookie('cookiesid').split(',');
                    arrnum = $.cookie('cookienum').split(',');
                }
            }

            $('.p-btn a').on('click', function() {
                getcookietoarray(); //获取cookie，变成数组，判断是否存在。
                if ($.inArray($sid, arrsid) === -1) { //不存在
                    arrsid.push($sid);
                    $.cookie('cookiesid', arrsid, 10);
                    arrnum.push($('#count').val());
                    $.cookie('cookienum', arrnum, 10);
                } else {
                    let $index = $.inArray($sid, arrsid);
                    arrnum[$index] = parseInt(arrnum[$index]) + parseInt($('#count').val()); //重新赋值
                    $.cookie('cookienum', arrnum, 10);
                }
                alert('按钮被点击了');
            });
        }
    }
});