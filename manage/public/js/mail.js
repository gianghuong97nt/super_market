
'use strict';
$(document).ready(function () {
    initEvents();
});

function initEvents() {

    $(document).on('click','#btn_reset_password',function (e) {
        try {
            if(_validate($('#email_address').val())){
                if ( isValidEmailAddress($('#email_address').val())){
                    var email = $('#email_address').val();
                    reset(email);
                } else{
                    alert('Sai mail');
                }
            }else{
                alert('Sai mail');
            }


        } catch (e) {
            alert('resetPassword' + e.message);
        }
    });

}

function reset(email) {
    try {
        var data ={};
        data.email = email;
        console.log(data.email);
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
                switch (res['status']) {
                    case '200':
                        alert('Thanh cong');
                        break;
                    case '201':
                        alert('Không gửi được email');
                        break;
                }
            }

        });
    } catch (e) {
        alert('login' + e.message);
    }
}





