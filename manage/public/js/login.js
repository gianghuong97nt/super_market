
'use strict';
$(document).ready(function () {
    initEvents();
});

function initEvents() {
    $(document).on('click','#login',function (e) {
        try {
            e.preventDefault();
            login();
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
                        alert("Login thanh cong");
                        window.location.href = "/";
                        break;
                    // Data Validate
                    case 'NG':
                        alert("Loi 201");
                        break;

                    default:
                        break;
                }
            }
            // // Ajax error
            // error: function (res) {
        // }
        });
    } catch (e) {
        alert('login' + e.message);
    }

}

