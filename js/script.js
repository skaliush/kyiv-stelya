$(document).ready(function() {
	$('[data-scroll*="#"]').click(function() {
		let $goalElem = $(this.dataset.scroll);
		if ($goalElem) {
			$('html, body').animate({
				scrollTop: $goalElem.offset().top
			}, 600);
		}
		return false;
	});
	$('.lightzoom').lightzoom({
		overlayOpacity: '0.7', // прозрачность фона
		isOverlayClickClosing: true, // true, если надо закрывать окно при клике по любой области
		isEscClosing: true, 
	});
});