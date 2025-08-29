document.addEventListener('DOMContentLoaded', () => {
  const music = document.getElementById('bgMusic');
  const musicBtn = document.getElementById('musicBtn');

  if (music) {
    music.volume = 0;
    music.muted = true;

    music.play().then(() => {
      setTimeout(() => {
        music.muted = false;
        let vol = 0;
        const fade = setInterval(() => {
          vol += 0.05;
          music.volume = Math.min(vol, 1);
          if (vol >= 1) clearInterval(fade);
        }, 150);
      }, 500);
      if (musicBtn) musicBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }).catch((err) => {
      console.log('Autoplay blocked:', err);
    });

    if (musicBtn) {
      musicBtn.addEventListener('click', () => {
        if (music.paused) {
          music.play();
          musicBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        } else {
          music.pause();
          musicBtn.innerHTML = '<i class="fa-solid fa-music"></i>';
        }
      });
    }
  }
});
