$(document).ready(function(){

	// slick slider advantages settings
	$('.slider-main').slick({
		  infinite: true,
		  slidesToShow: 4,
	     slidesToScroll: 1,
	     arrows: false,
	     prevArrow: "<img src='../img/hotpng.com.png' class='prev' alt='previous slide'>",
	     nextArrow: "<img src='../img/hotpng.com.png' class='next' alt='next slide'>",
		  responsive: [ 
		  	{
		  		breakpoint: 767,
	      	settings: {
	        		slidesToShow: 1,
	        		slidesToScroll: 1,
	        		arrows: true,
				}
			}, 
			{
		  		breakpoint: 991,
	      	settings: {
	        		slidesToShow: 2,
	        		slidesToScroll: 2,
	        		arrows: true,
				}
			}, 
		]
	});
	// end slick slider advantages settings

	// slick slider feedback
	$('.feedback-slider').slick({
	  prevArrow: "<img src='../img/feedback/feedback_arrow.png' class='prev' alt='previous slide'>",
	  nextArrow: "<img src='../img/feedback/feedback_arrow.png' class='next' alt='previous slide'>",
	});
	// end slick slider feedback

	// Fotorama feedback gallery
	$('.review-gallery').fotorama({
	  allowfullscreen: true,
	  nav: 'thumbs'
	});
	// end Fotorama feedback gallery

	// Popup Get Contacts show/hide
	$('.popup-get-contacts-show').on('click', function(event) {
		event.preventDefault();

		// Calculate scroll width
		let div = document.createElement('div');

			div.style.overflowY = 'scroll';
			div.style.width = '50px';
			div.style.height = '50px';

			document.body.append(div);
			let scrollWidth = div.offsetWidth - div.clientWidth;

		div.remove();

		// Hide overflow 
		$('body').css({
			overflow: 'hidden',
			'padding-right': scrollWidth,
		});
		$('.popup-get-contacts').fadeIn();
	});

	$('.popup-get-contacts .popup-close').on('click', function(event) {
		event.preventDefault();

		$('.popup-get-contacts').fadeOut(400);
		// Timeout to prevent twitching of the modal window
		setTimeout(function() {
			$('body').css({
				'overflow-y': 'scroll',
				'padding-right': 0,
			});
		}, 400)
		
	});

	$('.button').on('click', function(e) {
		e.preventDefault();
	});

});


// Отправка данных на сервер
function send(event, php){
console.log("Отправка запроса");
event.preventDefault ? event.preventDefault() : event.returnValue = false;
var req = new XMLHttpRequest();
req.open('POST', php, true);
req.onload = function() {
	if (req.status >= 200 && req.status < 400) {
	json = JSON.parse(this.response); // Ебанный internet explorer 11
    	console.log(json);
        
    	// ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
    	if (json.result == "success") {
    		// Если сообщение отправлено
    		alert("Сообщение отправлено");
    	} else {
    		// Если произошла ошибка
    		alert("Ошибка. Сообщение не отправлено");
    	}
    // Если не удалось связаться с php файлом
    } else {alert("Ошибка сервера. Номер: "+req.status);}}; 

// Если не удалось отправить запрос. Стоит блок на хостинге
req.onerror = function() {alert("Ошибка отправки запроса");};
req.send(new FormData(event.target));
};

