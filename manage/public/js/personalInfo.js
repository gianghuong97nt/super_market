
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
var _fail = "fail";
var _true = "ok";

function initEvents() {
    $(document).on('click','#save_info',function (e) {
        try {
            e.preventDefault();
            validate();
            if(resutl == _true){
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
                $("#invalid_email").html("Không được để trống");
            }
            else{
                $("#invalid_email").removeClass('display_view');
                $("#invalid_email").html("Nhập sai định dạng email");
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
                $("#invalid_password").html("Không được để trống");
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
                $("#invalid_repassword").html("Không được để trống");
            }
        } catch (e) {
            alert('nhập email' + e.message);
        }
    });

    $(document).on('click','.btn-back-info',function (e) {
        try {
            window.location.href = '/';

        } catch (e) {
            alert('nhập email' + e.message);
        }
    });
    $(document).on('keypress','.form-control', function (e) {
        if(e.which === 13){
            validate();
            if(resutl == _true){
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
                $("#invalid_email").html("Không được bỏ trống");
            }else{
                $("#invalid_email").removeClass('display_view');
                $("#invalid_email").html("Nhập sai định dạng email");
            }
            $('#email').focus();
            resutl = _fail;
        }
        if($('#passwordInfo').val() == ""){
            $("#invalid_password").removeClass('display_view');
            $("#invalid_password").html("Không được bỏ trống");

            if(resutl == ''){
                $('#passwordInfo').focus();
            }
            resutl = _fail;
        }
        if($('#repassword').val() == ""){
            $("#invalid_repassword").removeClass('display_view');
            $("#invalid_repassword").html("Không được bỏ trống");
            if(resutl == ''){
                $('#repassword').focus();
            }
            resutl = _fail;
        }

    }else{
        if($('#passwordInfo').val() != $('#repassword').val()){
            $("#invalid_repassword").removeClass('display_view');
            $("#invalid_repassword").html("Mật khẩu không khớp. Nhập lại");
            resutl = _fail;
        }else{
            resutl = _true;
        }
    }
}

function personalInfo() {
    try {
        var data = {};
        var avatar     =  $('#file_name').val();

        if(avatar == ''){
            avatar = 'cuc.jpg';
        }



        data.id = $('#userID').val();
        data.username = $('#userName').val();
        data.email = $('#email').val();
        data.phone = $('#phone').val();
        data.birthday = $('#birthday').val();
        data.password = $('#passwordInfo').val();
        data.address = $('#address').val();
        data.gender =  $('#gender').val();
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


