gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const menuLinks = gsap.utils.toArray(".menu__link");
  const menuOnlyLinks = document.querySelectorAll(".menu__link");
  const sections = document.querySelectorAll("section");

  const header = document.querySelector(".header");
  const firstSection = document.getElementById("hero");

  lucide.createIcons();

  if (window.initSmoothScroll) {
    window.initSmoothScroll(menuLinks, menuOnlyLinks, sections);
  }

  /* ===============================
     Cart
  ================================= */
  if (window.Cart) {
    new Cart({
      cardSelector: ".card",
      buttonSelector: ".card__button",
    });
  }

  /* ===============================
     Burger menu + Overlay
  ================================= */
  const burgerButton = document.getElementById("burger");
  const mobileMenu = document.getElementById("menu");
  const overlayMenu = document.getElementById("menuOverlay");

  const tl = gsap.timeline({ paused: true, reversed: true });

  tl.to(mobileMenu, {
    x: 0,
    opacity: 1,
    pointerEvents: "auto",
    duration: 0.5,
    ease: "power3.out",
  }).to(
    overlayMenu,
    {
      opacity: 1,
      pointerEvents: "auto",
      duration: 0.3,
    },
    "-=0.5",
  );

  function toggleMenu() {
    tl.reversed() ? tl.play() : tl.reverse();
    burgerButton.classList.toggle("open");
    header.classList.toggle("open");
  }

  burgerButton.addEventListener("click", toggleMenu);
  overlayMenu.addEventListener("click", toggleMenu);

  /* ===============================
     Slider
  ================================= */
  const sliderEl = document.querySelector(".cards");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");

  if (sliderEl && prevButton && nextButton) {
    new Slider({
      sliderEl: sliderEl,
      prevButton: prevButton,
      nextButton: nextButton,
    });
  }

  /* ===============================
     Current year
  ================================= */
  let yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ===============================
     Section scroll
  ================================= */
  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;
    const firstSectionHeight = firstSection.offsetHeight;

    if (scrollPos >= firstSectionHeight) {
      header.classList.add("fixed");
    } else {
      header.classList.remove("fixed");
    }
  });

  /* ===============================
    Footer menu
  ================================= */
  const footerMenuBtn = document.querySelector(".footer__menu-btn");
  const footerMenu = document.querySelector(".footer-menu");

  footerMenuBtn.addEventListener("click", () => {
    footerMenu.classList.toggle("active");
    footerMenuBtn.classList.toggle("active");
  });
});
