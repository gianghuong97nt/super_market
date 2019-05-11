/**
 * @name  jQuery
 * @class 詳細は jQuery を参照 (http://jquery.com/)
 * @see   http://jquery.com/
 */

/**
 * @name     fn
 * @class    詳細は jQuery を参照 (http://jquery.com/)
 * @memberOf jQuery
 * @see      http://jquery.com/
 */

/**
 * @name     event
 * @class    詳細は jQuery を参照 (http://jquery.com/)
 * @memberOf jQuery
 * @see      http://jquery.com/
 */

/**
 * @name     special
 * @class    詳細は jQuery を参照 (http://jquery.com/)
 * @memberOf jQuery.event
 * @see      http://jquery.com/
 */

const DIALOG_HEAD = {
	DEFAULT: 0,
	PRIMARY: 1,
	SUCCESS: 2,
	INFO   : 3,
	WARNING: 4,
	DANGER : 5,
	INVERSE: 6
};

const DIALOG_ICON = {
	NONE       : 0,
	ASTERISK   : 1,
	INFORMATION: 1,
	QUESTION   : 2,
	EXCLAMATION: 3,
	STOP       : 4,
	ERROR      : 4
};

const DIALOG_BUTTON = {
	OK   : 1,
	YESNO: 2,
	WARNING: 3
};

const HERE_DOC = {
	DIALOG         : 1,
	DIALOG_OK      : 2,
	DIALOG_YESNO   : 3,
	THEAD_ALL_CHECK: 4,
	TBOBY_ROW_CHECK: 5,
	PAGINATION     : 6,
	PAGE_JUMP      : 7,
	ALERT          : 8,
	LOADER         : 9,
	DIALOG_WARNING : 10
};

const PAGINATION = 3;

const ERROR_CLASS = 'bg-error';

const STATUS_CODE = {
	403: function() {
		alert('Forbidden / アクセス禁止');
	},
	404: function() {
		alert('Not Found / ページが存在しない');
	},
	500: function() {
		alert('Internal Server Error / サーバー内エラー\n\nセッションが切れた可能性があります。\nページをリロードしてください。');
	}
};

/**
 * jQuery Plugin [Utility]
 * @author   Yusuke Kaneko
 * @version  2017.02.01.01
 * @requires jquery-X.X.X.js or jquery-X.X.X.min.js
 */
