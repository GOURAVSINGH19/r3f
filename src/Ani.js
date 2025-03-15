import { Howl, Howler } from "howler";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";
Splitting();
gsap.registerPlugin(ScrollTrigger);

const initSmoothScrolling = () => {
  // Initialize Lenis for smooth scroll effects. Lerp value controls the smoothness.
  const lenis = new Lenis({ lerp: 0.09 });

  // Sync ScrollTrigger with Lenis' scroll updates.
  lenis.on("scroll", ScrollTrigger.update);

  // Ensure GSAP animations are in sync with Lenis' scroll frame updates.
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // Convert GSAP's time to milliseconds for Lenis.
  });

  // Turn off GSAP's default lag smoothing to avoid conflicts with Lenis.
  gsap.ticker.lagSmoothing(0);
};
initSmoothScrolling();

const initParallax = () => {
  const parallaxElements = document.querySelectorAll('[data-speed]');
  
  parallaxElements.forEach(element => {
    const speed = element.dataset.speed;
    
    gsap.to(element, {
      y: () => (-element.offsetHeight * speed /4),
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });
  });
};

// Add this after your Lenis initialization
initParallax();

// page transition
let isAnimating = false;
const slider = document.querySelector(".slider");
const tl = gsap.timeline();
tl.to(slider, {
  scrollTrigger: {
    trigger: ".home_section",
    scrub: 0.25,
    start: "top top",
    end: "bottom top",
  },
});

// Text animation function

const animateText = (textElement) => {
  if (isAnimating) return; // Prevent animation if already running

  let originalText = textElement.innerText;
  let iteration = 0;
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  isAnimating = true;

  const newIntervalId = setInterval(() => {
    textElement.innerText = originalText
      .split("")
      .map((letter, index) => {
        return index < iteration
          ? letter
          : letters[Math.floor(Math.random() * letters.length)];
      })
      .join("");

    if (iteration >= originalText.length) {
      clearInterval(newIntervalId);
      isAnimating = false;
    }

    iteration++;
  }, 50);
};

// Mouseover event listener
const textElement = document.querySelectorAll("[data-text]");
textElement.forEach((letter, index) => {
  letter.addEventListener("mouseover", () => {
    animateText(letter);
  });
});

let direction = -1;
let xPercent = 0;
const animate = () => {
  if (xPercent < -100) {
    xPercent = 0;
  } else if (xPercent > 0) {
    xPercent = -100;
  }
  gsap.set(".middle_text", { xPercent: xPercent });
  requestAnimationFrame(animate);
  xPercent += 0.1 * direction;
};

//preloader and home animation
const preloader = document.querySelector(".preloader");
const preline = document.querySelector(".lodingline");
const loadingtext = document.querySelector(".lodingtext");
const enterButton = document.querySelector(".enter-button");

const startLoader = () => {
  let randomWidth = 50;
  const increaseWidth = () => {
    if (randomWidth < 100) {
      randomWidth += 1;
      gsap.to(preline, {
        width: `${randomWidth}%`,
        ease: "slow(.1,.4)",
        transformOrigin: "50% 50%",
      });
      requestAnimationFrame(increaseWidth);
    } else {
      if (randomWidth === 100) {
        gsap.to(loadingtext, {
          opacity: 0,
          duration: 2,
          ease: "power2.inOut",
        });
        gsap.to(preline, {
          opacity: 0,
          duration: 2,
          ease: "power2.inOut",
        });
        gsap.to(enterButton, {
          opacity: 1,
          display: "block",
          duration: 4,
          ease: "bounce.inOut",
        });
      }
    }
  };
  increaseWidth(); // Start increasing the width
};
startLoader();

