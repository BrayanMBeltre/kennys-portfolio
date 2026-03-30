import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initAnimations = () => {
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
    const text = line.textContent;
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
