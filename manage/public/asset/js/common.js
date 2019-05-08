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

function callWaiting(){
	
}
function closeWaiting(){
	
}