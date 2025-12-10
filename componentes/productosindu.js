document.addEventListener("DOMContentLoaded", () => {
  const titulo = document.querySelector(".presentaciones-titulo");
  const items = document.querySelectorAll(".item");
  const mediaQuery = window.matchMedia("(min-width: 993px)");

  function handleHoverEffects(event) {
    if (mediaQuery.matches) {
      if (event.type === "mouseenter") {
        titulo.style.opacity = "0";
      } else if (event.type === "mouseleave") {
        setTimeout(() => {
          const isHoveringAnother = Array.from(items).some((i) =>
            i.matches(":hover")
          );
          if (!isHoveringAnother) {
            titulo.style.opacity = "1";
          }
        }, 100);
      }
    } else {
      titulo.style.opacity = "1";
    }
  }

  items.forEach((card) => {
    card.addEventListener("mouseenter", handleHoverEffects);
    card.addEventListener("mouseleave", handleHoverEffects);
  });

  mediaQuery.addEventListener("change", handleHoverEffects);
});
