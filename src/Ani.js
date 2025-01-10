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
      clearInterval(newIntervalId); // Stop after all letters are revealed
    }

    iteration++;
  }, 50); // Adjust this value for the speed of the animation
};

// Mouseover event listener
addEventListener("mouseover", (event) => {
  if (event.target.matches("[data-text]")) {
    animateText(event.target);
  }
});

const preloader = document.querySelector(".preloader");
const wordElement = document.getElementsByClassName("word");
function startLoader() {
  let index = 0;

  function updateText() {
    index += Math.floor(Math.random() * 10) + 1;

    if (index >= 100) {
      index = 100;
      return;
    }

    wordElement[0].innerText = index + " %";
    let delay = Math.floor(Math.random() * 300) + 50;
    setTimeout(updateText, delay);
  }
  updateText();
}

startLoader();

let direction = -1;
let xPercent = 0;


tl.to(preloader, {
  y: "-100vh",
  duration: 1,
  ease: "power2.in",
  delay: 4,
  onComplete: () => {
    gsap.to(".middle_text", {
      duration: 1,
      opacity: 0.6,
      delay:5,
      ease: "power4.out",
    });

    gsap.set(".middle_text", { x: 0 });

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

    gsap.to(".models-canvas", {
      opacity: 1,
      duration: 1.5,
      ease: "back.inOut",
    });
    requestAnimationFrame(animate);
  },
});


tl.to(
  wordElement,
  {
    opacity: 0,
    delay: 3.5,
  },
  0.25
);

const animate = () => {
  if (xPercent < -100) {
    xPercent = 0;
  } else if (xPercent > 0) {
    xPercent = -100;
  }
  gsap.set(".middle_text", { xPercent: xPercent });
  gsap.set(".middle_text", { xPercent: xPercent });
  requestAnimationFrame(animate);
  xPercent += 0.1 * direction;
};

const refreshScrollTrigger = () => {
  ScrollTrigger.clearScrollMemory();
  ScrollTrigger.refresh();
};

window.addEventListener("resize", refreshScrollTrigger);
