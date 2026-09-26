/* ==========================================================================
   D.O.P BÁCH KHOA • GRADUATION 2026 — TRẦN HOÀNG NHẬT MINH
   Core Interaction Logic (Kiss & Tell Audio, Camera Zoom, Natural Polaroids, Video Showcase, Infinite Stream)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // 1. KHỞI TẠO LENIS SMOOTH SCROLL
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.5
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  gsap.registerPlugin(ScrollTrigger, Draggable);

  /* ==========================================================================
     AUDIO CONTROLLER (AESPA - KISS & TELL) VỚI ĐỘ TO ĐỘNG THEO CUỘN
     ========================================================================== */
  const bgAudio = document.querySelector("#bgAudio");
  const musicToggleBtn = document.querySelector("#musicToggleBtn");
  const vinylDisc = document.querySelector("#vinylDisc");
  const musicText = document.querySelector("#musicText");

  let isAudioPlaying = false;
  let activeSectionVolume = 0.4;
  let audioFadeTween = null;

  function setAudioVolume(targetVol, duration = 0.8) {
    activeSectionVolume = targetVol;
    if (!isAudioPlaying || !bgAudio) return;
    if (audioFadeTween) audioFadeTween.kill();
    audioFadeTween = gsap.to(bgAudio, {
      volume: targetVol,
      duration: duration,
      ease: "power2.out"
    });
  }

  function playMusic() {
    if (!bgAudio) return;
    const targetVol = activeSectionVolume > 0.05 ? activeSectionVolume : 0.4;
    bgAudio.volume = 0;
    const playPromise = bgAudio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        isAudioPlaying = true;
        vinylDisc.classList.add("playing");
        musicText.textContent = "Kiss & Tell ♫";
        if (audioFadeTween) audioFadeTween.kill();
        audioFadeTween = gsap.to(bgAudio, {
          volume: targetVol,
          duration: 0.8,
          ease: "power2.out"
        });
      }).catch(() => {
        isAudioPlaying = false;
        vinylDisc.classList.remove("playing");
      });
    }
  }

  function pauseMusic() {
    if (!bgAudio) return;
    if (audioFadeTween) audioFadeTween.kill();
    audioFadeTween = gsap.to(bgAudio, {
      volume: 0,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        bgAudio.pause();
        isAudioPlaying = false;
        vinylDisc.classList.remove("playing");
        musicText.textContent = "Nhạc tắt";
      }
    });
  }

  musicToggleBtn.addEventListener("click", () => {
    if (isAudioPlaying) pauseMusic();
    else playMusic();
  });

  // Tự động kích hoạt phát nhạc trên tương tác đầu tiên của người dùng
  const autoPlayHandler = () => {
    if (!isAudioPlaying) {
      playMusic();
    }
    window.removeEventListener("click", autoPlayHandler);
    window.removeEventListener("scroll", autoPlayHandler);
    window.removeEventListener("touchstart", autoPlayHandler);
  };
  window.addEventListener("click", autoPlayHandler, { once: true });
  window.addEventListener("scroll", autoPlayHandler, { once: true });
  window.addEventListener("touchstart", autoPlayHandler, { once: true });

  /* ==========================================================================
     STORYLINE DATA (5 SETS)
     ========================================================================== */
  const storylineSets = [
    {
      note: "Đây là giải đấu đầu tiên mà em đã đại diện HUST thi đấu, dù có nhiều khó khăn trong lúc luyện tập nhưng anh rất ghi nhận sự nỗ lực không ngừng nghỉ, và chúng ta đã đạt giải nhì vô cùng xứng đáng. Tuyệt vời, uống nào!",
      pinColor: "radial-gradient(circle at 35% 35%, #f87171, #dc2626)",
      catSticker: "assets/stickers/cat_heart.webp",
      photos: [
        { src: "assets/set1/photo_01.webp", orient: "landscape" },
        { src: "assets/set1/photo_02.webp", orient: "portrait" },
        { src: "assets/set1/photo_03.webp", orient: "landscape" },
        { src: "assets/set1/photo_04.webp", orient: "landscape" },
        { src: "assets/set1/photo_05.webp", orient: "landscape" }
      ]
    },
    {
      note: "Những buổi photoshot lưu lại trọn vẹn visual và năng lượng tích cực của em. Góc máy nào em cũng sáng bừng cả khung hình!",
      pinColor: "radial-gradient(circle at 35% 35%, #fbbf24, #d97706)",
      catSticker: "assets/stickers/cat_flower.webp",
      photos: [
        { src: "assets/set2/photo_01.webp", orient: "landscape" },
        { src: "assets/set2/photo_03.webp", orient: "portrait" },
        { src: "assets/set2/photo_04.webp", orient: "portrait" },
        { src: "assets/set2/photo_05.webp", orient: "landscape" },
        { src: "assets/set2/photo_07.webp", orient: "portrait" }
      ]
    },
    {
      note: "Phía sau ánh đèn còn là những kỷ niệm khó quên giữa anh, em và DOP. Hãy luôn giữ những kỷ niệm đẹp này ở một ngăn nhỏ trong tym em nhó <3",
      pinColor: "radial-gradient(circle at 35% 35%, #34d399, #059669)",
      catSticker: "assets/stickers/cat_heart.webp",
      photos: [
        { src: "assets/set3/photo_01.webp", orient: "landscape" },
        { src: "assets/set3/photo_02.webp", orient: "landscape" },
        { src: "assets/set3/photo_04.webp", orient: "landscape" },
        { src: "assets/set3/photo_05.webp", orient: "portrait" },
        { src: "assets/set3/photo_07.webp", orient: "square" }
      ]
    },
    {
      note: "Em sinh ra để toả sáng! Khi đứng trên sân khấu, em như một idol z ó, visual đỉnh nhất dàn DOP luôn, hơn nữa lại luôn kiên trì, chỉn chu với các bài diễn. Hy vọng anh sẽ còn được đứng chung sân khấu với IDOL lòng anh trong tương lai gần hehe",
      pinColor: "radial-gradient(circle at 35% 35%, #60a5fa, #2563eb)",
      catSticker: "assets/stickers/cat_grad.webp",
      photos: [
        { src: "assets/set4/photo_01.webp", orient: "landscape" },
        { src: "assets/set4/photo_04.webp", orient: "landscape" },
        { src: "assets/set4/photo_06.webp", orient: "landscape" },
        { src: "assets/set4/photo_08.webp", orient: "landscape" },
        { src: "assets/set4/photo_10.webp", orient: "landscape" }
      ]
    },
    {
      note: "Cảm ơn em đã đồng hành cùng Cựu PCN Truyền thông là anh để có những video dance choreography siêu chất lượng, những tấm ảnh trôn mà anh vẫn còn lưu ^^ Iu iuuuu",
      pinColor: "radial-gradient(circle at 35% 35%, #f472b6, #db2777)",
      catSticker: "assets/stickers/cat_flower.webp",
      photos: [
        { src: "assets/set5/photo_01.webp", orient: "landscape" },
        { src: "assets/set5/photo_02.webp", orient: "square" },
        { src: "assets/set5/photo_03.webp", orient: "portrait" },
        { src: "assets/set5/photo_04.webp", orient: "square" }
      ]
    }
  ];

  // DỮ LIỆU 7 VIDEO BIỂU DIỄN VỚI TÊN DUY NHẤT & LINK TRỰC TIẾP
  const videoList = [
    {
      name: "Video Đầu Tiên Lên Sóng Page DOP",
      poster: "assets/video_covers/cover_01_debut.webp",
      iframeUrl: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FD.O.P.BKDC%2Fvideos%2F841399820315197%2F&show_text=false&width=560&t=0",
      directUrl: "https://www.facebook.com/D.O.P.BKDC/videos/841399820315197/"
    },
    {
      name: "NCT U - 'BAGGY JEANS' Cover",
      poster: "assets/video_covers/cover_02_baggy.webp",
      iframeUrl: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FD.O.P.BKDC%2Fvideos%2F388485783830946%2F&show_text=false&width=560&t=0",
      directUrl: "https://www.facebook.com/D.O.P.BKDC/videos/388485783830946/"
    },
    {
      name: "P1Harmony - '때깔 (Killin' It)'",
      poster: "assets/video_covers/cover_03_killin.webp",
      iframeUrl: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FD.O.P.BKDC%2Fvideos%2F519952743710531%2F&show_text=false&width=560&t=0",
      directUrl: "https://www.facebook.com/D.O.P.BKDC/videos/519952743710531/"
    },
    {
      name: "Tiết mục 'Ngáo Ngơ' • SÓNG FESTIVAL",
      poster: "assets/video_covers/cover_04_ngao_ngo.webp",
      iframeUrl: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FD.O.P.BKDC%2Fvideos%2F1241324927007206%2F&show_text=false&width=560&t=0",
      directUrl: "https://www.facebook.com/D.O.P.BKDC/videos/1241324927007206/"
    },
    {
      name: "Mashup Chào Tân Sinh Viên 2023",
      poster: "assets/video_covers/cover_05_chao_tan_2023.webp",
      iframeUrl: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FD.O.P.BKDC%2Fvideos%2F1736468360162928%2F&show_text=false&width=560&t=0",
      directUrl: "https://www.facebook.com/D.O.P.BKDC/videos/1736468360162928/"
    },
    {
      name: "NCT DREAM - 'Candy' Cover",
      poster: "assets/video_covers/cover_06_candy.webp",
      iframeUrl: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F813524270000030%2F&show_text=false&width=560&t=0",
      directUrl: "https://www.facebook.com/reel/813524270000030/"
    },
    {
      name: "Chào Tân Sinh Viên 2024",
      poster: "assets/video_covers/cover_07_chao_tan_2024.webp",
      iframeUrl: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FD.O.P.BKDC%2Fvideos%2F1623249511930952%2F&show_text=false&width=560&t=9",
      directUrl: "https://www.facebook.com/D.O.P.BKDC/videos/1623249511930952/"
    }
  ];

  /* ==========================================================================
     1. HERO SECTION: ZOOM MÁY ẢNH & TIÊU ĐỀ ĐỒNG BỘ 
     ========================================================================== */
  const cameraWrapper = document.querySelector("#cameraHeroWrapper");
  const heroCameraTitle = document.querySelector("#heroCameraTitle");
  const winterHero = document.querySelector("#winterHeroSticker");
  const catHero = document.querySelector("#catHeroSticker");

  gsap.set(cameraWrapper, { transformOrigin: "35.83% 49.70%" });

  let confettiTriggered = false;

  const heroTL = gsap.timeline({
    scrollTrigger: {
      trigger: "#heroStage",
      start: "top top",
      end: "+=2400",
      pin: true,
      scrub: 1.2,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        setAudioVolume(0.35 + self.progress * 0.35, 0.4);

        if (self.progress > 0.82 && !confettiTriggered) {
          confettiTriggered = true;
          if (typeof confetti === 'function') {
            confetti({
              particleCount: 90,
              angle: 60,
              spread: 65,
              origin: { x: 0.05, y: 0.9 },
              colors: ['#ffde00', '#ffee33', '#ffffff', '#f43f5e']
            });
            confetti({
              particleCount: 90,
              angle: 120,
              spread: 65,
              origin: { x: 0.95, y: 0.9 },
              colors: ['#ffde00', '#ffee33', '#ffffff', '#38bdf8']
            });
          }
        } else if (self.progress < 0.6) {
          confettiTriggered = false;
        }
      }
    }
  });

  const isMobileView = () => window.innerWidth < 768;
  const shiftX = () => cameraWrapper.offsetWidth * 0.1417;
  const shiftY = () => isMobileView() ? -window.innerHeight * 0.08 : 0;

  heroTL
    .to([winterHero, catHero], { opacity: 0, scale: 0.5, duration: 0.35, ease: "power2.in" }, 0)
    .to(heroCameraTitle, { scale: 1.6, y: -60, opacity: 0, duration: 1.1, ease: "power2.in" }, 0)
    .to(cameraWrapper, { 
      scale: 2.8, 
      x: shiftX,
      y: shiftY,
      duration: 2.2, 
      ease: "power2.inOut" 
    }, 0)
    .to("#cameraCutoutImg", { opacity: 0, duration: 0.9, ease: "power2.in" }, 1.1)
    .set("#heroReveal", { opacity: 1, pointerEvents: "auto" }, 1.25)
    // 1. Pop-up 2 sticker góc: Happy Graduation & Disco 2026
    .fromTo(["#heroGradCorner", "#heroDiscoCorner"], 
      { scale: 0, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.8)", stagger: 0.1 }, 
      1.3
    )
    // 2. Pop-up box chào baby Nhật Minh
    .fromTo("#heroMsgCard", 
      { scale: 0.65, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.6)" }, 
      1.4
    )
    // 3. Pop-up tiêu đề "Chào Trần Hoàng Nhật Minh"
    .fromTo("#heroMsgTitle", 
      { scale: 0.75, y: 15, opacity: 0 }, 
      { scale: 1, y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.8)" }, 
      1.5
    )
    // 4. Đoạn văn chúc mừng trồi lên êm ái
    .fromTo("#heroMsgText", 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, 
      1.6
    )
    // 5. Winter thò ra từ nóc hộp cầm bánh kem pop-out 3D siêu đáng yêu
    .fromTo("#winterPeekingCake", 
      { scale: 0, rotation: -12, opacity: 0 }, 
      { scale: 1, rotation: 0, opacity: 1, duration: 0.55, ease: "back.out(2.4)" }, 
      1.7
    )
    // 6. Dòng chữ Cùng ngắm nhìn... pop-in xuất hiện cuối cùng
    .fromTo(".hero-scroll-hint", 
      { scale: 0.75, y: 15, opacity: 0 }, 
      { scale: 1, y: 0, opacity: 1, duration: 0.45, ease: "back.out(1.6)" }, 
      1.8
    );

  /* ==========================================================================
     2. STORYLINE SECTION: POLAROID TỰ NHIÊN ĐÚNG TỶ LỆ TRÊN BÀN GỖ 
     ========================================================================== */
  const storyStage = document.querySelector("#storylineStage");
  const storyNoteCard = document.querySelector("#storylineNoteCard");
  const storyNoteText = document.querySelector("#storyNoteText");
  const notePin = document.querySelector("#notePin");
  const noteCatSticker = document.querySelector("#noteCatSticker");
  const cardsContainer = document.querySelector("#storylineCardsContainer");
  const photoLightboxModal = document.querySelector("#photoLightboxModal");
  const lightboxBackdrop = document.querySelector("#lightboxBackdrop");
  const lightboxImg = document.querySelector("#lightboxImg");
  const lightboxCloseBtn = document.querySelector("#lightboxCloseBtn");
  const lightboxCard = document.querySelector("#lightboxCard");

  let currentSetIndex = -1;
  let activeCards = [];
  let isStoryAnimating = false;
  let topZIndex = 100;
  let savedScrollPos = 0;
  let activeSourceCard = null;
  let isClosingLightbox = false;

  // Hiệu ứng "Nhặt tấm ảnh lên xem": Thẻ bay vút từ vị trí & góc nghiêng trên bàn lên trung tâm
  function openLightboxTactile(sourceCard, photoSrc) {
    if (!photoLightboxModal || !lightboxImg || !lightboxCard) return;
    if (isClosingLightbox) return;

    activeSourceCard = sourceCard;
    savedScrollPos = (typeof lenis !== 'undefined' && lenis && typeof lenis.scroll === 'number') ? lenis.scroll : (window.scrollY || window.pageYOffset || 0);
    if (typeof lenis !== 'undefined' && lenis) lenis.stop();

    lightboxImg.src = photoSrc;
    photoLightboxModal.classList.add("active");

    const startRect = sourceCard.getBoundingClientRect();
    const cardRot = gsap.getProperty(sourceCard, "rotation") || 0;

    gsap.set(lightboxCard, { clearProps: "transform,boxShadow" });
    const targetRect = lightboxCard.getBoundingClientRect();

    const startCenterX = startRect.left + startRect.width / 2;
    const startCenterY = startRect.top + startRect.height / 2;
    const targetCenterX = targetRect.left + targetRect.width / 2;
    const targetCenterY = targetRect.top + targetRect.height / 2;

    const diffX = startCenterX - targetCenterX;
    const diffY = startCenterY - targetCenterY;
    const scaleFactor = Math.max(0.15, startRect.width / targetRect.width);

    // Ẩn tạm thời ảnh trên bàn để tạo cảm giác đã được nhấc bổng lên
    gsap.set(sourceCard, { opacity: 0 });

    gsap.fromTo(lightboxBackdrop, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });

    gsap.fromTo(lightboxCard, {
      x: diffX,
      y: diffY,
      scale: scaleFactor,
      rotation: cardRot,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
    }, {
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      boxShadow: "0 35px 85px rgba(0, 0, 0, 0.65), 0 0 0 3px #FFE600",
      duration: 0.48,
      ease: "power3.out"
    });
  }

  // Hiệu ứng "Thả lại ảnh xuống bàn": Ảnh bay chuẩn xác trở về vị trí và góc nghiêng ban đầu
  function closeLightboxTactile() {
    if (!photoLightboxModal || !lightboxCard) return;
    if (isClosingLightbox) return;
    isClosingLightbox = true;

    if (activeSourceCard && document.body.contains(activeSourceCard)) {
      const currentTargetRect = lightboxCard.getBoundingClientRect();
      const endRect = activeSourceCard.getBoundingClientRect();

      const endCenterX = endRect.left + endRect.width / 2;
      const endCenterY = endRect.top + endRect.height / 2;
      const currentCenterX = currentTargetRect.left + currentTargetRect.width / 2;
      const currentCenterY = currentTargetRect.top + currentTargetRect.height / 2;

      const diffX = endCenterX - currentCenterX;
      const diffY = endCenterY - currentCenterY;
      const scaleFactor = Math.max(0.15, endRect.width / currentTargetRect.width);
      const cardRot = gsap.getProperty(activeSourceCard, "rotation") || 0;

      gsap.to(lightboxBackdrop, { opacity: 0, duration: 0.32, ease: "power2.in" });

      gsap.to(lightboxCard, {
        x: diffX,
        y: diffY,
        scale: scaleFactor,
        rotation: cardRot,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        duration: 0.38,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(activeSourceCard, { opacity: 1 });
          photoLightboxModal.classList.remove("active");
          gsap.set(lightboxCard, { clearProps: "all" });
          if (lightboxImg) lightboxImg.src = "";
          activeSourceCard = null;
          isClosingLightbox = false;
          if (typeof lenis !== 'undefined' && lenis) {
            lenis.start();
            lenis.scrollTo(savedScrollPos, { immediate: true });
          }
        }
      });
    } else {
      gsap.to(lightboxBackdrop, { opacity: 0, duration: 0.25 });
      gsap.to(lightboxCard, {
        scale: 0.85,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          if (activeSourceCard) gsap.set(activeSourceCard, { opacity: 1 });
          photoLightboxModal.classList.remove("active");
          gsap.set(lightboxCard, { clearProps: "all" });
          if (lightboxImg) lightboxImg.src = "";
          activeSourceCard = null;
          isClosingLightbox = false;
          if (typeof lenis !== 'undefined' && lenis) {
            lenis.start();
            lenis.scrollTo(savedScrollPos, { immediate: true });
          }
        }
      });
    }
  }

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener("click", closeLightboxTactile);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener("click", closeLightboxTactile);
  if (lightboxCard) {
    lightboxCard.addEventListener("click", (e) => {
      e.stopPropagation();
      closeLightboxTactile();
    });
  }

  // Chặn lan truyền cuộn chuột/cảm ứng khi đang xem ảnh phóng to
  if (photoLightboxModal) {
    photoLightboxModal.addEventListener('wheel', (e) => e.preventDefault(), { passive: false });
    photoLightboxModal.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
  }

  // Tọa độ rải tự nhiên (vô tình bừa bộn nhưng có chủ đích) phủ kín khoảng trống
  function getScatterPositions(setIdx, isMobile) {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const cx = w / 2;
    const cy = h / 2;

    if (isMobile) {
      const scatterOffsets = [
        [
          { x: cx - 180, y: cy - 265, rot: -8 },
          { x: cx + 15,  y: cy - 275, rot: 8 },
          { x: cx - 180, y: cy + 155, rot: 7 },
          { x: cx + 15,  y: cy + 165, rot: -7 }
        ],
        [
          { x: cx - 175, y: cy - 270, rot: 7 },
          { x: cx + 15,  y: cy - 260, rot: -8 },
          { x: cx - 185, y: cy + 160, rot: -6 },
          { x: cx + 10,  y: cy + 150, rot: 8 }
        ],
        [
          { x: cx - 180, y: cy - 260, rot: -9 },
          { x: cx + 15,  y: cy - 270, rot: 9 },
          { x: cx - 175, y: cy + 150, rot: 8 },
          { x: cx + 15,  y: cy + 160, rot: -6 }
        ],
        [
          { x: cx - 170, y: cy - 270, rot: 8 },
          { x: cx + 15,  y: cy - 265, rot: -7 },
          { x: cx - 180, y: cy + 165, rot: -7 },
          { x: cx + 15,  y: cy + 155, rot: 7 }
        ],
        [
          { x: cx - 175, y: cy - 265, rot: -7 },
          { x: cx + 15,  y: cy - 270, rot: 8 },
          { x: cx - 180, y: cy + 155, rot: 6 },
          { x: cx + 15,  y: cy + 165, rot: -8 }
        ]
      ];
      return scatterOffsets[setIdx % scatterOffsets.length];
    }

    // 5 Layout rải bàn độc bản cho từng set, phủ rộng không gian
    const layouts = [
      // Set 1: Giải thể thao (5 ảnh)
      [
        { x: cx - 580, y: cy - 270, rot: -8 },
        { x: cx + 290, y: cy - 280, rot: 7 },
        { x: cx - 600, y: cy + 30,  rot: 7 },
        { x: cx + 310, y: cy + 40,  rot: -10 },
        { x: cx - 270, y: cy + 180, rot: 4 }
      ],
      // Set 2: Photoshot visual
      [
        { x: cx - 550, y: cy - 270, rot: 6 },
        { x: cx + 320, y: cy - 260, rot: -7 },
        { x: cx - 590, y: cy + 20,  rot: -8 },
        { x: cx + 300, y: cy + 50,  rot: 9 },
        { x: cx + 110, y: cy + 180, rot: -5 }
      ],
      // Set 3: Hậu trường & tiếng cười
      [
        { x: cx - 560, y: cy - 260, rot: -11 },
        { x: cx + 300, y: cy - 290, rot: 10 },
        { x: cx - 550, y: cy + 40,  rot: 6 },
        { x: cx + 330, y: cy + 30,  rot: -7 },
        { x: cx - 210, y: cy + 190, rot: -4 }
      ],
      // Set 4: Spotlight bùng nổ sân khấu
      [
        { x: cx - 600, y: cy - 260, rot: 8 },
        { x: cx + 290, y: cy - 270, rot: -8 },
        { x: cx - 570, y: cy + 40,  rot: -6 },
        { x: cx + 340, y: cy + 60,  rot: 8 },
        { x: cx + 60,  y: cy + 190, rot: 5 }
      ],
      // Set 5: Min & Nhật Minh
      [
        { x: cx - 540, y: cy - 250, rot: -8 },
        { x: cx + 290, y: cy - 250, rot: 9 },
        { x: cx - 560, y: cy + 40,  rot: 7 },
        { x: cx + 310, y: cy + 50,  rot: -8 }
      ]
    ];

    return layouts[setIdx % layouts.length];
  }

  function createCards(setIdx) {
    const isMobile = window.innerWidth < 768;
    const data = storylineSets[setIdx];
    const positions = getScatterPositions(setIdx, isMobile);
    const newCards = [];

    data.photos.forEach((photo, i) => {
      if (isMobile && i >= 4) return;
      const pos = positions[i % positions.length];

      // Kích thước phóng to vừa vặn, không để quá nhiều khoảng trống
      let w, h;
      if (photo.orient === "landscape") {
        w = isMobile ? 175 : 310;
        h = Math.round(w * (0.7));
      } else if (photo.orient === "portrait") {
        w = isMobile ? 140 : 230;
        h = Math.round(w * (1.36));
      } else {
        w = isMobile ? 150 : 255;
        h = w;
      }

      const card = document.createElement("div");
      card.classList.add("storyline-card");
      card.style.width = `${w}px`;
      card.style.height = `${h}px`;

      const img = document.createElement("img");
      img.src = photo.src;
      img.loading = "lazy";
      card.appendChild(img);
      cardsContainer.appendChild(card);

      const targetX = pos.x;
      const targetY = pos.y;
      const rotation = pos.rot;

      newCards.push({ el: card, targetX, targetY, rotation, w, h });

      let isDraggingCard = false;

      Draggable.create(card, {
        type: "x,y",
        inertia: false,
        dragClickables: false,
        minimumMovement: 5,
        onDragStart: function() {
          isDraggingCard = true;
          topZIndex++;
          gsap.set(this.target, { zIndex: topZIndex });
          this.target.classList.remove('view-mode');
        },
        onDragEnd: function() {
          setTimeout(() => { isDraggingCard = false; }, 80);
        }
      });

      // Native Click Listener: Mở Lightbox với hiệu ứng "Nhặt tấm ảnh lên xem & Thả lại xuống bàn"
      card.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isDraggingCard) return;
        openLightboxTactile(card, photo.src);
      });
    });
    return newCards;
  }

  function animateStoryHeading(setIdx) {
    const data = storylineSets[setIdx];
    return gsap.timeline()
      .to(storyNoteCard, { opacity: 0, scale: 0.94, duration: 0.25, ease: "power2.in" })
      .call(() => {
        storyNoteText.textContent = data.note;
        notePin.style.background = data.pinColor;
        noteCatSticker.src = data.catSticker;
      })
      .to(storyNoteCard, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.2)" });
  }

  // Chuyển set ảnh: Thẻ xuất hiện lần lượt ngẫu nhiên (Random Stagger)
  function animateStoryCards(outgoing, incoming) {
    const tl = gsap.timeline();
    outgoing.forEach(item => {
      tl.to(item.el, {
        opacity: 0,
        scale: 0.9,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => item.el.remove()
      }, 0);
    });

    const incomingEls = incoming.map(item => item.el);
    incoming.forEach(item => {
      gsap.set(item.el, {
        x: item.targetX,
        y: item.targetY + 30,
        rotation: item.rotation,
        opacity: 0,
        scale: 0.92
      });
    });

    tl.to(incomingEls, {
      y: (i) => incoming[i].targetY,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: {
        amount: 0.35,
        from: "random"
      },
      ease: "power2.out"
    }, 0.2);

    return tl;
  }

  // Khởi tạo Set 1
  activeCards = createCards(0);
  activeCards.forEach(c => gsap.set(c.el, { x: c.targetX, y: c.targetY, rotation: c.rotation, opacity: 1 }));
  storyNoteText.textContent = storylineSets[0].note;
  notePin.style.background = storylineSets[0].pinColor;
  noteCatSticker.src = storylineSets[0].catSticker;
  currentSetIndex = 0;

  ScrollTrigger.create({
    trigger: storyStage,
    start: "top top",
    end: `+=${window.innerHeight * storylineSets.length * 1.1}`,
    pin: true,
    scrub: false,
    onEnter: () => setAudioVolume(0.70, 0.8),
    onEnterBack: () => setAudioVolume(0.70, 0.8),
    onUpdate: (self) => {
      if (isStoryAnimating) return;
      const newIdx = Math.min(Math.floor(self.progress * storylineSets.length), storylineSets.length - 1);
      if (newIdx !== currentSetIndex) {
        if (photoLightboxModal && photoLightboxModal.classList.contains("active")) {
          closeLightboxTactile();
        }
        isStoryAnimating = true;
        const outgoing = [...activeCards];
        const newCards = createCards(newIdx);
        const cardAnim = animateStoryCards(outgoing, newCards);
        const textAnim = animateStoryHeading(newIdx);

        Promise.all([cardAnim, textAnim])
          .then(() => {
            activeCards = newCards;
            currentSetIndex = newIdx;
          })
          .catch((err) => {
            console.error("Storyline transition error:", err);
            activeCards = newCards;
            currentSetIndex = newIdx;
          })
          .finally(() => {
            isStoryAnimating = false;
          });
      }
    }
  });

  /* ==========================================================================
     3. VIDEO SHOWCASE CAROUSEL (CHUẨN 16:9 CHIỀU SÂU ĐIỆN ẢNH KHÔNG VIỀN ĐEN)
     - Trên Laptop: Ẩn nút < >, click trực tiếp ảnh phụ để chuyển, click ảnh chính để xem.
     - Trên Mobile: Ẩn ảnh phụ, hiện 2 nút < > để chuyển video.
     ========================================================================== */
  const slider = document.querySelector(".slider-container");
  const videoTitleEl = document.querySelector("#videoTitle");
  const showcaseCounter = document.querySelector("#showcaseCounter");
  const prevVideoBtn = document.querySelector("#prevVideoBtn");
  const nextVideoBtn = document.querySelector("#nextVideoBtn");

  let activeVideoIdx = 0;
  let lastSwitchTime = 0;

  function getVIdx(i) {
    return ((i % videoList.length) + videoList.length) % videoList.length;
  }

  function updateVideoInfo(index, dir = 'next') {
    const item = videoList[index];
    if (showcaseCounter) showcaseCounter.textContent = `${index + 1} / ${videoList.length}`;
    if (!videoTitleEl) return;

    videoTitleEl.innerHTML = "";
    item.name.split("").forEach(char => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      videoTitleEl.appendChild(span);
    });

    gsap.fromTo(videoTitleEl.querySelectorAll("span"), 
      { yPercent: dir === 'next' ? 100 : -100, opacity: 0 }, 
      { yPercent: 0, opacity: 1, stagger: 0.015, duration: 0.45, ease: "power3.out" }
    );
  }

  function buildVideoCard(type, index) {
    const slide = document.createElement("div");
    slide.classList.add("video-slide", type);
    slide.dataset.index = index;

    const inner = document.createElement("div");
    inner.classList.add("video-slide-inner");

    const img = document.createElement("img");
    img.src = videoList[index].poster;
    img.alt = videoList[index].name;
    inner.appendChild(img);

    if (type === 'active') {
      const playBtn = document.createElement("div");
      playBtn.classList.add("play-badge");
      playBtn.innerHTML = `<svg viewBox="0 0 24 24"><polygon points="6 4 20 12 6 20 6 4"/></svg>`;
      inner.appendChild(playBtn);
    }

    slide.appendChild(inner);
    return slide;
  }

  function renderShowcase(dir = 'next') {
    slider.innerHTML = "";
    const isMobile = window.innerWidth < 768;
    const offsetDist = isMobile ? "38vw" : "36vw";

    const prevIdx = getVIdx(activeVideoIdx - 1);
    const currIdx = activeVideoIdx;
    const nextIdx = getVIdx(activeVideoIdx + 1);

    const slidePrev = buildVideoCard("prev", prevIdx);
    const slideCurr = buildVideoCard("active", currIdx);
    const slideNext = buildVideoCard("next", nextIdx);

    slider.appendChild(slidePrev);
    slider.appendChild(slideCurr);
    slider.appendChild(slideNext);

    gsap.set(slideCurr, { xPercent: -50, yPercent: -50, x: "0vw", scale: 1, opacity: 1, zIndex: 20, rotationY: 0 });
    gsap.set(slidePrev, { xPercent: -50, yPercent: -50, x: `-${offsetDist}`, scale: 0.72, opacity: 0.65, zIndex: 10, rotationY: 12 });
    gsap.set(slideNext, { xPercent: -50, yPercent: -50, x: offsetDist, scale: 0.72, opacity: 0.65, zIndex: 10, rotationY: -12 });

    if (dir === 'next') {
      gsap.from(slideCurr, { x: "20vw", scale: 0.85, opacity: 0.5, duration: 0.45, ease: "power2.out" });
      gsap.from(slidePrev, { x: "0vw", duration: 0.45, ease: "power2.out" });
    } else if (dir === 'prev') {
      gsap.from(slideCurr, { x: "-20vw", scale: 0.85, opacity: 0.5, duration: 0.45, ease: "power2.out" });
      gsap.from(slideNext, { x: "0vw", duration: 0.45, ease: "power2.out" });
    }

    // Click vào ảnh chính -> Mở video ngay lập tức
    slideCurr.addEventListener("click", () => {
      openVideoModal(videoList[currIdx]);
    });

    // Click vào ảnh phụ bên trái -> chuyển lùi
    slidePrev.addEventListener("click", () => {
      switchToVideo(prevIdx, 'prev');
    });

    // Click vào ảnh phụ bên phải -> chuyển tiến
    slideNext.addEventListener("click", () => {
      switchToVideo(nextIdx, 'next');
    });

    updateVideoInfo(activeVideoIdx, dir);
  }

  function switchToVideo(newIdx, dir = 'next') {
    const now = Date.now();
    if (now - lastSwitchTime < 320) return;
    lastSwitchTime = now;
    activeVideoIdx = newIdx;
    renderShowcase(dir);
  }

  if (prevVideoBtn) {
    prevVideoBtn.addEventListener("click", () => {
      switchToVideo(getVIdx(activeVideoIdx - 1), 'prev');
    });
  }
  if (nextVideoBtn) {
    nextVideoBtn.addEventListener("click", () => {
      switchToVideo(getVIdx(activeVideoIdx + 1), 'next');
    });
  }

  renderShowcase('init');

  ScrollTrigger.create({
    trigger: "#showcaseStage",
    start: "top center",
    end: "bottom center",
    onEnter: () => setAudioVolume(0.25, 0.8),
    onEnterBack: () => setAudioVolume(0.25, 0.8)
  });

  /* ==========================================================================
     4. VIDEO MODAL (CHỈ SHOW MỖI VIDEO, CÓ LINK TRỰC TIẾP FB & MUTE NHẠC NỀN)
     ========================================================================== */
  const videoModal = document.querySelector("#videoModal");
  const videoModalFrame = document.querySelector("#videoModalFrame");
  const videoModalClose = document.querySelector("#videoModalClose");
  const videoDirectFbLink = document.querySelector("#videoDirectFbLink");

  function openVideoModal(item) {
    if (!item) return;
    savedScrollPos = (typeof lenis !== 'undefined' && lenis && typeof lenis.scroll === 'number') ? lenis.scroll : (window.scrollY || window.pageYOffset || 0);
    videoModalFrame.src = item.iframeUrl;
    videoModal.classList.add("active");
    if (typeof lenis !== 'undefined' && lenis) lenis.stop();
    pauseMusic(); // Tạm dừng nhạc nền để nghe nhạc bài diễn
  }

  function closeVideoModal() {
    videoModal.classList.remove("active");
    videoModalFrame.src = "";
    if (typeof lenis !== 'undefined' && lenis) {
      lenis.start();
      lenis.scrollTo(savedScrollPos, { immediate: true });
    }
    playMusic(); // Bật lại nhạc nền ngay khi đóng
  }

  videoModalClose.addEventListener("click", closeVideoModal);
  videoModal.addEventListener("click", (e) => {
    if (e.target === videoModal) closeVideoModal();
  });

  /* ==========================================================================
     5. FINALE TỰ ĐỘNG CUỘN VÔ TẬN 
     ========================================================================== */
  const allPhotosRaw = [];
  storylineSets.forEach(s => allPhotosRaw.push(...s.photos.map(p => p.src)));

  function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  const allPhotos = shuffleArray(allPhotosRaw);

  const infSlider = document.querySelector("#infiniteSlider");
  const isMobile = window.innerWidth <= 768;
  const growthRatio = isMobile ? 1.48 : 1.36;
  const minSize = isMobile ? 65 : 45;
  const A = minSize / (growthRatio - 1);
  const maxScreen = isMobile ? (window.innerWidth * 1.8) : 4200;
  const xOffset = isMobile ? -240 : 0;
  const pMax = Math.ceil(Math.log(((maxScreen - xOffset) / A) + 1) / Math.log(growthRatio));
  const pMin = isMobile ? -2 : (Math.floor(Math.log(1 / minSize) / Math.log(growthRatio)) - 2);
  const count = pMax - pMin;

  function edgeX(p) { return A * Math.pow(growthRatio, p) + xOffset; }
  function lerp(start, end, t) { return start * (1 - t) + end * t; }
  function wrap(index, max) { return ((index % max) + max) % max; }

  let infSlides = [];
  let currentScroll = 0;
  let targetScroll = 0;

  for (let i = 0; i < count; i++) {
    const slide = document.createElement("div");
    slide.className = "slide";
    const img = document.createElement("img");
    slide.appendChild(img);
    infSlider.appendChild(slide);

    infSlides.push({ el: slide, img: img, baseP: pMin + i, currentIndex: -1 });
  }

  function renderInfiniteSlider() {
    targetScroll += 0.007; // Tự động trôi nhanh, sống động
    currentScroll = lerp(currentScroll, targetScroll, 0.08);

    infSlides.forEach(slide => {
      let p = slide.baseP + currentScroll;
      while (p > pMax) { slide.baseP -= count; p -= count; }
      while (p < pMin) { slide.baseP += count; p += count; }

      const left = edgeX(p);
      const right = edgeX(p + 1);
      const width = right - left;
      const height = width * 1.32;

      const imgIndex = wrap(Math.floor(slide.baseP), allPhotos.length);
      if (slide.currentIndex !== imgIndex) {
        slide.currentIndex = imgIndex;
        slide.img.src = allPhotos[imgIndex];
      }

      slide.el.style.transform = `translate3d(${left}px, ${isMobile ? -15 : -40}px, 0)`;
      slide.el.style.width = `${width}px`;
      slide.el.style.height = `${height}px`;
      slide.el.style.zIndex = Math.min(50, Math.round(left / 60) + 1);
    });

    requestAnimationFrame(renderInfiniteSlider);
  }
  renderInfiniteSlider();

  ScrollTrigger.create({
    trigger: "#finaleStage",
    start: "top center",
    end: "bottom center",
    onEnter: () => setAudioVolume(0.85, 0.8),
    onEnterBack: () => setAudioVolume(0.85, 0.8)
  });

  /* ==========================================================================
     6. LÁ THƯ TỐT NGHIỆP: YOUR PỎNHUB 2026 RECAP (CUỘN THƯ 100% MƯỢT MÀ SAFARI)
     ========================================================================== */
  const openLetterBtn = document.querySelector("#openLetterBtn");
  const letterModal = document.querySelector("#letterModal");
  const letterCloseBtn = document.querySelector("#letterCloseBtn");

  function openLetter() {
    savedScrollPos = (typeof lenis !== 'undefined' && lenis && typeof lenis.scroll === 'number') ? lenis.scroll : (window.scrollY || window.pageYOffset || 0);
    letterModal.classList.add("active");
    letterModal.scrollTop = 0; // Luôn bắt đầu từ đầu thư
    if (typeof lenis !== 'undefined' && lenis) lenis.stop(); // Khóa Lenis để Safari không cuộn trang ngầm
    setAudioVolume(0.35, 0.8);

    if (typeof confetti === 'function') {
      confetti({
        particleCount: 160,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#ff9900', '#ffffff', '#ffde00', '#111827']
      });
    }
  }

  function closeLetter() {
    letterModal.classList.remove("active");
    if (typeof lenis !== 'undefined' && lenis) {
      lenis.start();
      lenis.scrollTo(savedScrollPos, { immediate: true });
    }
    setAudioVolume(0.85, 0.8);
  }

  openLetterBtn.addEventListener("click", openLetter);
  letterCloseBtn.addEventListener("click", closeLetter);
  letterModal.addEventListener("click", (e) => {
    if (e.target === letterModal) closeLetter();
  });

  // Chặn triệt để hiện tượng Safari truyền sự kiện cuộn xuống trang web bên dưới
  letterModal.addEventListener("wheel", (e) => {
    e.stopPropagation();
    const maxScroll = letterModal.scrollHeight - letterModal.clientHeight;
    if (maxScroll <= 0) {
      e.preventDefault();
      return;
    }
    letterModal.scrollTop += e.deltaY;
    e.preventDefault();
  }, { passive: false });
});
