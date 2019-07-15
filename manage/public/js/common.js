var _iscloseWaiting = true;



$(document).ready(function() {
	/**
	 * @author: VuongVT - 2016/10/26
	 * @reason: init token value for all post method, show block screen and close block screen when use ajax
	 */
	$(document).ajaxStart(function() {

		// show block screen
		//HungNV comment
		//callWaiting();
	});
	$(document).ajaxComplete(function() {
		// close block screen
		if(_iscloseWaiting){
			closeWaiting();  //ANS BaoNC 2019/01/09	
		}
		
	});
	$(document).ajaxError(function() {
		// close block screen
		closeWaiting();
	});

	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		},

		//HungNV add
		beforeSend:function(){
			if(this.loading){
				callWaiting();
			} 
		},
		success: function(res){
			// console.log('suces');
			//removeError();
			// BaoNC 2019/01/09
			if(this.loading){
				closeWaiting();
			}
			
            //initQuestionMarks();
		},
		error : function(response){
			closeWaiting();
			return false;
		},
		// DuyTP 2017/02/09 Add event back to login when session expires
		complete: function(res){
			// console.log(res);
			if (res.status != null && res.status == 404) {
				location.href = '/';
			}else if(res.status==409){
				location.href = '/';
			}
			// if (res.status != null && res.status == 401) {
			//     location.href = '/';
			// }
		}
	});

	 

});
function back() {
	window.history.back(1);
}
function callWaiting(){
	
}
function closeWaiting(){
	
}

function removeSessionSearch() {
	sessionStorage.removeItem('product_id');
	sessionStorage.removeItem('category_search');
	sessionStorage.removeItem('product_name_search');
	sessionStorage.removeItem('supplier_search');
	sessionStorage.removeItem('brand_search');
	sessionStorage.removeItem('size_search');
	sessionStorage.removeItem('color_search');
	sessionStorage.removeItem('page_size');
	sessionStorage.removeItem('page');
}

function isValidEmailAddress(emailAddress) {
	var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
	return pattern.test(emailAddress);
}

function _validate(element) {
	if (!element) {
		element = $('body');
	}
	var error = 0;
	try {
		_clearErrors();
		element.find('.required:enabled:not([readonly])').each(function () {
			if ($(this).is(':visible')) {
				if (($(this).is("input") || $(this).is("textarea")) && $.trim($(this).val()) == '') {
					$(this).errorStyle('必須入力です。');
					error++;
				} else if ($(this).is("select") && ($(this).val() == '0' || $(this).val() == undefined)) {
					$(this).errorStyle('必須入力です。');
					error++;
				} else if ($(this).is("input[type=checkbox]") && !$(this).is(":checked")) {
					$(this).errorStyle('必須入力です。');
					error++;
				}
			}
		});

		element.find('input.email:enabled:not([readonly])').each(function () {
			if (!_validateEmail($(this).val())) {
				$(this).errorStyle('フォーマットが正しくありません。');
				error++;
			}
		});


		//
		// element.find('input.tel:enabled:not([readonly])').each(function(){

		//     if(!_validatePhoneFaxNumber($(this).val())){
		//         $(this).errorStyle(_text[21]);
		//         error++;
		//     }
		// });

	} catch (e) {
		alert('_validate: ' + e.toString());
	}
	if (error > 0) {
		return false;
	} else {
		return true;
	}
}