gsap.registerPlugin(ScrollTrigger);

const innovation = {
  element: document.querySelector(".innovation"),
  bgMedias: document.querySelectorAll(".innovation-bg-media"),
};

const card = {
  index: document.getElementById("scroll-index"),
  heading: document.getElementById("scroll-heading"),
  thumbnail: document.querySelectorAll(".innovation-card-thumbanil > img"),
  paragraph: document.getElementById("scroll-paragraph"),
};
const init = () => {
  Splitting({
    target: innovation.bgMedias,
    by: "cells",
    rows: 40,
    image: true,
  });
};
const initScroll = () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: innovation.element,
      start: "top top",
      end: "+=8000 bottom",
      scrub: true,
      pin: true,
    },
  });
  for (let i = 0; i < innovation.bgMedias.length; i++) {
    const item = innovation.bgMedias[i];
    const itemCells = item.querySelectorAll(".cell");
    const thumbanils = card.thumbnail[i];

    gsap.set(item, {
      zIndex: innovation.bgMedias.length - i,
    });

    gsap.set(thumbanils, {
      clipPath: "inset(0% 0% 0% 0%)",
      zIndex: card.thumbnail.length - i,
    });
    if (i < innovation.bgMedias.length - 1) {
      tl.to(itemCells, {
        scaleY: 0,
        stagger: {
          each: 0.01,
          from: "end",
          ease: "power2.inOut",
        },
      });
      tl.to(
        thumbanils,
        {
          // vertical
          clipPath: "inset(0% 0% 100% 0%)",
          // horizontal
          //   clipPath: "inset(0% 0% 0% 100%)",
          onComplete: () => animateThumbnailsElements(i, "up"),
          onReverseComplete: () => animateThumbnailsElements(i, "down"),
        },
        "-=0.75"
      );
    }
  }
};

const animateThumbnailsElements = (index, direction) => {
  const translateDirection = direction === "up" ? -100 : 100,
    indexDirection = direction === "up" ? index + 1 : -index;

  const calcY = indexDirection * (translateDirection / card.thumbnail.length);

  card.index.style.transform = `translateY(${calcY}%)`;
  card.heading.style.transform = `translateY(${calcY}%)`;
  card.paragraph.style.transform = `translateY(${calcY}%)`;
};
init();
initScroll();
