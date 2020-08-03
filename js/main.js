const form_url = "telegram.php"

function ajax(data, success_fuc) {
    $.ajax({
        type: "POST",
        url: form_url,
        data: data,
        success: function (result) {
            if (result !== "success") {
                alert("Ошибка отправки формы!")
            }
            success_fuc()
        },
        error: function () {
            alert("Ошибка отправки формы!")
        }
    });
}

$(document).ready(function () {
    // Pretty Links
    $('a[href^="#"]').bind('click.smoothscroll', function (e) {
        e.preventDefault();

        var target = this.hash,
            $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 500, 'swing', function () {
            // window.location.hash = target;
        });
    });

    // Form
    $("#main-form-phone").inputmask({"mask": "+38 (999) 999-9999"});
    document.getElementById("send-request").addEventListener("click", function (e) {
        e.preventDefault()
        let name = document.getElementById("main-form-name").value
        let phone = document.getElementById("main-form-phone").value.replace(/[^+\d]/g, '')
        if (name !== "" && phone.length === 13) {
            ajax({
                type: "request",
                name: name,
                phone: phone,
            }, function () {
                document.getElementById("main-form-name").value = ""
                document.getElementById("main-form-phone").value = ""
            })
        }
    })

    // Calculator
    let steps = document.querySelectorAll(".step")
    let current_step = 1;

    let data = {
        type: "calculator",
        square: "25",
        ceiling_type: 0,
        extra_elements: [],
        contact_type: 0,
        phone: ""
    }

    function validate_square() {
        return (parseInt(data.square) > 0 && parseInt(data.square) <= 50)
    }

    function validate_type() {
        return (data.ceiling_type > 0 && data.ceiling_type <= 8)
    }

    function validate_extra_elements() {
        if (data.extra_elements.length < 0 && data.extra_elements.length > 4) {
            return false
        }
        data.extra_elements.forEach(function (elem) {
            if (!(elem => 0 && elem <= 4)) {
                return false
            }
        })
        return true
    }

    function validate_contact_type() {
        return (data.contact_type > 0 && data.contact_type <= 4)
    }

    function validate_phone() {
        return (data.phone.length === 13)
    }

    function validate() {
        return validate_square() && validate_type() && validate_extra_elements() && validate_contact_type() && validate_phone()
    }

    let next_buttons = document.querySelectorAll(".btn-next")

    next_buttons[0].addEventListener("click", function (event) {
        if (!validate_square()) {
            return
        }
        steps[next_buttons[0].dataset.num].style.left = "0%"
        steps[next_buttons[0].dataset.num - 1].style.left = "-100%"
        if (window.innerWidth <= 992) {
            document.querySelector(".steper").style.height = "78rem"
        }
        if (window.innerWidth <= 576) {
            document.querySelector(".steper").style.height = "67rem"
        }
        if (window.innerWidth <= 425) {
            document.querySelector(".steper").style.height = "59rem"
        }
    })

    next_buttons[1].addEventListener("click", function (event) {
        if (!validate_type()) {
            return
        }
        steps[next_buttons[1].dataset.num].style.left = "0%"
        steps[next_buttons[1].dataset.num - 1].style.left = "-100%"
        document.querySelector(".steper").style.height = "50rem"
    })

    next_buttons[2].addEventListener("click", function (event) {
        if (!validate_extra_elements()) {
            return
        }
        steps[next_buttons[2].dataset.num].style.left = "0%"
        steps[next_buttons[2].dataset.num - 1].style.left = "-100%"
    })

    next_buttons[3].addEventListener("click", function (event) {
        data.phone = document.querySelector("#calc-phone").value.replace(/[^+\d]/g, '')
        if (validate()) {
            ajax(data, function () {
                steps[next_buttons[3].dataset.num].style.left = "0%"
                steps[next_buttons[3].dataset.num - 1].style.left = "-100%"
            })
        }
    })

    document.getElementById("square").addEventListener("input", function () {
        document.getElementById("square-val").innerText = this.value
        data.square = this.value
    })

    for (let i = 1; i <= 8; i++) {
        document.getElementById("calc-type-" + i.toString()).addEventListener("click", function (event) {
            for (let i = 1; i <= 8; i++) {
                document.getElementById("calc-type-" + i.toString()).classList.remove("calc-block-active")
            }
            if (data.ceiling_type !== i.toString()) {
                this.classList.add("calc-block-active")
                data.ceiling_type = i.toString()
            } else {
                data.ceiling_type = ""
            }
        })
    }

    for (let i = 1; i <= 4; i++) {
        document.getElementById("calc-add-" + i.toString()).addEventListener("click", function (event) {
            this.classList.remove("calc-block-active")
            if (!data.extra_elements.includes(i)) {
                document.getElementById("calc-add-" + i.toString()).classList.add("calc-block-active")
                data.extra_elements.push(i)
            } else {
                data.extra_elements.splice(data.extra_elements.indexOf(i), 1)
            }
        })
    }

    for (let i = 1; i <= 4; i++) {
        document.getElementById("calc-contact-" + i.toString()).addEventListener("click", function (event) {
            for (let i = 1; i <= 4; i++) {
                document.getElementById("calc-contact-" + i.toString()).classList.remove("calc-block-active")
            }
            if (data.contact_type !== i.toString()) {
                this.classList.add("calc-block-active")
                data.contact_type = i.toString()
            } else {
                data.contact_type = ""
            }
        })
    }

    $("#calc-phone").inputmask({"mask": "+38 (999) 999-9999"});

    // Modal
    let is_modal_active = false
    let current_type = ""

    function show_modal(type) {
        types = ["Обычный", "Тканевый", "Apply", "Парящий", "Фотопечать", "Световые линии", "Уровневый", "Звездное небо"]

        if (type > 0 && type <= 8 && !is_modal_active) {
            document.getElementById("ceiling-type-name").innerText = types[type - 1]
            $(".modal-window-bg").fadeIn()
            document.querySelector("body").style.overflow = "hidden"
            is_modal_active = true
            current_type = types[type - 1]
        }
    }

    function hide_modal() {
        if (is_modal_active) {
            document.getElementById("ceiling-type-name").innerText = ""
            $(".modal-window-bg").fadeOut()
            document.querySelector("body").style.overflow = "visible"
            is_modal_active = false
            current_type = ""
            document.getElementById("name-modal").value = ""
            document.getElementById("phone-modal").value = ""
        }
    }

    for (let i = 0; i < 8; i++) {
        document.querySelectorAll(".order-btn")[i].addEventListener("click", function (e) {
            show_modal(i + 1)
        })
    }

    document.getElementById("send-modal").addEventListener("click", function (e) {
        e.preventDefault()
        let name = document.getElementById("name-modal").value
        let phone = document.getElementById("phone-modal").value.replace(/[^+\d]/g, '')
        if (name !== "" && phone.length === 13 && current_type !== "") {
            ajax({
                type: "modal",
                name: name,
                phone: phone,
                ceiling_type: current_type,
            })
            hide_modal()
        }
    })

    document.querySelector(".close-btn").addEventListener("click", function (e) {
        hide_modal()
    })

    $("#phone-modal").inputmask({"mask": "+38 (999) 999-9999"});

    $(document).mouseup(function (e) {
        let modal = $(".modal-window");
        if (!modal.is(e.target)
            && modal.has(e.target).length === 0) {
            hide_modal()
        }
    });

});