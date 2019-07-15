
'use strict';
$(document).ready(function () {
    initEvents();
});

function initEvents() {

    $(document).on('click','#btn_reset_password',function (e) {
        try {
            reset();
        } catch (e) {
            alert('resetPassword' + e.message);
        }
    });

}

function reset() {
    try {
        var data ={};
        data.mail = 'gianghuong97nt@gmail.com';
        console.log(data.mail);
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type: 'POST',
            url: '/resetPassword',
            dataType: 'json',
            loading: true,
            data: data,
            ///
            success: function (res) {
                console.log(res);
            }

        });
    } catch (e) {
        alert('login' + e.message);
    }
}





