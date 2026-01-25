let Slider = class {
  constructor({ sliderEl, prevButton, nextButton }) {
    this.slider = sliderEl;
    this.slides = gsap.utils.toArray(".card", this.slider);
    this.prevButton = prevButton;
    this.nextButton = nextButton;
    this.currentIndex = 0;

    this.MIN_INDEX = 0;
    this.updateSlideWidth();
    this.updateVisibleSlides();

    this.init();
    this.addEventListeners();
  }

  updateSlideWidth() {
    if (!this.slides.length) return;
    this.slideWidth = this.slides[0].offsetWidth + SLIDER_GAP;
  }

  updateVisibleSlides() {
    const w = window.innerWidth;
    this.visibleSlides = 1;
    for (const bp of BREAKPOINTS) {
      if (w >= bp.width) this.visibleSlides = bp.slides;
    }
  }

  getMaxIndex() {
    return Math.max(this.slides.length - this.visibleSlides, 0);
  }

  moveSlider() {
    gsap.to(this.slider, {
      x: -this.currentIndex * this.slideWidth,
      duration: SLIDE_DURATION,
      ease: "power2.out",
      onComplete: () => {
        this.updateButtons();
      },
    });
  }

  updateButtons() {
    this.prevButton.disabled = this.currentIndex <= this.MIN_INDEX;
    this.nextButton.disabled = this.currentIndex >= this.getMaxIndex();
  }

  addEventListeners() {
    this.nextButton.addEventListener("click", () => {
      if (this.currentIndex < this.getMaxIndex()) {
        this.currentIndex++;
        this.moveSlider();
      }
    });

    this.prevButton.addEventListener("click", () => {
      if (this.currentIndex > this.MIN_INDEX) {
        this.currentIndex--;
        this.moveSlider();
      }
    });

    window.addEventListener("resize", () => {
      this.updateSlideWidth();
      this.updateVisibleSlides();
      this.currentIndex = Math.min(this.currentIndex, this.getMaxIndex());
      this.moveSlider();
    });
  }

  // инициализация
  init() {
    this.updateButtons();
  }
};
