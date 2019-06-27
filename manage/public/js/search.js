'use strict';
$(document).ready(function () {
    inti();
});


var count = 1;

function inti() {
    $(document).on('keypress','.search_key', function (e) {
        if(e.which === 13){
            search();
        }
    });
    $(document).on('click','#showLeftPush', function (e) {
        e.preventDefault();
        if(count % 2 == 0){
            document.getElementById("footer").style.marginLeft = "230px";
        }else{
            document.getElementById("footer").style.marginLeft = "-115px";
        }
        count ++;
    });

    $(document).on('click', '#btn_logout', function () {
        try {
            removeSessionSearch();
            window.location.href = '/logout';
        } catch (e) {
            alert('remove row ' + e.message);
        }
    });

    $(document).on('click', '#list_product', function () {
        try {
            window.location.href = '/product';
        } catch (e) {
            alert('remove row ' + e.message);
        }
    });
    $(document).on('click', '#info', function () {
        try {
            window.location.href = '/personalInfo';
        } catch (e) {
            alert('remove row ' + e.message);
        }
    });

    $(document).on('click', '#personalInfo', function () {
        try {
            window.location.href = '/personalInfo';
        } catch (e) {
            alert('remove row ' + e.message);
        }
    });
}

function search() {
    try {
        var data = {};
        var key = $('.search_key').val();

        data.key = key;

        $.ajax({
            type: 'POST',
            url: '/search',
            dataType: 'json',  //html
            loading: true,
            data: data,

            success: function (res) {
                switch (res['status']) {
                    case 'product':
                        window.location.href = '/product' ;
                        break;
                    case 'personalInfo':
                        window.location.href = '/personalInfo' ;
                        break;
                    case 'product/detail':
                        window.location.href = '/product/detail' ;
                        break;
                    case 'NG':
                        window.location.reload();
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
        alert('search' + e.message);
    }



}