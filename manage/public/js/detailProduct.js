
'use strict';
$(document).ready(function () {
    init();
    initEvents();
});

var result = "";
var _fail = "fail";
var _true = "ok";

function init() {
    $('#product_name').focus();
}

function initEvents() {
    $(document).on('click','#btn-detail',function (e) {
        try {
            e.preventDefault();
            validate();
            if(result == _true){
                $.dialogUpdate({
                    contents: JSMESSAGE.save_confirm,
                    callback: function (confirm) {
                        if (confirm) {
                            addProduct();
                        }
                    }
                });
            }
        } catch (e) {
            alert('Detail' + e.message);
        }
    });

    $(document).on('click','#product_name',function (e) {
        try {
            e.preventDefault();
            $("input").keypress(function(){
                $("#invalid_product_name").addClass('display_view');
            });

        } catch (e) {
            alert('nhập email' + e.message);
        }
    });

    $(document).on('change','#category',function (e) {
        try {
            e.preventDefault();
            $("#invalid_category").addClass('display_view');

        } catch (e) {
            alert('nhập email' + e.message);
        }
    });

    $(document).on('keypress','.form-control', function (e) {
        if(e.which === 13){
            validate();
            if(result == _true){
                $.dialogUpdate({
                    contents: JSMESSAGE.save_confirm,
                    callback: function (confirm) {
                        if (confirm) {
                            addProduct();
                        }
                    }
                });
            }
        }
    });
}

function validate() {
    if($('#product_name').val() == "" || $('#category').val() == 0){

        if($('#product_name').val() == ""){
            $("#invalid_product_name").removeClass('display_view');
            $("#invalid_product_name").html("Không được bỏ trống");
            $('#product_name').focus();
            result = _fail;
        }
        if($('#category').val() == 0){
            $("#invalid_category").removeClass('display_view');
            $("#invalid_category").html("Không được bỏ trống");
            result = _fail;
        }

    }else{
        result = _true;
    }
}

function addProduct() {
    try {
        var data = {};

        data.id         = $('#product_id').val();
        data.name       = $('#product_name').val();
        data.category   = $('#category').val();
        data.supplier   = $('#supplier').val();
        data.brand      = $('#brand').val();
        data.color      = $('#color').val();
        data.size       = $('#size').val();
        data.quantity   = $('#quantity').val();
        data.price_core = $('#price_core').val();
        data.price_sale = $('#price_sale').val();
        data.note       = $('#note').val();

        $.ajax({
            type: 'POST',
            url: '/product/add',
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
                        //alert("Update thanh cong");
                        break;
                    // Data Validate
                    case '201':
                        $.dialogComplete({
                            contents: JSMESSAGE.add_error,
                            callback: function () {
                                location.reload();
                            }
                        });
                        break;
                    case '202':
                        $.dialogComplete({
                            contents: JSMESSAGE.add_error,
                            callback: function () {
                                location.reload();
                            }
                        });
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
        alert('Detail' + e.message);
    }

}

