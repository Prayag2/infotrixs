const scrollContainer = document.querySelector(".scroll-container");
const sectionArr = document.querySelectorAll(".to-hide");
const waveBg = document.querySelector("#bg-one");
const navLinks = document.querySelectorAll(".link");
let curIndex = 0;
let scrollEnabled = true;

function fadeOut(element, time, callback) {
  function inner() {
    if (element.classList.contains("anim-fade-out")) {
      element.style.opacity = 0;
      element.classList.add("hidden");

      if (callback) setTimeout(callback, 0);
      return;
    }

    element.classList.add("anim-fade-out");
    element.classList.remove("anim-fade-in");
    setTimeout(inner, time);
  }
  inner();
}

function fadeIn(element, time, callback) {
  function inner() {
    if (element.classList.contains("anim-fade-in")) {
      element.style.opacity = 1;

      if (callback) setTimeout(callback, 0);
      return;
    }

    element.classList.remove("hidden");
    element.classList.remove("anim-fade-out");
    element.classList.add("anim-fade-in");
    setTimeout(inner, time);
  }
  inner();
}

function enableScroll() {
  console.log("SCROLL ENABLED!");
  scrollEnabled = true;
}

function fadeInOut(currentSection, isUpwards) {
  let nextSection = isUpwards
    ? sectionArr[curIndex - 1]
    : sectionArr[curIndex + 1];
  let waveClass = nextSection.getAttribute("data-wave-class");

  waveBg.className = waveClass;
  fadeOut(currentSection, 1100, () => {
    fadeIn(nextSection);
    curIndex = isUpwards ? curIndex - 1 : curIndex + 1;
  });

  scrollEnabled = false;
  setTimeout(enableScroll, 2000);
}

function handleScroll(isUpwards) {
  let currentSection = sectionArr[curIndex];
  let isScrollable = !currentSection.classList.contains("scroll");

  if (scrollEnabled && isScrollable) {
    fadeInOut(currentSection, isUpwards);
  } else if (scrollEnabled && !isScrollable) {
    let scrollPos = currentSection.scrollTop;
    let bottomPos = currentSection.scrollHeight - currentSection.clientHeight;
    if (isUpwards && scrollPos === 0) {
      fadeInOut(currentSection, isUpwards);
    } else if (!isUpwards && scrollPos === bottomPos) {
      fadeInOut(currentSection, isUpwards);
    }
  }
}

// Mousewheel
document.body.addEventListener("wheel", (event) => {
  let isUpwards = event.deltaY < 0 ? true : false;
  handleScroll(isUpwards);
});

// Handle touches
let initialX, initialY;
document.body.addEventListener("touchstart", (event) => {
  initialX = event.touches[0].clientX;
  initialY = event.touches[0].clientY;
});
document.body.addEventListener("touchmove", (event) => {
  diffY = initialY - event.touches[0].clientY;
  let isUpwards = diffY > 0 ? false : true;

  handleScroll(isUpwards);
});

// Making links work
navLinks.forEach((navLink) => {
  navLink.addEventListener("click", () => {
    let index = parseInt(navLink.getAttribute("data-href"));
    let currentSection = sectionArr[curIndex];
    let nextSection = sectionArr[index];
    let waveClass = nextSection.getAttribute("data-wave-class");

    waveBg.className = waveClass;
    fadeOut(currentSection, 1100, () => {
      fadeIn(nextSection);
      curIndex = index;
    });
  });
});
