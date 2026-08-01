$(document).ready(function () {
  const swiper = new Swiper('.banner_slider', {
    effect: 'cards',
    grabCursor: true,
    rtl: true,
    speed: 1000,
    autoHeight: true,
    center: true,
    cardsEffect: {
      perSlideRotate: 2,
      perSlideOffset: 5,
      rotate: true,
      slideShadows: false,
    },

    lazy: {
      loadPrevNext: true,
      loadPrevNextAmount: 1,
    },

    autoplay: {
      delay: 6000,
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    },
  });

  const slidernew = new Swiper('.best_slider_product', {
    lazy: {
      loadPrevNext: true,
      loadPrevNextAmount: 1,
    },

    freeMode: true,
    loop: false,
    rtl: true,
    slidesPerView: 'auto',
    spaceBetween: 20,

    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    breakpoints: {
      768: {
        speed: 1000,
      },
    },
  });

  $('.btn-prev-best').on('click', function (e) {
    e.preventDefault();
    slidernew.slideNext();
  });

  $('.btn-next-best').on('click', function (e) {
    e.preventDefault();
    slidernew.slidePrev();
  });
});
