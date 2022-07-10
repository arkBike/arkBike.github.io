// 상단 메뉴바
let header = $('header'),
	menu = header.find('nav > ul > li'),
	headerHeight = header.outerHeight(),
	newHeight = 0,
	subMenu = menu.find('ul');

subMenu.each(function(){
	if($(this).outerHeight() > newHeight){
		newHeight = headerHeight + $(this).outerHeight();
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

// 검색 모달
$('.fa-magnifying-glass').click(function(){
	$('.main_search_modal').fadeIn().addClass('active'); 
	$('body').css({overflow:'hidden'});
	$('.main_search_modal input').focus();
});
$('.fa-x').click(function(){
	$('.main_search_modal').fadeOut().removeClass('active'); 
	$('body').css({overflow:'auto'});
});

// 상단 메뉴바 고정
let $header = $('header');

$(window).scroll(function(){
	if($(this).scrollTop() > 0 ){
		$header.addClass('sticky');
	}
	else{
		$header.removeClass('sticky');
	}
});

// Back to Top 버튼
let btn = $('.btt');

$(window).scroll(function(){
	if($(window).scrollTop() > 300){
		btn.addClass('show');
	}
	else{
		btn.removeClass('show');
	}
});
btn.click(function(e){
	e.preventDefault();
	$('html, body').animate({scrollTop: 0}, '300');
});

let toggleBtn = $('.toggle_btn');

toggleBtn.click(function(){
	$('.response_toggle_menu').addClass('active_toggle');
});

// AOS
AOS.init({
	offset: 400,
	duration: 1000,
	once: true
});

// 메인 슬라이드
let mainsSlides = document.querySelector('.mainslides'),
	slideContainer = mainsSlides.querySelector('.slides'),
	slides = slideContainer.querySelectorAll('.slides_items')
	slideCount = slides.length,
	currentIdx = 0,
	pager = mainsSlides.querySelector('.pager'),
	pagerHTML = '';
let timer;

if(slideCount > 0){
	slides.forEach(function(item, index){
		item.style.left = `${index * 100}%`;
		pagerHTML += `<a href="">${index}</a>`;
	});
}
pager.innerHTML = pagerHTML;
let pagerBtn = pager.querySelectorAll('a');

function goToSlide(idx){
	slideContainer.style.left = `${idx * -100}%`;
	currentIdx = idx;

	for(pb of pagerBtn){
        pb.classList.remove('pager_active');
    }
	pagerBtn[currentIdx].classList.add('pager_active');

	for(sl of slides){
        sl.classList.remove('active');
        slides[currentIdx].classList.add('active');
    }
}
goToSlide(0);

pagerBtn.forEach((item, index)=>{
    item.addEventListener('click', (e)=>{
        e.preventDefault()
        goToSlide(index);
    });
})

function startAutoSlide(){
    timer = setInterval(()=>{
        let nextSlide = (currentIdx + 1) % slideCount
        goToSlide(nextSlide);
    }, 5000);
}
startAutoSlide();

mainsSlides.addEventListener('mouseover', ()=>{
    clearInterval(timer);
});
mainsSlides.addEventListener('mouseout', ()=>{
    startAutoSlide();
});