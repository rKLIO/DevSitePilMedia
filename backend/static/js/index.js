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

// ----------------------------------------------------------------------------
// Animation de la section "mockup" avec Intersection Observer

 // Attends que la page soit chargée
 document.addEventListener('DOMContentLoaded', function () {
  const mockup = document.querySelector('.mockup');
  const section = document.querySelector('#services');

  // Rends le mockup visible
  mockup.classList.add('loaded');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        mockup.classList.add('opened');
        mockup.classList.add("active"); // Ajoute la classe active pour l'animation
      } else {
        mockup.classList.remove('opened'); // à garder ou pas selon l'effet voulu
        mockup.classList.remove("active");
      }
    });
  }, {
    threshold: 0.5 // Quand 50% de la section est visible
  });

  observer.observe(section);
});

// ----------------------------------------------------------------------------

