const form_url = 'telegram.php'

function ajax(data, success_fuc = null) {
	$.ajax({
		type: 'POST',
		url: form_url,
		data,
		success: function (result) {
			if (result !== 'success') {
				alert('Ошибка отправки формы!')
			} else {
				if (success_fuc !== null) {
					success_fuc()
				}
				thank_you()
			}
		},
		error: function () {
			alert('Ошибка отправки формы!')
		},
	})
}

function unlightzoom() {
	if ($(window).width() <= 768) {
		$('.lightzoom').click(function (event) {
			event.preventDefault()
			location.href = this.href
			return false
		})
	}
}

function thank_you() {
	window.location = '/thankyou.html'
}

function hide_popup() {
	// $('.popup').fadeOut();
}

function show_popup() {
	// $('.popup').fadeIn();
}

$(document).ready(function () {
	$('[data-scroll*="#"]').click(function () {
		let $goalElem = $(this.dataset.scroll)
		if ($goalElem) {
			$('html, body').animate({
				scrollTop: $goalElem.offset().top,
			}, 600)
		}
		return false
	})
	let $type_btn = document.getElementById('type_form_btn')
	if ($type_btn) {
		$type_btn.onclick = e => {
			e.preventDefault()
			let name = document.getElementById('main-form-name').value.trim(),
				phone = document.getElementById('main-form-phone').value.replace(/[^+\d]/g, '')
			if (name !== '' && phone.length === 13 && ceiling_type !== '') {
				ajax({
					type: 'modal',
					name: name,
					phone: phone,
					ceiling_type,
				}, () => {
					document.getElementById('type_form').reset()
					show_popup()
				})
			}
			return false
		}
	}
	let $about_btn = document.getElementById('about_form_btn')
	if ($about_btn) {
		$about_btn.onclick = e => {
			e.preventDefault()
			let name = document.getElementById('main-form-name').value.trim(),
				phone = document.getElementById('main-form-phone').value.replace(/[^+\d]/g, '')
			if (name !== '' && phone.length === 13) {
				ajax({
					type: 'request',
					name, phone,
				}, () => {
					document.getElementById('about_form').reset()
					show_popup()
				})
			}
			return false
		}
	}
	let $lz_links = $('.lightzoom')
	if ($lz_links.lightzoom) {
		$lz_links.lightzoom({
			overlayOpacity: '0.7', // прозрачность фона
			isOverlayClickClosing: true, // true, если надо закрывать окно при клике по любой области
			isEscClosing: true,
		})
	}
	let $input = $('#main-form-phone')
	if ($input.inputmask) {
		$input.inputmask({'mask': '+38 (999) 999-9999'})
	}
	// Popup
	$('.popup-close').click(function (e) {
		e.preventDefault()
		hide_popup()
	})
	$('.popup').click(function (e) {
		e.preventDefault()
		if (!e.target.closest('.popup-box')) {
			hide_popup()
		}
	})
	$(window).resize(unlightzoom)
	unlightzoom()
})
