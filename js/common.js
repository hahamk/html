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
	var Offset = $('.main').offset().top;
  $('.offset-main').on('click', function() {
		$("html, body").animate({scrollTop: Offset}, 400);
	});
	$(window).resize(function() {
		 Offset = $('.voice').offset().top;
	});	
});
//
$(function() {
	var Offset = $('.chart').offset().top;
  $('.offset-chart').on('click', function() {
		$("html, body").animate({scrollTop: Offset}, 400);
	});
	$(window).resize(function() {
		 Offset = $('.chart').offset().top;
	});	
});
//
$(function() {
	var Offset = $('.tv').offset().top;
  $('.offset-tv').on('click', function() {
		$("html, body").animate({scrollTop: Offset}, 400);
	});
	$(window).resize(function() {
		 Offset = $('.tv').offset().top;
	});	
});
//
$(function() {
	var Offset = $('.genius').offset().top;
  $('.offset-genius').on('click', function() {
		$("html, body").animate({scrollTop: Offset}, 400);
	});
	$(window).resize(function() {
		 Offset = $('.genius').offset().top;
	});	
});
//
$(function() {
	var Offset = $('.info').offset().top;
  $('.offset-info').on('click', function() {
		$("html, body").animate({scrollTop: Offset}, 400);
	});
	$(window).resize(function() {
		 Offset = $('.info').offset().top;
	});	
});
//
$(function() {
	var Offset = $('.search').offset().top;
  $('.offset-search').on('click', function() {
		$("html, body").animate({scrollTop: Offset}, 400);
	});
	$(window).resize(function() {
		 Offset = $('.search').offset().top;
	});	
});
//
$(function() {
	var Offset = $('.mplayer').offset().top;
  $('.offset-mplayer').on('click', function() {
		$("html, body").animate({scrollTop: Offset}, 400);
	});
	$(window).resize(function() {
		 Offset = $('.mplayer').offset().top;
	});	
});
//
$(function() {
	var Offset = $('.set').offset().top;
  $('.offset-set').on('click', function() {
		$("html, body").animate({scrollTop: Offset}, 400);
	});
	$(window).resize(function() {
		 Offset = $('.set').offset().top;
	});	
});



window.counter = function() {
	// this refers to the html element with the data-scroll-showCallback tag
		var span = this.querySelector('span');
		var current = parseInt(span.textContent);
			
			span.textContent = current + 1;
		};
		document.addEventListener('DOMContentLoaded', function(){
		  var trigger = new ScrollTrigger({
			  addHeight: true
		  });
		});
		
		