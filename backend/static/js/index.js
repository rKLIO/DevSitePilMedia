const carousel = document.querySelector('.custom-carousel');
const items = document.querySelectorAll('.custom-carousel .item');

let isDragging = false;
let startX;
let scrollLeft;

// Gestion du "mousedown" (début du drag)
carousel.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX - carousel.offsetLeft; // Position initiale de la souris
  scrollLeft = carousel.scrollLeft; // Position initiale du scroll
  carousel.classList.add('dragging'); // Ajoute une classe pour indiquer le drag
});

// Gestion du "mouseleave" (sortie de la souris)
carousel.addEventListener('mouseleave', () => {
  isDragging = false;
  carousel.classList.remove('dragging'); // Retire la classe de drag
});

// Gestion du "mouseup" (fin du drag)
carousel.addEventListener('mouseup', () => {
  isDragging = false;
  carousel.classList.remove('dragging'); // Retire la classe de drag
});

// Gestion du "mousemove" (déplacement de la souris)
carousel.addEventListener('mousemove', (e) => {
  if (!isDragging) return; // Si on ne clique pas, on ne fait rien
  e.preventDefault(); // Empêche le comportement par défaut
  const x = e.pageX - carousel.offsetLeft; // Position actuelle de la souris
  const walk = x - startX; // Distance parcourue par la souris
  carousel.scrollLeft = scrollLeft - walk; // Ajuste la position du scroll
});

// Fonction pour animer le défilement
function smoothScrollTo(element, target, duration) {
  const start = element.scrollLeft;
  const distance = target - start;
  const startTime = performance.now();

  function animation(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1); // Limite la progression à 1
    element.scrollLeft = start + distance * easeInOutQuad(progress);

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  }

  // Fonction d'interpolation pour un effet fluide
  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  requestAnimationFrame(animation);
}

// Gestion du clic sur un élément pour l'agrandir et le centrer
items.forEach((item) => {
  item.addEventListener('click', () => {
    // Supprime la classe "active" de tous les éléments
    items.forEach((el) => el.classList.remove('active'));

    // Ajoute la classe "active" à l'élément cliqué
    item.classList.add('active');

    // Centre l'élément cliqué dans le carrousel
    const itemOffset = item.offsetLeft; // Position de l'élément cliqué
    const itemWidth = item.offsetWidth; // Largeur de l'élément cliqué
    const carouselWidth = carousel.offsetWidth; // Largeur du carrousel
    const scrollPosition = itemOffset - (carouselWidth / 2) + (itemWidth / 2);

    // Utilise la fonction d'animation pour un défilement plus lent
    smoothScrollTo(carousel, scrollPosition, 1000); // Durée de 1000ms (1 seconde)
  });
});
