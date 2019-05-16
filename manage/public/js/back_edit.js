'use strict';
$(document).ready(function () {
    inti();
});

function inti() {
    $(document).on('click','.btn-back-edit', function (e) {
        try {
            $.session.set('condition', $( "#condition_search" ).clone());
            $('#condition_search').empty();

            var a = Session['condition'];
            $('#condition_search').append(a);
        } catch (e) {
            alert('remove row ' + e.message);
        }
    });
}
