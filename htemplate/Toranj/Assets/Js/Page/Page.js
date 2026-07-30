$(document).ready(function () {


  const commentPrev = document.querySelector('.btn-prev.comment');
  const commentNext = document.querySelector('.btn-next.comment');
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
    spaceBetween: 10,

    navigation: {
      nextEl: commentNext,
      prevEl: commentPrev,
    },
    on: {
      init() {
        updateCommentNav(this);

        if (window.innerWidth < 425) {
          this.autoplay.stop();
        }
      },

      slideChange() {
        updateCommentNav(this);
      },

      resize() {
        if (window.innerWidth < 425) {
          this.autoplay.stop();
        } else {
          this.autoplay.start();
        }
      },
    },
  });

  function updateCommentNav(swiper) {
    if (swiper.isBeginning) commentPrev.classList.add('disabled');
    else commentPrev.classList.remove('disabled');

    if (swiper.isEnd) commentNext.classList.add('disabled');
    else commentNext.classList.remove('disabled');
  }

  });
