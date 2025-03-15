const main = document.querySelector("html");
const links = [...document.querySelectorAll("a")];

let isAnimating = false;

links.forEach((link) => {
  link.addEventListener("click", async (e) => {
    e.preventDefault();
    if (isAnimating) return; // Prevent double-clicking during animation

    const url = e.target.href;
    startTransition(url);
  });
});

const startTransition = async (url) => {
  isAnimating = true;
  transitionDiv.classList.add("animate__in");
  transitionDiv.addEventListener("transitionend", () => {
    main.innerHTML = parsedhtml.innerHTML;
    transitionDiv.classList.remove("animate__in");
    transitionDiv.classList.add("animate__out");
    setTimeout(() => {
      transitionDiv.style.transition = "0s";
      transitionDiv.classList.remove("animate__out");

      setTimeout(() => {
        transitionDiv.style.transition = "1s";
      }, 100);
      isAnimating = false;
    }, 1000);
  });
};
