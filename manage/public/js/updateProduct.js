
'use strict';
$(document).ready(function () {
    init();
    initEvents();
});

function init() {
    $('#product_name_update').focus();
}

function initEvents() {
    $(document).on('click','#btn-update',function (e) {
        try {
            e.preventDefault();
            $.dialogUpdate({
                contents: JSMESSAGE.save_confirm,
                callback: function (confirm) {
                    if (confirm) {
                        updateProduct();
                    }
                }
            });

        } catch (e) {
            alert('searchProduct' + e.message);
        }
    });

}

//Phan trang

function updateProduct() {
    try {
        var data = {};
        var id          =  $('#product_id_update').val();
        var category    =  $('#category_update').val();
        var name        =  $('#product_name_update').val();
        var supplier    =  $('#supplier_update').val();
        var brand       =  $('#brand_update').val();
        var size        =  $('#size_update').val();
        var color       =  $('#color_update').val();
        var quantity    =  $('#quantity_update').val();
        var price_core  =  $('#price_core_update').val();
        var price_sale  =  $('#price_sale_update').val();
        var note        =  $('#note_update').val();


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
            url: '/product/update',
            dataType: 'json',  //html
            loading: true,
            data: data,

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
                            callback: function () {
                                location.reload();
                            }
                        });

                        break;
                    // SQL + PHP Exception
                    case '202':
                        $.dialogComplete({
                            contents: JSMESSAGE.update_error,
                            callback: function () {
                                location.reload();
                            }
                        });
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
        alert('pagination' + e.message);
    }

}


