class Cart {
  constructor({ cardSelector, buttonSelector }) {
    this.cardSelector = cardSelector || ".card";
    this.buttonSelector = buttonSelector || ".card__button";

    this.init();
  }

  init() {
    this.cards = document.querySelectorAll(this.cardSelector);
    this.cards.forEach((card) => {
      const button = card.querySelector(this.buttonSelector);
      if (button) {
        button.addEventListener("click", () => this.addToCart(card, button));
      }
    });
  }

  addToCart(card, button) {
    const cardOptions = button.parentElement;
    let counter = cardOptions.querySelector(".card__counter");

    if (!counter) {
      button.textContent = "В корзине";

      counter = document.createElement("span");
      counter.classList.add("card__counter");
      counter.textContent = "1";

      cardOptions.appendChild(counter);
    } else {
      counter.textContent = parseInt(counter.textContent) + 1;
    }
  }
}

window.Cart = Cart;
