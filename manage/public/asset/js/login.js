
'use strict';
$(document).ready(function () {
    initEvents();
});

function initEvents() {
    $(document).on('click','#login',function () {
        try {
            alert(12345);
            login();
        } catch (e) {
            alert('login' + e.message);
        }
    });
}

function login() {
    try {
        $.ajax({
            type: 'POST',
            url: '/product/update',
            dataType: 'json',  //html
            loading: true,
            data: data,
            ///
            success: function (res) {
                switch (res['status']) {
                    // Success
                    case '200':
                        alert("Thanh cong");
                        location.reload();
                        break;
                    // Data Validate
                    case '201':
                        alert("Loi 201");

                        break;
                    // SQL + PHP Exception
                    case '202':

                        alert("Loi 202");
                        break;
                    default:
                        break;
                }
            },
            // Ajax error
            error: function (res) {
            }
        });
    } catch (e) {
        alert('update' + e.message);
    }

}

