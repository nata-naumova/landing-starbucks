/**
 * Инициализация плавного скролла и активного меню
 * @param {Array} menuLinks - массив ссылок
 * @param {NodeList} menuOnlyLinks - все пункты меню
 * @param {Array} sections - все секции
 */

function initSmoothScroll(menuLinks, menuOnlyLinks, sections) {
  var clearActiveMenu = () => {
    menuOnlyLinks.forEach((link) => link.classList.remove("active"));
  };

  var setActiveMenuById = (id) => {
    var link = document.querySelector(`.menu__link[href="#${id}"]`);
    if (link) link.classList.add("active");
  };

  menuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      var href = link.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;
      var target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      clearActiveMenu();
      link.classList.add("active");

      gsap.to(window, {
        duration: 1,
        scrollTo: { y: target, offsetY: HEADER_OFFSET },
        ease: "power2.out",
      });
    });
  });

  window.addEventListener("scroll", () => {
    var scrollPos = window.scrollY + SCROLL_OFFSET;
    sections.forEach((section) => {
      var top = section.offsetTop;
      var bottom = top + section.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        clearActiveMenu();
        setActiveMenuById(section.id);
      }
    });
  });
}

window.initSmoothScroll = initSmoothScroll;