(function(jQuery) {

	/**
	 * common setting
	 * @public
	 */
	jQuery.commonSetting = function() {
		jQuery.ajaxSetup({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			cache: false,
			dataType: 'json',
			statusCode: STATUS_CODE
		});
		$('[data-toggle=tooltip]').tooltip();
		jQuery.enter2tab(true);
		$('#language').on('change', function(e){
			var href = location.pathname;
			location.href = '/' + $(this).val() + href.substr(href.indexOf('/', 1));
		});
	};

	var _hereDocDialog = (function () {/*
<div class="jquery-dialog">
	<button class="btn modal-dialog-show" data-toggle="modal" data-backdrop="static" data-keyboard="false" data-target="#bootstrap-modal-dialog" style="display: none;"></button>
	<div id="bootstrap-modal-dialog" class="modal">
		<div class="modal-dialog" style="padding-top:150px;">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title"></h5>
					<button class="close" data-dismiss="modal">
						<span>&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<table style="width: 100%;">
						<colgroup>
							<col style="width: 1%;" />
							<col style="width: 99%;" />
						</colgroup>
						<tbody>
							<tr>
								<td class="modal-icon-box"></td>
								<td class="modal-body-box" style="padding-left: 2rem;"></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="modal-footer">
				</div>
			</div>
		</div>
	</div>
</div>
	*/});

	var _hereDocDialogOk = (function () {/*
<button class="btn btn-secondary modal-confirm button-key confirm-yes" data-dismiss="modal">
	OK
</button>
	*/});

	var _hereDocDialogYesNo = (function () {/*
<button class="btn btn-success modal-confirm button-key confirm-yes" data-dismiss="modal">
	<i class="fa fa-check" aria-hidden="true"></i>
	Yes
</button>
<button class="btn btn-danger modal-confirm button-key" data-dismiss="modal">
	<i class="fa fa-times" aria-hidden="true"></i>
	No
</button>
	*/});
	var _hereDocDialogWARNING = (function () {/*
	 <button class="btn btn-warning modal-confirm button-key confirm-yes" data-dismiss="modal">
	 OK
	 </button>
	 */});

	var _hereDocTheadAllCheck = (function () {/*
<th class="text-center"><input type="checkbox" class="all-check" /></th>
	*/});

	var _hereDocTbobyRowCheck = (function () {/*
<th class="text-center"><input type="checkbox" class="row-check" /></th>
	*/});

	var _hereDocPagination = (function () {/*
<div class="col-sm-4">
	Page <span class="page-current"></span> of <span class="page-max"></span>
</div>
<div class="col-sm-8">
	<ul class="pagination hidden-xs pull-right">
		<li><a class="page-jump" name="prev" href="#">&laquo;</a></li>
		<li><a class="page-jump" name="next" href="#">&raquo;</a></li>
	</ul>
	<ul class="pagination visible-xs pull-right">
		<li><a class="page-jump" name="prev" href="#">&laquo;</a></li>
		<li><a class="page-jump" name="next" href="#">&raquo;</a></li>
	</ul>
</div>
	*/});

	var _hereDocPageJump = (function () {/*
<li><a class="page-jump" name="" href="#"></a></li>
	*/});

	var _hereDocAlert = (function () {/*
<div class="alert alert-danger fade in">
	<a class="close" href="#" data-dismiss="alert" title="close" style="font-size: inherit;"><span class="glyphicon glyphicon-remove"></span></a>
	<table><tbody></tbody></table>
</div>
	*/});

	/**
	 * here document
	 * @param  {integer} type 1: dialog
	 * @return {string} text
	 */
	function _getHereDoc(type) {
		var text = '';
		switch (type) {
			case HERE_DOC.DIALOG:
				text = _hereDocDialog.toString();
				break;
			case HERE_DOC.DIALOG_OK:
				text = _hereDocDialogOk.toString();
				break;
			case HERE_DOC.DIALOG_YESNO:
				text = _hereDocDialogYesNo.toString();
				break;
			case HERE_DOC.DIALOG_WARNING:
				text = _hereDocDialogWARNING.toString();
				break;
			case HERE_DOC.THEAD_ALL_CHECK:
				text = _hereDocTheadAllCheck.toString();
				break;
			case HERE_DOC.TBOBY_ROW_CHECK:
				text = _hereDocTbobyRowCheck.toString();
				break;
			case HERE_DOC.PAGINATION:
				text = _hereDocPagination.toString();
				break;
			case HERE_DOC.PAGE_JUMP:
				text = _hereDocPageJump.toString();
				break;
			case HERE_DOC.ALERT:
				text = _hereDocAlert.toString();
				break;
			default:
				break;
		}
		text = text.split('/*');
		if (text.length == 2) {
			text = text[1].split('*/');
			if (text.length == 2) {
				text = text[0];
			} else {
				text = '';
			}
		} else {
			text = '';
		}
		return text;
	}

	/**
	 * show dialog
	 * @param {hush}     options          option
	 * @param {string}   options.title    title
	 * @param {string}   options.contents contents
	 * @param {integer}  options.header   0: default / 1: primary / 2: success / 3: info / 4: warning / 5: danger / 6: inverse
	 * @param {integer}  options.icon     0: none / 1: asterisk, information / 2: question / 3: exclamation / 4: stop, error
	 * @param {integer}  options.button   1: OK / 2: YES & NO
	 * @param {function} options.callback callback function (confirm)
	 * @public
	 */
	jQuery.showDialog = function(options) {
		var param = jQuery.extend({
			title   : '',
			contents: '',
			header  : 0,
			icon    : 0,
			button  : 1,
			callback: null
		}, options);
		jQuery('.modal-confirm').off('click').off('keyup');
		jQuery('.jquery-dialog').remove();
		jQuery('.modal-backdrop').remove();
		var obj = jQuery(_getHereDoc(HERE_DOC.DIALOG));
		var tmp = '';
		switch (param.header) {
			case 1:
				tmp = 'primary';
				break;
			case 2:
				tmp = 'success';
				break;
			case 3:
				tmp = 'info';
				break;
			case 4:
				tmp = 'warning';
				break;
			case 5:
				tmp = 'danger';
				break;
			case 6:
				tmp = 'inverse';
				break;
			default:
				tmp = 'default';
				break;
		}
		jQuery('.modal-header', obj).addClass('modal-' + tmp);
		tmp = '';
		switch (param.icon) {
			case 1:
				// asterisk, information
				tmp = '<i class="modal-icon modal-icon-primary fa fa-info-circle fa-4x" aria-hidden="true"></i>';
				break;
			case 2:
				// question
				tmp = '<i class="modal-icon modal-icon-success fa fa-question-circle fa-4x" aria-hidden="true"></i>';
				break;
			case 3:
				// exclamation
				tmp = '<i class="modal-icon modal-icon-warning fa fa-exclamation-triangle fa-4x" aria-hidden="true"></i>';
				break;
			case 4:
				// stop, error
				tmp = '<i class="modal-icon modal-icon-danger fa fa-ban fa-4x" aria-hidden="true"></i>';
				break;
			default:
				tmp = '';
				break;
		}
		jQuery('.modal-icon-box', obj).html(tmp);
		jQuery('.modal-title',    obj).html(param.title);
		jQuery('.modal-body-box', obj).html(param.contents);
		tmp = '';
		switch (param.button) {
			case 3:
				// ABC
				tmp = _getHereDoc(HERE_DOC.DIALOG_WARNING);
				break;
			case 2:
				// YES & NO
				tmp = _getHereDoc(HERE_DOC.DIALOG_YESNO);
				break;
			default:
				tmp = _getHereDoc(HERE_DOC.DIALOG_OK);
				break;
		}
		jQuery('.modal-footer', obj).html(tmp);
		jQuery('.modal-confirm', obj).on('click', function(e) {
			if (jQuery.getType(param.callback) === 'function') {
				param.callback(jQuery(this).hasClass('confirm-yes'));
			}
		}).on('keydown', function(e) {
			var c = (e.keyCode ? e.keyCode : e.which);
			if (c == 38 || c == 40) {
				var i = jQuery('.modal-confirm', obj).index(this);
				if (i != -1) {
					if (c == 38) {
						i--;
						if (i < 0) {
							i = jQuery('.modal-confirm', obj).length - 1;
						}
						jQuery('.modal-confirm:eq(' + i + ')', obj).trigger('focus');
					} else if (c == 40) {
						i++;
						if (i > jQuery('.modal-confirm', obj).length - 1) {
							i = 0;
						}
						jQuery('.modal-confirm:eq(' + i + ')', obj).trigger('focus');
					}
				}
			}
			return false;
		});
		jQuery('body').append(obj);
		jQuery('.modal-dialog-show').trigger('click');
		jQuery('#bootstrap-modal-dialog').on('click', function(e) {
			switch (param.button) {
				case 2:
					// YES & NO
					jQuery('.modal-confirm:eq(2)').trigger('focus');
					break;
				default:
					jQuery('.modal-confirm:eq(1)').trigger('focus');
					break;
			}
		});
		switch (param.button) {
			case 2:
				// YES & NO
				jQuery('.modal-confirm:eq(2)').trigger('focus');
				break;
			default:
				jQuery('.modal-confirm:eq(1)').trigger('focus');
				break;
		}
	};

	/**
	 * dialog update
	 * @param {hush}     options          option
	 * @param {string}   options.contents contents
	 * @param {function} options.callback callback function (confirm)
	 * @public
	 */
	jQuery.dialogUpdate = function(options) {
		var param = jQuery.extend({
			contents: '',
			callback: null
		}, options);
		jQuery.showDialog({
			title   : JSMESSAGE.confirm,
			contents: param.contents,
			header  : DIALOG_HEAD.SUCCESS,
			icon    : DIALOG_ICON.QUESTION,
			button  : DIALOG_BUTTON.YESNO,
			callback: param.callback
		});
	};

	/**
	 * dialog delete
	 * @param {hush}     options          option
	 * @param {string}   options.contents contents
	 * @param {function} options.callback callback function (confirm)
	 * @public
	 */
	jQuery.dialogDelete = function(options) {
		var param = jQuery.extend({
			contents: '',
			callback: null
		}, options);
		jQuery.showDialog({
			title   : JSMESSAGE.confirm,
			contents: param.contents,
			header  : DIALOG_HEAD.WARNING,
			icon    : DIALOG_ICON.EXCLAMATION,
			button  : DIALOG_BUTTON.YESNO,
			callback: param.callback
		});
	};

	/**
	 * dialog output
	 * @param {hush}     options          option
	 * @param {string}   options.contents contents
	 * @param {function} options.callback callback function (confirm)
	 * @public
	 */
	jQuery.dialogOutput = function(options) {
		var param = jQuery.extend({
			contents: '',
			callback: null
		}, options);
		jQuery.showDialog({
			title   : JSMESSAGE.confirm,
			contents: param.contents,
			header  : DIALOG_HEAD.SUCCESS,
			icon    : DIALOG_ICON.QUESTION,
			button  : DIALOG_BUTTON.YESNO,
			callback: param.callback
		});
	};

	/**
	 * dialog complete
	 * @param {hush}     options          option
	 * @param {string}   options.contents contents
	 * @param {function} options.callback callback function (confirm)
	 * @public
	 */
	jQuery.dialogComplete = function(options) {
		var param = jQuery.extend({
			contents: '',
			callback: null
		}, options);
		jQuery.showDialog({
			title   : JSMESSAGE.info,
			contents: param.contents,
			header  : DIALOG_HEAD.PRIMARY,
			icon    : DIALOG_ICON.INFORMATION,
			button  : DIALOG_BUTTON.OK,
			callback: param.callback
		});
	};

	/**
	 * dialog alert
	 * @param {hush}     options          option
	 * @param {string}   options.contents contents
	 * @param {function} options.callback callback function (confirm)
	 * @public
	 */
	jQuery.dialogAlert = function(options) {
		var param = jQuery.extend({
			contents: '',
			callback: null
		}, options);
		jQuery.showDialog({
			title   : JSMESSAGE.warning,
			contents: param.contents,
			header  : DIALOG_HEAD.DANGER,
			icon    : DIALOG_ICON.STOP,
			button  : DIALOG_BUTTON.WARNING,
			callback: param.callback
		});
	};

	/**
	 * get query parameter
	 * @return {hush} query parameter
	 * @public
	 */
	jQuery.getQuery = function() {
		var param = {};
		var url   = location.search;
		var hash  = url.slice(1).split('&');
		var split = '';
		for (var i = 0, l = hash.length; i < l; i++) {
			split = hash[i].split('=');
			param[split[0]] = split[1];
		}
		return param;
	};

	var _winpopName = 'jquery-window-popup';
	var _winpopObj  = null;
	/**
	 * diaplay chiled window
	 * @param {string} url  URL
	 * @param {mixed}  data send data (send as JSON)
	 * @public
	 */
	jQuery.winpop = function(url, data) {
		var send = '';
		var attr = '';
		attr += 'id="'     + _winpopName + '" ';
		attr += 'action="' + url        + '" ';
		attr += 'method="get" ';
		attr += 'target="' + _winpopName + '"';
		attr += 'style="display: none;"';
		var form = attr = '<form ' + attr + '>' + send + '</form>';
		jQuery('#' + _winpopName).remove();
		jQuery('body').append(form);
		if(_winpopObj !== null) {
			_winpopObj.close();
		}
		_winpopObj = window.open('about:blank', _winpopName, null);
		jQuery('#' + _winpopName).submit();
	};

	/**
	 * get page number
	 * @param  {object}  obj  jQuery object of pagination
	 * @param  {object}  link jQuery object of clicked
	 * @return {integer} pange number (error or cna't move, return -1)
	 * @public
	 */
	jQuery.getPage = function(obj, link) {
		var num = jQuery.trim(link.attr('name'));
		if (num === undefined) {
			return -1;
		}
		var max = parseInt(jQuery.trim(jQuery('.page-max', obj).text()), 10);
		if (isNaN(max)) {
			return -1;
		}
		switch (num) {
			case 'prev':
				num = parseInt(jQuery.trim(jQuery('.page-current', obj).text()), 10);
				if (isNaN(num)) {
					return -1;
				}
				num--;
				if (num < 1) {
					return -1;
				}
				break;
			case 'next':
				num = parseInt(jQuery.trim(jQuery('.page-current', obj).text()), 10);
				if (isNaN(num)) {
					return -1;
				}
				num++;
				if (num > max) {
					return -1;
				}
				break;
			default:
				num = parseInt(num, 10);
				if (isNaN(num)) {
					return -1;
				}
				break;
		}
		return num;
	};

	/**
	 * set pagination
	 * @param {object}  obj  jQuery object of pagination
	 * @param {integer} page display page number
	 * @param {integer} max  max page number
	 * @public
	 */
	jQuery.pagination = function(obj, page, max) {
		var html = jQuery(_getHereDoc(HERE_DOC.PAGINATION));
		var next = jQuery('[name=next]:first', html).closest('li');
		var half, low, up, li, a;
		if (max < 1) {
			max  = 0;
			page = 0;
		}
		jQuery('.page-current', html).text(page);
		jQuery('.page-max',     html).text(max);
		half = Math.floor(PAGINATION / 2);
		low  = page - half;
		if (low < 1) {
			low = 1;
			up  = PAGINATION;
			if (up > max) {
				up = max;
			}
		} else {
			up = page + half;
			if (up > max) {
				up = max;
			}
			low = up - PAGINATION + 1;
			if (low < 1) {
				low = 1;
			}
		}
		for (var i = low; i < up + 1; i++) {
			li = jQuery(_getHereDoc(HERE_DOC.PAGE_JUMP));
			a  = jQuery('a', li);
			a.attr('name', i).text(i);
			next.before(li);
		}
		obj.empty().append(html);
	};




	/**
	 * get location path name for local storage key
	 * @return {string} page name
	 * @public
	 */
	jQuery.getPathName = function(path) {
		var page = '';
		var pos  = 0;
		if (path === undefined) {
			page = location.pathname;
		} else {
			page = path.split(location.protocol + '//' + location.host).join('');
		}
		pos = page.indexOf('/');
		if (pos === 0) {
			pos = 1;
		}
		page = page.substr(page.indexOf('/', pos));
		page = page.replace(/^\/{0,2}/, '').replace(/\/{0,1}$/, '');
		return page.substr(1, page.length).replace(/\//g, '_') + '_';
	};

	/**
	 * text clear
	 * @param {array}  key      key object
	 * @param {string} key.id   id
	 * @param {string} key.type type [v: val / t: text]
	 * @public
	 */
	jQuery.textClear = function(key) {
		for (var i = 0, l = key.length; i < l; i++) {
			switch(key[i].type) {
				case 'v':
					jQuery('#' + key[i].id).val('');
					break;
				case 't':
					jQuery('#' + key[i].id).text('');
					break;
				case 'c':
					jQuery('#' + key[i].id).prop('checked', false);
					break;
				default:
					break;
			}
		}
		$('#language').val(_locale);
	};

	/**
	 * popup error message
	 * @param {array}  error       error object (if this arg is null, clear popup)
	 * @param {string} error.name  error name
	 * @param {string} error.msg   error message
	 * @public
	 */
	jQuery.errorpop = function(error) {
		var obj = jQuery('#alert-message');
		obj.empty();
		if (error === undefined || error === null) {
			return;
		}
		var html  = jQuery(_getHereDoc(HERE_DOC.ALERT));
		var tbody = jQuery('tbody', html);
		for (var i = 0, l = error.length; i < l; i++) {
			tbody.append('<tr><td>' +  error[i].name + '</td><td>' +  error[i].msg + '</td></tr>');
		}
		obj.append(html);
	};

	/**
	 * set local storage
	 * @param {string} page     page name
	 * @param {array}  key      key object
	 * @param {string} key.id   id
	 * @param {string} key.type type [v: val / t: text]
	 * @param {object} val      value
	 * @public
	 */
	jQuery.setStorage = function(page, key, val) {
		var storage = window.localStorage;
		var value   = null;
		if (val === undefined) {
			for (var i = 0, l = key.length; i < l; i++) {
				value = null;
				if (key[i].type == 'v') {
					value = jQuery('#' + key[i].id).val();
				} else if (key[i].type == 't') {
					value = jQuery.trim(jQuery('#' + key[i].id).text());
				} else if (key[i].type == 'c') {
					value = jQuery('#' + key[i].id).prop('checked');
				} else {
					value = null;
				}
				if (value === undefined) {
					value = null;
				}
				storage.setItem(page + key[i].id, JSON.stringify(value));
			}
		} else {
			storage.setItem(page + key, JSON.stringify(val));
		}
	};

	/**
	 * get local storage
	 * @param  {string} page     page name or key name
	 * @param  {array}  key      key object
	 * @param  {string} key.id   id
	 * @param  {string} key.type type [v: val / t: text / c: check box or radio button]
	 * @return {object} key value set
	 * @public
	 */
	jQuery.getStorage = function(page, key) {
		var data    = null;
		var storage = window.localStorage;
		if (key === undefined) {
			data = storage.getItem(page);
			if (data !== null) {
				data = JSON.parse(data);
			}
		} else {
			data = {};
			for (var i = 0, l = key.length; i < l; i++) {
				data[key[i].id] = storage.getItem(page + key[i].id);
				if (data[key[i].id] !== undefined && data[key[i].id] !== null) {
					data[key[i].id] = JSON.parse(data[key[i].id]);
				}
			}
		}
		return data;
	};

	/**
	 * clear local storage
	 * @param  {string} page     page name
	 * @param  {array}  key      key object
	 * @param  {string} key.id   id
	 * @param  {string} key.type type [v: val / t: text / c: check box or radio button]
	 * @return {object} key value set
	 * @public
	 */
	jQuery.clearStorage = function(page, key) {
		var storage = window.localStorage;
		if (page === undefined || key === undefined) {
			storage.clear();
		} else {
			for (var i = 0, l = key.length; i < l; i++) {
				storage.removeItem(page + key);
			}
		}
	};

	/**
	 * get screen
	 * @param  {array}  key      key object
	 * @param  {string} key.id   id
	 * @param  {string} key.type type [v: val / t: text / c: check box or radio button]
	 * @return {object} screen data
	 * @public
	 */
	jQuery.getScreen = function(key) {
		var data = {};
		for (var i = 0, l = key.length; i < l; i++) {
			switch(key[i].type) {
				case 'v':
					data[key[i].id] = $.mbTrim($('#' + key[i].id).val());
					break;
				case 't':
					data[key[i].id] = $.mbTrim($('#' + key[i].id).text());
					break;
				case 'c':
					data[key[i].id] = $('#' + key[i].id).prop('checked');
					break;
				default:
					break;
			}
		}
	};

	/**
	 * set screen
	 * @param  {string} page     page name
	 * @param  {array}  key      key object
	 * @param  {string} key.id   id
	 * @param  {string} key.type type [v: val / t: text / c: check box or radio button]
	 * @return {object} key value set
	 * @public
	 */
	jQuery.setScreen = function(page, key) {
		var data = $.getStorage(page, key);
		for (var i = 0, l = key.length; i < l; i++) {
			if (data[key[i].id] === null) {
				continue;
			}
			if (key[i].type == 'v') {
				$('#' + key[i].id).val(data[key[i].id]);
			} else if (key[i].type == 't') {
				$('#' + key[i].id).text(data[key[i].id]);
			} else if (key[i].type == 'c') {
				$('#' + key[i].id).prop('checked', data[key[i].id]);
			}
			$('#' + key[i].id).trigger('change');
		}
	};

//----------+[ judge ]+----------
	/**
	 * is integer
	 * @param  {string}  str target string
	 * @return {boolean} true: integer / false: not integer
	 * @public
	 */
	jQuery.isInteger = function(str) {
		str += '';
		str = str.replace(/,/g, '');
		var match = str.match(/^[-+]?\d+$/);
		return (match !== null);
	};

	/**
	 * is float
	 * @param  {string}  str target string
	 * @return {boolean} true: float / false: not float
	 * @public
	 */
	jQuery.isFloat = function(str) {
		str += '';
		var split = str.split('.');
		split[0]  = split[0].replace(/,/g, '');
		str = split.join('.');
		var match = str.match(/^[-+]?\d+\.?\d*$/);
		return (match !== null);
	};

	/**
	 * is date
	 * @param  {string}  str target string
	 * @return {boolean} true: date / false: not date
	 * @public
	 */
	jQuery.isDate = function(str) {
		str = _dateFormat(str);
		return (str !== '');
	};

	/**
	 * is time
	 * @param  {string}  str target string
	 * @return {boolean} true: time / false: not time
	 * @public
	 */
	jQuery.isTime = function(str) {
		str = _timeFormat(str);
		return (str !== '');
	};

	/**
	 * get data type
	 * @param  {object} object object
	 * @return {string} deta type (null / undefined / function / NaN / Infinity / string / number / boolean / array / object / hash / regexp / date / error / jquery)
	 * @public
	 */
	jQuery.getType = function(object) {
		return(_getTypeSub(object, true));
	};

	/**
	 * get data type aid
	 * @param  {object}  object object
	 * @param  {boolean} check  true: recursive call / false: initial call [default: false]
	 * @return {string}  data type (null / undefined / function / NaN / Infinity / string / number / boolean / array / object / hash / regexp / date / error / jquery)
	 * @private
	 */
	function _getTypeSub(object, check) {
		var type = typeof(object);
		var key  = null;
		if (object === null) {
			return('null');
		}
		if (type === 'undefined') {
			return('undefined');
		}
		if (type === 'function') {
			return('function');
		}
		if (type === 'string' || (object instanceof String)) {
			return('string');
		}
		if (type === 'number' || (object instanceof Number)) {
			if (isNaN(object)) {
				return('NaN');
			}
			if (object === Infinity) {
				return('Infinity');
			}
			return('number');
		}
		if (type === 'boolean' || (object instanceof Boolean)) {
			return('boolean');
		}
		if (object instanceof Array) {
			if (object.length === 0) {
				for (key in object) {
					return('hash');
				}
			}
			return('array');
		}
		if (object instanceof RegExp) {
			return('regexp');
		}
		if (object instanceof Date) {
			return('date');
		}
		if (object instanceof Error) {
			return('error');
		}
		if (object instanceof XMLHttpRequest) {
			return('XMLHttpRequest');
		}
		if (typeof(object.nodeType) === 'number') {
			if (object.nodeType === 1) {
				return('dom');
			}
		}
		if (object instanceof Object) {
			for (key in object) {
				if (typeof(object.size) === 'function') {
					return('jquery');
				} else {
					return('hash');
				}
			}
			return('object');
		}
		if (type === 'object' && check === true) {
			return(_getTypeSub(JSON.parse(JSON.stringify(object)), !check));
		} else {
			return(type);
		}
	}

//----------+[ numeric ]+----------
	/**
	 * numerical process
	 * @param  {float}   numeric numeric
	 * @param  {integer} mode    mode 1: rounding off / 2: floor / 3: ceil / 4: normal [default: 4]
	 * @param  {integer} digit   digit [default: 0]
	 * @param  {boolean} comma   true: add comma / false: normal [default: false]
	 * @return {string}  string
	 * @public
	 */
	jQuery.numProc = function(numeric, mode, digit, comma) {
		numeric = jQuery.dcecimal(numeric) - 0;
		digit   = jQuery.integer(digit)    - 0;
		var minusFlag = 0;
		if (numeric < 0) {
			minusFlag = 1;
			numeric  *= -1;
		}
		numeric *= Math.pow(10, digit);
		switch (mode) {
			case 1:
				// rounding off
				numeric = Math.round(numeric);
				break;
			case 2:
				// floor
				numeric = Math.floor(numeric);
				break;
			case 3:
				// ceil
				numeric = Math.ceil(numeric);
				break;
			default:
				break;
		}
		numeric /= Math.pow(10, digit);
		if (minusFlag === 1) {
			numeric *= -1;
		}
		numeric += '';
		if (comma === true) {
			numeric = numeric.toLocaleString('ja-JP', {maximumFractionDigits: 0});
		}
		return numeric;
	};

	/**
	 * calculate tax
	 * @param  {float}   value value (without tax)
	 * @param  {float}   rate  tax rate (%)
	 * @param  {integer} mode  mode 1: rounding off / 2: floor / 3: ceil / 4: normal [default: 2]
	 * @return {float}   tax
	 */
	function calcTax(value, rate, mode) {
		value = jQuery.dcecimal(value) - 0;
		rate  = jQuery.dcecimal(rate)  - 0;
		if (mode == null) {
			mode = 2;
		}
		mode  = jQuery.integer(mode) - 0;
		return jQuery.numProc(value * rate / 100, mode);
	}

	/**
	 * calculate without tax
	 * @param  {float}   value value (with tax)
	 * @param  {float}   rate  tax rate (%)
	 * @param  {integer} mode  mode 1: rounding off / 2: floor / 3: ceil / 4: normal [default: 2]
	 * @return {float}   value without tax
	 */
	function calcWithoutTax(value, rate, mode) {
		value = jQuery.dcecimal(value) - 0;
		rate  = jQuery.dcecimal(rate)  - 0;
		if (mode == null) {
			mode = 2;
		}
		mode  = jQuery.integer(mode) - 0;

		var type = (mode === 2 ? 3 : (mode === 3 ? 2 : mode));
		var out  = jQuery.numProc(value / (1 + (rate / 100)), type) - 0;
		var on   = out + (calcTax(out, rate, mode) - 0);
		return (out + (value - on)) + '';
	}

	/**
	 * generate random number
	 * @param  {integer} min minimum
	 * @param  {integer} max maximun
	 * @return {integer} random number
	 * @public
	 */
	jQuery.randomNumber = function(min, max) {
		min = parseInt(min, 10);
		max = parseInt(max, 10);
		if (min === max) {
			return(max);
		}
		if (min > max) {
			var tmp = min;
			min = max;
			max = tmp;
		}
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

//----------+[ string ]+----------

	/**
	 * left
	 * @param  {string}  str target string
	 * @param  {integer} num number of character
	 * @return {string}  left string
	 * @public
	 */
	jQuery.left = function(str, num) {
		num -= 0;
		if (num < 1) {
			return '';
		}
		return (str + '').substring(0, num);
	};

	/**
	 * right
	 * @param  {string}  str target string
	 * @param  {integer} num number of character
	 * @return {string}  right string
	 * @public
	 */
	jQuery.right = function(str, num) {
		num -= 0;
		if (num < 1) {
			return '';
		}
		str = (str + '');
		var len = str.length;
		if (num > len) {
			num = len;
		}
		return str.substring(len - num, len);
	};

	/**
	 * multi byte trim
	 * @param  {string} str  target string
	 * @return {string} trimed string
	 * @public
	 */
	jQuery.mbTrim = function(str) {
		str += '';
		str = jQuery.trim(str);
		str = str.replace(/^[\s\t\n\r　]+|[\s\t\n\r　]+$/g, '');
		return str;
	};

	/**
	 * multi byte left
	 * @param  {string}  str target string
	 * @param  {integer} num number of character
	 * @return {string}  left string
	 * @public
	 */
	jQuery.mbLeft = function(str, num) {
		var result = '';
		var cnt    = 0;
		var i      = 0;
		var len    = 0;
		var bCnt   = 0;
		var chr    = '';
		str       += '';
		num       -= 0;
		bCnt       = jQuery.mbLength(str) - 1;
		if (num < 1) {
			return '';
		} else if (num > bCnt) {
			return(str);
		}
		len = str.length;
		for (i = 0; i < len; i++) {
			chr  = str.charAt(i);
			bCnt = jQuery.mbLength(chr);
			if (cnt + bCnt > num) {
				break;
			} else {
				result += chr;
				cnt += bCnt;
			}
		}
		if (jQuery.mbLength(result) !== num) {
			result += ' ';
		}
		return(result);
	};

	/**
	 * multi byte right
	 * @param  {string}  str target string
	 * @param  {integer} num number of character
	 * @return {string}  right string
	 * @public
	 */
	jQuery.mbRight = function(str, num) {
		var result = '';
		var cnt    = 0;
		var i      = 0;
		var len    = 0;
		var bCnt   = 0;
		var chr    = '';
		str       += '';
		num       -= 0;
		bCnt       = jQuery.mbLength(str) - 1;
		if (num < 1) {
			return '';
		} else if (num > bCnt) {
			return(str);
		}
		len = str.length;
		for (i = len - 1; i > -1; i--) {
			chr  = str.charAt(i);
			bCnt = jQuery.mbLength(chr);
			if (cnt + bCnt > num) {
				break;
			} else {
				result = chr + result;
				cnt += bCnt;
			}
		}
		if (jQuery.mbLength(result) !== num) {
			result = ' ' + result;
		}
		return(result);
	};

	/**
	 * get byte length of string
	 * @param  {string}  str target string
	 * @return {integer} byte length of string
	 * @public
	 */
	jQuery.mbLength = function(str) {
		var i    = 0;
		var len  = 0;
		var cnt  = 0;
		var chr  = '';
		str     += '';
		len      = str.length;
		for (i = 0; i < len; i++) {
			chr = str.charCodeAt(i);
			// Unicode の半角 : 0x0 - 0x80, 0xf8f0, 0xff61 - 0xff9f, 0xf8f1 - 0xf8f3
			if ((chr >= 0x0 && chr < 0x81) || (chr == 0xf8f0) || (chr > 0xff60 && chr < 0xffa0) || (chr > 0xf8f0 && chr < 0xf8f4)) {
				// 1 byte
				cnt += 1;
			} else {
				// 2 byte
				cnt += 2;
			}
		}
		return(cnt);
	};

	/**
	 * wordwrap
	 * @param  {string}  str       target string
	 * @param  {integer} num       number
	 * @param  {string}  delimiter delimiter
	 * @return {string}  wordwraped string
	 * @public
	 */
	jQuery.wordwrap = function(str, num, delimiter) {
		var result = '';
		var i      = 0;
		var len    = 0;
		str       += '';
		delimiter += '';
		num       -= 0;
		if (str === '') {
			return(str);
		}
		if (num < 1) {
			return(str);
		}
		len = str.length;
		if (len > num) {
			for (i = 0; i < len; i += num) {
				result += str.slice(i, i + num) + delimiter;
			}
		} else {
			result = str;
		}
		return result;
	};

	/**
	 * generate random string
	 * @param  {integer} length length
	 * @param  {string}  option option a: lower case  A: upper case / 9: number / @: sign (!#$%&.@_) [default: a]
	 * @param  {string}  add    another additional string
	 * @param  {string}  del    delete string
	 * @return {string}  random string
	 * @public
	 */
	jQuery.randomString = function(length, option, add, del) {
		var chr  = '';
		length  -= 0;
		option  += '';
		add     += '';
		del     += '';
		chr += 'abcdefghijklmnopqrstuvwxyz';
		if (option.indexOf('A', 0) !== -1) {
			chr += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		}
		if (option.indexOf('9', 0) !== -1) {
			chr += '0123456789';
		}
		if (option.indexOf('@', 0) !== -1) {
			chr += '!#$%&.@_';
		}
		chr += add;
		var i   = 0;
		var len = del.length;
		var tmp = '';
		for (i = 0; i < len; i++) {
			tmp       = del.charAt(i);
			chr = chr.split(tmp).join('');
		}
		if (chr === '') {
			// all delete
			return('');
		}
		var max    = chr.length - 1;
		var random = '';
		for (i = 0; i < length; i++) {
			random += chr.charAt(jQuery.randomNumber(0, max));
		}
		return random;
	};

	/**
	 * convert relative path to absolute path
	 * @param  {string} href relative path
	 * @return {string} absolute path
	 * @public
	 */
	jQuery.absolutePath  = function(href) {
		var link = document.createElement('a');
		link.href = href + '';
		return (link.protocol + '//' + link.host + link.pathname + link.search + link.hash);
	};

//----------+[ date ]+----------
	/**
	 * get today
	 * @return {string} today
	 * @public
	 */
	jQuery.getToday = function() {
		var result = '';
		var date   = new Date();
		result = date.getFullYear() + '/' + jQuery.right('00' + (date.getMonth() + 1), 2) + '/' + jQuery.right('00' + date.getDate(), 2);
		return result;
	};

	/**
	 * get today
	 * @return {string} today
	 * @public
	 */
	jQuery.getThisMonth = function() {
		var result = '';
		var date   = new Date();
		result = date.getFullYear() + '/' + jQuery.right('00' + (date.getMonth() + 1), 2);
		return result;
	};

	/**
	 * get month end day
	 * @param  {integer} year  year
	 * @param  {integer} month month
	 * @return {string}  month end day
	 * @public
	 */
	jQuery.getMonthStartDay = function(year, month) {
		year  -= 0;
		month -= 0;
		if (year < 1) {
			year = 1;
		} else if (year > 9999) {
			year = 9999;
		}
		if (month < 1) {
			month = 1;
		} else if (month > 12) {
			month = 12;
		}
		var date = new Date(year, month - 1, 1);
		if (date === 'Invalid Date') {
			return '';
		}
		var result = '';
		result += date.getFullYear()                            + '/';
		result += jQuery.right('00' + (date.getMonth() + 1), 2) + '/';
		result += jQuery.right('00' + date.getDate(),        2);
		return result;
	};

	/**
	 * get month end day
	 * @param  {integer} year  year
	 * @param  {integer} month month
	 * @return {string}  month end day
	 * @public
	 */
	jQuery.getMonthEndDay = function(year, month) {
		year  -= 0;
		month -= 0;
		if (year < 1) {
			year = 1;
		} else if (year > 9999) {
			year = 9999;
		}
		if (month < 1) {
			month = 1;
		} else if (month > 12) {
			month = 12;
		}
		var date = new Date(year, month, 0);
		if (date === 'Invalid Date') {
			return '';
		}
		var result = '';
		result += date.getFullYear()                            + '/';
		result += jQuery.right('00' + (date.getMonth() + 1), 2) + '/';
		result += jQuery.right('00' + date.getDate(),        2);
		return result;
	};

	/**
	 * date add
	 * @param  {string}  type type y: year / m: month / d: day / w: week
	 * @param  {integer} diff diff
	 * @param  {string}  date date
	 * @return {string}  date add
	 * @public
	 */
	jQuery.dateAdd = function(type, diff, date) {
		diff -= 0;
		date = _dateFormat(date);
		if (date === '') {
			return '';
		}
		if (type === 'w') {
			// week -> 7 times day
			type  = 'd';
			diff *= 7;
		}
		var split   = date.split('/');
		var year    = parseInt(split[0], 10);
		var month   = parseInt(split[1], 10);
		var day     = parseInt(split[2], 10);
		var addDate = null;
		var result  = '';
		switch (type) {
			case 'y':
				addDate = new Date(year + diff, month - 1, day);
				if (addDate === 'Invalid Date') {
					break;
				} else {
					if (addDate.getMonth() + 1 === month) {
						result += addDate.getFullYear()                            + '/';
						result += jQuery.right('00' + (addDate.getMonth() + 1), 2) + '/';
						result += jQuery.right('00' + addDate.getDate(),        2);
					} else {
						result = jQuery.getMonthEndDay(addDate.getFullYear(), addDate.getMonth());
					}
				}
				break;
			case 'm':
				addDate = new Date(year, month - 1 + diff, day);
				if (addDate === 'Invalid Date') {
					break;
				} else {
					if (addDate.getDate() === day) {
						result += addDate.getFullYear()                            + '/';
						result += jQuery.right('00' + (addDate.getMonth() + 1), 2) + '/';
						result += jQuery.right('00' + addDate.getDate(),        2);
					} else {
						result = jQuery.getMonthEndDay(addDate.getFullYear(), addDate.getMonth());
					}
				}
				break;
			case 'd':
				addDate = new Date(year, month - 1, day + diff);
				if (addDate === 'Invalid Date') {
					break;
				} else {
					result += addDate.getFullYear()                            + '/';
					result += jQuery.right('00' + (addDate.getMonth() + 1), 2) + '/';
					result += jQuery.right('00' + addDate.getDate(),        2);
				}
				break;
			default:
				break;
		}
		return result;
	};

	/**
	 * time add
	 * @param  {string}  type type h: hour / i: minute / s: second
	 * @param  {integer} diff diff
	 * @param  {string}  time time
	 * @return {string}  time add
	 * @public
	 */
	jQuery.timeAdd = function(type, diff, time) {
		diff -= 0;
		time = _timeFormat(time);
		if (time === '') {
			return('');
		}
		var split  = time.split(':');
		var hour   = parseInt(split[0], 10);
		var minute = parseInt(split[1], 10);
		var second = parseInt(split[2], 10);
		var digit  = 0;
		var result = '';
		if (type === 's') {
			second += diff;
		}
		if (second < 0) {
			digit  = parseInt((second - 60) / 60, 10);
			second = 60 - ((-1 * second) % 60);
		} else {
			digit  = parseInt(second / 60, 10);
			second = second % 60;
		}
		minute += digit;
		if (type === 'i') {
			minute += diff;
		}
		if (minute < 0) {
			digit  = parseInt((minute - 60) / 60, 10);
			minute = 60 - ((-1 * minute) % 60);
		} else {
			digit  = parseInt(minute / 60, 10);
			minute = minute % 60;
		}
		hour += digit;
		if (type === 'h') {
			hour += diff;
		}
		if (hour < 0) {
			digit = parseInt((hour - 24) / 24, 10);
			hour  = 24 - ((-1 * hour) % 24);
		} else {
			digit = parseInt(hour / 24, 10);
			hour  = hour % 24;
		}
		result += jQuery.right('00' + (hour),   2) + ':';
		result += jQuery.right('00' + (minute), 2) + ':';
		result += jQuery.right('00' + (second), 2);
		return result;
	};

//----------+[ cast ]+----------
	/**
	 * escape html
	 * @param  {string} str target string
	 * @return {string} casted string
	 * @public
	 */
	jQuery.escapeHtml = function(str) {
		str += '';
		str = str.replace(/\&/g, '\&amp;');
		str = str.replace(/\</g, '\&lt;').replace(/\>/g, '\&gt;').replace(/\"/g, '\&quot;');
		return str;
	};

//----------+[ server ]+----------
	var _sentFormName = 'jquery-send-parameter';

	/**
	 * send POST method
	 * @param {string}  url       send target URL
	 * @param {mixed}   parameter parameter
	 * @param {boolean} target    true:_blank / false: normal [default: false]
	 */
	jQuery.sendPost = function(url, parameter, target) {
		var html = '';
		var key  = null;
		html += '<form class="' + _sentFormName + '" action="' + url + '" method="post" style="display: none;"' + ((target !== true) ? '' : ' target="_blank"') + '>';
		for (key in parameter) {
			html += _createSendData(key, parameter[key], '');
		}
		html += '</form>';
		jQuery('.' + _sentFormName).remove();
		jQuery('body').append(html);
		//submit
		jQuery('.' + _sentFormName).submit();
	};

	/**
	 * send GET method
	 * @param {string}  url       send target URL
	 * @param {mixed}   parameter parameter
	 * @param {boolean} target    true:_blank / false: normal [default: false]
	 * @public
	 */
	jQuery.sendGet = function(url, parameter, target) {
		var html = '';
		var key  = null;
		html += '<form class="' + _sentFormName + '" action="' + url + '" method="get" style="display: none;"' + ((target !== true) ? '' : ' target="_blank"') + '>';
		for (key in parameter) {
			html += _createSendData(key, parameter[key], '');
		}
		html += '</form>';
		jQuery('.' + _sentFormName).remove();
		jQuery('body').append(html);
		//submit
		jQuery('.' + _sentFormName).submit();
	};

	/**
	 * create form HTML for send data
	 * @param {string} name    key
	 * @param {object} object  value
	 * @param {string} bracket bracket [default: '']
	 * @private
	 */
	function _createSendData(name, object, bracket) {
		var type = jQuery.getType(object);
		var html = '';
		bracket += '';
		if (type === 'string' || type === 'number' || type === 'boolean') {
			html += '<input type="hidden" name="' + jQuery.escapeHtml(name) + bracket + '" value="' + jQuery.escapeHtml(object) + '" />';
		} else if (type === 'array' || type === 'hash') {
			for (var key in object) {
				html += _createSendData(name, object[key], bracket + '[' + key + ']');
			}
		}
		return html;
	}

	/**
	 * get address
	 * @param  {string}   zipcode  zip code
	 * @param  {function} callback callback function (array, array)
	 * @public
	 */
	jQuery.getAddress = function(zipcode, callback) {
		zipcode = zipcode.split('-').join('');
		jQuery.ajax({
			type    : 'GET',
			url     : 'http://maps.googleapis.com/maps/api/geocode/json',
			timeout : 10000,
			cache   : false,
			data    : {
				sensor    : false,
				components: 'country:JP',
				language  : 'ja',
				address   : encodeURI(zipcode)
			},
			dataType: 'json'
		}).done(function(response, textStatus, jqXHR) {
			if (response.status != 'OK') {
				alert('get address error');
				return;
			}
			var postal  = [];
			var address = [];
			for (var i = 0, l = response.results.length; i < l; i++) {
				var data   = response.results[i].address_components;
				var tmpZip = '';
				var tmpAdd = '';
				var j    = 0;
				for (j = data.length - 1; j > -1; j--) {
					if (jQuery.inArray('postal_code', data[j].types) > -1) {
						tmpZip = data[j].long_name;
					} else if (
						jQuery.inArray('administrative_area_level_1', data[j].types) > -1 ||
						jQuery.inArray('administrative_area_level_2', data[j].types) > -1 ||
						jQuery.inArray('administrative_area_level_3', data[j].types) > -1 ||
						jQuery.inArray('administrative_area_level_4', data[j].types) > -1 ||
						jQuery.inArray('administrative_area_level_5', data[j].types) > -1 ||
						jQuery.inArray('locality',                    data[j].types) > -1 ||
						jQuery.inArray('sublocality',                 data[j].types) > -1 ||
						jQuery.inArray('sublocality_level_1',         data[j].types) > -1 ||
						jQuery.inArray('sublocality_level_2',         data[j].types) > -1 ||
						jQuery.inArray('sublocality_level_3',         data[j].types) > -1 ||
						jQuery.inArray('sublocality_level_4',         data[j].types) > -1 ||
						jQuery.inArray('sublocality_level_5',         data[j].types) > -1
					) {
						tmpAdd += data[j].long_name;
					}
				}
				if (tmpZip.split('-').join('') === zipcode) {
					postal.push(tmpZip);
					address.push(tmpAdd);
				}
			}
			if (postal.length === 0) {
				jQuery.dialogAlert({
					contents: JSMESSAGE.no_address
				});
			}
			if (jQuery.getType(callback) === 'function') {
				callback(postal, address);
			}
		}).fail(function(jqXHR, textStatus, errorThrown) {
			 // alert('connecting error');
		});
	};

	/**
	 * get kana
	 * @param  {string}   str  target string
	 * @param  {integer}  type 0: katakana / 1: hiragana
	 * @param  {function} callback callback function (str)
	 * @public
	 */
	jQuery.getKana = function(str, type, callback) {
		var text = jQuery.mbTrim(str);
		if (text === '') {
			if (jQuery.getType(callback) === 'function') {
				callback('');
			}
			return;
		}
		jQuery.ajax({
			type    : 'GET',
			url     : '/igo/igo.php',
			timeout : 10000,
			cache   : false,
			data    : {
				s: str,
				t: type
			},
			dataType: 'text'
		}).done(function(response, textStatus, jqXHR) {
			if (jQuery.getType(callback) === 'function') {
				callback(response);
			}
		}).fail(function(jqXHR, textStatus, errorThrown) {
			// alert('connecting error');
		});
	};

//----------+[ screen operation ]+----------
	/**
	 * @param {object} _objList object list which can get focus
	 * @private
	 */
	var _objList = null;

	/**
	 * convert action of enter (+ shift) to tab (+ shift)
	 * @param {bool} arrow true: move up or down arrow key [default:false]
	 * @public
	 */
	jQuery.enter2tab = function(arrow) {
		jQuery(document).keydown(function(e) {
			var obj  = jQuery(e.target);
			var tag  = obj.get(0).tagName;
			var type = obj.attr('type');
			var c    = (e.keyCode ? e.keyCode : e.which);
			// tab / enter and object is not button or textarea / arrow up or down and object is not select or textarea
			if (c === 9 ||
				(
					c === 13 &&
					(
						tag  !== 'TEXTAREA' &&
						type !== 'file'
/*
						tag  !== 'BUTTON'   &&
						tag  !== 'A'        &&
						type !== 'button'   &&
						type !== 'reset'    &&
						type !== 'submit'   &&
						type !== 'image'
*/
					)
				) ||
				(
					arrow === true &&
					(
						c === 38 ||
						c === 40
					) &&
					(
						tag !== 'TEXTAREA' &&
						tag !== 'SELECT'
					) &&
					(
						!obj.hasClass('date-text') &&
						!obj.hasClass('month-text')
					) &&
					(
						!e.shiftKey &&
						!e.altKey   &&
						!e.ctrlKey
					)
				)
			) {
				//　get object list which cna get focut to tab key
				_objList = jQuery('input:visible, select:visible, textarea:visible, button:visible, a:visible[href]')
				.not('[tabindex=-1]')       // exclude tabindex="-1"
				.not(':disabled')           // exclude disabled="disabled"
				.not('[readonly=readonly]') // exclude readonly="readonly"
				.not('.passed');            // exclude specific class "passed"
				// get index of focused object
				var idx   = _objList.index(obj);
				var shift = e.shiftKey;
				if (c === 38) {
					shift = true;
				} else if (e.keyCode === 40) {
					shift = false;
				}
				if (idx > -1) {
					if (!shift) {
						if (idx + 2 > _objList.length) {
							idx = 0;
						} else {
							idx++;
						}
					} else {
						if (idx === 0) {
							idx = _objList.length - 1;
						} else {
							idx--;
						}
					}
					_objList.filter(':eq(' + idx + ')').trigger('focus');
					return false;
				}
			}
		});
	};

//----------+[ debug ]+----------
	/**
	 * analyze functions
	 * @param  {function} object function
	 * @return {hash}     {name : function name, arg: argument(s)}
	 * @public
	 */
	jQuery.analyzeFunction = function(object) {
		if (typeof(object) !== 'function') {
			return({name: '', arg: ''});
		}
		var functionName = '';
		var argumentName = '';
		functionName = object.toString().split('(');
		if (functionName.length > 1) {
			functionName = functionName[0];
			functionName = functionName.replace(/function/g, '').replace(/\s/g, '');
			if (functionName === '') {
				functionName = 'anonymous function';
			}
		} else {
			functionName = '';
		}
		argumentName = object.toString().split('(');
		if (argumentName.length > 2) {
			argumentName = argumentName[1].split(')');
			if (argumentName.length > 1) {
				argumentName = argumentName[0].replace(/\s/g, '');
			} else {
				argumentName = '';
			}
		} else {
			argumentName = '';
		}
		return {name: functionName, arg: argumentName};
	};

	var _varDumpName = 'jquery-expansion-class-var-dump';

	/**
	 * variable bump
	 * @param {object}  object variable
	 * @param {integer} clear  clear flag 0: normal / 1: delete only / 2: delete + create [default: 0]
	 * @public
	 */
	jQuery.var_dump = function(object, clear) {
		if (clear === 1 || clear === 2) {
			jQuery('.' + _varDumpName).remove();
			if (clear === 1) {
				return;
			}
		}
		var content = '';
		content += '<pre class="' + _varDumpName +'">';
		content +=  '<div style="font-size: small; font-family: monospace;">';
		content +=   _var_dump(object, 0);
		content +=  '</div>';
		content += '</pre>';
		jQuery('body').append(content);
	};

	/**
	 * variable bump aid
	 * @param  {object}  object variable
	 * @param  {integer} depth  depth [default: 0]
	 * @param  {boolean} indent indent true: indent / false: no indent [default: true]
	 * @return {string}  result
	 * @private
	 */
	function _var_dump(object, depth, indent) {
		if (depth > 9) {
			// when the depth is 10 or more, result does not display
			return('<font color="#ff0000"> and more ...</font><br />');
		}
		var space      = '';
		var arraySpace = '';
		var i          = 0;
		if (indent !== false) {
			for (i = 0; i < depth; i++) {
				space += '&nbsp;&nbsp;';
			}
		}
		for (i = 0; i < depth + 1; i++) {
			arraySpace += '&nbsp;&nbsp;';
		}
		var content = '';
		var key     = null;
		var len     = 0;
		switch (jQuery.getType(object)) {
			case 'undefined':
				content += space + '<font color="#f57900">[ undefined ]</font><br />';
				break;
			case 'null':
				content += space + '<font color="#3465a4">null</font><br />';
				break;
			case 'function':
				var tmpFunction = jQuery.analyzeFunction(object);
				content += space + '<font color="#f57900">[function]</font><br />';
				content += arraySpace + ' <font color="#3465a4">name    </font> <font color="#888a85">=&gt;</font> ' + jQuery.escapeHtml(tmpFunction['name']) + '<br / >';
				content += arraySpace + ' <font color="#3465a4">argument</font> <font color="#888a85">=&gt;</font> ' + jQuery.escapeHtml(tmpFunction['arg'])  + '<br / >';
				break;
			case 'string':
				content += space + '<small>string</small> <font color="#cc0000">\'' + jQuery.escapeHtml(object) + '\'</font> <i>(length = ' + object.length + ')</i><br />';
				break;
			case 'number':
				content += space + '<small>number</small> <font color="#4e9a06">' + jQuery.escapeHtml(object) + '</font><br />';
				break;
			case 'NaN':
				content += space + '<font color="#f57900">[ NaN (Not a Number) ]</font><br />';
				break;
			case 'Infinity':
				content += space + '<font color="#f57900">[ Infinity ]</font><br />';
				break;
			case 'boolean':
				content += space + '<small>boolean</small> <font color="#75507b">' + ((object === true) ? 'true' : 'false') + '</font><br />';
				break;
			case 'array':
				depth++;
				content += space + '<b>array</b><br />';
				if (object.length === 0) {
					content += arraySpace + '<font color="#888a85">empty</font><br />';
				} else {
					len = object.length;
					for (i = 0; i < len; i++) {
						content += arraySpace + i + ' <font color="#888a85">=&gt;</font> ' + _var_dump(object[i], depth, false);
					}
				}
				break;
			case 'object':
				content += space + '<font color="#f57900">[ object ]</font> <font color="#888a85">empty</font><br />';
				break;
			case 'hash':
				depth++;
				content += space + '<b>hash</b><br />';
				for (key in object) {
					content += arraySpace + '\'' + jQuery.escapeHtml(key) + '\' <font color="#888a85">=&gt;</font> ' + _var_dump(object[key], depth, false);
				}
				break;
			case 'regexp':
				content += space + '<font color="#f57900">[ RegExp ]</font><br />';
				content += arraySpace + ' <font color="#3465a4">source</font> <font color="#888a85">=&gt;</font> /' + object.source + '/<br / >';
				break;
			case 'date':
				var date = object.getFullYear() + '/' + ((object.getMonth() + 1 < 10) ? '0' : '') + (object.getMonth() + 1) + '/' + ((object.getDate() < 10) ? '0' : '') + object.getDate();
				var time = ((object.getHours() < 10) ? '0' : '') + (object.getHours()) + ':' + ((object.getMinutes() < 10) ? '0' : '') + (object.getMinutes()) + ':' + ((object.getSeconds() < 10) ? '0' : '') + object.getSeconds();
				content += space + '<font color="#f57900">[ Date ]</font><br />';
				content += arraySpace + ' <font color="#3465a4">Date</font> <font color="#888a85">=&gt;</font> ' + date + '<br / >';
				content += arraySpace + ' <font color="#3465a4">Time</font> <font color="#888a85">=&gt;</font> ' + time + '<br / >';
				break;
			case 'error':
				depth++;
				content += space + '<b>error</b><br />';
				for (key in object) {
					content += arraySpace + '\'' + jQuery.escapeHtml(key) + '\' <font color="#888a85">=&gt;</font> ' + _var_dump(object[key], depth, false);
				}
				break;
			case 'dom':
				content += space + '<font color="#f57900">[ DOM ]</font><br />';
				break;
			case 'jquery':
				content += space + '<font color="#f57900">[ jQuery ]</font><br />';
				content += arraySpace + ' <font color="#3465a4">size</font> <font color="#888a85">=&gt;</font> ' + object.size() + '<br / >';
				content += (object.size() === 1) ? arraySpace + ' <font color="#3465a4">tag </font> <font color="#888a85">=&gt;</font> ' + object.get(0).tagName.toLowerCase() + '<br / >': '';
				break;
			case 'XMLHttpRequest':
				content += space + '<font color="#f57900">[ XMLHttpRequest ]</font><br />';
				break;
			default:
				content += space + '<font color="#f57900">[???]</font><br />';
				break;
		}
		return content;
	}

//----------+[ jQuery extension ]+----------

	var _tagName = 'extend-function-tag';
	/**
	 * tag
	 * @param  {object} object object: set / no param: get / null: clear
	 * @return {object} null (this function does not provide jQuery method chain)
	 * @public
	 */
	jQuery.fn.tag = function(object) {
		if (typeof(object) === 'undefined') {
			// get
			return jQuery(this).data(_tagName);
		} else if (object === null) {
			// clear
			jQuery(this).removeData(_tagName);
			return null;
		} else {
			// set
			jQuery(this).data(_tagName, object);
			return null;
		}
	};

	/**
	 * money format
	 * @return {object} jQuery object
	 * @public
	 */
	jQuery.fn.money = function() {
		var tmp = '';
		return(
			this.each(function(idx, dom) {
				jQuery(this).on('focus', function(e) {
					var t = jQuery(this);
					tmp = jQuery.integer(t.val());
					t.val(tmp);
				}).on('blur', function(e) {
					var t   = jQuery(this);
					var val = t.val();
					t.val(jQuery.money(val));
					if (tmp !== val) {
						t.trigger('change');
					}
				});
			})
		);
	};

	/**
	 * money format
	 * @param  {string} str target string
	 * @return {string} money format string
	 * @public
	 */
	jQuery.money = function(str) {
		var v = parseInt(jQuery.toNumHalf(str + '').replace(/,/g, ''), 10);
		if (isNaN(v)) {
			v = '';
		} else {
			v = v.toLocaleString('ja-JP', {maximumFractionDigits: 0});
		}
		return v + '';
	};

	/**
	 * integer format
	 * @return {object} jQuery object
	 * @public
	 */
	jQuery.fn.integer = function() {
		return(
			this.each(function(idx, dom) {
				jQuery(this).on('blur', function(e) {
					var t   = jQuery(this);
					var val = t.val();
					var int = jQuery.integer(val);
					t.val(int);
					if (val !== int) {
						t.trigger('change');
					}
				});
			})
		);
	};

	/**
	 * integer format
	 * @param  {string} str target string
	 * @return {string} numeric string
	 * @public
	 */
	jQuery.integer = function(str) {
		var v = parseInt(jQuery.toNumHalf(str + '').replace(/,/g, ''), 10);
		if (isNaN(v)) {
			v = '';
		}
		return v + '';
	};

	/**
	 * dcecimal format
	 * @return {object} jQuery object
	 * @public
	 */
	jQuery.fn.dcecimal = function() {
		return(
			this.each(function(idx, dom) {
				jQuery(this).on('blur', function(e) {
					var t   = jQuery(this);
					var val = t.val();
					var dec = jQuery.dcecimal(val);
					t.val(dec);
					if (val !== dec) {
						t.trigger('change');
					}
				});
			})
		);
	};

	/**
	 * dcecimal format
	 * @param  {string} str target string
	 * @return {string} numeric string
	 * @public
	 */
	jQuery.dcecimal = function(str) {
		var v = parseFloat(jQuery.toNumHalf(str + '').replace(/,/g, ''), 10);
		if (isNaN(v)) {
			v = '';
		}
		return v + '';
	};

	/**
	 * figure format
	 * @return {object} jQuery object
	 * @public
	 */
	jQuery.fn.figure = function() {
		return(
			this.each(function(idx, dom) {
				jQuery(this).on('blur', function(e) {
					var t   = jQuery(this);
					var val = t.val();
					var fig = jQuery.figure(val);
					t.val(fig);
					if (val !== fig) {
						t.trigger('change');
					}
				});
			})
		);
	};

	/**
	 * figure format
	 * @param  {string} str target string
	 * @return {string} figure string
	 * @public
	 */
	jQuery.figure = function(str) {
		var v = jQuery.toNumHalf(str + '');
		var c = v.split('');
		for (var i = 0, l = c.length; i < l; i++) {
			if(c[i].match(/^[0-9\.\-\+#\(\)]+$/) === null) {
				c[i] = '';
			}
		}
		return c.join('');
	};

	/**
	 * zipcode format
	 * @return {object} jQuery object
	 * @public
	 */
	jQuery.fn.zipcode = function() {
		return(
			this.each(function(idx, dom) {
				jQuery(this).on('blur', function(e) {
					var t   = jQuery(this);
					var val = t.val();
					var zip = jQuery.zipcode(val);
					t.val(zip);
					if (val !== zip) {
						t.trigger('change');
					}
				});
			})
		);
	};

	/**
	 * zip code format
	 * @param  {string} str target string
	 * @return {string} zip code string
	 * @public
	 */
	jQuery.zipcode = function(str) {
		var v = jQuery.toNumHalf(str + '');
		var c = v.split('');
		for (var i = 0, l = c.length; i < l; i++) {
			if(c[i].match(/^[0-9\-]+$/) === null) {
				c[i] = '';
			}
		}
		return c.join('');
	};

	/**
	 * half format
	 * @return {object} jQuery object
	 * @public
	 */
	jQuery.fn.toHalf = function() {
		return(
			this.each(function(idx, dom) {
				jQuery(this).on('blur', function(e) {
					var t = jQuery(this);
					t.val(jQuery.toHalf(t.val())).trigger('change');
				});
			})
		);
	};

	/**
	 * half format
	 * @param  {string} str target string
	 * @return {string} half string
	 * @public
	 */
	jQuery.toHalf = function(str) {
		var v = jQuery.toNumHalf(str + '');
		var c = v.split('');
		for (var i = 0, l = c.length; i < l; i++) {
			if(c[i].match(/^[!-~]+$/) === null) {
				c[i] = '';
			}
		}
		return c.join('');
	};

	/**
	 * time format
	 * @return {object} jQuery object
	 * @public
	 */
	jQuery.fn.time = function() {
		var tmp = '';
		return(
			this.each(function(idx, dom) {
				jQuery(this).on('focus', function(e) {
					var t   = jQuery(this);
					var tmp = jQuery.toNumHalf(t.val()).replace(/:/g, '');
					t.val(tmp);
				}).on('blur', function(e) {
					var t   = jQuery(this);
					var val = _timeFormat(t.val());
					if (tmp !== val) {
						t.trigger('change');
					}
				});
			})
		);
	};

	/**
	 * time format
	 * @param  {string} time time string
	 * @return {string} time formated string
	 * @private
	 */
	function _timeFormat(time) {
		time += '';
		time = parseInt(jQuery.toNumHalf(time).replace(/:/g, ''), 10);
		if (isNaN(time)) {
			time = '';
		} else {
			var h, m, o;
			m  = time % 100;
			time -= m;
			h  = time / 100;
			if (h > -1 && h < 24 & m > -1 && m < 60) {
				time = jQuery.right('00' + h, 2) + ':' + jQuery.right('00' + m, 2);
			} else {
				time = '';
			}
		}
		return time;
	}

	/**
	 * date format
	 * @return {object} jQuery object
	 * @public
	 */
	jQuery.fn.date = function() {
		var tmp = '';
		return(
			this.each(function(idx, dom) {
				jQuery(this).on('focus', function(e) {
					var t   = jQuery(this);
					var tmp = jQuery.toNumHalf(t.val());
					t.val(tmp);
				}).on('blur', function(e) {
					var t   = jQuery(this);
					var val = _dateFormat(t.val());
					var p   = t.parent('.full-date');
					t.val(val);
					if (tmp !== val) {
						t.trigger('change');
					}
					if (p.length == 1 && jQuery.getType(p.datepicker) === 'function') {
						p.datepicker('update', val);
					}
				}).on('dblclick', function(e) {
					var t = jQuery(this);
					var v = jQuery.getToday();
					var p = t.parent('.full-date');
					t.val(v).trigger('change');
					if (p.length == 1 && jQuery.getType(p.datepicker) === 'function') {
						p.datepicker('update', v);
					}
				});
			})
		);
	};

	/**
	 * date format
	 * @param  {string} date date string
	 * @return {string} date formated string
	 * @private
	 */
	function _dateFormat(date) {
		date += '';
		date = parseInt(jQuery.toNumHalf(date).replace(/[\/\-]/g, ''), 10);
		if (isNaN(date)) {
			date = '';
		} else {
			var l, y, m, d;
			date += '';
			l = date.length;
			y = parseInt(date.substr(0, 4), 10);
			switch (l) {
				case 6:
					m = parseInt(date.substr(4, 1), 10);
					d = parseInt(date.substr(5, 1), 10);
					break;
				case 7:
					m = parseInt(date.substr(4, 2), 10);
					d = parseInt(date.substr(6, 1), 10);
					if (m < 1 || m > 12 || d < 1) {
						m = parseInt(date.substr(4, 1), 10);
						d = parseInt(date.substr(5, 2), 10);
					}
					break;
				case 8:
					m = parseInt(date.substr(4, 2), 10);
					d = parseInt(date.substr(6, 2), 10);
					break;
				default:
					date = '';
					break;
			}
			if (date !== '') {
				var check = new Date(y, (m - 1), d);
				if(
					check.getFullYear() === y       &&
					check.getMonth()    === (m - 1) &&
					check.getDate()     === d
				) {
					date = jQuery.right('0000' + y, 4) + '/' + jQuery.right('00' + m, 2) + '/' + jQuery.right('00' + d, 2);
				} else {
					date = '';
				}
			}
		}
		return date;
	}

	/**
	 * month format
	 * @return {object} jQuery object
	 * @public
	 */
	jQuery.fn.month = function() {
		var tmp = '';
		return(
			this.each(function(idx, dom) {
				jQuery(this).on('focus', function(e) {
					var t   = jQuery(this);
					var tmp = jQuery.toNumHalf(t.val());
					t.val(tmp);
				}).on('blur', function(e) {
					var t   = jQuery(this);
					var val = _monthFormat(t.val());
					var p   = t.parent('.full-month');
					t.val(val);
					if (tmp !== val) {
						t.trigger('change');
					}
					if (p.length == 1 && jQuery.getType(p.datepicker) === 'function') {
						p.datepicker('update', val);
					}
				}).on('dblclick', function(e) {
					var t = jQuery(this);
					var v = jQuery.getThisMonth();
					var p = t.parent('.full-month');
					t.val(v).trigger('change');
					if (p.length == 1 && jQuery.getType(p.datepicker) === 'function') {
						p.datepicker('update', v);
					}
				});
			})
		);
	};

	/**
	 * date format
	 * @param  {string} date date string
	 * @return {string} date formated string
	 * @private
	 */
	function _monthFormat(date) {
		date += '';
		date = parseInt(jQuery.toNumHalf(date).replace(/[\/\-]/g, ''), 10);
		if (isNaN(date)) {
			date = '';
		} else {
			var l, y, m;
			date += '';
			l = date.length;
			y = parseInt(date.substr(0, 4), 10);
			switch (l) {
				case 5:
					m = parseInt(date.substr(4, 1), 10);
					break;
				case 6:
					m = parseInt(date.substr(4, 2), 10);
					break;
				default:
					date = '';
					break;
			}
			if (date !== '') {
				var check = new Date(y, (m - 1), 1);
				if(
					check.getFullYear() === y       &&
					check.getMonth()    === (m - 1) &&
					check.getDate()     === 1
				) {
					date = jQuery.right('0000' + y, 4) + '/' + jQuery.right('00' + m, 2);
				} else {
					date = '';
				}
			}
		}
		return date;
	}

	/**
	 * to half
	 * @param  {string} str  target string
	 * @return {string} half string
	 */
	jQuery.toNumHalf = function(str) {
		var half = str.replace(/[！-～]/g, function(tmp) {
			return String.fromCharCode(tmp.charCodeAt(0) - 0xFEE0);
		});
		return half.replace(/”/g, '"').replace(/’/g, '\'').replace(/‘/g, '`').replace(/￥/g, '\\').replace(/　/g, ' ').replace(/〜/g, '~').replace(/ー/g, '-');
	};

})(jQuery);
