
'use strict';
$(document).ready(function () {
    myTimeout();
});
function myTimeout() {
    setTimeout(function(){
        window.location.href = "/login";
        },
        10*60*1000);
}