
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
    $(document).on('click', '#btn-delete', function () {
        try {
            var productid = $(this).attr('productid');
            deleteProduct(productid);
        } catch (e) {
            alert('remove row ' + e.message);
        }
    });

    $(document).on('change', '#page_size', function () {
        try {
            //$("input").trigger("select");
            searchProduct();
        } catch (e) {
            alert('remove row ' + e.message);
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
        var page_size   =  $('#page_size').val();


        data.page_size  = page_size;
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


