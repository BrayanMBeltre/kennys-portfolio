import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Scroll-reveal animations ────────────────────────────────────────

const initAnimations = () => {
  // 1. Single Items: Find everything with .reveal-up
  const fadeUpElements = document.querySelectorAll(".reveal-up");

  fadeUpElements.forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power3.out",
    });
  });

  // 2. Staggered Groups: Find containers with .reveal-group
  // and animate their children .reveal-item
  const groups = document.querySelectorAll(".reveal-group");

  groups.forEach((group) => {
    const items = group.querySelectorAll(".reveal-item");

    gsap.from(items, {
      scrollTrigger: {
        trigger: group,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.8,
      ease: "power2.out",
    });
  });

  const lines = document.querySelectorAll(".animate-line");

  lines.forEach((line) => {
    const text = line.textContent.trim();
    line.innerHTML = text
      .split("")
      .map(
        (char) =>
          // Changed translate-y-full to a smaller value and added scale/blur
          `<span class="char inline-block opacity-0 translate-y-4 blur-md">${char === " " ? "&nbsp;" : char}</span>`,
      )
      .join("");
  });

  gsap.to(".char", {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    duration: 1,
    stagger: 0.08,
    ease: "power3.out",
    delay: 0.5,
  });
};

// ── Marquee animation ───────────────────────────────────────────────

const setupMarquee = () => {
  const containers = document.querySelectorAll(".marquee-container");

  containers.forEach((container) => {
    const track = container.querySelector(".marquee-track");
    if (!track) return;

    // 1. CLONE THE CONTENT: Duplicate the internal HTML to create the loop
    track.innerHTML += track.innerHTML;

    const speed = Number(container.getAttribute("data-speed"));
    const direction = container.getAttribute("data-direction");
    const pauseOnHover = container.getAttribute("data-pause") === "true";

    // 2. GSAP ANIMATION
    const xTarget = direction === "left" ? "-50%" : "0%";
    const xStart = direction === "left" ? "0%" : "-50%";

    const tween = gsap.fromTo(
      track,
      { x: xStart },
      {
        x: xTarget,
        duration: speed,
        ease: "none",
        repeat: -1,
      },
    );

    // 3. OPTIONAL PAUSE
    if (pauseOnHover) {
      container.addEventListener("mouseenter", () => tween.pause());
      container.addEventListener("mouseleave", () => tween.play());
    }
  });
};

// ── Pixel image reveal ──────────────────────────────────────────────

const setupPixelImages = () => {
  const containers = document.querySelectorAll(".pixel-image-container");

  containers.forEach((container) => {
    const pieces = container.querySelectorAll(".pixel-piece");
    const images = container.querySelectorAll(".pixel-img");

    const duration = parseFloat(
      container.getAttribute("data-duration") || "0.5",
    );
    const maxDelay = parseFloat(
      container.getAttribute("data-max-delay") || "0.8",
    );
    const colorDelay = parseFloat(
      container.getAttribute("data-color-delay") || "0.5",
    );
    const useGrayscale = container.getAttribute("data-grayscale") === "true";

    // One single timeline for the whole container
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // 1. Animate all pieces at once with a random stagger
    tl.to(pieces, {
      opacity: 1,
      duration: duration,
      stagger: {
        amount: maxDelay, // Spreads the delays across all pieces automatically
        from: "random",
      },
      ease: "power2.out",
    });

    // 2. Grayscale transition
    if (useGrayscale) {
      tl.to(
        images,
        {
          filter: "grayscale(0)",
          duration: duration,
          ease: "power1.inOut",
        },
        `-=${colorDelay}`,
      ); // Starts relative to the end of the previous animation
    }
  });
};

// ── Orbital diagram ─────────────────────────────────────────────────

const setupOrbitalDiagrams = () => {
  document.querySelectorAll(".js-orbital").forEach((wrapper) => {
    const container = wrapper.querySelector(".js-orbital-container");
    if (!container) return;

    const pills = Array.from(container.querySelectorAll(".js-pill"));
    const rings = Array.from(container.querySelectorAll(".js-ring"));
    const centerBubble = container.querySelector(".js-center-bubble");

    function layout() {
      const w = container.offsetWidth;
      const isMobile = window.innerWidth < 640;

      // DYNAMIC RADIUS: On mobile we use more of the available space
      const radius = isMobile ? w * 0.38 : w * 0.35;

      // DYNAMIC PILL SIZE: Smaller on mobile so they don't overlap
      const pillSize = isMobile ? w * 0.22 : w * 0.21;

      pills.forEach((pill, i) => {
        const angle = (i * 360) / pills.length;
        const radians = (angle - 90) * (Math.PI / 180);

        const x = Math.cos(radians) * radius;
        const y = Math.sin(radians) * radius;

        gsap.set(pill, {
          xPercent: -50,
          yPercent: -50,
          left: "50%",
          top: "50%",
          x: x,
          y: y,
          width: pillSize,
          height: pillSize,
        });
      });
    }

    function initOrbitalAnimations() {
      if (!centerBubble) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
        },
      });

      gsap.set(container, { opacity: 1 });

      tl.from([centerBubble, ...rings, ...pills], {
        scale: 0,
        opacity: 0,
        stagger: 0.05,
        duration: 1,
        ease: "back.out(1.5)",
      });

      // Rotation
      rings.forEach((ring, i) => {
        gsap.to(ring, {
          rotation: i % 2 === 0 ? 360 : -360,
          duration: 30 + i * 10,
          repeat: -1,
          ease: "none",
        });
      });

      // Float
      pills.forEach((pill, i) => {
        gsap.to(pill, {
          y: "+=8",
          duration: 2 + Math.random(),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2,
        });
      });
    }

    window.addEventListener("resize", layout);
    layout();
    initOrbitalAnimations();
  });
};

// ── Specializations text cycle ──────────────────────────────────────

const setupSpecializations = () => {
  const container = document.querySelector("[data-specializations-list]");
  if (!container) return;

  const items = container.querySelectorAll("li");
  const movement = 20;
  const duration = 2.15;

  const tl = gsap.timeline({ repeat: -1 });

  items.forEach((_, index) => {
    tl.to(`#specialization-${index}`, {
      keyframes: {
        opacity: [0, 0, 1, 1, 1, 1, 0, 0],
        y: [movement, movement, 0, 0, 0, 0, -movement, -movement],
      },
      duration,
      delay: -0.5,
    });
  });
};

// ── Bootstrap ───────────────────────────────────────────────────────

const initAll = () => {
  initAnimations();
  setupMarquee();
  setupPixelImages();
  setupOrbitalDiagrams();
  setupSpecializations();
};

/** Call once from Layout to wire up all animations. */
export const boot = () => {
  // Initialize immediately if DOM is already ready, otherwise wait
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll, { once: true });
  } else {
    initAll();
  }

  // Re-run after Astro View Transitions navigation
  document.addEventListener("astro:after-swap", initAll);
};
