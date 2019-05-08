
'use strict';
$(document).ready(function () {
    initEvents();
});

function initEvents() {
    $(document).on('click','#save_info',function (e) {
        try {
            e.preventDefault();
            personalInfo();
        } catch (e) {
            alert('personalInfo' + e.message);
        }
    });
}

function personalInfo() {
    try {
        var data = {};
        var id         =  $('#userID').val();
        var username   =  $('#userName').val();
        var email      =  $('#email').val();
        var phone      =  $('#phone').val();
        var birthday   =  $('#birthday').val();
        var password   =  $('#passwordInfo').val();
        //var repassword =  $('#repassword').val();
        var address    =  $('#address').val();
        var gender     =  $('#gender').val();
        var avatar     =  $('#avatar').val();


        data.id = id;
        data.username = username;
        data.email = email;
        data.phone = phone;
        data.birthday = birthday;
        data.password = password;
        data.address = address;
        data.gender = gender;
        data.avatar = avatar;


        $.ajax({
            type: 'POST',
            url: '/updatePersonalInfo',
            dataType: 'json',  //html
            loading: true,
            data: data,
            ///
            success: function (res) {
                switch (res['status']) {
                    // Success
                    case '200':
                        alert("Update thanh cong");
                        location.reload();
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

