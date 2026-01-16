// /assets/js/hero-slider.js
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector("[data-slider]");
  if (!slider) return;

  const track = slider.querySelector(".slider_track");
  const slides = Array.from(slider.querySelectorAll(".slider_slide"));
  const btnPrev = slider.querySelector(".slider_btn--prev");
  const btnNext = slider.querySelector(".slider_btn--next");
  const dotsWrap = slider.querySelector(".slider_dots");

  if (!track || slides.length === 0 || !btnPrev || !btnNext || !dotsWrap) return;

  let index = 0;
  let timer = null;
  const AUTOPLAY_MS = 4500;

  // Crear dots
  dotsWrap.innerHTML = "";
  const dots = slides.map((_, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "dot";
    b.setAttribute("aria-label", `Ir a la imagen ${i + 1}`);
    b.addEventListener("click", () => {
      goTo(i);
      restartAutoplay();
    });
    dotsWrap.appendChild(b);
    return b;
  });

  function updateUI() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    updateUI();
  }

  function startAutoplay() {
    stopAutoplay();
    timer = setInterval(() => goTo(index + 1), AUTOPLAY_MS);
  }

  function stopAutoplay() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  function restartAutoplay() {
    startAutoplay(); // reinicia para que no esperen
  }

  // Flechas
  btnPrev.addEventListener("click", () => {
    goTo(index - 1);
    restartAutoplay();
  });

  btnNext.addEventListener("click", () => {
    goTo(index + 1);
    restartAutoplay();
  });

  // Init
  updateUI();
  startAutoplay();
});
