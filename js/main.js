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

	let $header = $('header');

	$(window).scroll(function(){
		if($(this).scrollTop() > 0 ){
			$header.addClass('sticky');
		}
		else{
			$header.removeClass('sticky');
		}
	});

	let newsSection = document.querySelector('.news_list');
	let newsSectionOST = newsSection.offsetTop + 200;
	console.log(newsSectionOST);
	

	window.addEventListener('scroll', ()=>{
		let windSCT = window.scrollY;
		if(windSCT > newsSectionOST){
			newsSection.classList.add('news_active');
		}
		else{
			newsSection.classList.remove('news_active');
		}
	})


	// $('.mainslides').slick({
        
    // });
	// $('.mainslides').slick();