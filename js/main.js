"use strict";const form_url="telegram.php";function ajax(e,t=!1){$.ajax({type:"POST",url:form_url,data:e,success:function(e){"success"!==e&&alert("Ошибка отправки формы!"),t&&t()},error:function(){alert("Ошибка отправки формы!")}})}$(document).ready((function(){$(".preloader-wrap").find(".preloader").fadeOut().end().delay(400).fadeOut("slow"),$('a[href^="#"]').bind("click.smoothscroll",(function(e){e.preventDefault();var t=this.hash,n=$(t);$("html, body").stop().animate({scrollTop:n.offset().top},500,"swing",(function(){}))})),$("#main-form-phone").inputmask({mask:"+38 (999) 999-9999"}),document.getElementById("send-request").addEventListener("click",(function(e){e.preventDefault();let t=document.getElementById("main-form-name").value,n=document.getElementById("main-form-phone").value.replace(/[^+\d]/g,"");""!==t&&13===n.length&&ajax({type:"request",name:t,phone:n},(function(){document.getElementById("main-form-name").value="",document.getElementById("main-form-phone").value="",s()}))}));let e=document.querySelectorAll(".step"),t={type:"calculator",square:"25",ceiling_type:0,extra_elements:[],contact_type:0,phone:""};function n(){return parseInt(t.square)>5&&parseInt(t.square)<=50}function c(){return t.ceiling_type>0&&t.ceiling_type<=8}function l(){return!(t.extra_elements.length<0&&t.extra_elements.length>4)&&(t.extra_elements.forEach((function(e){if(!(e=>0))return!1})),!0)}function o(){return n()&&c()&&l()&&t.contact_type>0&&t.contact_type<=4&&13===t.phone.length}let a=document.querySelectorAll(".btn-next");a[0].addEventListener("click",(function(t){n()&&(e[a[0].dataset.num].style.left="0%",e[a[0].dataset.num-1].style.left="-100%",window.innerWidth<=992&&(document.querySelector(".steper").style.height="78rem"),window.innerWidth<=576&&(document.querySelector(".steper").style.height="67rem"),window.innerWidth<=425&&(document.querySelector(".steper").style.height="59rem"))})),a[1].addEventListener("click",(function(t){c()&&(e[a[1].dataset.num].style.left="0%",e[a[1].dataset.num-1].style.left="-100%",document.querySelector(".steper").style.height="50rem")})),a[2].addEventListener("click",(function(t){l()&&(e[a[2].dataset.num].style.left="0%",e[a[2].dataset.num-1].style.left="-100%")})),a[3].addEventListener("click",(function(n){t.phone=document.querySelector("#calc-phone").value.replace(/[^+\d]/g,""),o()&&ajax(t,(function(){e[a[3].dataset.num].style.left="0%",e[a[3].dataset.num-1].style.left="-100%"}))})),document.getElementById("square").addEventListener("input",(function(){document.getElementById("square-val").innerText=this.value,t.square=this.value}));for(let e=1;e<=8;e++)document.getElementById("calc-type-"+e.toString()).addEventListener("click",(function(n){for(let e=1;e<=8;e++)document.getElementById("calc-type-"+e.toString()).classList.remove("calc-block-active");t.ceiling_type!==e.toString()?(this.classList.add("calc-block-active"),t.ceiling_type=e.toString()):t.ceiling_type=""}));for(let e=1;e<=4;e++)document.getElementById("calc-add-"+e.toString()).addEventListener("click",(function(n){this.classList.remove("calc-block-active"),t.extra_elements.includes(e)?t.extra_elements.splice(t.extra_elements.indexOf(e),1):(document.getElementById("calc-add-"+e.toString()).classList.add("calc-block-active"),t.extra_elements.push(e))}));for(let e=1;e<=4;e++)document.getElementById("calc-contact-"+e.toString()).addEventListener("click",(function(n){for(let e=1;e<=4;e++)document.getElementById("calc-contact-"+e.toString()).classList.remove("calc-block-active");t.contact_type!==e.toString()?(this.classList.add("calc-block-active"),t.contact_type=e.toString()):t.contact_type=""}));$("#calc-phone").inputmask({mask:"+38 (999) 999-9999"});let i=!1,d="";function r(e){let t=["Обычный","Тканевый","Apply","Парящий","Фотопечать","Световые линии","Уровневый","Звездное небо"];e>0&&e<=8&&!i&&(document.getElementById("ceiling-type-name").innerText=t[e-1],$(".modal-window-bg").fadeIn(),document.querySelector("body").style.overflowY="hidden",i=!0,d=t[e-1])}function u(){i&&($(".modal-window-bg").fadeOut(400,()=>{document.getElementById("ceiling-type-name").innerText=""}),document.querySelector("body").style.overflowY="visible",i=!1,d="",document.getElementById("name-modal").value="",document.getElementById("phone-modal").value="")}for(let e=0;e<8;e++)document.querySelectorAll(".order-btn")[e].addEventListener("click",(function(t){r(e+1)}));function m(){$(".popup").fadeOut()}function s(){$(".popup").fadeIn()}document.getElementById("send-modal").addEventListener("click",(function(e){e.preventDefault();let t=document.getElementById("name-modal").value.trim(),n=document.getElementById("phone-modal").value.replace(/[^+\d]/g,"");""!==t&&13===n.length&&""!==d&&ajax({type:"modal",name:t,phone:n,ceiling_type:d},(function(){u(),s()}))})),document.querySelector(".close-btn").addEventListener("click",(function(e){u()})),$("#phone-modal").inputmask({mask:"+38 (999) 999-9999"}),$(document).mouseup((function(e){let t=$(".modal-window");t.is(e.target)||0!==t.has(e.target).length||u()})),$(".popup-close").click((function(e){e.preventDefault(),m()})),$(".popup").click((function(e){e.preventDefault(),e.target.closest(".popup-box")||m()}))}));