enterButton.addEventListener("click", () => {
  tl.to(preloader, {
    opacity: 0,
    transformOrigin: "50% 50%",
    duration: 1,
    display: "none",
    ease: "power2.in",
    delay: 1,
    onComplete: () => {
      gsap.to("#main", {
        duration: 1,
        opacity: 1,
        ease: "power2.in",
      });
      gsap.set(".middle_text", { x: 0 });
      gsap.to(".middle_text", {
        duration: 1,
        opacity: 0.6,
        delay: 1,
        ease: "power4.out",
      });

      gsap.to(".middle_text", {
        scrollTrigger: {
          trigger: ".home_section",
          scrub: 0.25,
          start: 0,
          end: window.innerHeight,
          onUpdate: (e) => (direction = e.direction * -1),
        },
        x: "-500px",
      });
      requestAnimationFrame(animate);
    },
  });
});


// section3 animation
const line = document.querySelector("[data-line]");

gsap.to(".lineBlock", {
  width: "100%",
  ease: "slow(.1,.4)",
  transformOrigin: "50% 50%",
  duration: 5,
  scrollTrigger: {
    trigger: line,
    start: "top bottom",
    end: "1% top",
    scrub: 1,
    once: true,
  },
});
const fx19Titles = [
  ...document.querySelectorAll(".content__title[data-splitting]"),
];

fx19Titles.forEach((title) => {
  const chars = title.querySelectorAll(".word");

  gsap.fromTo(
    chars,
    {
      "will-change": "opacity, transform",
      opacity: 0,
    },
    {
      duration: 2,
      ease: "power4.inOut",
      opacity: 1,
      delay: 0.05,
      stagger: 0.03,
      scrollTrigger: {
        trigger: ".grid-container",
        start: "5% bottom",
        end: "center top",
        scrub: true,
      },
    }
  );
});

// footer color
const Titles = document.querySelectorAll(".title");
const footertimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".footer",
    start: "20% 80%",
    end: "80% 80%",
    scrub: true,
  },
});

footertimeline
  // .from(".animate-bg", {
  //   borderRadius: "0em",
  //   height: "105.493%",
  //   width: "109.801%",
  //   ease: "linear",
  // })
  // .to(".animate-bg", {
  //   width: "95%",
  //   height: "95%",
  //   borderRadius: "1em",
  //   ease: "linear",
  // })
  .to(Titles, {
    translateX: 0,
    duration: 2,
    ease: "power2.inOut",
    stagger: 0.05,
    scrollTrigger: {
      trigger: ".footer",
      start: "10% 80%",
      end: "80% 80%",
      scrub: true,
      once: true,
    },
  })
  .to(".circle-animation", {
    opacity: 1,
    scale: 1.1,
    duration: 1,
    ease: "power2.inOut",
  });

const text = [...document.querySelectorAll(".text")];
text.forEach((item) => {
  item.addEventListener("click", () => {
    text.forEach((item) => {
      item.classList.remove("hover");
      gsap.to(item, {
        duration: 0.5,
        ease: "power2.inOut",
      });
    });
    item.classList.add("hover");
    setTimeout(() => {
      item.classList.remove("hover");
    }, 500);
  });
});

const links = document.querySelectorAll(".link-item");

links.forEach((link) => {
  link.classList.add("active");
  link.addEventListener("mouseover", () => {
    links.forEach((l) => {
      l.classList.add("blur-effect");
      l.classList.remove("active");
    });
    link.classList.remove("blur-effect");
  });

  link.addEventListener("mouseout", () => {
    links.forEach((l) => l.classList.remove("blur-effect"));
  });
});

// music
const logo = document.querySelector("[data-logo]");

var sound = new Howl({
  src: ["sound.wav"],
});

// Clear listener after first call.
logo.addEventListener("mouseenter", () => {
  if (isAnimating) return;
  isAnimating = true;
  sound.play();
});

Howler.volume(0.5);

// Fires when the sound finishes playing.
sound.on("end", function () {
  isAnimating = false;
  console.log("Finished!");
});


window.addEventListener("resize", () => {
  window.location.reload();
});
