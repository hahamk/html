var Swiper_4;

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

// 그래프 JS
$(function() {
    $(".pie").each(function() {
        var percent = $(this).data("percent"),
            $left = $(this).find(".left span"),
            $right = $(this).find(".right span"),
            deg;
        
        if(percent<=50) {
            // Hide left
            $left.hide();
            
            // Adjust right
            deg = 180 - (percent/100*360)
            $right.css({
                "-webkit-transform": "rotateZ(-"+deg+"deg)"
            });
        } else {
            // Adjust left
            deg = 180 - ((percent-50)/100*360)
            $left.css({
                "-webkit-transform": "rotateZ(-"+deg+"deg)"
            });
        }
    });
});

// 발자국 JS
$(function() {
	$(".vestige-content").hide();
	$(".vestige-content:first").show();
	$("ul.boxs li").click(function () {
		$("ul.boxs li").removeClass("active").css("color", "#363127");
		//$(this).addClass("active").css({"color":"darkred","font-weight":"bolder"});
		$(this).addClass("active").css("color", "#ffffff");
		$(".vestige-content").hide()
		var activebox = $(this).attr("rel");
		$("#" + activebox).fadeIn()
	});
});

// 안내사항 JS
	$(".caution-head").click(function(){
		$(".caution-body").slideToggle('fast',
			function(){
				if($(".caution-body").css('display') != 'none'){
				$(".caution-head").addClass("caution-on");
				}else{
					$(".caution-head").removeClass("caution-on");
				}
		}
	);
});
$(".caution-head").click(function(){
	var offset = $(".caution-head").offset();
  $('html,body').delay(200).animate({scrollTop : offset.top}, 300);
});

// SWIPER JS
function swiperjs1(){
	var swiper_1 = new Swiper('.swiper-container', {

		pagination: '.swiper-pagination',
		slidesPerView: 2.8, // 보이는 메뉴수
		paginationClickable: true,
		spaceBetween: 0,
		freeMode: true,
		pagination: false
	});

	$('.tabs > li > a').on('click', function(e){
	$(this).parent().addClass('active').siblings().removeClass('active');
		var tabIdx = $(this).parent().index();
		swiper_2.slideTo(tabIdx+1, 300);
		e.preventDefault();
	});

	var tabLen = $('.tabs > li').length;

	var swiper_2 = new Swiper('.swiper-container-2', {
		autoHeight: true,
		slidesPerView: 1,
		spaceBetween: 0,
		pagination: false,
		loop: true,
		onInit: function(swiper){},
		onSlideChangeStart: function(swiper){
			var idx = swiper.activeIndex-1;
			if( idx < 0 ) { 
			idx = tabLen - 1;
			} else if( idx == tabLen ){
			idx = 0;
			}
			$('.tabs > li').removeClass('active').eq(idx).addClass('active');
			if( idx < tabLen ) {
			swiper_1.slideTo(idx-1, 300);
			}
		}
	});
}

