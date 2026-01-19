gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll(".menu__link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const target = link.getAttribute("href");

    if (target && document.querySelector(target)) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: target, offsetY: 150 },
        ease: "power2.out",
      });
    }
  });
});

gsap.from(".header, .header__box", {
  y: -20,
  opacity: 0,
  duration: 0.6,
});

gsap.utils.toArray(".about, .about__item").forEach((section) => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });
});
