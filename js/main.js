// 파일 업로드
let selectFile = document.querySelector('#select_file');
let selectFileBtn = document.querySelector('#select_file_btn');

function defaultBtnActive(){
	selectFile.click();
}

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
	$('body').css({overflow: 'hidden'});
	$('.main_search_modal input').focus();
});
$('.fa-x').click(function(){
	$('.main_search_modal').fadeOut().removeClass('active'); 
	$('body').css({overflow: 'auto'});
});

$('.lang_select li').click(function(){
	$('.lang_select .lang_selection').toggleClass('selected');
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

// 커리어 검색 페이지 셀렉트 메뉴, 푸터 하단 패밀리 사이트 드롭업 메뉴
$('.selected_list, .selection_main_header').click(function(event){
	event.preventDefault();
	event.stopPropagation();
	$('.select_dropdown, .dropup').stop().fadeOut('fast');
	$(this).next('.select_dropdown, .dropup').stop().fadeToggle('fast');
});
$('.select_dropdown li').click(function(e){
	e.preventDefault();
	let x = $(this).text();
	$(this).parents('.select_dropdown').hide();
	$(this).parents('.selection').find('.selected_list a').text(x);
});
$(document).click(function(){
	$('.select_dropdown, .dropup').hide();
});

// 반응형 아코디언 메인 메뉴
$('.toggle_open_btn').click(function(){
	$('.response_toggle_menu').fadeToggle('fast');
});

$('.response_dropdown').hide();
$('.response_mainmenu li a').click(function(){
    $(this).next().slideToggle(300);
	$('.response_mainmenu li a').not(this).next().slideUp(300);
});

$('.response_mainmenu li a').click(function(e){
	e.preventDefault();
});

$(window).resize(function(){
	if($(window).width() > 768){
		$('.response_toggle_menu').css({'display': 'none'});
	}
});

// 반응형 아코디언 메인 메뉴 고정
let reponseToggleMenu = $('.response_toggle_menu');
$(window).scroll(function(){
	if($(this).scrollTop() > 0 ){
		reponseToggleMenu.addClass('reponse_sticky');
	}
	else{
		reponseToggleMenu.removeClass('reponse_sticky');
	}
});

// AOS
AOS.init({
	offset: 350,
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
        e.preventDefault();
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

// Info section 넘버 애니메이션
let counters = document.querySelector('.info_section');
let counterNums = counters.querySelectorAll('.icons .number');

let countersOST = counters.offsetTop - 400;
let excuted = false;

window.addEventListener('scroll', ()=>{
	let winSCT = window.scrollY;
	let speed = 30;
	if(winSCT > countersOST){
		if(!excuted){
			counterNums.forEach(item => {
				let targetNum = item.getAttribute('data-target');
				if(targetNum > 100){
					speed = 15;
				}
				else if(targetNum < 20 ){
					speed = 100;
				}
				let num = 0;
				let numAnime = setInterval(()=> {
					++num;
					item.innerText = num;
					if(num == targetNum){
						clearInterval(numAnime);
					}
				}, speed);
			});
			excuted = true;
		}
	}
});

// 쿠키 및 팝업 모달 닫기
let popup = document.querySelector('.popup');
let popupCheck = document.querySelector('#popup');
let popupClose = document.querySelector('#close_btn');

function setCookie(name, value, day){
    let date = new Date();
    date.setDate(date.getDate() + day);

    let cookieContent = '';
    cookieContent += `${name}=${value};`;
    cookieContent += `Expires=${date.toUTCString()}`;            

    document.cookie = cookieContent;
}

function getCookie(name){
    let visited = false;
    let cookies = document.cookie.split(';'); 

    for(let cookie of cookies){
        if(cookie.indexOf(name) > -1){
            visited = true;
        }
    }
    if(visited){
        popup.style.display = 'none'; 
    }else{
        popup.style.display = 'block'; 
    }
}
getCookie('S&K');

function delCookie(name,value){            
    let date = new Date();
    date.setDate(date.getDate() - 1);

    let cookieContent = '';
    cookieContent += `${name} = ${value};`;
    cookieContent += `Expires = ${date.toUTCString()}`;            

    document.cookie = cookieContent;
}

popupClose.addEventListener('click', ()=>{
    popup.style.display = 'none';
    if(popupCheck.checked){
        setCookie('S&K', 'MainPage', 1);
    }else{
        delCookie('S&K', 'MainPage');
    }
});