function swiperjs2(){
	var swiper_3 = new Swiper('.swiper-container', {

		pagination: '.swiper-pagination',
		slidesPerView: 2.5, // 보이는 메뉴수
		paginationClickable: true,
		spaceBetween: 0,
		freeMode: true,
		pagination: false
	});

	$('.tabs > li > a').on('click', function(e){
	$(this).parent().addClass('active').siblings().removeClass('active');
		var tabIdx = $(this).parent().index();
		Swiper_4.slideTo(tabIdx+1, 300);
		e.preventDefault();
	});

	var tabLen = $('.tabs > li').length;

	Swiper_4 = new Swiper('.swiper-container-2', {
		autoHeight: true,
		slidesPerView: 1,
		spaceBetween: 0,
		pagination: false,
		loop: true,
		onInit: function(swiper){},
		onSlideChangeStart: function(swiper){
			var idx = swiper.activeIndex-1;
			if( idx < 0 ) { 
			idx = tabLen - 1;
			} else if( idx == tabLen ){
			idx = 0;
			}
			$('.tabs > li').removeClass('active').eq(idx).addClass('active');
			if( idx < tabLen ) {
			swiper_3.slideTo(idx-1, 300);
			}
		},
		// css 모션
		onTransitionEnd: function(swiper){
			var idx = swiper.activeIndex % 6;
			if(idx == 1){
				// alert('첫번째페이지');
			$(".all-music-full").addClass( "full-up" );
			$(".all-music-txt p").addClass( "fade" );
			$(".all-music-txt strong").addClass( "fade" );
			$(".all-music-txt span").addClass( "fade" );
			} else if (idx == 5){
				// alert('다섯번째 페이지');		
					$(".like-artist5").addClass( "full-left5" );
					$(".like-artist4").addClass( "full-left4" );
					$(".like-artist3").addClass( "full-left3" );
					$(".like-artist2").addClass( "full-left2" );
					$(".like-artist1").addClass( "full-left1" );
					$(".like-num1").addClass( "fade" );
					$(".like-num2").addClass( "fade" );
					$(".like-num3").addClass( "fade" );
					$(".like-num4").addClass( "fade" );
					$(".like-num5").addClass( "fade" );
			} else {
					// alert('나머지페이지');
					$(".all-music-full").removeClass( "full-up" );
					$(".all-music-txt p").removeClass( "fade" );
					$(".all-music-txt strong").removeClass( "fade" );
					$(".all-music-txt span").removeClass( "fade" );
					$(".like-num1").removeClass( "fade" );
					$(".like-num2").removeClass( "fade" );
					$(".like-num3").removeClass( "fade" );
					$(".like-num4").removeClass( "fade" );
					$(".like-num5").removeClass( "fade" );
					$(".like-artist5").removeClass( "full-left5" );
					$(".like-artist4").removeClass( "full-left4" );
					$(".like-artist3").removeClass( "full-left3" );
					$(".like-artist2").removeClass( "full-left2" );
					$(".like-artist1").removeClass( "full-left1" );
					}
		}	
		// css 모션 end
	});

	var swiper_5 = new Swiper('.swiper-container-sub', {
		slidesPerView: 1,
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
	});
}

// 글자자르기
function textS(){

$('.play-info-toplist strong').each(function(){  
	var length = 15;		
	$(this).each(function(){
		if( $(this).text().length >= length ){
			$(this).text($(this).text().substr(0,length)+'...');
		}
	});
});


$('.play-info strong').each(function(){  
	var length = 10;		
	$(this).each(function(){
		if( $(this).text().length >= length ){
			$(this).text($(this).text().substr(0,length)+'...');
		}
	});
});

$('.play-info span').each(function(){  
	var length = 15;		
	$(this).each(function(){
		if( $(this).text().length >= length ){
			$(this).text($(this).text().substr(0,length)+'...');
		}
	});
});

$('.review-txt p').each(function(){  
	var length = 35;		
	$(this).each(function(){
		if( $(this).text().length >= length ){
			$(this).text($(this).text().substr(0,length)+'...');
		}
	});
});

$('.review-txt p').each(function(){  
	var length = 31;		
	$(this).each(function(){
		if( $(this).text().length >= length ){
			$(this).text($(this).text().substr(0,length)+'...');
		}
	});
});

$('.review-music-txt p').each(function(){  
	var length = 13;		
	$(this).each(function(){
		if( $(this).text().length >= length ){
			$(this).text($(this).text().substr(0,length)+'...');
		}
	});
});

$('.review-music-txt span').each(function(){  
	var length = 15;		
	$(this).each(function(){
		if( $(this).text().length >= length ){
			$(this).text($(this).text().substr(0,length)+'...');
		}
	});
});

$('.play-info-top5-tag').each(function(){  
	var length = 18;		
	$(this).each(function(){
		if( $(this).text().length >= length ){
			$(this).text($(this).text().substr(0,length)+'');
		}
	});
});

$('.play-info-toplist strong').each(function(){  
	var length = 15;		
	$(this).each(function(){
		if( $(this).text().length >= length ){
			$(this).text($(this).text().substr(0,length)+'...');
		}
	});
});

}

