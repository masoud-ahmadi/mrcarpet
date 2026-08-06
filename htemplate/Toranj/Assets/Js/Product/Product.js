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

    
  });

     $('.btn-prev-comment').on('click', function (e) {
     e.preventDefault();
     slidercomment.slideNext();
   });

   $('.btn-next-comment').on('click', function (e) {
     e.preventDefault();
     slidercomment.slidePrev();
   });


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
    spaceBetween: 20,
    rtl: true,
  });

   $('.btn-prev-video').on('click', function (e) {
     e.preventDefault();
     slidervideo.slideNext();
   });

   $('.btn-next-video').on('click', function (e) {
     e.preventDefault();
     slidervideo.slidePrev();
   });


   const sliderrelated = new Swiper('.related_slider', {
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

    $('.btn-prev-related').on('click', function (e) {
      e.preventDefault();
      sliderrelated.slideNext();
    });

    $('.btn-next-related').on('click', function (e) {
      e.preventDefault();
      sliderrelated.slidePrev();
    });


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
