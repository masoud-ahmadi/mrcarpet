
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


  /*countDown*/
});
