import { enterButton, logo, clickbtnwrk } from "./Dom";
import { Howl, Howler } from "howler";
let isAnimating = false;
let sound = new Howl({
  src: ["Sound/S/sound.wav"],
});

let EnterSound = new Howl({
  src: ["Sound/S/button.wav"],
});
let clickbtnwrkSound = new Howl({
  src: ["Sound/S/type_01.wav"],
});

clickbtnwrk.addEventListener("click", () => {
  clickbtnwrkSound.play();
});
// enterButton.addEventListener("click", () => {
//   EnterSound.play();
// });
logo.addEventListener("mouseenter", () => {
  if (isAnimating) return;
  isAnimating = true;
  sound.play();
});

Howler.volume(0.3);

sound.on("end", function () {
  isAnimating = false;
});
