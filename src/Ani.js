import {
  textElement,
  preloader,
  preline,
  loadingtext,
  enterButton,
  line,
  fx19Titles,
  footerText,
  numberElement,
  originalText,
  hoverText,
  footerSvg,
} from "./Dom";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";
import Lenis from "lenis";
Splitting();
gsap.registerPlugin(ScrollTrigger, Flip);

document.addEventListener("DOMContentLoaded", function () {
  const initSmoothScrolling = () => {
    // Initialize Lenis for smooth scroll effects. Lerp value controls the smoothness.
    const lenis = new Lenis({ lerp: 0.05 });

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
    const parallaxElements = document.querySelectorAll("[data-scroll]");

    parallaxElements.forEach((element) => {
      const speed = element.dataset.speed;
      const direction = element.dataset.scrollDirection || "vertical";

      const animationProps = {
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      };

      if (direction === "horizontal") {
        animationProps.x = () => -element.offsetWidth * speed;
      } else {
        animationProps.y = () => -element.offsetHeight * speed;
      }

      gsap.to(element, animationProps);
    });
  };
  initParallax();

  // page transition
  let isAnimating = false;

  const TextHoverTransition = () => {
    const animateText = (textElement) => {
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

    textElement.forEach((letter, index) => {
      letter.addEventListener("mouseover", () => {
        animateText(letter);
      });
    });
  };

  const NumberHoverTransition = () => {
    const animateText = (numberElement) => {
      let originalText = numberElement.innerText;
      let iteration = 0;
      const letters = "87368973698746893278";
      isAnimating = true;

      const newIntervalId = setInterval(() => {
        numberElement.innerText = originalText
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

    numberElement.forEach((letter, index) => {
      letter.addEventListener("mouseover", () => {
        animateText(letter);
      });
    });
  };

  // const magnetic = document.getElementById("magneticContainer");

  //         const xTo = gsap.quickTo(magnetic, "x", {duration: 1, ease: "elastic.out(1, 0.3)"});
  //         const yTo = gsap.quickTo(magnetic, "y", {duration: 1, ease: "elastic.out(1, 0.3)"});

  //         magnetic.addEventListener("mousemove", (e) => {
  //             const { clientX, clientY } = e;
  //             const { height, width, left, top } = magnetic.getBoundingClientRect();
  //             const x = clientX - (left + width / 2);
  //             const y = clientY - (top + height / 2);
  //             xTo(x * 0.35);
  //             yTo(y * 0.35);
  //         });

  //         magnetic.addEventListener("mouseleave", () => {
  //             xTo(0);
  //             yTo(0);
  //         });

  //preloader and home animation
  const startLoader = () => {
    let randomWidth = 30;
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
    increaseWidth();
  };
  startLoader();

  const EnterButton = () => {
    const tl = gsap.timeline();
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
            },
            x: "-500px",
          });
          requestAnimationFrame(animate);
        },
      });
    });
  };
  EnterButton();

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
  const lineBlock = () => {
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
  };
  lineBlock();

  // const FooterText = () => {
  //   footerText.forEach((title) => {
  //     const chars = [...title.querySelectorAll(".char")];

  //     const tl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: ".footer",
  //         start: "top bottom-=100",
  //         end: "70% 60%",
  //         scrub: 3,
  //         markers: false,
  //       },
  //     });

  //     tl.fromTo(
  //       chars,
  //       {
  //         xPercent: -100,
  //         autoAlpha: 0,
  //         transformOrigin: "left center",
  //       },
  //       {
  //         xPercent: 0,
  //         autoAlpha: 1,
  //         duration: 5,
  //         ease: "cubic-bezier(0.19, 1, 0.22, 1)",
  //         stagger: 0.9,
  //       }
  //     );
  //   });
  // };

  function splitTextIntoChars(element) {
    const text = element.textContent;
    element.textContent = "";

    for (let i = 0; i < text.length; i++) {
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = text[i] === " " ? "\u00A0" : text[i];
      span.style.transitionDelay = `${i * 0.02}s`;
      element.appendChild(span);
    }
  }

  splitTextIntoChars(originalText);
  splitTextIntoChars(hoverText);

  const heading = document.querySelector("h1");
  const headingText = heading.textContent;
  heading.textContent = "";

  for (let i = 0; i < headingText.length; i++) {
    const span = document.createElement("span");
    span.className = "heading-char";
    span.textContent = headingText[i];
    span.style.opacity = "0";
    span.style.display = "inline-block";
    span.style.transform = "translateY(20px)";
    span.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    span.style.transitionDelay = `${i * 0.03}s`;
    heading.appendChild(span);

    setTimeout(() => {
      span.style.opacity = "1";
      span.style.transform = "translateY(0)";
    }, 100);
  }

  // links.forEach((link) => {
  //   link.classList.add("active");
  //   link.addEventListener("mouseover", () => {
  //     links.forEach((l) => {
  //       l.classList.add("blur-effect");
  //       l.classList.remove("active");
  //     });
  //     link.classList.remove("blur-effect");
  //   });

  //   link.addEventListener("mouseout", () => {
  //     links.forEach((l) => l.classList.remove("blur-effect"));
  //   });
  // });

  TextHoverTransition();
  NumberHoverTransition();

  // svg

  const Footer_svg = () => {
    const tl = gsap.timeline({
      defaults: {
        duration: 2,
        stagger: {
          each: 0.1,
          from: "center",
        },
      },
      scrollTrigger: {
        trigger: ".footer",
        start: "top top",
        end: "bottom bottom",
        markers: true,
        scrub: 1,
        once:true
      },
    });

    tl.from(footerSvg, {
      yPercent: 100,
      ease:"expo.inOut"
    });
  };

  Footer_svg();

  // Footertimeline.add(FooterBg()).add(FooterText(), "-=1.5");
  window.addEventListener("resize", () => {
    window.location.reload();
  });
});
