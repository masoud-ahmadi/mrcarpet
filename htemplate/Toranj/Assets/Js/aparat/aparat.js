// video-clip
document.querySelectorAll('.preview').forEach((video) => {
  const clips = video.dataset.clips.split(',').map((item) => {
    const [start, end] = item.split('-').map(Number);
    return { start, end };
  });

  let clipIndex = 0;
  let hoverTimer = null;
  let playing = false;

  function playClip() {
    if (!playing) return;

    const clip = clips[clipIndex];

    video.currentTime = clip.start;

    video.play().catch(() => {});

    const onTimeUpdate = () => {
      if (video.currentTime >= clip.end) {
        video.removeEventListener('timeupdate', onTimeUpdate);

        clipIndex++;

        if (clipIndex >= clips.length) {
          video.pause();
          video.currentTime = 0;
          clipIndex = 0;

          return;
        }

        playClip();
      }
    };

    video.addEventListener('timeupdate', onTimeUpdate);
  }

  video.parentElement.addEventListener('mouseenter', () => {
    hoverTimer = setTimeout(() => {
      playing = true;

      clipIndex = 0;

      playClip();
    }, 350);
  });

  video.parentElement.addEventListener('mouseleave', () => {
    clearTimeout(hoverTimer);

    playing = false;

    video.pause();

    video.currentTime = 0;

    clipIndex = 0;
  });
});

// slug
const slug = location.pathname.split('/').filter(Boolean).pop();

document.querySelectorAll('.submenuItems a').forEach((a) => {
  const href = a.getAttribute('href');

  if (href === slug) {
    a.classList.add('group-active');
  }
});
