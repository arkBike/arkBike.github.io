let header = $('header'),
	menu = header.find('nav > ul > li'),
	headerHeight = header.outerHeight(),
	newHeight = 0,
	subMenu = menu.find('ul');

subMenu.each(function(){
	if($(this).outerHeight() > newHeight){
		newHeight = headerHeight +$(this).outerHeight();
	}
});

menu.hover(
	function(){
		header.stop().animate({height: newHeight});
	},
	function(){
		header.stop().animate({height: headerHeight});
	}
);

$('.fa-magnifying-glass').click(function(){
	$('.main_search_modal').fadeIn().addClass('active'); 
	$('body').css({overflow:'hidden'});
	$('.main_search_modal input').focus();
});
$('.fa-x').click(function(){
	$('.main_search_modal').fadeOut().removeClass('active'); 
	$('body').css({overflow:'auto'});
});

let wind = $(window),
	scrollHeader = $('header'),
	headerOffsetTop = scrollHeader.offset().top;

	window.scroll(function(){
		if($(this).scrollTop() >= headerOffsetTop){
			scrollHeader.addClass('sticky');
		}
		else{
			scrollHeader.removeClass('sticky');
		}
	});


	// $('.mainslides').slick({
        
    // });
	$('.mainslides').slick();
	// $window.scroll(function(){
	// 	if($(this).scrolltop() > 100){
	// 		if(!$header.hasClass('samll')){
	// 			$header.addClass('samll');
	// 		}
	// 	}
	// 	else{
	// 		if($header.hasClass('samll')){
	// 			$header.removeClass('samll');
	// 		}
	// 	}
	// });

// $('.mainslides').bxSlider({
//     controls: false,
//     pager: false
// });