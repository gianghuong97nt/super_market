
'use strict';
$(document).ready(function () {
    initEvents();
});

function initEvents() {
    $(document).on('click','#btn-update',function (e) {
        try {
            e.preventDefault();
            updateProduct();
        } catch (e) {
            alert('searchProduct' + e.message);
        }
    });

}

//Phan trang

function updateProduct() {
    try {
        var data = {};
        data.page_size  = 4;
        data.page = page;

        $.ajax({
            type: 'POST',
            url: '/product/load',
            dataType: 'html',  //html
            loading: true,
            data: JSON.stringify(data),

            success: function (res) {
                $('#table-result').empty();
                $('#table-result').append(res);

            },
            // Ajax error
            error: function (res) {
            }

        });
    } catch (e) {
        alert('pagination' + e.message);
    }

}


