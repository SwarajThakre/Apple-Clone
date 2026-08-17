/**
 * Apple (India) Landing Page
 * Advanced Animations: Lenis Smooth Scroll, Three.js WebGL Constellation, GSAP ScrollTrigger, 3D Tilt & Magnetic Hover
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. PRELOADER & INTRO TIMELINE (CRITICAL - RUN IMMEDIATELY)
  // =========================================================================
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loader-bar');

  const introTimeline = gsap.timeline({
    defaults: { ease: 'power3.out' },
  });

  // Animate preloader bar
  introTimeline
    .to(loaderBar, {
      width: '100%',
      duration: 0.8,
      ease: 'power2.inOut',
    })
    .to(loader, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => {
        if (loader) loader.style.display = 'none';
      },
    })
    .from(
      '.nav-promo',
      {
        y: -20,
        opacity: 0,
        duration: 0.6,
      },
      '-=0.2',
    )
    .from(
      '.navbar',
      {
        y: -20,
        opacity: 0,
        duration: 0.6,
      },
      '-=0.4',
    );

  // =========================================================================
  // 2. LENIS SMOOTH SCROLL + GSAP INTEGRATION (DEFERRED)
  // =========================================================================
  // Defer Lenis and WebGL initialization to reduce DOMContentLoaded blocking time
  // by deferring to requestIdleCallback (or fallback to setTimeout)
  if ('requestIdleCallback' in window) {
    requestIdleCallback(initializeAnimations, { timeout: 2000 });
  } else {
    setTimeout(initializeAnimations, 100);
  }

  function initializeAnimations() {
    let lenis;
    if (typeof Lenis !== 'undefined') {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-like smooth decel
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        infinite: false,
      });

      // Synchronize Lenis scroll with GSAP ScrollTrigger
      if (typeof ScrollTrigger !== 'undefined') {
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
      } else {
        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      }
    }

    // =========================================================================
    // 3. THREE.JS WEBGL PARTICLES & NEBULA WAVE (DEFERRED)
    // =========================================================================
    const canvas = document.getElementById('webgl-canvas');
    if (canvas && typeof THREE !== 'undefined') {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
      );
      camera.position.z = 120;

      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Particle texture generator (soft glowing circular sprite)
      function createParticleTexture() {
        const pCanvas = document.createElement('canvas');
        pCanvas.width = 64;
        pCanvas.height = 64;
        const ctx = pCanvas.getContext('2d');
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, 'rgba(64, 169, 255, 0.8)');
        gradient.addColorStop(0.6, 'rgba(191, 90, 242, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
        return new THREE.CanvasTexture(pCanvas);
      }

      // Geometry creation with 3D wave mesh & floating starfield
      const particleCount = 700;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const originalY = new Float32Array(particleCount);
      const scales = new Float32Array(particleCount);
      const colors = new Float32Array(particleCount * 3);

      // Color palette: Apple Silicon glow (Cyan, Indigo, Magenta, Silver)
      const colorPalette = [
        new THREE.Color(0x2997ff), // Apple Blue
        new THREE.Color(0xbf5af2), // Apple Purple
        new THREE.Color(0x64d2ff), // Light Cyan
        new THREE.Color(0xffffff), // White Starlight
        new THREE.Color(0xff375f), // Crimson
      ];

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        // Spread across wide screen space
        positions[i3] = (Math.random() - 0.5) * 320;
        positions[i3 + 1] = (Math.random() - 0.5) * 220;
        positions[i3 + 2] = (Math.random() - 0.5) * 160;

        originalY[i] = positions[i3 + 1];
        scales[i] = Math.random() * 2.5 + 0.5;

        const randomColor =
          colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i3] = randomColor.r;
        colors[i3 + 1] = randomColor.g;
        colors[i3 + 2] = randomColor.b;
      }

      geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3),
      );
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 4.5,
        map: createParticleTexture(),
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      // Floating subtle geometric ring mesh (representing Apple precision engineering)
      const ringGeometry = new THREE.TorusGeometry(35, 0.4, 16, 100);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x2997ff,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
      });
      const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
      ringMesh.position.set(0, 0, -20);
      scene.add(ringMesh);

      // Mouse & Scroll Parallax Tracking
      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;
      let scrollProgress = 0;
      let scrollVelocity = 0;
      let lastScroll = window.scrollY;

      window.addEventListener('mousemove', (e) => {
        targetX = (e.clientX / window.innerWidth - 0.5) * 2;
        targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
      });

      // Animation Loop
      let clock = new THREE.Clock();

      function animateWebGL() {
        requestAnimationFrame(animateWebGL);

        const elapsedTime = clock.getElapsedTime();

        // Smooth mouse interpolation
        mouseX += (targetX - mouseX) * 0.05;
        mouseY += (targetY - mouseY) * 0.05;

        // Calculate scroll velocity
        const currentScroll = window.scrollY;
        scrollVelocity = (currentScroll - lastScroll) * 0.02;
        lastScroll = currentScroll;
        scrollProgress =
          currentScroll /
          (document.documentElement.scrollHeight - window.innerHeight || 1);

        // Rotate particle cloud & Ring
        particles.rotation.y = elapsedTime * 0.04 + mouseX * 0.2;
        particles.rotation.x = mouseY * 0.15 + scrollProgress * 0.5;

        ringMesh.rotation.x = elapsedTime * 0.08 + scrollProgress * 2;
        ringMesh.rotation.y = elapsedTime * 0.05;
        ringMesh.position.y = -scrollProgress * 60;

        // Animate individual particle waves based on sine waves + scroll velocity
        const positionAttr = geometry.attributes.position;
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          const u = positions[i3];
          const v = positions[i3 + 2];
          const wave =
            Math.sin(elapsedTime * 1.2 + u * 0.04) *
            Math.cos(elapsedTime * 0.8 + v * 0.04) *
            8;
          positionAttr.array[i3 + 1] = originalY[i] + wave - scrollVelocity * 4;
        }
        positionAttr.needsUpdate = true;

        // Camera dynamic shift
        camera.position.x = mouseX * 8;
        camera.position.y = mouseY * 8;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      }
      animateWebGL();

      // Window Resize Handler
      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      });
    }

    // =========================================================================
    // 4. GSAP SCROLLTRIGGER REVEAL & PARALLAX ANIMATIONS
    // =========================================================================
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Scroll reveal for all `.reveal-up` elements with stagger
      const revealContainers = document.querySelectorAll(
        'section, .product-card, .footer',
      );
      revealContainers.forEach((container) => {
        const items = container.querySelectorAll('.reveal-up');
        if (items.length > 0) {
          gsap.fromTo(
            items,
            {
              y: 50,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: container,
                start: 'top 82%',
                toggleActions: 'play none none none',
              },
            },
          );
        }
      });

      // Image Zoom-Out / Parallax Entrance for Hero Sections
      const heroScales = document.querySelectorAll('.reveal-scale');
      heroScales.forEach((scaleEl) => {
        gsap.fromTo(
          scaleEl,
          {
            scale: 0.9,
            opacity: 0,
            y: 40,
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: scaleEl,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        );

        // Continuous subtle parallax while scrolling
        gsap.to(scaleEl.querySelector('img'), {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: scaleEl,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });

      // MacBook Air background parallax
      const macbookBg = document.querySelector('.macbook-air-bg');
      if (macbookBg) {
        gsap.fromTo(
          macbookBg,
          { scale: 1.08, yPercent: 4 },
          {
            scale: 1,
            yPercent: -4,
            ease: 'none',
            scrollTrigger: {
              trigger: '#section-macbook-air',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          },
        );
      }

      // iPhone background parallax
      const iphoneBg = document.querySelector('.iphone-bg');
      if (iphoneBg) {
        gsap.fromTo(
          iphoneBg,
          { scale: 1.08, yPercent: 4 },
          {
            scale: 1,
            yPercent: -4,
            ease: 'none',
            scrollTrigger: {
              trigger: '#section-iphone',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          },
        );
      }

      // Product Cards Staggered 3D entrance
      const productCards = document.querySelectorAll('.product-card');
      productCards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 60,
            rotateX: 8,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        );
      });

      // Navbar backdrop blur intensity & background alpha on scroll
      ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        onUpdate: (self) => {
          const nav = document.getElementById('main-nav');
          if (nav) {
            if (self.progress > 0) {
              nav.style.background = 'rgba(29, 29, 31, 0.88)';
              nav.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.35)';
            } else {
              nav.style.background = 'rgba(29, 29, 31, 0.72)';
              nav.style.boxShadow = 'none';
            }
          }
        },
      });
    }

    // =========================================================================
    // 5. MOUSE GLOW & CURSOR FOLLOWER
    // =========================================================================
    const cursorGlow = document.getElementById('cursor-glow');
    if (cursorGlow) {
      let curX = window.innerWidth / 2;
      let curY = window.innerHeight / 2;
      let targetCurX = curX;
      let targetCurY = curY;

      window.addEventListener('mousemove', (e) => {
        targetCurX = e.clientX;
        targetCurY = e.clientY;
      });

      function updateCursorGlow() {
        curX += (targetCurX - curX) * 0.12;
        curY += (targetCurY - curY) * 0.12;
        cursorGlow.style.transform = `translate(${curX - 150}px, ${curY - 150}px)`;
        requestAnimationFrame(updateCursorGlow);
      }
      updateCursorGlow();
    }

    // =========================================================================
    // 6. 3D TILT HOVER & DYNAMIC GLARE FOR PRODUCT CARDS
    // =========================================================================
    const tiltCards = document.querySelectorAll('.product-card');

    tiltCards.forEach((card) => {
      let bounds;

      function onMouseEnter() {
        bounds = card.getBoundingClientRect();
        document.addEventListener('mousemove', onMouseMove);
      }

      function onMouseMove(e) {
        if (!bounds) bounds = card.getBoundingClientRect();

        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;

        // Mouse percent within card (0% to 100%)
        const xPct = (mouseX / bounds.width) * 100;
        const yPct = (mouseY / bounds.height) * 100;

        card.style.setProperty('--mouse-x', `${xPct}%`);
        card.style.setProperty('--mouse-y', `${yPct}%`);

        // 3D rotation angles (-6 to +6 degrees)
        const xRot = (mouseY / bounds.height - 0.5) * -10;
        const yRot = (mouseX / bounds.width - 0.5) * 10;

        gsap.to(card, {
          rotateX: xRot,
          rotateY: yRot,
          scale: 1.015,
          duration: 0.4,
          ease: 'power2.out',
          transformPerspective: 1000,
        });
      }

      function onMouseLeave() {
        document.removeEventListener('mousemove', onMouseMove);
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
        });
      }

      card.addEventListener('mouseenter', onMouseEnter);
      card.addEventListener('mouseleave', onMouseLeave);
    });

    // =========================================================================
    // 7. MAGNETIC BUTTON HOVER EFFECT
    // =========================================================================
    const magneticButtons = document.querySelectorAll(
      '.magnetic-btn, .nav-action-btn, .tv-card-cta',
    );

    magneticButtons.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - btnCenterX) * 0.35;
        const deltaY = (e.clientY - btnCenterY) * 0.35;

        gsap.to(btn, {
          x: deltaX,
          y: deltaY,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1.2, 0.4)',
        });
      });
    });

    // =========================================================================
    // 8. APPLE TV+ CAROUSEL (INTERACTIVE + AUTO-ADVANCE)
    // =========================================================================
    const carousel = document.getElementById('tv-carousel');
    const dots = document.querySelectorAll('.carousel-dot');
    const tvCards = carousel ? carousel.querySelectorAll('.tv-card') : [];

    if (carousel && tvCards.length > 0) {
      let autoScrollInterval;
      let isUserInteracting = false;

      function getCardWidth() {
        return tvCards[0].offsetWidth + 14;
      }

      function updateActiveDot() {
        const scrollLeft = carousel.scrollLeft;
        const cardWidth = getCardWidth();
        const activeIndex = Math.round(scrollLeft / cardWidth);

        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === activeIndex);
        });
      }

      carousel.addEventListener(
        'scroll',
        () => {
          requestAnimationFrame(updateActiveDot);
        },
        { passive: true },
      );

      dots.forEach((dot) => {
        dot.addEventListener('click', () => {
          const index = parseInt(dot.dataset.index);
          const cardWidth = getCardWidth();
          carousel.scrollTo({
            left: index * cardWidth,
            behavior: 'smooth',
          });
        });
      });

      // Auto-scroll loop
      function startAutoScroll() {
        clearInterval(autoScrollInterval);
        autoScrollInterval = setInterval(() => {
          if (isUserInteracting) return;

          const maxScroll = carousel.scrollWidth - carousel.clientWidth;
          if (carousel.scrollLeft >= maxScroll - 20) {
            carousel.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            carousel.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
          }
        }, 3600);
      }

      carousel.addEventListener('mouseenter', () => {
        isUserInteracting = true;
      });
      carousel.addEventListener('mouseleave', () => {
        isUserInteracting = false;
      });
      carousel.addEventListener(
        'touchstart',
        () => {
          isUserInteracting = true;
        },
        { passive: true },
      );
      carousel.addEventListener(
        'touchend',
        () => {
          setTimeout(() => {
            isUserInteracting = false;
          }, 2500);
        },
        { passive: true },
      );

      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.create({
          trigger: '#section-tv',
          start: 'top 70%',
          onEnter: startAutoScroll,
          onLeave: () => clearInterval(autoScrollInterval),
          onEnterBack: startAutoScroll,
          onLeaveBack: () => clearInterval(autoScrollInterval),
        });
      } else {
        startAutoScroll();
      }
    }

    // =========================================================================
    // 9. RESPONSIVE MOBILE NAVIGATION
    // =========================================================================
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    let navOpen = false;

    if (navToggle && navLinks) {
      navToggle.addEventListener('click', () => {
        navOpen = !navOpen;

        if (navOpen) {
          navLinks.style.display = 'flex';
          navLinks.style.flexDirection = 'column';
          navLinks.style.position = 'fixed';
          navLinks.style.top = '44px';
          navLinks.style.left = '0';
          navLinks.style.right = '0';
          navLinks.style.background = 'rgba(29, 29, 31, 0.98)';
          navLinks.style.backdropFilter = 'saturate(180%) blur(25px)';
          navLinks.style.padding = '24px';
          navLinks.style.zIndex = '999';
          navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.08)';

          gsap.fromTo(
            navLinks.children,
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              stagger: 0.05,
              duration: 0.3,
              ease: 'power2.out',
            },
          );

          navToggle.children[0].style.transform =
            'rotate(45deg) translate(3px, 3px)';
          navToggle.children[1].style.transform =
            'rotate(-45deg) translate(1px, -1px)';
        } else {
          gsap.to(navLinks.children, {
            opacity: 0,
            x: 20,
            stagger: 0.03,
            duration: 0.2,
            onComplete: () => {
              navLinks.style.display = '';
              navLinks.style.flexDirection = '';
              navLinks.style.position = '';
              navLinks.style.top = '';
              navLinks.style.left = '';
              navLinks.style.right = '';
              navLinks.style.background = '';
              navLinks.style.backdropFilter = '';
              navLinks.style.padding = '';
              navLinks.style.zIndex = '';
              navLinks.style.borderBottom = '';
            },
          });

          navToggle.children[0].style.transform = '';
          navToggle.children[1].style.transform = '';
        }
      });
    }
  }
});
