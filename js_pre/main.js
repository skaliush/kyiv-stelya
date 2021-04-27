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

function thank_you() {
	window.location = '/thankyou.html'
}

$(document).ready(function () {
	$('.preloader-wrap').find('.preloader').fadeOut().end().delay(400).fadeOut('slow')
	// Pretty Links
	$('a[href^="#"]').bind('click.smoothscroll', function (e) {
		e.preventDefault()

		var target = this.hash,
			$target = $(target)

		$('html, body').stop().animate({
			'scrollTop': $target.offset().top,
		}, 500, 'swing', function () {
			// window.location.hash = target;
		})
	})

	// Form
	$('#main-form-phone').inputmask({'mask': '+38 (999) 999-9999'})
	document.getElementById('send-request').addEventListener('click', function (e) {
		e.preventDefault()
		let name = document.getElementById('main-form-name').value
		let phone = document.getElementById('main-form-phone').value.replace(/[^+\d]/g, '')
		if (name !== '' && phone.length === 13) {
			ajax({
				type: 'request',
				name: name,
				phone: phone,
			}, function () {
				document.getElementById('main-form-name').value = ''
				document.getElementById('main-form-phone').value = ''
			})
		}
	})

	// Calculator
	let steps = document.querySelectorAll('.step')
	let current_step = 1

	let data = {
		type: 'calculator',
		square: '25',
		ceiling_type: '1',
		extra_elements: [],
		contact_type: '4',
		phone: '',
	}

	function validate_square() {
		return (parseInt(data.square) > 5 && parseInt(data.square) <= 50)
	}

	function validate_type() {
		return (data.ceiling_type > 0 && data.ceiling_type <= 8)
	}

	function validate_contact_type() {
		return (data.contact_type > 0 && data.contact_type <= 4)
	}

	function validate_phone() {
		const valid = data.phone.length === 13
		if (!valid) {
			alert('Введите номер телефона полностью')
		}
		return valid
	}

	function validate() {
		return validate_square() && validate_type() && validate_contact_type() && validate_phone()
	}

	let next_buttons = document.querySelectorAll('.btn-next')

	next_buttons[0].addEventListener('click', function (event) {
		if (!validate_square()) {
			return
		}
		steps[next_buttons[0].dataset.num].style.left = '0%'
		steps[next_buttons[0].dataset.num - 1].style.left = '-100%'
		if (window.innerWidth <= 992) {
			document.querySelector('.steper').style.height = '78rem'
		}
		if (window.innerWidth <= 576) {
			document.querySelector('.steper').style.height = '67rem'
		}
		if (window.innerWidth <= 425) {
			document.querySelector('.steper').style.height = '59rem'
		}
	})

	next_buttons[1].addEventListener('click', function (event) {
		if (!validate_type()) {
			return
		}
		steps[next_buttons[1].dataset.num].style.left = '0%'
		steps[next_buttons[1].dataset.num - 1].style.left = '-100%'
		document.querySelector('.steper').style.height = '59rem'
	})

	next_buttons[2].addEventListener('click', function (event) {
		data.phone = document.querySelector('#calc-phone').value.replace(/[^+\d]/g, '')
		if (validate()) {
			ajax(data, function () {
				steps[next_buttons[2].dataset.num].style.left = '0%'
				steps[next_buttons[2].dataset.num - 1].style.left = '-100%'
			})
		}
	})

	document.getElementById('square').addEventListener('input', function () {
		document.getElementById('square-val').innerText = this.value
		data.square = this.value
	})

	for (let i = 1; i <= 8; i++) {
		document.getElementById('calc-type-' + i.toString()).addEventListener('click', function (event) {
			for (let i = 1; i <= 8; i++) {
				document.getElementById('calc-type-' + i.toString()).classList.remove('calc-block-active')
			}
			this.classList.add('calc-block-active')
			data.ceiling_type = i.toString()
		})
	}

	for (let i = 1; i <= 4; i++) {
		document.getElementById('calc-contact-' + i.toString()).addEventListener('click', function (event) {
			for (let i = 1; i <= 4; i++) {
				document.getElementById('calc-contact-' + i.toString()).classList.remove('calc-block-active')
			}
			this.classList.add('calc-block-active')
			data.contact_type = i.toString()
		})
	}

	$('#calc-phone').inputmask({'mask': '+38 (999) 999-9999'})

	// Modal
	let is_modal_active = false
	let current_type = ''

	function show_modal(type) {
		let types = ['Обычный', 'Тканевый', 'Эксклюзив', 'Парящий', 'Фотопечать', 'Световые линии', 'Уровневый', 'Звездное небо']

		if (type > 0 && type <= 8 && !is_modal_active) {
			document.getElementById('ceiling-type-name').innerText = types[type - 1]
			$('.modal-window-bg').fadeIn()
			document.querySelector('body').style.overflowY = 'hidden'
			is_modal_active = true
			current_type = types[type - 1]
		}
	}

	function hide_modal() {
		if (is_modal_active) {
			$('.modal-window-bg').fadeOut(400, () => {
				document.getElementById('ceiling-type-name').innerText = ''
			})
			document.querySelector('body').style.overflowY = 'visible'
			is_modal_active = false
			current_type = ''
			document.getElementById('name-modal').value = ''
			document.getElementById('phone-modal').value = ''
		}
	}

	for (let i = 0; i < 8; i++) {
		document.querySelectorAll('.order-btn')[i].addEventListener('click', function (e) {
			show_modal(i + 1)
		})
	}

	document.getElementById('send-modal').addEventListener('click', function (e) {
		e.preventDefault()
		let name = document.getElementById('name-modal').value.trim()
		let phone = document.getElementById('phone-modal').value.replace(/[^+\d]/g, '')
		if (name !== '' && phone.length === 13 && current_type !== '') {
			ajax({
				type: 'modal',
				name: name,
				phone: phone,
				ceiling_type: current_type,
			}, function () {
				hide_modal()
			})
		}
	})

	document.querySelector('.close-btn').addEventListener('click', function (e) {
		hide_modal()
	})

	$('#phone-modal').inputmask({'mask': '+38 (999) 999-9999'})

	$(document).mouseup(function (e) {
		let modal = $('.modal-window')
		if (!modal.is(e.target)
			&& modal.has(e.target).length === 0) {
			hide_modal()
		}
	})

	// Popup
	$('.popup-close').click(function (e) {
		e.preventDefault()
	})
	$('.popup').click(function (e) {
		e.preventDefault()
	})
})
