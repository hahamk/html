var FG_layerPopup_etc;
(function() {
	var LAYER_POPUP_etc = function() {
		this.modalStyle = {
			position:'absolute',
			top:0,
			left:0,
			right:0,
			zIndex:99,
			height:this._size.oHeight
		};
		this.layerStyle = {
			display:'block',
			position:'fixed',
			left:'50%',
			top:'50%',
			zIndex:100
		};
		this.option = {
			modalHide:false,
			modalClose:false
		};

		this._target = null;
	};

	LAYER_POPUP_etc.prototype = {
		_size:{
			cWidth:document.documentElement.clientWidth,
			cHeight:document.documentElement.clientHeight,
			oHeight:function() {
				return Math.max(
					Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
					Math.max(document.body.offsetHeight, document.documentElement.offsetHeight),
					Math.max(document.body.clientHeight, document.documentElement.clientHeight)
				);
			}
		},
		show:function(element) {
			var that = this;
			if(arguments.callee.caller == null)
				that._target = null;
			else {
				that._target = window.event || arguments.callee.caller.arguments[0];
				if(that._target != undefined)
					that._target = (that._target.srcElement) ? that._target.srcElement : that._target.target;
			}

			that.layer = $(element);

			Object.extend(that.layerStyle, {
				marginTop:(that.layer.height() / 2 * -1),
				marginLeft:(that.layer.width() / 2 * -1)
			});

			that.layer.css(that.layerStyle);

			if(!that.option.modalHide) {
				that.lightBox = $('<div />').appendTo('body').css(that.modalStyle).addClass('modalLayer');

				if(that.option.modalClose === true)
					that.lightBox.click($.proxy(that.hide, that));
			}
			that.layer.find('.layer-close').bind('click', $.proxy(that.hide, that));
		},
		hide:function(element) {
			var that = this;

			if(element !== undefined && element[0] !== undefined) that.layer = $(element);

			if(!that.option.modalHide) {
				if(that.lightBox) that.lightBox.remove();
			}
			that.layer.hide();

			return false;
		},
		hidepade:function(element) {
			var that = this;

			if(element !== undefined && element[0] !== undefined) that.layer = $(element);

			if(!that.option.modalHide) {
				if(that.lightBox) that.lightBox.remove();
			}
			that.layer.fadeOut();

			return false;
		}
	};

	window.LAYER_POPUP_etc = LAYER_POPUP_etc;

	return {
		load:function() {
			FG_layerPopup_etc = new LAYER_POPUP_etc();
		}
	}
})().load();

function getIsIE() {
	var agent = navigator.userAgent.toLowerCase();
 
	if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1)) return true;
	else return false;
}

$(function() {
	$('.bxslider').bxSlider({
		pagerCustom: '.bx-pager',
		onSlideBefore: function(s, o_idx, n_idx) {
			if(n_idx == 0 || n_idx == 5 || n_idx == 6 || n_idx == 7) {
				$('.bx-controls').removeClass('bullet');
			} else {
				$('.bx-controls').addClass('bullet');
			}
		},
		onSlideAfter: function(s, o_idx, n_idx) {
			$('.bxslider li').removeClass('active');
			$('.bxslider .slide-'+(n_idx+1)).addClass('active');
		}
	});
	
});
