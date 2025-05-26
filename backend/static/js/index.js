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
    items: 3,
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
    threshold: 0.2 // Quand 50% de la section est visible
  });

  observer.observe(section);
});

// ----------------------------------------------------------------------------

window.addEventListener("load", () => {
  if (window.innerWidth < 1260) {
    // Pas de scrollTrigger pour les petits écrans
    return;
  }

  // Tout ton code GSAP ici uniquement pour les grands écrans
  const textElement = document.getElementById('changing-text');
  const hiddenTexts = document.querySelectorAll('#hidden-texts > div');
  const texts = Array.from(hiddenTexts).map(div => div.innerHTML);
  let currentIndex = -1;
  const textTimeline = gsap.timeline({ paused: true });

  ScrollTrigger.create({
    id: "services-scroll",
    trigger: "#services",
    start: "top top",
    end: "+=" + (texts.length * 100) + "%",
    pin: true,
    scrub: true,
    onUpdate: (self) => {
      let index = Math.floor(self.progress * texts.length);
      if (index >= texts.length) index = texts.length - 1;

      if (index !== currentIndex) {
        currentIndex = index;

        textTimeline.clear();
        textTimeline
          .to(textElement, { opacity: 0, duration: 0.3, ease: "power1.out" })
          .add(() => {
            textElement.innerHTML = texts[index];
          })
          .to(textElement, { opacity: 1, duration: 0.3, ease: "power1.in" });

        textTimeline.play(0);
        syncCarouselWithText(index);
      }
    }
  });

  function syncCarouselWithText(index) {
    const carousel = $('#carousel-laptop');
    const items = carousel.find('.custom-laptop-carousel-item');
    items.removeClass('active');
    items.eq(index).addClass('active');
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  // Ouverture/Fermeture en cliquant sur le bouton
  menuToggle.addEventListener('click', (event) => {
    event.stopPropagation(); // Empêche le clic de se propager au document
    nav.classList.toggle('open');
  });

  // Empêche la fermeture quand on clique à l'intérieur du menu
  nav.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  // Ferme le menu si on clique ailleurs
  document.addEventListener('click', () => {
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
    }
  });
});

// ----------------------------------------------------------------------------

// document.addEventListener('DOMContentLoaded', () => {
//   const buttons = document.querySelectorAll('.change-element');
//   const elements = document.querySelectorAll('.dynamic-element');

//   // Fonction pour afficher un élément spécifique
//   function showElement(index) {
//     elements.forEach((element, i) => {
//       if (i === index) {
//         element.classList.add('active'); // Affiche l'élément correspondant
//       } else {
//         element.classList.remove('active'); // Cache les autres éléments
//       }
//     });
//   }

//   // Ajoute un événement de clic à chaque bouton
//   buttons.forEach((button) => {
//     button.addEventListener('click', () => {
//       const index = parseInt(button.getAttribute('data-index'), 10);
//       showElement(index);
//     });
//   });

//   // Affiche le premier élément par défaut
//   showElement(0);
// });