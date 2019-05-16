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
            document.getElementById("footer").style.marginLeft = "-200px";
        }
        count ++;
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
                    // Success
                    case 'product':
                        window.location.href = 'http://localhost:8005/product' ;
                        break;
                    // Data Validate
                    case 'personalInfo':
                        window.location.href = 'http://localhost:8005/personalInfo' ;
                        break;
                    // SQL + PHP Exception
                    case 'product/detail':
                        window.location.href = 'http://localhost:8005/product/detail' ;
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