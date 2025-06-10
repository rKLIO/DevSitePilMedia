// ----------------------
// Initialisation du carousel OwlCarousel
// ----------------------
$(document).ready(function () {
  // Initialise le carousel avec les options spécifiées
  $(".custom-carousel").owlCarousel({
    autoWidth: true,
    loop: true,
    rtl: true,
    // autoplay: true,
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

  // Ajoute la classe "active" à l'item cliqué, retire des autres
  $(".custom-carousel .item").click(function () {
    $(".custom-carousel .item").not($(this)).removeClass("active");
    $(this).toggleClass("active");
  });
});

// ----------------------------------------------------------------------------
// Animation de la section "mockup" avec Intersection Observer
document.addEventListener('DOMContentLoaded', function () {
  const mockup = document.querySelector('.mockup');
  const section = document.querySelector('#services');

  // Rends le mockup visible dès le chargement
  if (mockup) {
    mockup.classList.add('loaded');
  }

  // Crée un observer pour détecter quand la section #services est visible à l'écran
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Ajoute les classes pour déclencher l'animation
        if (mockup) {
          mockup.classList.add('opened');
          mockup.classList.add("active");
        }
      } else {
        // Retire la classe si la section n'est plus visible (optionnel)
        if (mockup) {
          mockup.classList.remove('opened');
          // mockup.classList.remove("active");
        }
      }
    });
  }, {
    threshold: 0.2 // Déclenche quand 20% de la section est visible
  });

  if (section) {
    observer.observe(section);
  }
});

// ----------------------------------------------------------------------------
// Animation GSAP + ScrollTrigger pour changer le texte et synchroniser le carousel
window.addEventListener("load", () => {
  if (window.innerWidth < 1260) {
    // Pas d'animation pour les petits écrans
    return;
  }

  // Récupère l'élément qui affichera le texte dynamique
  const textElement = document.getElementById('changing-text');
  // Récupère tous les textes cachés à afficher
  const hiddenTexts = document.querySelectorAll('#hidden-texts > div');
  // Transforme les éléments en tableau de textes
  const texts = Array.from(hiddenTexts).map(div => div.innerHTML);
  let currentIndex = -1;
  // Timeline GSAP pour gérer l'animation d'opacité
  const textTimeline = gsap.timeline({ paused: true });

  // Crée un ScrollTrigger pour animer le texte lors du scroll
  ScrollTrigger.create({
    id: "services-scroll",
    trigger: "#services",
    start: "top top",
    end: "+=" + (texts.length * 100) + "%",
    pin: true,
    scrub: true,
    onUpdate: (self) => {
      // Calcule l'index du texte à afficher selon la progression du scroll
      let index = Math.floor(self.progress * texts.length);
      if (index >= texts.length) index = texts.length - 1;

      // Si l'index a changé, on anime le changement de texte
      if (index !== currentIndex) {
        currentIndex = index;

        textTimeline.clear();
        textTimeline
          .to(textElement, { opacity: 0, duration: 0.001, ease: "power1.out" })
          .add(() => {
            textElement.innerHTML = texts[index];
          })
          .to(textElement, { opacity: 1, duration: 0.001, ease: "power1.in" });

        textTimeline.play(0);
        syncCarouselWithText(index);
      }
    }
  });

  // Synchronise le carousel avec le texte affiché
  function syncCarouselWithText(index) {
    const carousel = $('#carousel-laptop');
    const items = carousel.find('.custom-laptop-carousel-item');
    items.removeClass('active');
    items.eq(index).addClass('active');
  }
});

// ----------------------------------------------------------------------------
// Gestion du menu burger (mobile)
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-lat');
  const nav = document.querySelector('.nav');

  // Ouvre/Ferme le menu au clic sur le bouton
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', (event) => {
      event.stopPropagation(); // Empêche le clic de se propager au document
      nav.classList.toggle('open');
    });

  // Empêche la fermeture quand on clique à l'intérieur du menu
  // nav.addEventListener('click', (event) => {
  //   event.stopPropagation();
  // });

    // Ferme le menu si on clique ailleurs sur la page
    document.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
      }
    });
  }
});

// ----------------------------------------------------------------------------

// On sélectionne la barre de navigation
const nav = document.querySelector('.header');
const textElement = document.getElementById('home');
const menuLat = document.querySelector('.menu-lat'); // Ajout

window.addEventListener('scroll', () => {
  const rect = textElement.getBoundingClientRect();
  const isOutsideView = rect.bottom <= 0 || rect.top >= window.innerHeight;

  if (isOutsideView) {
    nav.style.backgroundColor = 'white';
    $('.header a').css('color', 'black');
    nav.style.boxShadow = '0 3px 9px 0px rgba(0, 0, 0, 0.1)';
    if (menuLat) menuLat.style.color = 'black'; // <-- menu lat en noir
  } else {
    nav.style.backgroundColor = 'transparent';
    $('.header a').css('color', 'white');
    nav.style.boxShadow = '';
    if (menuLat) menuLat.style.color = 'white'; // <-- menu lat en blanc
  }
});

// ----------------------------------------------------------------------------
  const dots = document.querySelectorAll('.carousel-indicators-custom .dot');
  const carousel = document.querySelector('#carouselExampleControls');

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      $('#carouselExampleControls').carousel(index);
    });
  });

  $('#carouselExampleControls').on('slid.bs.carousel', function (e) {
    const activeIndex = e.to;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[activeIndex].classList.add('active');
  });
// ----------------------------------------------------------------------------

// Récupérer le bouton
document.addEventListener('DOMContentLoaded', function() {
  const backToTopBtn = document.getElementById('backToTopBtn');

  // Afficher/cacher le bouton au scroll
  window.addEventListener('scroll', function() {
    if (document.body.scrollTop > 2000 || document.documentElement.scrollTop > 2000) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  // Au clic, remonter en douceur en haut
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const headerLinks = document.querySelectorAll('header a');

  headerLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      // Empêcher le comportement par défaut du lien (saut direct)
      event.preventDefault();

      // Récupérer la cible (l'id dans le href)
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Scroll en douceur vers la position de l'élément cible
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
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