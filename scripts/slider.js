gsap.registerPlugin(Flip);

// Переменные состояния
let isAnimating = false;
let currentPosition = 0;
let scrollAnimation = null;

// Элементы DOM
const shopSection = document.querySelector(".shop");
const shopContent = document.querySelector(".shop__content");
const shopCards = document.querySelectorAll(".shop-item");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");

// Конфигурация
const CARD_WIDTH = 320; // Ширина карточки + gap (настройте под ваш дизайн)
const CARD_GAP = 30; // Отступ между карточками
const SCROLL_DURATION = 0.8;
const FLIP_DURATION = 0.6;

// Инициализация
function initCustomScroll() {
  if (!shopContent || !shopCards.length) return;

  // Устанавливаем начальные стили
  gsap.set(shopContent, {
    display: "flex",
    gap: `${CARD_GAP}px`,
    x: 0,
    willChange: "transform",
  });

  // Обновляем видимость кнопок
  updateNavButtons();

  // Инициализируем кнопки
  initNavigation();

  // Добавляем обработчик свайпа на мобильных
  initSwipe();
}

// Навигация стрелками
function initNavigation() {
  if (!nextButton || !prevButton) return;

  nextButton.addEventListener("click", () => {
    if (isAnimating) return;
    moveToNext();
  });

  prevButton.addEventListener("click", () => {
    if (isAnimating) return;
    moveToPrev();
  });
}

// Свайп на мобильных
function initSwipe() {
  if (!shopContent) return;

  let startX = 0;
  let startY = 0;
  let isSwiping = false;
  let swipeThreshold = 50;

  shopContent.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isSwiping = true;
    },
    { passive: true },
  );

  shopContent.addEventListener(
    "touchmove",
    (e) => {
      if (!isSwiping) return;

      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const diffX = startX - currentX;
      const diffY = startY - currentY;

      // Проверяем, что это горизонтальный свайп (не вертикальный)
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
        e.preventDefault();
      }
    },
    { passive: false },
  );

  shopContent.addEventListener(
    "touchend",
    (e) => {
      if (!isSwiping) return;

      const endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;

      if (Math.abs(diffX) > swipeThreshold) {
        if (diffX > 0 && !isAnimating) {
          moveToNext();
        } else if (diffX < 0 && !isAnimating) {
          moveToPrev();
        }
      }

      isSwiping = false;
    },
    { passive: true },
  );
}

// Переход к следующей карточке
function moveToNext() {
  const cards = document.querySelectorAll(".shop-item");
  if (!cards.length) return;

  // Если это последняя карточка, добавляем новую через Flip
  if (currentPosition >= cards.length - getVisibleCards()) {
    addCardWithFlip(true);
  } else {
    // Иначе просто скроллим
    scrollToPosition(currentPosition + 1);
  }
}

// Переход к предыдущей карточке
function moveToPrev() {
  if (currentPosition <= 0) return;

  // Если это первая карточка и мы далеко проскроллили
  if (currentPosition === 0) {
    // Можно добавить карточку в начало через Flip
    addCardWithFlip(false);
  } else {
    // Иначе просто скроллим
    scrollToPosition(currentPosition - 1);
  }
}

// Добавление карточки с Flip анимацией
function addCardWithFlip(forward) {
  if (isAnimating) return;
  isAnimating = true;

  const cards = gsap.utils.toArray(".shop-item", shopContent);
  const state = Flip.getState(cards);

  // Создаем новую карточку
  const newCard = createShopCard();

  // Начальное состояние
  gsap.set(newCard, {
    scale: 0,
    opacity: 0,
    transformOrigin: forward ? "bottom right" : "bottom left",
  });

  // Добавляем в DOM
  if (forward) {
    shopContent.appendChild(newCard);
    // Помечаем старую карточку для удаления
    cards[0].classList.add("shop-item--removing");
  } else {
    shopContent.insertBefore(newCard, cards[0]);
    cards[cards.length - 1].classList.add("shop-item--removing");
  }

  // Вычисляем новую позицию для скролла
  let newPosition = currentPosition;
  if (forward) {
    newPosition += 1;
  }

  // Flip анимация
  Flip.from(state, {
    duration: FLIP_DURATION,
    ease: "power2.inOut",
    absolute: true,
    simple: true,
    onEnter: (els) => {
      // Анимация появления новой карточки
      gsap.to(els, {
        opacity: 1,
        scale: 1,
        duration: FLIP_DURATION * 0.7,
        ease: "back.out(1.2)",
      });
    },
    onLeave: (els) => {
      // Анимация исчезновения старой карточки
      gsap.to(els, {
        opacity: 0,
        scale: 0,
        duration: FLIP_DURATION * 0.7,
        ease: "back.in(1.2)",
        onComplete: () => {
          // Удаляем старую карточку
          els.forEach((el) => {
            if (el.classList.contains("shop-item--removing")) {
              el.remove();
            }
          });

          // Обновляем позицию
          if (forward) {
            currentPosition = Math.max(0, currentPosition - 1);
          }

          // Плавный скролл после анимации
          setTimeout(() => {
            scrollToPosition(newPosition, true);
            isAnimating = false;
          }, 50);
        },
      });
    },
  });
}

