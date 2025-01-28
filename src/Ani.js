import { Howl, Howler } from "howler";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";

Splitting();
gsap.registerPlugin(ScrollTrigger);

// Scroll setup with Lenis
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update());

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

const firstText = document.querySelector(".firsttext");
const secondText = document.querySelector(".secondtext");
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

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const texts = [...document.querySelectorAll("[data-text]")];

// Text animation function
const animateText = (textElement) => {
  let originalText = textElement.innerText;
  let iteration = 0;

  const newIntervalId = setInterval(() => {
    textElement.innerText = originalText
      .split("")
      .map((letter, index) => {
        return index < iteration
          ? letter
          : letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iteration >= originalText.length) {
      clearInterval(newIntervalId);
    }

    iteration++;
  }, 50);
};

// Mouseover event listener
addEventListener("mouseover", (event) => {
  if (event.target.matches("[data-text]")) {
    animateText(event.target);
  }
});

// preloader and home animation
// const preloader = document.querySelector(".preloader");
// const wordElement = document.getElementsByClassName("word");
// const startLoader = () => {
//   let index = 0;

//   function updateText() {
//     index += Math.floor(Math.random() * 10) + 1;

//     if (index >= 100) {
//       index = 100;
//       return;
//     }

//     wordElement[0].innerText = index + " %";
//     let delay = Math.floor(Math.random() * 300) + 50;
//     setTimeout(updateText, delay);
//   }
//   updateText();
// };
// startLoader();

// let direction = -1;
// let xPercent = 0;

// tl.to(preloader, {
//   y: "-100vh",
//   duration: 1,
//   ease: "power2.in",
//   delay: 4,
//   onComplete: () => {
//     gsap.to(".middle_text", {
//       duration: 1,
//       opacity: 0.6,
//       delay: 5,
//       ease: "power4.out",
//     });

//     gsap.set(".middle_text", { x: 0 });

//     gsap.to(".middle_text", {
//       scrollTrigger: {
//         trigger: ".home_section",
//         scrub: 0.25,
//         start: 0,
//         end: window.innerHeight,
//         onUpdate: (e) => (direction = e.direction * -1),
//       },
//       x: "-500px",
//     });

//     gsap.to(".models-canvas", {
//       opacity: 1,
//       duration: 1.5,
//       ease: "linear",
//     });
//     requestAnimationFrame(animate);
//   },
// }).to(
//   wordElement,
//   {
//     opacity: 0,
//     delay: 3.5,
//   },
//   0.25
// );

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

//section-2
const section2 = document.querySelector("[data-abt]");

// section3 animation
const sect3 = document.querySelector("[data-section]");
const imgCnt = document.querySelector("[data-img]");
const line = document.querySelector("[data-line]");
const updateScrollTriggerPin = () => {
  const timeline3 = gsap.timeline({
    scrollTrigger: {
      trigger: sect3,
      start: "top top",
      end: "50% top",
      pin: true,
      scrub: 1,
      markers: true,
    },
  });

  timeline3.to(imgCnt, {
    marginTop: 0,
    duration: 8,
    ease: "slow(.1,.5)",
  });
};
updateScrollTriggerPin();

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
  },
});

// line

// footer color
const footertimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".footer",
    start: "10% 80%",
    end: "80% 80%",
    scrub: true,
  },
});

footertimeline
  .from(".animate-bg", {
    borderRadius: "0em",
    height: "105.493%",
    width: "109.801%",
    ease: "linear",
  })
  .to(".animate-bg", {
    width: "95%",
    height: "95%",
    borderRadius: "1em",
    ease: "linear",
  });

// html text-animation
const Titles = [
  ...document.querySelectorAll(".content__title[data-splitting]"),
];

Titles.forEach((title) => {
  gsap.fromTo(
    title,
    {
      transformOrigin: "0% 100%",
      rotate: 2,
    },
    {
      rotate: 0,
      ease: "ease4.inOut",
      scrollTrigger: {
        trigger: section2,
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    }
  );

  gsap.fromTo(
    title.querySelectorAll(".word"),
    {
      "will-change": "opacity",
      opacity: 0.1,
    },
    {
      ease: "none",
      opacity: 1,
      stagger: 0.05,
      scrollTrigger: {
        trigger: section2,
        start: "top bottom-=44%",
        end: "40% top+=30%",
        scrub: true,
      },
    }
  );
});
const text = [...document.querySelectorAll(".text")];
text.forEach((item) => {
  // text[1].classList.add("hover");
  item.addEventListener("click", () => {
    text.forEach((item) => {
      item.classList.remove("hover");
      gsap.to(item, {
        duration: 0.5,
        ease: "power2.inOut",
      });
    });
    item.classList.add("hover");
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
  sound.play();
});

Howler.volume(0.2);

// Fires when the sound finishes playing.
sound.on("end", function () {
  console.log("Finished!");
});

const refreshScrollTrigger = () => {
  ScrollTrigger.clearScrollMemory();
  ScrollTrigger.refresh();
};

window.addEventListener("resize", refreshScrollTrigger);
