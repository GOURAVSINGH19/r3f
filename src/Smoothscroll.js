function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}
class SmoothScroll {
    constructor(el, images) {
      if (!el) {
        console.error("Element not provided or does not exist.");
        return;
      }
      this.el = el;
      console.log(el);
      this.images = images;
      this.currentY = 0;
      this.targetY = 0;
      this.setup();
      this.onWindowResize();
      this.animate();
    }
  
    setup() {
      if (!this.el) {
        console.error("Element not found:", this.el);
        return;
      }
      document.body.style.height = `${this.el.offsetHeight}px`;
      window.addEventListener("scroll", () => {
        this.targetY = window.scrollY;
      });
    }
  
    onWindowResize() {
      window.addEventListener("resize", () => {
        document.body.style.height = `${this.el.offsetHeight}px`;
      });
    }
  
    animate() {
      if (!this.el) {
        console.error("Element not found during animation:", this.el);
        return;
      }
  
      this.currentY = lerp(this.currentY, this.targetY, 0.075);
      this.el.style.transform = `translate3d(0, -${this.currentY}px, 0)`;
  
      for (let i = 0; i < this.images.length; i++) {
        if (!this.images[i]) {
          console.error("Image element not found:", this.images[i]);
          continue;
        }
  
        let { top, height } = this.images[i].parentElement.getBoundingClientRect();
        if (!this.images[i].parentElement) {
          console.error("Parent element is missing for image:", this.images[i]);
          continue;
        }
  
        top = (top - (window.innerHeight * 0.5 - height * 0.5)) * 0.15;
        let transTop = top;
  
        // Clip path transformation
        top = top < 0 ? 0 : top >= 50 ? 50 : top;
        this.images[i].style.clipPath = `polygon(${0 + top}% 0%, ${100 - top}% 0, ${100 - top}% 100%, ${0 + top}% 100%)`;
        this.images[i].style.transform = `translate3d(0, ${transTop}px, 0)`;
      }
  
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  export default SmoothScroll;