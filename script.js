// ============================================
// VIGHNAHARTA SOFTWARES
// CLEAN PREMIUM WEBSITE JS
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const backToTop = document.getElementById("backToTop");
  const cursorGlow = document.querySelector(".cursor-glow");

  const navLinks = document.querySelectorAll(".nav-menu a[href^='#']");
  const sections = document.querySelectorAll("section[id]");

  const mobileBtn = document.getElementById("mobileMenuBtn");
  const mobileSidebar = document.getElementById("mobileSidebar");
  const mobileOverlay = document.getElementById("mobileOverlay");
  const sidebarCloseBtn = document.getElementById("sidebarCloseBtn");
  const menuIcon = document.getElementById("menuIcon");
  const mobileSidebarLinks = document.querySelectorAll(".mobile-sidebar a[href^='#']");

  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  // HEADER SCROLL + AUTO HIDE

  let lastScrollY = window.scrollY;

  function handleHeaderScroll() {
    const currentScroll = window.scrollY;

    if (!header) return;

    if (currentScroll > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    if (currentScroll > lastScrollY && currentScroll > 120) {
      header.style.transform = "translateY(-120%)";
    } else {
      header.style.transform = "translateY(0)";
    }

    lastScrollY = currentScroll <= 0 ? 0 : currentScroll;
  }

  window.addEventListener("scroll", handleHeaderScroll);
  handleHeaderScroll();

  // MOBILE SIDEBAR

  function openSidebar() {
    if (!mobileSidebar || !mobileOverlay) return;

    mobileSidebar.classList.add("active");
    mobileOverlay.classList.add("active");
    document.body.style.overflow = "hidden";

    if (menuIcon) menuIcon.textContent = "✕";
  }

  function closeSidebar() {
    if (!mobileSidebar || !mobileOverlay) return;

    mobileSidebar.classList.remove("active");
    mobileOverlay.classList.remove("active");
    document.body.style.overflow = "";

    if (menuIcon) menuIcon.textContent = "☰";
  }

  if (mobileBtn) {
    mobileBtn.addEventListener("click", () => {
      if (mobileSidebar && mobileSidebar.classList.contains("active")) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener("click", closeSidebar);
  }

  if (sidebarCloseBtn) {
    sidebarCloseBtn.addEventListener("click", closeSidebar);
  }

  mobileSidebarLinks.forEach((link) => {
    link.addEventListener("click", closeSidebar);
  });

  // ACTIVE NAV LINKS

  function updateActiveLinks() {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 160;

      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`
      );
    });

    mobileSidebarLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`
      );
    });
  }

  window.addEventListener("scroll", updateActiveLinks);
  updateActiveLinks();

  // SMOOTH SCROLL

  document.querySelectorAll("a[href^='#']").forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      e.preventDefault();

      window.scrollTo({
        top: target.offsetTop - 90,
        behavior: "smooth",
      });
    });
  });

  // SCROLL REVEAL

  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // PORTFOLIO FILTER

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      projectCards.forEach((card) => {
        const category = card.dataset.category;

        if (filter === "all" || category === filter) {
          card.style.display = "block";

          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(18px)";

          setTimeout(() => {
            card.style.display = "none";
          }, 220);
        }
      });
    });
  });

  // BACK TO TOP

  function handleBackToTop() {
    if (!backToTop) return;

    if (window.scrollY > 600) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  }

  window.addEventListener("scroll", handleBackToTop);
  handleBackToTop();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // CURSOR GLOW

  if (cursorGlow && window.innerWidth > 768) {
    window.addEventListener("mousemove", (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });
  }

  // COUNTER ANIMATION

  const counters = document.querySelectorAll(".hero-stat h3, .about-stat h3");

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const originalText = el.textContent.trim();
        const targetNumber = parseInt(originalText.replace(/\D/g, ""), 10);

        if (isNaN(targetNumber)) return;

        let current = 0;
        const duration = 1200;
        const step = targetNumber / (duration / 16);

        function updateCounter() {
          current += step;

          if (current < targetNumber) {
            el.textContent =
              Math.floor(current) +
              (originalText.includes("+") ? "+" : "") +
              (originalText.includes("%") ? "%" : "");
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = originalText;
          }
        }

        updateCounter();
        counterObserver.unobserve(el);
      });
    },
    {
      threshold: 0.5,
    }
  );

  counters.forEach((counter) => counterObserver.observe(counter));

  // CONTACT FORM VALIDATION

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name")?.value.trim();
      const email = document.getElementById("email")?.value.trim();
      const phone = document.getElementById("phone")?.value.trim();
      const project = document.getElementById("projectType")?.value;
      const message = document.getElementById("message")?.value.trim();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[0-9+\-\s]{10,15}$/;

      if (!name || !email || !phone || !project || !message) {
        showFormMessage("Please fill all fields.", "error");
        return;
      }

      if (!emailRegex.test(email)) {
        showFormMessage("Please enter a valid email address.", "error");
        return;
      }

      if (!phoneRegex.test(phone)) {
        showFormMessage("Please enter a valid phone number.", "error");
        return;
      }

      showFormMessage("Message sent successfully! We'll contact you soon.", "success");
      contactForm.reset();
    });
  }

  function showFormMessage(message, type) {
    if (!formMessage) return;

    formMessage.style.display = "block";
    formMessage.textContent = message;
    formMessage.style.color = type === "success" ? "#22c55e" : "#ef4444";
  }

  // VIDEO PERFORMANCE IMPROVEMENT

  const heroVideo = document.querySelector(".hero-bg-video");

  if (heroVideo) {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        heroVideo.pause();
      } else {
        heroVideo.play().catch(() => {});
      }
    });
  }

  // ESC KEY CLOSE SIDEBAR

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeSidebar();
    }
  });
});