const toggleMenu = document.querySelector<HTMLElement>(
  "[data-js='toggle-menu']",
);
const navMenu = document.querySelector<HTMLElement>(
  "[data-js='navigation-menu']",
);
const overlay = document.querySelector<HTMLElement>(
  "[data-js='overlay-header']",
);
const desktopMedia = window.matchMedia("(width >= 48rem)");

if (toggleMenu && navMenu) {
  const setMenuState = (isOpen: boolean) => {
    toggleMenu.setAttribute("aria-expanded", String(isOpen));
    toggleMenu.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );

    navMenu.classList.toggle("nav-menu--open", isOpen);
    overlay?.classList.toggle("isVisible", isOpen);
    document.body.classList.toggle("no-scroll", isOpen);
  };

  toggleMenu.addEventListener("click", () => {
    const isOpen = toggleMenu.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
  });

  document.addEventListener("click", (event) => {
    if (desktopMedia.matches) return;

    const target = event.target as Node;
    const clickedInsideMenu = navMenu.contains(target);
    const clickedToggleButton = toggleMenu.contains(target);

    if (!clickedInsideMenu && !clickedToggleButton) {
      setMenuState(false);
    }
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuState(false);
      toggleMenu.blur();
    }
  });

  desktopMedia.addEventListener("change", () => setMenuState(false));
}
