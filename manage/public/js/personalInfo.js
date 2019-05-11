
'use strict';
$(document).ready(function () {
    init();
    initEvents();
});

function init() {
    $('#email').focus();
}
function initEvents() {
    $(document).on('click','#save_info',function (e) {
        try {
            e.preventDefault();
            validate();
        } catch (e) {
            alert('personalInfo' + e.message);
        }
    });

    $(document).on('change','#email',function (e) {
        try {
            e.preventDefault();
            if(isEmail($('#email').val())) {
                $("#invalid_email").addClass('display_view');
            }else{
                $("#invalid_email").removeClass('display_view');
                $("#invalid_email").html("Bạn nhập sai định dạng email. Mời nhập lại");
            }
        } catch (e) {
            alert('nhập email' + e.message);
        }
    });

}

function validate() {
    if(!isEmail($('#email').val()) || $('#passwordInfo').val() == "" || $('#repassword').val() == ""){
        if(!isEmail($('#email').val())){
            if($('#email').val() == ""){
                $("#invalid_email").removeClass('display_view');
                $("#invalid_email").html("Bạn nhập chưa nhập email. Mời nhập lại");
            }else{
                $("#invalid_email").removeClass('display_view');
                $("#invalid_email").html("Bạn nhập sai định dạng email. Mời nhập lại");
            }
        }
        else if($('#passwordInfo').val() == ""){
            $("#invalid_password").removeClass('display_view');
            $("#invalid_password").html("Bạn nhập chưa nhập mật khẩu. Mời nhập lại");
        }
        else if($('#repassword').val() == ""){
            $("#invalid_repassword").removeClass('display_view');
            $("#invalid_repassword").html("Bạn nhập chưa xac nhan mật khẩu. Mời nhập lại");
        }
    }else{
        if($('#passwordInfo').val() != $('#repassword').val()){
            $("#invalid_repassword").removeClass('display_view');
            $("#invalid_repassword").html("Mật khẩu không khớp. Mời nhập lại");
        }else{
            $.dialogUpdate({
                contents: JSMESSAGE.save_confirm,
                callback: function (confirm) {
                    if (confirm) {
                        personalInfo();
                    }
                }
            });
            $("#invalid_email").addClass('display_view');
        }
    }
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
                        $.dialogComplete({
                            contents: JSMESSAGE.save_complete,
                            callback: function () {
                                location.reload();
                            }
                        });
                        break;
                    // Data Validate
                    case 'NG':
                        alert("Loi 201");
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

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

