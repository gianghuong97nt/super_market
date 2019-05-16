
'use strict';
$(document).ready(function () {
    inti();
});

var count = 1;
function inti() {
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