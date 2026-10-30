/**
 * Portofolio Pribadi - Muhammad Akbar
 * Junior Web Developer & Administrasi
 * Vanilla JavaScript (Minimal, Cepat, & Aksesibel)
 */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 0. OPENING INTRO
  // ------------------------------------------------------------------------
  const siteIntro = document.getElementById('site-intro');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (siteIntro) {
    document.body.classList.add('intro-active');

    window.setTimeout(() => {
      siteIntro.classList.add('is-complete');
      siteIntro.style.opacity = '0';
      siteIntro.style.visibility = 'hidden';
      siteIntro.style.pointerEvents = 'none';
      document.body.classList.remove('intro-active');
    }, reducedMotion ? 80 : 1500);
  }

  // ------------------------------------------------------------------------
  // 1. TAHUN OTOMATIS PADA FOOTER
  // ------------------------------------------------------------------------
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ------------------------------------------------------------------------
  // 2. TOGGLE DARK / LIGHT THEME (DENGAN LOCALSTORAGE & PREFERS-COLOR-SCHEME)
  // ------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const metaThemeColor = document.getElementById('meta-theme-color');
  const htmlRoot = document.documentElement;

  // Cek tema tersimpan atau fallback ke setelan preferensi sistem operasi
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  // Terapkan tema
  applyTheme(initialTheme);

  function applyTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#141210' : '#845233');
    }

    if (themeToggleBtn) {
      themeToggleBtn.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'
      );
      themeToggleBtn.setAttribute(
        'title',
        theme === 'dark' ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'
      );
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  // Listener jika pengguna mengganti preferensi tema OS saat browsing
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // ------------------------------------------------------------------------
  // 3. MENU MOBILE & HAMBURGER (AKSESIBEL DENGAN ARIA & ESCAPE KEY)
  // ------------------------------------------------------------------------
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navOverlay = document.getElementById('nav-overlay');
  const navLinks = document.querySelectorAll('.nav__link');

  function openMenu() {
    navToggle.setAttribute('aria-expanded', 'true');
    navMenu.classList.add('is-open');
    navOverlay.classList.add('is-visible');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('is-open');
    navOverlay.classList.remove('is-visible');
    document.body.classList.remove('menu-open');
  }

  if (navToggle && navMenu && navOverlay) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Tutup saat overlay diklik
    navOverlay.addEventListener('click', closeMenu);

    // Tutup saat tautan navigasi diklik
    navLinks.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    // Tutup jika pengguna menekan tombol Escape (aksesibilitas keyboard)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        closeMenu();
        navToggle.focus();
      }
    });
  }

  // ------------------------------------------------------------------------
  // 3B. PINTASAN KEMBALI KE HERO
  // ------------------------------------------------------------------------
  const heroSection = document.getElementById('hero');
  const topNavigationLinks = document.querySelectorAll('a[href="#hero"]');

  topNavigationLinks.forEach((topLink) => {
    topLink.addEventListener('click', (event) => {
      event.preventDefault();
      closeMenu();
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      window.history.replaceState(null, '', '#hero');

      window.setTimeout(() => {
        heroSection?.focus({ preventScroll: true });
      }, prefersReducedMotion ? 0 : 500);
    });
  });

  // ------------------------------------------------------------------------
  // 4. ACTIVE NAVIGATION LINK ON SCROLL (SCROLLSPY SEDERHANA)
  // ------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const targetLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

      if (targetLink) {
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach((l) => l.classList.remove('is-active'));
          targetLink.classList.add('is-active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  // ------------------------------------------------------------------------
  // 5. ANIMASI MUNCUL SAAT SCROLL (INTERSECTION OBSERVER)
  // ------------------------------------------------------------------------
  // Memastikan jika JS aktif, kelas .js-reveal-active diaktifkan ke body.
  // Jika browser tidak mendukung IntersectionObserver, elemen langsung tampil.
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window && revealElements.length > 0) {
    document.body.classList.add('js-reveal-active');

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target); // Hanya animasi 1 kali untuk performa
          }
        });
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  // ------------------------------------------------------------------------
  // 6. PROGRES BAR CAHAYA PADA TIMELINE PENGALAMAN
  // ------------------------------------------------------------------------
  const timeline = document.querySelector('.timeline');
  const timelineItems = timeline ? timeline.querySelectorAll('.timeline__item') : [];
  let timelineFrame = null;

  const updateTimelineProgress = () => {
    if (!timeline) return;

    const timelineRect = timeline.getBoundingClientRect();
    const viewportAnchor = window.innerHeight * 0.55;
    const progress = Math.min(1, Math.max(0, (viewportAnchor - timelineRect.top) / timelineRect.height));

    timeline.style.setProperty('--timeline-progress', progress.toFixed(3));
    timelineItems.forEach((item) => {
      item.classList.toggle('is-timeline-active', item.getBoundingClientRect().top < viewportAnchor);
    });
  };

  const requestTimelineProgress = () => {
    if (timelineFrame !== null) return;
    timelineFrame = window.requestAnimationFrame(() => {
      updateTimelineProgress();
      timelineFrame = null;
    });
  };

  if (timeline) {
    window.addEventListener('scroll', requestTimelineProgress, { passive: true });
    window.addEventListener('resize', requestTimelineProgress);
    updateTimelineProgress();
  }

  // ------------------------------------------------------------------------
  // 7. FILTER KATEGORI PENGALAMAN
  // ------------------------------------------------------------------------
  const experienceFilters = document.querySelectorAll('[data-experience-filter]');
  const experienceItems = document.querySelectorAll('[data-experience-category]');

  if (experienceFilters.length > 0 && experienceItems.length > 0) {
    experienceFilters.forEach((filterButton) => {
      filterButton.addEventListener('click', () => {
        const selectedCategory = filterButton.dataset.experienceFilter;

        experienceFilters.forEach((button) => {
          const isActive = button === filterButton;
          button.classList.toggle('is-active', isActive);
          button.setAttribute('aria-pressed', String(isActive));
        });

        experienceItems.forEach((item) => {
          const shouldShow = selectedCategory === 'all' || item.dataset.experienceCategory === selectedCategory;
          item.classList.toggle('is-filtered-out', !shouldShow);
          if (!shouldShow) item.querySelector('details')?.removeAttribute('open');
        });

        requestTimelineProgress();
      });
    });
  }

  // ------------------------------------------------------------------------
  // 8. MODAL DOKUMENTASI PENGALAMAN
  // ------------------------------------------------------------------------
  const experienceDocsModal = document.getElementById('experience-docs-modal');
  const experienceModalTitle = document.getElementById('experience-modal-title');
  const experienceModalEyebrow = document.querySelector('.experience-modal__eyebrow');
  const experienceModalContent = document.getElementById('experience-modal-content');
  const experienceModalCounter = document.getElementById('experience-modal-counter');
  const experienceModalClose = document.querySelector('[data-docs-close]');
  const experienceModalPrev = document.querySelector('[data-docs-prev]');
  const experienceModalNext = document.querySelector('[data-docs-next]');
  const documentationTriggers = document.querySelectorAll('[data-docs-trigger]');
  let lastDocumentationTrigger = null;
  let documentationImages = [];
  let activeDocumentationImage = 0;

  if (experienceDocsModal && experienceModalTitle && experienceModalContent && experienceModalCounter && experienceModalClose && experienceModalPrev && experienceModalNext) {
    const renderDocumentationImage = () => {
      const activeImage = documentationImages[activeDocumentationImage];
      if (!activeImage) return;

      experienceModalContent.replaceChildren(activeImage.cloneNode(true));
      experienceModalCounter.textContent = `${activeDocumentationImage + 1} / ${documentationImages.length}`;
      experienceModalPrev.disabled = documentationImages.length < 2 || activeDocumentationImage === 0;
      experienceModalNext.disabled = documentationImages.length < 2 || activeDocumentationImage === documentationImages.length - 1;
    };

    documentationTriggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const timelineCard = trigger.closest('.timeline__card');
        const evidenceSource = timelineCard?.querySelector('.timeline__evidence-source');
        const evidenceImages = evidenceSource ? evidenceSource.querySelectorAll('.timeline__evidence-preview img') : [];

        if (!evidenceSource || evidenceImages.length === 0) return;

        lastDocumentationTrigger = trigger;
        documentationImages = [...evidenceImages];
        activeDocumentationImage = 0;
        experienceModalTitle.textContent = timelineCard.querySelector('.timeline__title')?.textContent.trim() || trigger.dataset.docsTitle || 'Dokumentasi Pengalaman';
        if (experienceModalEyebrow) {
          experienceModalEyebrow.textContent = timelineCard.querySelector('.timeline__badge')?.textContent.trim() || 'Dokumentasi pengalaman';
        }
        renderDocumentationImage();
        experienceDocsModal.showModal();
        experienceModalClose.focus();
      });
    });

    experienceModalPrev.addEventListener('click', () => {
      if (activeDocumentationImage > 0) {
        activeDocumentationImage -= 1;
        renderDocumentationImage();
      }
    });

    experienceModalNext.addEventListener('click', () => {
      if (activeDocumentationImage < documentationImages.length - 1) {
        activeDocumentationImage += 1;
        renderDocumentationImage();
      }
    });

    const closeExperienceDocsModal = () => {
      experienceDocsModal.close();
      lastDocumentationTrigger?.focus();
    };

    experienceModalClose.addEventListener('click', closeExperienceDocsModal);
    experienceDocsModal.addEventListener('click', (event) => {
      if (event.target === experienceDocsModal) closeExperienceDocsModal();
    });
  }

  // ------------------------------------------------------------------------
  // 9. CAROUSEL PROYEK DENGAN FOKUS KARTU TENGAH
  // ------------------------------------------------------------------------
  const projectsTrack = document.getElementById('projects-track');
  const projectsPreviousBtn = document.getElementById('projects-prev');
  const projectsNextBtn = document.getElementById('projects-next');
  const projectsStatus = document.getElementById('projects-status');

  if (projectsTrack && projectsPreviousBtn && projectsNextBtn) {
    const projectCards = [...projectsTrack.querySelectorAll('.project-card')];
    const projectFilters = [...document.querySelectorAll('[data-project-filter]')];

    const getVisibleProjectCards = () => projectCards.filter((card) => !card.classList.contains('is-filtered-out'));

    const getProjectMetrics = () => {
      const visibleProjectCards = getVisibleProjectCards();
      const firstCard = visibleProjectCards[0];
      if (!firstCard) return { step: projectsTrack.clientWidth, visibleCount: 1, maxStart: 0, visibleProjectCards };

      const cardStyle = window.getComputedStyle(firstCard);
      const gap = parseFloat(window.getComputedStyle(projectsTrack).columnGap || cardStyle.marginRight) || 0;
      const cardWidth = firstCard.getBoundingClientRect().width;
      const step = cardWidth + gap;
      const visibleCount = Math.max(1, Math.round((projectsTrack.clientWidth + gap) / step));

      return {
        step,
        visibleCount,
        maxStart: Math.max(0, visibleProjectCards.length - visibleCount),
        visibleProjectCards,
      };
    };

    const updateProjectFocus = () => {
      const { step, visibleCount, maxStart, visibleProjectCards } = getProjectMetrics();
      const currentStart = Math.min(maxStart, Math.max(0, Math.round(projectsTrack.scrollLeft / step)));
      const activeIndex = Math.min(visibleProjectCards.length - 1, currentStart + Math.floor((visibleCount - 1) / 2));

      projectCards.forEach((card, index) => {
        card.classList.toggle('is-featured', card === visibleProjectCards[activeIndex]);
      });

      projectsPreviousBtn.disabled = currentStart === 0;
      projectsNextBtn.disabled = currentStart >= maxStart;
      if (projectsStatus) projectsStatus.textContent = visibleProjectCards.length > 0 ? `Proyek ${activeIndex + 1} dari ${visibleProjectCards.length}` : 'Tidak ada proyek';
    };

    const scrollProjects = (direction) => {
      const { step, maxStart } = getProjectMetrics();
      const currentStart = Math.min(maxStart, Math.max(0, Math.round(projectsTrack.scrollLeft / step)));
      const targetStart = Math.min(maxStart, Math.max(0, currentStart + direction));
      projectsTrack.scrollTo({ left: targetStart * step, behavior: 'instant' });
      updateProjectFocus();
    };

    projectFilters.forEach((filterButton) => {
      filterButton.addEventListener('click', () => {
        const selectedCategory = filterButton.dataset.projectFilter;

        projectFilters.forEach((button) => {
          const isActive = button === filterButton;
          button.classList.toggle('is-active', isActive);
          button.setAttribute('aria-pressed', String(isActive));
        });

        projectCards.forEach((card) => {
          const categories = card.dataset.projectCategory?.split(' ') || [];
          const shouldShow = selectedCategory === 'all' || categories.includes(selectedCategory);
          card.classList.toggle('is-filtered-out', !shouldShow);
          card.classList.remove('is-featured');
        });

        projectsTrack.scrollTo({ left: 0, behavior: 'instant' });
        updateProjectFocus();
      });
    });

    projectsPreviousBtn.addEventListener('click', () => scrollProjects(-1));
    projectsNextBtn.addEventListener('click', () => scrollProjects(1));
    projectsTrack.addEventListener('scroll', updateProjectFocus, { passive: true });
    window.addEventListener('resize', updateProjectFocus);
    updateProjectFocus();
  }

  // ------------------------------------------------------------------------
  // 10. NAVIGASI CAROUSEL PELATIHAN
  // ------------------------------------------------------------------------
  const trainingsTrack = document.getElementById('trainings-track');
  const previousCertificateBtn = document.getElementById('cert-prev');
  const nextCertificateBtn = document.getElementById('cert-next');

  if (trainingsTrack && previousCertificateBtn && nextCertificateBtn) {
    const updateCarouselButtons = () => {
      const maxScrollLeft = trainingsTrack.scrollWidth - trainingsTrack.clientWidth;
      const currentScrollLeft = trainingsTrack.scrollLeft;
      const edgeTolerance = 8;

      previousCertificateBtn.disabled = currentScrollLeft <= edgeTolerance;
      nextCertificateBtn.disabled = currentScrollLeft >= maxScrollLeft - edgeTolerance;
    };

    const getScrollDistance = () => {
      const firstCard = trainingsTrack.querySelector('.cert-card');
      if (!firstCard) return trainingsTrack.clientWidth;

      const cardStyle = window.getComputedStyle(firstCard);
      const trackStyle = window.getComputedStyle(trainingsTrack);
      const cardWidth = firstCard.getBoundingClientRect().width;
      const gap = parseFloat(trackStyle.columnGap || cardStyle.marginRight) || 0;

      return cardWidth + gap;
    };

    previousCertificateBtn.addEventListener('click', () => {
      trainingsTrack.scrollBy({ left: -getScrollDistance(), behavior: 'smooth' });
    });

    nextCertificateBtn.addEventListener('click', () => {
      trainingsTrack.scrollBy({ left: getScrollDistance(), behavior: 'smooth' });
    });

    trainingsTrack.addEventListener('scroll', updateCarouselButtons, { passive: true });
    window.addEventListener('resize', updateCarouselButtons);
    updateCarouselButtons();
  }

  // ------------------------------------------------------------------------
  // 11. FORMULIR KONTAK INTERAKTIF (FEEDBACK DEMO)
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const formSubmitBtn = document.getElementById('form-submit-btn');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      // Jika action formulir masih kosong (tahap frontend/mockup)
      const actionAttr = contactForm.getAttribute('action');
      if (!actionAttr || actionAttr.trim() === '') {
        e.preventDefault();

        // Ambil nama pengirim
        const nameInput = document.getElementById('nama');
        const senderName = nameInput ? nameInput.value.trim() : 'Pengunjung';

        // Tampilkan loading singkat pada tombol
        const originalBtnText = formSubmitBtn.innerHTML;
        formSubmitBtn.disabled = true;
        formSubmitBtn.innerHTML = '<span>Mengirim...</span>';

        setTimeout(() => {
          formSubmitBtn.disabled = false;
          formSubmitBtn.innerHTML = originalBtnText;

          // Tampilkan pesan sukses informatif
          formFeedback.className = 'form-feedback is-visible form-feedback--success';
          formFeedback.innerHTML = `
            <strong>Terima kasih, ${senderName}!</strong><br>
            Pesan demo Anda berhasil diterima. Untuk mengalirkan pesan ke email asli, cukup hubungkan atribut <code>action="kirim.php"</code> pada form.
          `;

          contactForm.reset();

          // Sembunyikan pesan setelah 6 detik
          setTimeout(() => {
            formFeedback.classList.remove('is-visible');
          }, 6000);
        }, 600);
      }
    });
  }
});
