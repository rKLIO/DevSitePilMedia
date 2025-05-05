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
        // mockup.classList.remove("active");
      }
    });
  }, {
    threshold: 0.5 // Quand 50% de la section est visible
  });

  observer.observe(section);
});

// ----------------------------------------------------------------------------

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  const textElement = document.getElementById('changing-text');
  const hiddenTexts = document.querySelectorAll('#hidden-texts > div');
  const texts = Array.from(hiddenTexts).map(div => div.innerHTML);

  let currentIndex = -1; // On garde l'index du texte actuel

  // Timeline spéciale pour l'animation du texte
  const textTimeline = gsap.timeline({ paused: true });

  ScrollTrigger.create({
    trigger: "#services",
    start: "top top",
    end: "+=" + (texts.length * 100) + "%",
    pin: true,
    scrub: true,
    onUpdate: (self) => {
      let progress = self.progress;
      let index = Math.floor(progress * texts.length);
      if (index >= texts.length) index = texts.length - 1;

      if (index !== currentIndex) {
        currentIndex = index;

        // Animation en 2 temps : fade out -> changer texte -> fade in
        textTimeline.clear(); // on vide la timeline pour éviter les accumulations
        textTimeline
          .to(textElement, { opacity: 0, duration: 0.3, ease: "power1.out" }) // fade out actuel
          .add(() => {
            textElement.innerHTML = texts[index]; // changer le texte
          })
          .to(textElement, { opacity: 1, duration: 0.3, ease: "power1.in" }); // fade in nouveau
          
        textTimeline.play(0); // rejouer la timeline depuis le début

        // Synchroniser le carousel avec le texte
        syncCarouselWithText(index);
      }
    }
  });

  // Fonction pour synchroniser le carousel avec le texte
  function syncCarouselWithText(index) {
    const carousel = $('#carouselExample');
    const items = carousel.find('.carousel-item');
    items.removeClass('active'); // Supprime la classe active de toutes les slides
    items.eq(index).addClass('active'); // Ajoute la classe active à la slide correspondante
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open'); // Ajoute ou enlève la classe "open"
  });
});

