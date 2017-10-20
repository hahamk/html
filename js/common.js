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
			opacity:.75
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
		show:function(element,rel) {
			$('iframe#player').attr('src',rel);
			var that = this;
			if(arguments.callee.caller == null)
				that._target = null;
			else {
				that._target = window.event || arguments.callee.caller.arguments[0];
				if(that._target != undefined)
					that._target = (that._target.srcElement) ? that._target.srcElement : that._target.target;
			}

			that.layer = $(element);

			if(that.layer.find('.mtb-scroll').length) {
				that.layer.find('.mtb-scroll').css({'max-height':($(window).height() - 100)});
			}
			Object.extend(that.layerStyle, {
				marginTop:(that.layer.height() / 2 * -1),
				marginLeft:(that.layer.width() / 2 * -1)
			});

			that.layer.css(that.layerStyle);
			if((navigator.userAgent.match(/SHV-E120/i)|| navigator.userAgent.match(/SHW-M250/i))&&Math.abs(parseInt(that.layer.find('.mtb-scroll').children().height() + 40)) > Math.abs(parseInt(that.layer.find('.mtb-scroll').css('max-height')))){
				that.layer.find('.mtb-scroll').css({'height':($(window).height() - 100)});
				that.layer.find('.mtb-scroll').wrapInner("<div class='iwrapper'><div class='iscroller'></div></div>");
				var myScroll = new IScroll('.iwrapper', {
					scrollbars: true,
					fadeScrollbars: true,
					checkDOMChanges:true,
					preventDefault: true
				});
				setTimeout(function(){ myScroll.enable();myScroll.refresh(); },1000);
			}


			if(!that.option.modalHide) {
				that.lightBox = $('<div />').appendTo('body').css(that.modalStyle);

				if(that.option.modalClose === true)
					that.lightBox.click($.proxy(that.hide, that));
			}
			$(window).bind('resize', $.proxy(that._document, that));
			var saveTop = $(window).scrollTop() * -1;
			$('html, body').scrollTop(0);
			$('body').css({'position':'fixed','top':saveTop,'left':'0','right':'0'});
			that.layer.find('.layer-close').bind('click', $.proxy(that.hide, that));

		},
		hide:function(element) {
			$('iframe#player').attr('src','');
			var that = this;

			if(element !== undefined && element[0] !== undefined) that.layer = $(element);

			if(!that.option.modalHide) {
				if(that.lightBox) that.lightBox.remove();
			}

			if(that.layer.find('.mtb-scroll').length) {
				that.layer.find('.mtb-scroll').attr('style','');
				if(navigator.userAgent.match(/SHV-E120/i) || navigator.userAgent.match(/SHW-M250/i)){
					that.layer.find('.iscroller').children().unwrap();
					that.layer.find('.iwrapper').children().unwrap();
					that.layer.find('.iScrollVerticalScrollbar').remove();
				}
			}

			that.layer.hide();
			$(window).unbind('resize', $.proxy(that._document, that));
			that.layer.find('.layer-close').unbind('click', $.proxy(that.hide, that));
			var yPos = Math.abs(parseInt($('body').css('top')));
			that.layer.attr('style','');
			$('body').attr('style','');
			$('html, body').scrollTop(yPos);
			return false;
		},
		hidepade:function(element) {
			var that = this;

			if(element !== undefined && element[0] !== undefined) that.layer = $(element);

			if(!that.option.modalHide) {
				if(that.lightBox) that.lightBox.remove();
			}

			if(that.layer.find('.mtb-scroll').length) {
				that.layer.find('.mtb-scroll').attr('style','');
				if(navigator.userAgent.match(/SHV-E120/i) || navigator.userAgent.match(/SHW-M250/i)){
					that.layer.find('.iscroller').children().unwrap();
					that.layer.find('.iwrapper').children().unwrap();
					that.layer.find('.iScrollVerticalScrollbar').remove();
				}
			}
			that.layer.fadeOut();
			$(window).unbind('resize', $.proxy(that._document, that));
			that.layer.find('.layer-close').unbind('click', $.proxy(that.hide, that));
			var yPos = Math.abs(parseInt($('body').css('top')));
			that.layer.attr('style','');
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

function setMain() {
	$('.tab a').each(function(idx) {
		$(this).click(function(e) {
			$('#contents').load($(this).attr('href') + ' #contents');			
			$('.tab a').removeClass('active');
			$(this).addClass('active');
			$('.tab span').removeClass().addClass('tab-'+idx);
			e.preventDefault();
			return false;
		});
	});

	$('#contents').on('click', '.event-info .btn-reply', function() {
		var offset = $('.reply').offset();
		$('html, body').animate({scrollTop : offset.top}, 700);
		return false;
	});
}


// tab
jQuery(function($){
	// Faced Tab Navigation
	var $tab_face = $('.tab.face');
	$tab_face.removeClass('jx').find('ul ul').hide();
	$tab_face.find('li li.active').parents('li').addClass('active');
	$tab_face.find('li.active>ul').show();
	function faceTabMenuToggle(event){
		var $this = $(this);
		$this.next('ul').show().parent('li').addClass('active').siblings('li').removeClass('active').find('>ul').hide();
		if($this.attr('href') === '#'){
			return false;
		}
	}
	function faceTabSubMenuActive(){
		$(this).parent('li').addClass('active').siblings('li').removeClass('active');
		if($this.attr('href') === '#'){
			return false;
		}
	}; 
	$tab_face.find('>ul>li>a').click(faceTabMenuToggle).focus(faceTabMenuToggle);
	$tab_face.find('li li>a').click(faceTabSubMenuActive).focus(faceTabSubMenuActive);
});

$(function() {
	var mySwiper = new Swiper('.swiper-container', {
    speed: 400,
		loop: true,
		pagination: '.swiper-pagination',
    paginationClickable: true,
		nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
	});   
});

