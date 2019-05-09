
'use strict';

$(document).ready(function () {
    initEvents();
});

function initEvents() {

    $(document).on('click', '#btn-delete', function () {
        try {
            var productid = $(this).attr('productid');
            deleteProduct(productid);
        } catch (e) {
            alert('remove row ' + e.message);
        }
    });

}

function deleteProduct(product_id) {
    try {
        var data = {};
        data.product_id = product_id;
        alert(product_id);

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
                        alert("Thanh cong");
                        location.reload();
                        break;
                    // Data Validate
                    case '201':
                        alert("Loi 201");

                        break;
                    // SQL + PHP Exception
                    case '202':

                        alert("Loi 202");
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
