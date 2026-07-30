$(document).ready(function () {
  var swiper = new Swiper('.product_slider', {
    spaceBetween: 10,
    freeMode: true,
    watchSlidesProgress: true,
    speed: 400,
    freeMode: true,
    slidesPerView: 'auto',
  });

  var swiper2 = new Swiper('.product_slider2', {
    spaceBetween: 10,

    thumbs: {
      swiper: swiper,
    },
  });

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

  const videoPrev = document.querySelector('.btn-prev.video');
  const videoNext = document.querySelector('.btn-next.video');
  const slidervideo = new Swiper('.video_slider', {
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
      nextEl: videoNext,
      prevEl: videoPrev,
    },
    on: {
      init() {
        updateVideoNav(this);

        if (window.innerWidth < 425) {
          this.autoplay.stop();
        }
      },

      slideChange() {
        updateVideoNav(this);
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

  function updateVideoNav(swiper) {
    if (swiper.isBeginning) videoPrev.classList.add('disabled');
    else videoPrev.classList.remove('disabled');

    if (swiper.isEnd) videoNext.classList.add('disabled');
    else videoNext.classList.remove('disabled');
  }


  Fancybox.bind("[data-fancybox='gallery_b']", {
    animated: true,
    showClass: 'fancybox-fadeIn',
    hideClass: 'fancybox-fadeOut',
  });

  Fancybox.bind("[data-fancybox='related-videos']", {
    Toolbar: false,
    animated: true,
  });

  document
    .querySelector('.open-video-btn')
    .addEventListener('click', function () {
      const firstVideo = document.querySelector(
        "[data-fancybox='related-videos']"
      );
      if (firstVideo) {
        firstVideo.click();
      }
    });

  const sections = document.querySelectorAll('.section');
  const menuItems = document.querySelectorAll('.menu-item');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');

          menuItems.forEach((item) => {
            item.classList.remove('is-active');

            if (item.dataset.target === id) {
              item.classList.add('is-active');
            }
          });
        }
      });
    },
    {
      rootMargin: '-40% 0px -55% 0px',
      threshold: 0,
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
  menuItems.forEach((item) => {
    item.addEventListener('click', () => {
      const target = document.getElementById(item.dataset.target);
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
});