// Создание новой карточки товара
function createShopCard() {
  // Массив с данными для карточек (можно вынести в отдельный файл)
  const shopItems = [
    {
      image: "/images/shop-1.png",
      title: "Американо",
      description:
        "Вкус для любителей мечтать об обыденном, допустим, о печеньке на завтрак",
      price: "390 руб",
      size: "250 мл",
    },
    {
      image: "/images/shop-2.png",
      title: "Капучино",
      description: "Идеальный баланс эспрессо, молока и молочной пены",
      price: "450 руб",
      size: "300 мл",
    },
    {
      image: "/images/shop-3.png",
      title: "Латте",
      description: "Нежный кофейный напиток с большим количеством молока",
      price: "470 руб",
      size: "350 мл",
    },
    {
      image: "/images/shop-4.png",
      title: "Раф",
      description: "Сливочно-ванильный кофе для настоящих гурманов",
      price: "490 руб",
      size: "300 мл",
    },
  ];

  // Берем случайную карточку (или можно по порядку)
  const itemData = shopItems[Math.floor(Math.random() * shopItems.length)];

  const card = document.createElement("div");
  card.className = "shop-item";
  card.innerHTML = `
        <div class="shop-item__top">
            <img src="${itemData.image}" alt="${itemData.title}" class="shop-item__image" loading="lazy">
        </div>
        <h3 class="shop-item__title">${itemData.title}</h3>
        <p class="base__subtitle">${itemData.description}</p>
        <div class="shop-item__option">
            <span class="shop-item__price">${itemData.price}</span>
            <span class="shop-item__size">${itemData.size}</span>
        </div>
        <button class="button button-primary shop-item__button">заказать</button>
    `;

  // Добавляем обработчик для кнопки заказа
  const orderBtn = card.querySelector(".shop-item__button");
  if (orderBtn) {
    orderBtn.addEventListener("click", (e) => {
      e.preventDefault();
      alert(`Заказан: ${itemData.title}`);
      // Здесь можно добавить логику заказа
    });
  }

  return card;
}

// Плавный скролл к позиции
function scrollToPosition(position, instant = false) {
  if (isAnimating && !instant) return;

  const cards = document.querySelectorAll(".shop-item");
  if (position < 0 || position >= cards.length) return;

  isAnimating = !instant;

  // Останавливаем предыдущую анимацию
  if (scrollAnimation) {
    scrollAnimation.kill();
  }

  // Вычисляем новую позицию X
  const newX = -position * (CARD_WIDTH + CARD_GAP);
  currentPosition = position;

  if (instant) {
    // Мгновенный скролл (после Flip анимации)
    gsap.set(shopContent, { x: newX });
    isAnimating = false;
  } else {
    // Плавный скролл
    scrollAnimation = gsap.to(shopContent, {
      x: newX,
      duration: SCROLL_DURATION,
      ease: "power2.out",
      onStart: () => {
        isAnimating = true;
      },
      onComplete: () => {
        isAnimating = false;
        scrollAnimation = null;
      },
    });
  }

  // Обновляем состояние кнопок
  updateNavButtons();

  // Обновляем индикатор
  updateIndicator();
}

// Обновление состояния кнопок навигации
function updateNavButtons() {
  if (!nextButton || !prevButton) return;

  const cards = document.querySelectorAll(".shop-item");
  const visibleCards = getVisibleCards();

  prevButton.disabled = isAnimating || currentPosition === 0;
  nextButton.disabled =
    isAnimating || currentPosition >= cards.length - visibleCards;
}

// Получение количества видимых карточек
function getVisibleCards() {
  if (!shopSection) return 1;
  const containerWidth = shopSection.clientWidth;
  return Math.floor(containerWidth / (CARD_WIDTH + CARD_GAP));
}

// Индикатор текущей позиции
function updateIndicator() {
  const indicator = document.querySelector(".shop__indicator");
  if (!indicator) return;

  const cards = document.querySelectorAll(".shop-item");
  indicator.textContent = `${currentPosition + 1} / ${cards.length}`;
}

// Автоматический скролл (опционально)
function initAutoScroll() {
  let autoScrollInterval;
  const AUTO_SCROLL_DELAY = 5000; // 5 секунд

  function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
      if (!isAnimating && document.hasFocus()) {
        moveToNext();
      }
    }, AUTO_SCROLL_DELAY);
  }

  function stopAutoScroll() {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      autoScrollInterval = null;
    }
  }

  // Стартуем автопрокрутку
  startAutoScroll();

  // Останавливаем при наведении
  shopContent.addEventListener("mouseenter", stopAutoScroll);
  shopContent.addEventListener("mouseleave", startAutoScroll);
  shopContent.addEventListener("touchstart", stopAutoScroll);
  shopContent.addEventListener("touchend", () => {
    setTimeout(startAutoScroll, AUTO_SCROLL_DELAY);
  });

  // Останавливаем когда страница не активна
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoScroll();
    } else {
      startAutoScroll();
    }
  });
}

// Инициализация при загрузке
document.addEventListener("DOMContentLoaded", () => {
  initCustomScroll();

  // Инициализируем автопрокрутку (по желанию)
  // initAutoScroll();
});

// Обновление при ресайзе
window.addEventListener("resize", () => {
  updateNavButtons();
  updateIndicator();
});
