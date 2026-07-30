$(document).ready(function () {
function getFlipbookSize() {
  const remToPx = rem => rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  const w = window.innerWidth;

  if (w < remToPx(48)) {
    // موبایل (کمتر از 48rem = 768px)
    return {
      width: remToPx(22.5),   // 360px
      height: remToPx(31), // 500px
      display: "single",
    };
  } else if (w >= remToPx(48) && w < remToPx(64)) {
    // تبلت (بین 48rem و 64rem = 768px تا 1024px)
    return {
      width: remToPx(37.5),   // 600px
      height: remToPx(32.5),  // 520px
      display: "double",
    };
  } else {
    // دسکتاپ (بزرگتر از 64rem = 1024px)
    return {
      width: remToPx(53.125), // 850px
      height: remToPx(39.375),// 630px
      display: "double",
    };
  }
}


  function buildFlipbook() {
    const size = getFlipbookSize();

    if ($("#flipbook").data("turn")) {
      $("#flipbook").turn("destroy").removeClass("turnjs");
    }

    $("#flipbook").turn({
      width: size.width,
      height: size.height,
      autoCenter: true,
      display: size.display,
      elevation: 50,
      gradients: true,
      acceleration: true,
      turnCorners: "bl,br",
    });
  }

  buildFlipbook();

  // جلوگیری از تریگر شدن بی‌مورد buildFlipbook روی هر تغییر ریز سایز
  let lastWidth = $(window).width();
  $(window).on("resize", function () {
    const currentWidth = $(window).width();
    if (Math.abs(currentWidth - lastWidth) > 50) {
      buildFlipbook();
      lastWidth = currentWidth;
    }
  });

  // جلوگیری از قطع شدن تعامل وقتی روی خود کتاب کلیک میشه
  $("#flipbook").on("click", function (e) {
    e.stopPropagation();
  });

  // دکمه‌ها
  $(".prev").click(function () {
    $("#flipbook").turn("previous");
  });

  $(".next").click(function () {
    $("#flipbook").turn("next");
  });

  $("#goToFirstPage").click(function () {
    $("#flipbook").turn("page", 1);
  });

  $("#goToLastPage").click(function () {
    const totalPages = $("#flipbook").turn("pages");
    $("#flipbook").turn("page", totalPages);
  });

  $(".thumb").click(function () {
    const pageId = $(this).data("id");
    $("#flipbook").turn("page", pageId);
  });
  


    let isFullscreen = false;

  $("#toggleFullScreen").click(function () {
    const elem = document.documentElement;

    if (!isFullscreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        // Firefox
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        // Chrome, Safari and Opera
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        // IE/Edge
        elem.msRequestFullscreen();
      }

      // انیمیشن تغییر آیکون
      $(".icon-fullscreen").addClass("hidden").removeClass("block");
      $(".icon-exit").removeClass("hidden").addClass("block");
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        // Chrome, Safari and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        // IE/Edge
        document.msExitFullscreen();
      }

      // برگردوندن آیکون قبلی
      $(".icon-fullscreen").removeClass("hidden").addClass("block");
      $(".icon-exit").addClass("hidden").removeClass("block");
    }

    isFullscreen = !isFullscreen;
  });


  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const flipbook = document.getElementById('flipbook');

  let currentIndex = 0;

  /* همیشه لیست تصاویر را لحظه‌ای بگیر */
  function getImages() {
    return Array.from(document.querySelectorAll('#flipbook img.zoomin'));
  }

  function openLightbox(index) {
    const images = getImages();
    if (!images[index]) return;

    currentIndex = index;
    lightboxImg.src = images[currentIndex].src;
    lightbox.classList.remove('hidden');
  }

  function closeLightbox() {
    lightbox.classList.add('hidden');
  }

  function showNext() {
    const images = getImages();
    if (!images.length) return;

    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex].src;
  }

  function showPrev() {
    const images = getImages();
    if (!images.length) return;

    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
  }

  /* ✅ Event Delegation برای تصاویر داینامیک */
  flipbook.addEventListener('click', (e) => {
    const img = e.target.closest('img.zoomin');
    if (!img) return;

    e.stopPropagation();

    const images = getImages();
    const index = images.indexOf(img);
    openLightbox(index);
  });

  /* دکمه‌ها */
  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);

  /* بستن با کلیک بیرون */
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  /* کیبورد */
  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('hidden')) return;

    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowRight') showNext();
    else if (e.key === 'ArrowLeft') showPrev();
  });
  

});
