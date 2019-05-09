
'use strict';
$(document).ready(function () {
    initEvents();
});

function initEvents() {
    $(document).on('click','#btn-search',function (e) {
        try {
            e.preventDefault();
            searchProduct();
        } catch (e) {
            alert('searchProduct' + e.message);
        }
    });

    //phan trang
    $(document).on('click', '.pagination-location li a', function () {
        try {
            var page = $(this).attr('page');

            loadProduct(page);
        } catch (e) {
            alert('.pagination li' + e.message);
        }
    });
}
// Tìm kiếm theo điều kiện search
function searchProduct() {
    try {
        var data = {};
        var id          =  $('#product_id_search').val();
        var category    =  $('#category_search').val();
        var name        =  $('#product_name_search').val();
        var supplier    =  $('#supplier_search').val();
        var brand       =  $('#brand_search').val();
        var size        =  $('#size_search').val();
        var color       =  $('#color_search').val();


        data.page_size  = 4;
        data.page       = 1;
        data.id         = id;
        data.category   = category;
        data.name       = name;
        data.supplier   = supplier;
        data.brand      = brand;
        data.size       = size;
        data.color      = color;
        //
        $.ajax({
            type: 'POST',
            url: '/product/search',
            dataType: 'html',  //html
            loading: true,
            data: JSON.stringify(data),
            //data: data,
            ///
            success: function (res) {
                $('#table-result').empty();
                $('#table-result').append(res);
            }
        });
    } catch (e) {
        alert('search' + e.message);
    }

}

//Phan trang

function loadProduct(page) {
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


