$(document).ready(function () {
  $(".custom-carousel").owlCarousel({
    autoWidth: true,
    loop: true,
    rtl: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    smartSpeed: 800,
    dots: false,
    margin: 10,
    items: 5,
    mouseDrag: true, // Active le click and drag
    touchDrag: true, // Active le drag sur mobile
    nav: false, // Désactive les boutons de navigation
  });

  $(".custom-carousel .item").click(function () {
    $(".custom-carousel .item").not($(this)).removeClass("active");
    $(this).toggleClass("active");
  });
});

