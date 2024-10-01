function elems(url) {
  const h2 = document.querySelector(`.card h2 a[href$='${url}']`).closest("h2");

  let card = h2.closest(".card");

  let img = card.querySelector("img");

  return { h2, card, img };
}

window.addEventListener("pageswap", async (e) => {
  if (e.viewTransition) {
    const to = new URL(navigation.activation.entry.url);

    // leaving home (going to blog)
    if (to.pathname != "/") {
      const { h2, card, img } = elems(to.pathname.replace(/\/$/, ""));

      h2.style.viewTransitionName = "title";
      card.style.viewTransitionName = "article";
      img.style.viewTransitionName = "hero";

      await e.viewTransition.finished;

      h2.style.viewTransitionName = "none";
      card.style.viewTransitionName = "none";
      img.style.viewTransitionName = "none";
    }
  }
});

window.addEventListener("pagereveal", async (e) => {
  if (e.viewTransition) {
    const from = new URL(navigation.activation.from.url);
    const to = new URL(navigation.activation.entry.url);

    // arriving home (coming from blog)
    if (from.pathname != "/" && to.pathname == "/") {
      const { h2, card, img } = elems(from.pathname.replace(/\/$/, ""));

      h2.style.viewTransitionName = "title";
      card.style.viewTransitionName = "article";
      img.style.viewTransitionName = "hero";

      await e.viewTransition.ready;

      h2.style.viewTransitionName = "none";
      card.style.viewTransitionName = "none";
      img.style.viewTransitionName = "none";
    }
  }
});
