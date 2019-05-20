
'use strict';
$(document).ready(function () {
    init();
    initEvents();
});

var result = "";

function init() {
    $('#product_name').focus();
}

function initEvents() {
    $(document).on('click','#btn-detail',function (e) {
        try {
            e.preventDefault();
            validate();
            if(result == 'ok'){
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

    $(document).on('keypress','input', function (e) {
        if(e.which === 13){
            validate();
            if(result == 'ok'){
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
            $("#invalid_product_name").html("Item sản phẩm không được bỏ trống");
            $('#product_name').focus();
            result = 'fail';
        }
        if($('#category').val() == 0){
            $("#invalid_category").removeClass('display_view');
            $("#invalid_category").html("Item sản phẩm không được bỏ trống");
            result = 'fail';
        }

    }else{
        result = 'ok';
    }
}

function addProduct() {
    try {
        var data = {};
        var id          =  $('#product_id').val();
        var category    =  $('#category').val();
        var name        =  $('#product_name').val();
        var supplier    =  $('#supplier').val();
        var brand       =  $('#brand').val();
        var size        =  $('#size').val();
        var color       =  $('#color').val();
        var quantity    =  $('#quantity').val();
        var price_core  =  $('#price_core').val();
        var price_sale  =  $('#price_sale').val();
        var note        =  $('#note').val();


        data.id         = id;
        data.name       = name;
        data.category   = category;
        data.supplier   = supplier;
        data.brand      = brand;
        data.color      = color;
        data.size       = size;
        data.quantity   = quantity;
        data.price_core = price_core;
        data.price_sale = price_sale;
        data.note       = note;


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

