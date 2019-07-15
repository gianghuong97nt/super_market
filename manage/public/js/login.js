
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
                    $("#invalid_username").html("Không được để trống");
                }
                if($('#password').val() == ""){
                    $("#invalid_password").removeClass('display_view');
                    $("#invalid_password").html("Không được để trống");
                }

            }else {
                login();
                $("#invalid_email").addClass('display_view');
            }

        } catch (e) {
            alert('login' + e.message);
        }
    });

    $(document).on('click','#username',function (e) {
        try {
            e.preventDefault();
            $("input").keypress(function(){
                $("#invalid_username").addClass('display_view');
                $("#checkLogin").addClass('display_view');
            });

        } catch (e) {
            alert('username' + e.message);
        }
    });

    $(document).on('click','#password',function (e) {
        try {
            e.preventDefault();
            $("input").keypress(function(){
                $("#invalid_password").addClass('display_view');
                $("#checkLogin").addClass('display_view');
            });
        } catch (e) {
            alert('password' + e.message);
        }
    });

    $(document).on('click','#forgot_password',function (e) {
        try {
            window.location.href = '/resetPassword';
        } catch (e) {
            alert('resetPassword' + e.message);
        }
    });
}

function login() {
    try {
        var data = {};

        data.username = $('#username').val();
        data.password = $('#password').val();
        data.remember_me = $('#remember_me').is(":checked");

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




