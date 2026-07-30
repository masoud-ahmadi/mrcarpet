document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.story_slider')) {
    const storySlider = new Swiper('.story_slider', {
      rtl: true,
      loop: false,
      speed: 400,
      spaceBetween: 10,
      slidesPerView: 'auto',
      grabCursor: true,
      watchOverflow: true,
    });
  }
  const storyItems = document.querySelectorAll('.story-item');
  const modal = document.querySelector('.story-modal');
  const storyVideo = document.querySelector('.story-video');
  const closeModalOverlay = document.querySelector('.close-modal-overlay');
  const progressContainer = document.querySelector('.progress-container');
  const prevBtn = document.querySelector('.prev-story');
  const nextBtn = document.querySelector('.next-story');
  const closeStoryBtns = document.querySelectorAll('.close-story-btn');
  const fullscreenButton = document.querySelector('.fullscreen-button');
  const wrap = document.querySelector('.story-video-wrapper');

  function showLoader() {
    wrap?.classList.add('is-loading');
  }

  function hideLoader() {
    wrap?.classList.remove('is-loading');
  }

  storyVideo.addEventListener('loadedmetadata', () => {
    const w = storyVideo.videoWidth;
    const h = storyVideo.videoHeight;

    if (w >= h) {
      wrap.classList.add('horizontal');
      wrap.classList.remove('vertical');
    } else {
      wrap.classList.add('vertical');
      wrap.classList.remove('horizontal');
    }
  });

  if (!storyItems.length || !modal || !storyVideo) return;

  let currentIndex = 0;
  let progressBars = [];
  let backHandler = null;
  let isFullScreen = false;

  function enableBackButtonClose() {
    history.pushState({ storyOpen: true }, '');
    backHandler = () => {
      if (modal.offsetParent !== null) {
        closeStory();
      }
    };

    window.addEventListener('popstate', backHandler);
  }

  function playStory(index) {
    if (index < 0 || index >= storyItems.length) {
      closeStory();
      return;
    }

    currentIndex = index;

    const item = storyItems[index];
    const videoSrc = item.getAttribute('data-video');
    const linkHref = item.getAttribute('data-link');
    const img = item.querySelector('img');
    const posterSrc = img ? img.src : '';

    if (!videoSrc) return;

    storyVideo.pause();
    storyVideo.currentTime = 0;
    showLoader();
    storyVideo.src = videoSrc;
    storyVideo.poster = posterSrc;

    const relatedLink = modal.querySelector('.story-link');
    if (relatedLink) {
      relatedLink.href = linkHref || '#';
    }
    modal.classList.remove('hidden');

    // if (!document.fullscreenElement) {
    //   if (modal.requestFullscreen) modal.requestFullscreen();
    //   else if (modal.webkitRequestFullscreen) modal.webkitRequestFullscreen();
    // }

    enableBackButtonClose();
    document.body.style.overflow = 'hidden';

    progressContainer.innerHTML = '';
    progressBars = [];

    storyItems.forEach((_, i) => {
      const bar = document.createElement('div');
      bar.className = 'progress';

      const fill = document.createElement('div');
      fill.className = 'progress-fill';

      if (i < index) fill.style.width = '100%';
      if (i === index) fill.style.width = '0%';

      bar.appendChild(fill);
      progressContainer.appendChild(bar);
      progressBars.push(fill);
    });
  }

  function updateProgress() {
    const bar = progressBars[currentIndex];
    if (!bar || !storyVideo.duration) return;

    const percent = (storyVideo.currentTime / storyVideo.duration) * 100;
    bar.style.width = percent + '%';
  }

  function closeStory() {
    hideLoader();
    storyVideo.pause();
    storyVideo.currentTime = 0;

    modal.classList.add('hidden');

    document.body.style.overflow = '';

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }

    if (backHandler) {
      window.removeEventListener('popstate', backHandler);
      backHandler = null;
    }
  }

  // events
  storyVideo.addEventListener('timeupdate', updateProgress);
  storyVideo.addEventListener('ended', () => playStory(currentIndex + 1));

  storyVideo.addEventListener('loadstart', showLoader);
  storyVideo.addEventListener('waiting', showLoader);

  storyVideo.addEventListener('playing', hideLoader);
  storyVideo.addEventListener('canplay', hideLoader);
  storyVideo.addEventListener('error', hideLoader);

  storyVideo.addEventListener('seeking', showLoader);
  storyVideo.addEventListener('seeked', hideLoader);

  nextBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    playStory(currentIndex + 1);
  });

  prevBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    playStory(currentIndex - 1);
  });

  storyItems.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      playStory(index);
    });
  });

  closeStoryBtns.forEach((btn) => btn.addEventListener('click', closeStory));

  closeModalOverlay?.addEventListener('click', closeStory);

  window.addEventListener('keydown', (e) => {
    if (!isFullScreen) {
      if (e.key === 'Escape') {
        closeStory();
      }
    }
  });

  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement && !modal.classList.contains('hidden')) {
      // closeStory();
    }
  });

  const seekContainer = document.getElementById('seekContainer');
  const seekBar = document.getElementById('seekBar');
  const seekTooltip = document.getElementById('seekTooltip');
  const muteIcon = document.getElementById('muteIcon');

  // Update seek bar while playing
  storyVideo.addEventListener('timeupdate', () => {
    const percent = (storyVideo.currentTime / storyVideo.duration) * 100;
    seekBar.style.width = percent + '%';
  });

  // Seek on click
  seekContainer.addEventListener('click', (e) => {
    const rect = seekContainer.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    storyVideo.currentTime = percent * storyVideo.duration;
  });

  // Tooltip on hover
  seekContainer.addEventListener('mousemove', (e) => {
    const rect = seekContainer.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const time = percent * storyVideo.duration;

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');

    seekTooltip.textContent = `${minutes}:${seconds}`;
    seekTooltip.style.left = `${e.clientX - rect.left}px`;
    seekTooltip.classList.remove('hidden');
  });

  seekContainer.addEventListener('mouseleave', () => {
    seekTooltip.classList.add('hidden');
  });

  // Mute / Unmute on video click
  storyVideo.addEventListener('click', () => {
    storyVideo.muted = !storyVideo.muted;

    if (storyVideo.muted) {
      // show icon
      muteIcon.classList.remove('hidden');
    } else {
      // hide icon
      muteIcon.classList.add('hidden');
    }
  });
  // full screen
  function enterFullscreen() {
    if (storyVideo.requestFullscreen) {
      storyVideo.requestFullscreen();
    } else if (storyVideo.webkitRequestFullscreen) {
      /* Safari */
      storyVideo.webkitRequestFullscreen();
    } else if (storyVideo.msRequestFullscreen) {
      /* IE11 */
      storyVideo.msRequestFullscreen();
    }
  }

  fullscreenButton.addEventListener('click', enterFullscreen);

  storyVideo.addEventListener('click', () => {
    if (document.fullscreenElement === storyVideo) {
      exitFullscreen();
    }
  });

  storyVideo.onfullscreenchange = (e) => {
    isFullScreen = !isFullScreen;
  };
});
