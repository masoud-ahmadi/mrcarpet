const slidercomment = new Swiper('.comment_slider', {
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  autoplay: true,
  speed: 400,
  lazy: {
    loadPrevNext: true,
    loadPrevNextAmount: 1,
  },
  freeMode: true,
  loop: false,

  slidesPerView: 'auto',
  spaceBetween: 20,
});

$('.btn-prev-comment').on('click', function (e) {
  e.preventDefault();
  slidercomment.slideNext();
});

$('.btn-next-comment').on('click', function (e) {
  e.preventDefault();
  slidercomment.slidePrev();
});
