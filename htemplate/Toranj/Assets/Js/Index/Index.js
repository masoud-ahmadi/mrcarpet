
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

  const sliderdiscount = new Swiper('.discount_slider_product', {
    lazy: {
      loadPrevNext: true,
      loadPrevNextAmount: 1,
    },

    slidesOffsetBefore: 10,
    slidesOffsetAfter: 10,

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

  const slidernew = new Swiper('.new_slider_product', {
    lazy: {
      loadPrevNext: true,
      loadPrevNextAmount: 1,
    },
    slidesOffsetBefore: 10,
    slidesOffsetAfter: 10,
    freeMode: true,
    loop: false,
    rtl: true,
    slidesPerView: 'auto',
    spaceBetween: 15,
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

  $('.btn-prev-new').on('click', function (e) {
    e.preventDefault();
    slidernew.slideNext();
  });

  $('.btn-next-new').on('click', function (e) {
    e.preventDefault();
    slidernew.slidePrev();
  });

  $(function () {
    function startCounter($container) {
      $container.find('.counter').each(function () {
        let $this = $(this);

        if ($this.hasClass('done')) return;

        $this.addClass('done');

        let target = parseInt($this.data('range'));
        let $number = $this.find('.progress-number');

        $({ Counter: 0 }).animate(
          { Counter: target },
          {
            duration: 3000,
            easing: 'swing',

            step: function () {
              $number.text('+' + Math.ceil(this.Counter));
            },

            complete: function () {
              $number.text('+' + target);
            },
          }
        );
      });
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            startCounter($(entry.target));

            // فقط همین سکشن از لیست observer حذف شود
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    $('.stats-counter').each(function () {
      observer.observe(this);
    });
  });

  const slidercolor = new Swiper('.color_slider_product', {
    lazy: {
      loadPrevNext: true,
      loadPrevNextAmount: 1,
    },
    

    loop: false,
    rtl: true,
    spaceBetween: 20,
    slidesPerView: 'auto',

    grid: {
      rows: 2,
      fill: 'row',
    },
  });

   $('.btn-prev-color').on('click', function (e) {
     e.preventDefault();
     slidercolor.slideNext();
   });

   $('.btn-next-color').on('click', function (e) {
     e.preventDefault();
     slidercolor.slidePrev();
   });

   const slidercontract = new Swiper('.contract_slider_product', {
     speed: 1000,
     freeMode: true,
     lazy: {
       loadPrevNext: true,
       loadPrevNextAmount: 1,
     },

     slidesOffsetBefore: 10,
     slidesOffsetAfter: 10,

     loop: true,
     rtl: true,
     spaceBetween: 10,
     slidesPerView: 'auto',
   });


  const sliderbrand = new Swiper('.brand_slider', {
    speed: 2000,
    loop: true,
    rtl: true,
    spaceBetween: 20,
    slidesPerView: 2,

    breakpoints: {
      480: {
        slidesPerView: 3,
        
      },
      640: {
        slidesPerView: 4,
        
      },
      768: {
        slidesPerView: 5,
        
      },
      1024: {
        slidesPerView: 6,
        
      },
      
    },

    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
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
