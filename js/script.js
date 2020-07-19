$('[data-scroll*="#"]').click(function() {
     $('html, body').animate({
         scrollTop: $(this.dataset.scroll).offset().top
     }, 600);
     return false;
 });