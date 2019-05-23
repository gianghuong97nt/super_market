
'use strict';
$(document).ready(function () {
    initEvents();
    init();
    back();
});


function init() {
    $(document).ready(function(){
        $('#product_id_search').focus();

    });
}

var _search = 0;
var _page_delete = 0;

function back() {

    if(sessionStorage.getItem("product_id") != null){
        $('#product_id_search').val(sessionStorage.getItem("product_id"));
        $('#category_search').val(sessionStorage.getItem("category_search"));
        $('#product_name_search').val(sessionStorage.getItem("product_name_search"));
        $('#supplier_search').val(sessionStorage.getItem("supplier_search"));
        $('#brand_search').val(sessionStorage.getItem("brand_search"));
        $('#size_search').val(sessionStorage.getItem("size_search"));
        $('#color_search').val(sessionStorage.getItem("color_search"));

        searchProduct();

        sessionStorage.removeItem('product_id');
        sessionStorage.removeItem('category_search');
        sessionStorage.removeItem('product_name_search');
        sessionStorage.removeItem('supplier_search');
        sessionStorage.removeItem('brand_search');
        sessionStorage.removeItem('size_search');
        sessionStorage.removeItem('color_search');

    }
}

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
            _page_delete = page;

            loadProduct(page);
        } catch (e) {
            alert('.pagination li' + e.message);
        }
    });
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

    $(document).on('change', '#page_size', function () {
        try {
            //$("input").trigger("select");
            if(_search != 0){
                searchProduct();
            }
        } catch (e) {
            alert('remove row ' + e.message);
        }
    });

    $(document).on('click', '#btn_update', function () {
        try {
            sessionStorage.setItem("product_id",$('#product_id_search').val());
            sessionStorage.setItem("category_search",$('#category_search').val());
            sessionStorage.setItem("product_name_search",$('#product_name_search').val());
            sessionStorage.setItem("supplier_search",$('#supplier_search').val());
            sessionStorage.setItem("brand_search",$('#brand_search').val());
            sessionStorage.setItem("size_search",$('#size_search').val());
            sessionStorage.setItem("color_search",$('#color_search').val());

            var id = $(this).attr('proID');
            window.location.href = '/product/edit?id='+id;
        } catch (e) {
            alert('remove row ' + e.message);
        }
    });

    $(document).on('keypress','.form-control', function (e) {
        if(e.which === 13){
            searchProduct();
        }
    });
}

// Tìm kiếm theo điều kiện search
function searchProduct() {
    try {
        var data = {};
        var page_size   =  $('#page_size').val();


        data.page_size  = page_size;
        data.page       = 1;
        data.id         = $('#product_id_search').val();
        data.category   = $('#category_search').val();
        data.name       = $('#product_name_search').val();
        data.supplier   = $('#supplier_search').val();
        data.brand      = $('#brand_search').val();
        data.size       =  $('#size_search').val();
        data.color      = $('#color_search').val();

        //
        $.ajax({
            type: 'POST',
            url: '/product/search',
            dataType: 'html',  //html
            loading: true,
            data: JSON.stringify(data),

            success: function (res) {
                _search = 1;
                $('#table-result').empty();
                $('#table-result').append(res);
                $('#page_size').val(page_size);
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
        var page_size   =  $('#page_size').val();



        data.page_size  = page_size;
        data.page       = page;
        data.id         =  $('#product_id_search').val();
        data.category   =  $('#category_search').val();
        data.name       = $('#product_name_search').val();
        data.supplier   = $('#supplier_search').val();
        data.brand      = $('#brand_search').val();
        data.size       = $('#size_search').val();
        data.color      = $('#color_search').val();


        $.ajax({
            type: 'POST',
            url: '/product/load',
            dataType: 'html',  //html
            loading: true,
            data: JSON.stringify(data),

            success: function (res) {
                $('#table-result').empty();
                $('#table-result').append(res);
                $('#page_size').val(page_size);

            },
            // Ajax error
            error: function (res) {
            }

        });
    } catch (e) {
        alert('pagination' + e.message);
    }

}

function loadProductAfterDelete() {
    try {
        var data = {};
        var page_size   =  $('#page_size').val();


        data.page_size  = page_size;
        data.page       = _page_delete;
        data.id         = $('#product_id_search').val();
        data.category   = $('#category_search').val();
        data.name       = $('#product_name_search').val();
        data.supplier   = $('#supplier_search').val();
        data.brand      = $('#brand_search').val();
        data.size       = $('#size_search').val();
        data.color      = $('#color_search').val();


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
                        $.dialogComplete({
                            contents: JSMESSAGE.delete_complete,
                            callback: function () {
                                loadProductAfterDelete();
                            }
                        });
                        break;
                    // Data Validate
                    case '201':
                        $.dialogComplete({
                            contents: JSMESSAGE.delete_failed,
                        });
                        break;
                    // SQL + PHP Exception
                    case '202':
                        $.dialogComplete({
                            contents: JSMESSAGE.delete_failed,
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


