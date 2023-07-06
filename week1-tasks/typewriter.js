// DOM
const typewriterEl = document.querySelector(".typewriter");

// Typewriter Variables
const textArr = typewriterEl.getAttribute("data-text").split(",");
const speed = 50;
const longPause = 1000;
const shortPause = 200;
let textIndex = 0;

// Typewriter
function addChars(el, text) {
  let index = 0;
  function inner() {
    el.textContent += text[index];
    if (index === text.length - 1) {
      setTimeout(() => {
        removeChars(el);
      }, longPause);
      return;
    }
    index++;
    setTimeout(inner, speed);
  }
  inner();
}

function removeChars(el) {
  function inner() {
    el.textContent = el.textContent.slice(0, -1);
    if (el.textContent.length === 0) {
      setTimeout(() => {
        textIndex = (textIndex + 1) % textArr.length;
        addChars(typewriterEl, textArr[textIndex]);
      }, shortPause);
      return;
    }
    setTimeout(inner, speed);
  }
  inner();
}
addChars(typewriterEl, textArr[0]);

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
