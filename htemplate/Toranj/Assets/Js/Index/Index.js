$(document).ready(function () {
  const headerPrev = document.querySelector('.btn-prev.btnheader');
  const headerNext = document.querySelector('.btn-next.btnheader');
  const sliderbanner = new Swiper('.banner_slider', {
    loop: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },

    slidesPerView: 1,
    speed: 2500,
    allowTouchMove: false,

    lazy: true,
    lazy: {
      loadPrevNext: true,
      loadPrevNextAmount: 1,
    },
    loop: false,
    rtl: true,

    navigation: {
      nextEl: headerNext,
      prevEl: headerPrev,
    },

    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    on: {
      init() {
        updateHeaderNav(this);
      },

      slideChange() {
        updateHeaderNav(this);
      },
    },
  });
  function updateHeaderNav(swiper) {
    if (swiper.isBeginning) headerPrev.classList.add('disabled');
    else headerPrev.classList.remove('disabled');

    if (swiper.isEnd) headerNext.classList.add('disabled');
    else headerNext.classList.remove('disabled');
  }

  const slidersidebanner = new Swiper('.banner_side_slider', {
    autoplay: true,
    lazy: true,
    lazy: {
      loadPrevNext: true,
      loadPrevNextAmount: 1,
    },
    loop: true,
    rtl: true,
    slidesPerView: 1,
    breakpoints: {
      768: {
        autoplay: {
          delay: 7000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
      },
    },
  });

  const discountsidebanner = new Swiper('.discount_side_slider', {
    autoplay: true,
    lazy: true,
    freeMode: true,
    lazy: {
      loadPrevNext: true,
      loadPrevNextAmount: 1,
    },
    loop: true,
    rtl: true,
    slidesPerView: 'auto',
    breakpoints: {
      768: {
        autoplay: {
          delay: 7000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
      },
    },
  });

  const discountPrev = document.querySelector('.btn-prev.discount');
  const discountNext = document.querySelector('.btn-next.discount');
  const discountbanner = new Swiper('.discount_slider', {
    loop: true,
    autoplay: true,
    effect: 'slide',
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: {
      el: '.pagination.discount',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      },
    },
    breakpoints: {
      0: {
        autoplay: false,
      },
    },
  });



   const slidernew = new Swiper('.new_slider_product', {
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


    const slidergroup = new Swiper('.group_slider_product', {
      lazy: {
        loadPrevNext: true,
        loadPrevNextAmount: 1,
      },

      freeMode: true,
      loop: false,
      rtl: true,
      slidesPerView: 'auto',
      spaceBetween: 10,

     
    });

   



  /*countDown*/
  function initializeCountdowns() {
    $('.et-timer').each(function () {
      const $timer = $(this);
      const enddate = $timer.data('enddate');
      const endDate = new Date(
        new Date().getTime() + enddate * 24 * 60 * 60 * 1000
      );

      function updateTimer() {
        const now = new Date().getTime();
        const distance = endDate - now;

        if (distance < 0) {
          clearInterval(interval);
          $timer.find('.days').text('00');
          $timer.find('.hours').text('00');
          $timer.find('.minutes').text('00');
          $timer.find('.seconds').text('00');
          return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        $timer.find('.days').text(days.toString().padStart(2, '0'));
        $timer.find('.hours').text(hours.toString().padStart(2, '0'));
        $timer.find('.minutes').text(minutes.toString().padStart(2, '0'));
        $timer.find('.seconds').text(seconds.toString().padStart(2, '0'));
      }

      updateTimer();
      const interval = setInterval(updateTimer, 1000);
    });
  }

  $(document).ready(initializeCountdowns);

  /*countDown*/
});
