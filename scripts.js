const cardsContainer = document.querySelector(".cards");
const cardsContainerInner = document.querySelector(".cards_inner");
const cards = Array.from(document.querySelectorAll(".card"));
const overlay = document.querySelector(".overlay");

const applyOverlayMask = (e) => {
  const overlayEL = e.currentTarget;
  const x = e.pageX - cardsContainer.offsetLeft;
  const y = e.pageY - cardsContainer.offsetTop;

  overlayEL.style = `--opacity: 1; --x: ${x}px; --y:${y}px;`;
};

const createOverlayCta = (overlayCard, ctaEl) => {
  const overlayCta = document.createElement("div");
  overlayCta.classList.add("cta");
  overlayCta.textContent = ctaEl.textContent;
  overlayCta.setAttribute("aria-hidden", true);
  overlayCard.append(overlayCta);
};

const updateOverlayCta = (overlayCard, ctaEl) => {
  const overlayCta = overlayCard.querySelector(".cta");
  overlayCta.textContent = ctaEl.textContent;
};

const observer = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const cardIndex = cards.indexOf(entry.target);
    let width = entry.borderBoxSize[0].inlineSize;
    let height = entry.borderBoxSize[0].blockSize;

    if (cardIndex > 0) {
      overlay.children[cardIndex].style.width = `${width}px`;
      overlay.children[cardIndex].style.height = `${height}px`;
      updateOverlayCta(overlay.children[cardIndex], entry.target.lastElementChild);
    }
  });
});

const initOverlayCard = (cardEL) => {
  const overlayCard = document.createElement("div");
  overlayCard.classList.add("card");
  createOverlayCta(overlayCard, cardEL.lastElementChild);
  overlay.append(overlayCard);
  observer.observe(cardEL);
};

cards.forEach(initOverlayCard);
document.body.addEventListener("pointermove", applyOverlayMask);