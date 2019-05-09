
'use strict';

$(document).ready(function () {
    initEvents();
});

function initEvents() {

    $(document).on('click', '#btn-delete', function () {
        try {
            var len = $('#table-data-1 tbody tr').length;
            if(len > 1){
                var productid = $(this).attr('productid');
                deleteProduct(productid);
                // $(this).closest('tr').remove();
            }
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
