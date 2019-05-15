
'use strict';
$(document).ready(function () {
    init();
    initEvents();

});
function init() {
    $(document).ready(function(){
        $('#email').focus();

    });
}
var resutl = "";

function initEvents() {
    $(document).on('click','#save_info',function (e) {
        try {
            e.preventDefault();
            validate();
            if(resutl == 'ok'){
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
        } catch (e) {
            alert('personalInfo' + e.message);
        }
    });

    $(document).on('change','#email',function (e) {
        try {
            e.preventDefault();
            if(isEmail($('#email').val())) {
                $("#invalid_email").addClass('display_view');
            }
            else if($('#email').val() == ""){
                $("#invalid_email").removeClass('display_view');
                $("#invalid_email").html("Bạn nhập chưa nhập email. Mời nhập lại");
            }
            else{
                $("#invalid_email").removeClass('display_view');
                $("#invalid_email").html("Bạn nhập sai định dạng email. Mời nhập lại");
            }
        } catch (e) {
            alert('nhập email' + e.message);
        }
    });

    $(document).on('click','#email',function (e) {
        try {
            e.preventDefault();
            $("input").keypress(function(){
                $("#invalid_email").addClass('display_view');
            });

        } catch (e) {
            alert('nhập email' + e.message);
        }
    });
    $(document).on('click','#passwordInfo',function (e) {
        try {
            e.preventDefault();
            $("input").keypress(function(){
                $("#invalid_password").addClass('display_view');
            });

        } catch (e) {
            alert('nhập email' + e.message);
        }
    });
    $(document).on('change','#passwordInfo',function (e) {
        try {
            e.preventDefault();
            if($('#passwordInfo').val() == ""){
                $("#invalid_password").removeClass('display_view');
                $("#invalid_password").html("Bạn nhập chưa nhập mật khẩu. Mời nhập lại");
            }
        } catch (e) {
            alert('nhập email' + e.message);
        }
    });
    $(document).on('click','#repassword',function (e) {
        try {
            e.preventDefault();
            $("input").keypress(function(){
                $("#invalid_repassword").addClass('display_view');
            });

        } catch (e) {
            alert('nhập email' + e.message);
        }
    });
    $(document).on('change','#repassword',function (e) {
        try {
            e.preventDefault();
            if($('#repassword').val() == ""){
                $("#invalid_repassword").removeClass('display_view');
                $("#invalid_repassword").html("Bạn nhập chưa xác nhận mật khẩu. Mời nhập lại");
            }
        } catch (e) {
            alert('nhập email' + e.message);
        }
    });

    $.ajaxSetup({
        headers: {
            'X-CSSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

}

function validate() {
    if(!isEmail($('#email').val()) || $('#passwordInfo').val() == "" || $('#repassword').val() == ""  ){
        if(!isEmail($('#email').val())){
            if($('#email').val() == ""){
                $("#invalid_email").removeClass('display_view');
                $("#invalid_email").html("Bạn nhập chưa nhập email. Mời nhập lại");
            }else{
                $("#invalid_email").removeClass('display_view');
                $("#invalid_email").html("Bạn nhập sai định dạng email. Mời nhập lại");
            }
            resutl = 'fail';
        }
        if($('#passwordInfo').val() == ""){
            $("#invalid_password").removeClass('display_view');
            $("#invalid_password").html("Bạn nhập chưa nhập mật khẩu. Mời nhập lại");
            resutl = 'fail';
        }
        if($('#repassword').val() == ""){
            $("#invalid_repassword").removeClass('display_view');
            $("#invalid_repassword").html("Bạn nhập chưa xac nhan mật khẩu. Mời nhập lại");
            resutl = 'fail';
        }

    }else{
        if($('#passwordInfo').val() != $('#repassword').val()){
            $("#invalid_repassword").removeClass('display_view');
            $("#invalid_repassword").html("Mật khẩu không khớp. Mời nhập lại");
            resutl = 'fail';
        }else{
            resutl = 'ok';
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
        var avatar     =  $('#file_name').val();



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
                    case '201':
                        $.dialogComplete({
                            contents: JSMESSAGE.update_error,
                        });
                        break;

                    case '202':
                        $.dialogComplete({
                            contents: JSMESSAGE.update_error,
                        });
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

function changeProfile() {
    $('#file').click();
}
$('#file').change(function () {
    if ($(this).val() != '') {
        upload(this);

    }
});
function upload(img) {
    var form_data = new FormData();
    form_data.append('file', img.files[0]);
    $.ajax({
        url: "/upload",
        data: form_data,
        type: 'POST',
        contentType: false,
        processData: false,

        success: function (data) {
            if (data.fail) {
                $('#preview_image').attr('src', 'uploads/cuc.jpg');
                alert(data.errors['file']);
            }
            else {
                $('#file_name').val(data);
                $('#preview_image').attr('src', 'uploads/' + data);
            }
        },
        error: function (xhr, status, error) {
            alert(xhr.responseText);
            $('#preview_image').attr('src', 'uploads/cuc.jpg');
        }
    });
}
function removeFile() {
    if ($('#file_name').val() != '')
        $('#loading').css('display', 'block');
    var data = {};
    data.filename = $('#file_name').val();
    $.ajax({
        type : 'POST',
        url : '/deleteImage',
        // dataType : 'json',
        data : data,
        success: function (data) {
            $('#preview_image').attr('src', 'uploads/cuc.jpg');
            $('#file_name').val('');
            $('#loading').css('display', 'none');
        },
        error: function (xhr, status, error) {
            alert(xhr.responseText);
        }
    });
}


