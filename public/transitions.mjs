const hosts = ["angusjf.com", "[::]:8000"];
const names = ["title", "article", "hero"];

const clearViewTransitions = () =>
  names.forEach((name) => {
    document
      .querySelectorAll(`h2[style='view-transition-name: ${name};']`)
      .forEach((h2) => {
        h2.style.viewTransitionName = "";
        let card = h2.closest(".card");
        let img = card.querySelector("img");
        img.style.viewTransitionName = "";
        card.style.viewTransitionName = "";
      });
  });

const setupViewTransitions = (h2) => {
  h2.style.viewTransitionName = "title";
  let card = h2.closest(".card");
  let img = card.querySelector("img");
  img.style.viewTransitionName = "hero";
  card.style.viewTransitionName = "article";
};

document.querySelectorAll(".card h2 a").forEach((a) => {
  let h2 = a.closest("h2");
  h2.onclick = () => {
    clearViewTransitions();
    setupViewTransitions(h2);
  };
});

const prev = window
  .navigation
  ?.entries()
  .reverse()
  .map(({ url }) => new URL(url))
  .find((url) => hosts.some((host) => host == url.host) && url.pathname != "/")
  ?.pathname.replace(/\/$/, "");

if (prev) {
  clearViewTransitions();
  let h2 = document.querySelector(`.card h2 a[href$='${prev}']`)?.closest("h2");
  if (h2) setupViewTransitions(h2);
}