
'use strict';

$(document).ready(function () {
    initEvents();
});

function initEvents() {

    $(document).on('click', '#btn-delete', function () {
        try {
            var productid = $(this).attr('productid');
            $.dialogUpdate({
                contents: JSMESSAGE.delete_confirm,
                callback: function (confirm) {
                    if (confirm) {
                        deleteProduct(productid);
                    }
                }
            });

        } catch (e) {
            alert('remove row ' + e.message);
        }
    });

}

function deleteProduct(product_id) {
    try {
        var data = {};
        data.product_id = product_id;

        $.ajax({
            type: 'POST',
            url: '/product/delete',
            dataType: 'json',
            loading: true,
            data: data,
            ///
            success: function (res) {
                switch (res['status']) {
                    // Success
                    case '200':
                        $.dialogComplete({
                            contents: JSMESSAGE.delete_complete,
                            callback: function () {
                                location.reload();
                            }
                        });
                        // alert("Thanh cong");
                        // location.reload();
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
                    // SQL + PHP Exception
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
            },
            // Ajax error
            error: function (res) {
            }
        });
    } catch (e) {
        alert('save' + e.message);
    }

}
