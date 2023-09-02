import { thumbHashToDataURL } from "https://cdn.skypack.dev/thumbhash";

const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach(({ isIntersecting, target: img }) => {
      // Natural height is 0 for broken images
      if (isIntersecting && !(img.complete && img.naturalHeight != 0)) {
        const thumbhash = Uint8Array.from(atob(img.dataset.thumbhash), (c) =>
          c.charCodeAt(0)
        );
        img.style.background = `center / cover url(${thumbHashToDataURL(
          thumbhash
        )})`;
      }
    }),
  { threshold: 0.1, rootMargin: "100%" }
);

document
  .querySelectorAll("img[data-thumbhash]")
  .forEach((img) => observer.observe(img));
