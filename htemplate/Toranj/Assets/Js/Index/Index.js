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

    const sliderdiscount = new Swiper('.discount_slider_product', {
      lazy: {
        loadPrevNext: true,
        loadPrevNextAmount: 1,
      },

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

    $('.btn-prev-discount').on('click', function (e) {
      e.preventDefault();
      sliderdiscount.slideNext();
    });

    $('.btn-next-discount').on('click', function (e) {
      e.preventDefault();
      sliderdiscount.slidePrev();
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
});
