
'use strict';
$(document).ready(function () {
    initEvents();
});

function initEvents() {
    $(document).on('click','#login',function (e) {
        try {
            e.preventDefault();
            if(($('#username').val()) == "" || $('#password').val() == "" ){

                if($('#username').val() == ""){
                    $("#invalid_username").removeClass('display_view');
                    $("#invalid_username").html("Bạn nhập chưa nhập username. Mời nhập lại");
                }
                else if($('#password').val() == ""){
                    $("#invalid_password").removeClass('display_view');
                    $("#invalid_password").html("Bạn nhập chưa nhập mật khẩu. Mời nhập lại");
                }

            }else {
                login();
                $("#invalid_email").addClass('display_view');
            }

        } catch (e) {
            alert('login' + e.message);
        }
    });
}

function login() {
    try {
        var data = {};
        var username   =  $('#username').val();
        var password   =  $('#password').val();

        data.username = username;
        data.password = password;

        $.ajax({
            type: 'POST',
            url: '/checkLogin',
            dataType: 'json',  //html
            loading: true,
            data: data,
            ///
            success: function (res) {
                switch (res['status']) {
                    // Success
                    case '200':
                        window.location.href = "/";
                        break;
                    // Data Validate
                    case 'NG':
                        $("#checkLogin").removeClass('display_view');
                        $("#checkLogin").html("Tài khoản không tồn tại");
                        break;

                    default:
                        break;
                }
            }

        });
    } catch (e) {
        alert('login' + e.message);
    }

}




