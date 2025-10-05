const links = document.querySelectorAll('.nav-links li a');

// Get the current page path
const currentPath = window.location.pathname;

links.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (linkPath === currentPath) {
        link.classList.add('active'); // underline only on current page
    }
});

// NavBar
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('active');
}

//home page slider
const wrapper = document.querySelector('.slider-wrapper');
const slides = document.querySelectorAll('.slide');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let currentIndex = 0;
const totalSlides = slides.length;

function showSlide(index) {
  // Looping logic
  if (index < 0) currentIndex = totalSlides - 1;
  else if (index >= totalSlides) currentIndex = 0;
  else currentIndex = index;

  wrapper.style.transition = 'transform 0.5s ease-in-out';
  wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
}

prev.addEventListener('click', () => showSlide(currentIndex - 1));
next.addEventListener('click', () => showSlide(currentIndex + 1));

// Optional auto-slide
setInterval(() => showSlide(currentIndex + 1), 5000);

// Initialize
showSlide(0);

