
'use strict';

$(document).ready(function () {
    initEvents();
});

function initEvents() {
    $(document).on('click', '.pagination-location li a', function () {
        try {
            var page = $(this).attr('page');
            //lấy cha của đối tượng đang thao tác
            var _this = $(this).closest('.pagination_product');
            var cat_id = $(_this).attr('catid');
            SearchProduct(page, cat_id);
        } catch (e) {
            alert('.pagination li' + e.message);
        }
    });
}

function SearchProduct(page,cat_id) {
    try {
        var data = {};
        data.page = page;
        data.cat_id = cat_id;

        $.ajax({
            type: 'GET',
            url: '/product/load',
            dataType: 'html',
            loading: true,
            data: data,

            success: function (res) {
                $("#product_data").empty();
                $("#product_data").html(res);
            },
            // Ajax error
            error: function (res) {
                alert('loi');
            }

        });
    } catch (e) {
        alert('pagination' + e.message);
    }

}
