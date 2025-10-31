document.addEventListener('DOMContentLoaded', () => {
  initMainBanner();
  initHouseSliders();
  initVideoControls();
});

function initVideoControls() {
  const allVideos = document.querySelectorAll('video');
  allVideos.forEach(video => {
    video.addEventListener('play', () => {
      pauseOtherVideos(video);
    });
  });
}

function pauseOtherVideos(currentVideo) {
  const allVideos = document.querySelectorAll('video');
  
  allVideos.forEach(video => {
    if (video !== currentVideo && !video.paused) {
      video.pause();
    }
  });
}

function initMainBanner() {
  const banner = document.getElementById('main-banner');
  if (!banner) return;

  const slides = banner.querySelector('.banner-slides');
  const dots = banner.querySelectorAll('.banner-dot');
  const prev = banner.querySelector('.prev');
  const next = banner.querySelector('.next');

  let currentIndex = 0;
  const totalSlides = dots.length;
  let autoSlideTimer;

  function updateBanner() {
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function nextBannerSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateBanner();
  }

  function prevBannerSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateBanner();
  }

  function startAutoSlide() {
    autoSlideTimer = setInterval(nextBannerSlide, 7000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    startAutoSlide();
  }

  next.addEventListener('click', () => {
    nextBannerSlide();
    resetAutoSlide();
  });

  prev.addEventListener('click', () => {
    prevBannerSlide();
    resetAutoSlide();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateBanner();
      resetAutoSlide();
    });
  });

  let startX = 0;
  banner.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  banner.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextBannerSlide();
      } else {
        prevBannerSlide();
      }
      resetAutoSlide();
    }
  }, { passive: true });

  updateBanner();
  startAutoSlide();
}

function initHouseSliders() {
  const houseGalleries = document.querySelectorAll('.house-gallery');
  
  houseGalleries.forEach((gallery, galleryIndex) => {
    const slides = gallery.querySelector('.gallery-slides');
    const dots = gallery.querySelectorAll('.gallery-dot');
    const prev = gallery.querySelector('.prev');
    const next = gallery.querySelector('.next');
    const videos = gallery.querySelectorAll('video');

    let currentIndex = 0;
    const totalSlides = dots.length;

    function updateGallery() {
      slides.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
      
      videos.forEach(video => {
        if (!video.paused) {
          video.pause();
          video.currentTime = 0;
        }
      });
    }

    function nextGallerySlide() {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateGallery();
    }

    function prevGallerySlide() {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateGallery();
    }

    next.addEventListener('click', nextGallerySlide);
    prev.addEventListener('click', prevGallerySlide);

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateGallery();
      });
    });

    let startX = 0;
    gallery.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    gallery.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextGallerySlide();
        } else {
          prevGallerySlide();
        }
      }
    }, { passive: true });

    updateGallery();
  });
}
