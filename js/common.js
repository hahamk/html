// 스르롤 이동
$(function() {
	var Offset = $('.pad').offset().top;
  $('.offset-pad').on('click', function() {
		$("html, body").animate({scrollTop: Offset}, 400);
	});
	$(window).resize(function() {
		 Offset = $('.pad').offset().top;
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
	var Offset = $('.menus').offset().top;
  $('.offset-menus').on('click', function() {
		$("html, body").animate({scrollTop: Offset}, 400);
	});
	$(window).resize(function() {
		 Offset = $('.menus').offset().top;
	});	
});
