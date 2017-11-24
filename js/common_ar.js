// extend Object. inspired by Prototype.
Object.extend = function(target, source) {
	for (var property in source)
		target[property] = source[property];
	return target;
};

var FG_layerPopup;
(function() {
	var LAYER_POPUP = function() {
		this.modalStyle = {
			position:'absolute',
			top:0,
			left:0,
			right:0,
			zIndex:99,
			height:this._size.oHeight,
			backgroundColor:'#000',
			opacity:.9
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

	LAYER_POPUP.prototype = {
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
		show:function(element, url) {
			var that = this;
			if(typeof url == "undefined") url = null;
			if(arguments.callee.caller == null)
				that._target = null;
			else {
				that._target = window.event || arguments.callee.caller.arguments[0];
				if(that._target != undefined)
					that._target = (that._target.srcElement) ? that._target.srcElement : that._target.target;
			}

			that.layer = $(element);

			//youtube 
			if(url != null) {
				that.layer.find('#player').attr('src', url);
			}

			that.layer.find('.mtb-scroll').css({'max-height':($(window).height() - 100)});
			Object.extend(that.layerStyle, {
				marginTop:(that.layer.height() / 2 * -1),
				marginLeft:(that.layer.width() / 2 * -1)
			});

			that.layer.css(that.layerStyle);

			if(!that.option.modalHide) {
				that.lightBox = $('<div />').appendTo('body').css(that.modalStyle);

				if(that.option.modalClose === true)
					that.lightBox.click($.proxy(that.hide, that));
			}
			$(window).bind('resize', $.proxy(that._document, that));
			$('body').css({'position':'fixed','top':($(window).scrollTop() * -1),'left':'0','right':'0'});
			that.layer.find('.layer-close').bind('click', $.proxy(that.hide, that));

		},
		hide:function(element) {
			var that = this;

			if(element !== undefined && element[0] !== undefined) that.layer = $(element);

			if(!that.option.modalHide) {
				if(that.lightBox) that.lightBox.remove();
			}

			that.layer.hide();
			$(window).unbind('resize', $.proxy(that._document, that));
			var offset = $('body').offset();
			var yPos = Math.abs(offset.top);
			$('body').attr('style','');
			$('html, body').scrollTop(yPos);
			that.layer.find('#player').attr('src', '');
			return false;
		},
		hidepade:function(element) {
			var that = this;

			if(element !== undefined && element[0] !== undefined) that.layer = $(element);

			if(!that.option.modalHide) {
				if(that.lightBox) that.lightBox.remove();
			}

			that.layer.fadeOut();
			var offset = $('body').offset();
			var yPos = Math.abs(offset.top);
			$('body').attr('style','');
			$('html, body').scrollTop(yPos);			
			return false;
		},
		_document:function(element) {
			var that = this;
			that.layer.find('.mtb-scroll').css({'max-height':($(window).height() - 100)});
			if(element !== undefined && element[0] !== undefined) that.layer = $(element);
			that.layer.css({'margin-left':(that.layer.width() / 2 * -1),'margin-top':(that.layer.height() / 2 * -1)});
			if(!that.option.modalHide) {
				if(that.lightBox) that.lightBox.remove();
				that.lightBox = $('<div />').appendTo('body').css(that.modalStyle);
			}
		}
	};

	window.LAYER_POPUP = LAYER_POPUP;

	return {
		load:function() {
			FG_layerPopup = new LAYER_POPUP();
		}
	}
})().load();


function doOpenCheck(chk){
    var obj = document.getElementsByName("checkbox");
    for(var i=0; i<obj.length; i++){
        if(obj[i] != chk){
            obj[i].checked = false;
        }
    }
}

// 스르롤 이동
$(function() {
	var Offset = $('.voice').offset().top;
  $('.offset-voice').on('click', function() {
		$("html, body").animate({scrollTop: Offset}, 400);
	});
	$(window).resize(function() {
		 Offset = $('.voice').offset().top;
	});	
});
//
$(function() {
	var Offset = $('.volume').offset().top;
  $('.offset-volume').on('click', function() {
		$("html, body").animate({scrollTop: Offset}, 400);
	});
	$(window).resize(function() {
		 Offset = $('.volume').offset().top;
	});	
});
//
$(function() {
	var Offset = $('.playlist').offset().top;
  $('.offset-playlist').on('click', function() {
		$("html, body").animate({scrollTop: Offset}, 400);
	});
	$(window).resize(function() {
		 Offset = $('.playlist').offset().top;
	});	
});
//
$(function() {
	var Offset = $('.lyrics').offset().top;
  $('.offset-lyrics').on('click', function() {
		$("html, body").animate({scrollTop: Offset}, 400);
	});
	$(window).resize(function() {
		 Offset = $('.lyrics').offset().top;
	});	
});
//
$(function() {
	var Offset = $('.menus').offset().top;
  $('.offset-menus').on('click', function() {
		$("html, body").animate({scrollTop: Offset}, 400);
	});
	$(window).resize(function() {
		 Offset = $('.menus').offset().top;
	});	
});
