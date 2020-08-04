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
	let $lz_links = $('.lightzoom');
	if ($lz_links.lightzoom) {
		$lz_links.lightzoom({
			overlayOpacity: '0.7', // прозрачность фона
			isOverlayClickClosing: true, // true, если надо закрывать окно при клике по любой области
			isEscClosing: true, 
		});
	}
	$("#main-form-phone").inputmask({"mask": "+38 (999) 999-9999"});
	$(window).resize(unlightzoom);
	unlightzoom();
});
function unlightzoom(event) {
	if ($(window).width() <= 768 ) {
		$('.lightzoom').click(function(event) {
			event.preventDefault();
			let path = this.href;
			location.href = path;
			return false;
		});
	}
}
