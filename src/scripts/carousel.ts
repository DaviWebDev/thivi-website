document
  .querySelectorAll<HTMLElement>("[data-carousel]")
  .forEach((carousel) => {
    const track = carousel.querySelector<HTMLElement>("[data-carousel-track]");
    const prevButton = carousel.querySelector<HTMLButtonElement>(
      "[data-carousel-prev]",
    );
    const nextButton = carousel.querySelector<HTMLButtonElement>(
      "[data-carousel-next]",
    );
    const dotsContainer = carousel.querySelector<HTMLElement>(
      "[data-carousel-dots]",
    );

    if (!track || !prevButton || !nextButton || !dotsContainer) return;

    let pageTargets: number[] = [];
    let dotButtons: HTMLButtonElement[] = [];

    const getPageTargets = () => {
      const maxScrollLeft = Math.max(0, track.scrollWidth - track.clientWidth);

      if (maxScrollLeft <= 1) return [];

      const cards = Array.from(
        track.querySelectorAll<HTMLElement>(".carousel__card"),
      );
      const trackRect = track.getBoundingClientRect();

      const snapTargets = cards.map((card) => {
        const cardRect = card.getBoundingClientRect();
        const cardStart =
          cardRect.left - trackRect.left - track.clientLeft + track.scrollLeft;
        const alignment = getComputedStyle(card).scrollSnapAlign.split(" ")[0];
        const target =
          alignment === "center"
            ? cardStart + cardRect.width / 2 - track.clientWidth / 2
            : cardStart;

        return Math.max(0, Math.min(target, maxScrollLeft));
      });

      snapTargets.push(maxScrollLeft);
      snapTargets.sort((a, b) => a - b);

      const uniqueTargets = snapTargets.filter(
        (target, index) => index === 0 || target - snapTargets[index - 1] > 1,
      );
      const pages = [0];

      while (pages[pages.length - 1] < maxScrollLeft - 1) {
        const current = pages[pages.length - 1];
        const desired = current + track.clientWidth;

        if (desired >= maxScrollLeft - 1) {
          pages.push(maxScrollLeft);
          break;
        }

        const candidates = uniqueTargets.filter(
          (target) => target > current + 1,
        );

        if (candidates.length === 0) {
          pages.push(maxScrollLeft);
          break;
        }

        const next = candidates.reduce((closest, target) =>
          Math.abs(target - desired) < Math.abs(closest - desired)
            ? target
            : closest,
        );
        pages.push(next);
      }

      return pages;
    };

    const updateButtons = () => {
      const maxScrollLeft = Math.max(0, track.scrollWidth - track.clientWidth);
      const hasOverflow = maxScrollLeft > 1;

      prevButton.disabled = !hasOverflow || track.scrollLeft <= 1;
      nextButton.disabled =
        !hasOverflow || track.scrollLeft >= maxScrollLeft - 1;
    };

    const updateActiveDot = () => {
      if (pageTargets.length === 0) return;

      const activeIndex = pageTargets.reduce(
        (closestIndex, target, index) =>
          Math.abs(target - track.scrollLeft) <
          Math.abs(pageTargets[closestIndex] - track.scrollLeft)
            ? index
            : closestIndex,
        0,
      );

      dotButtons.forEach((dot, index) => {
        if (index === activeIndex) {
          dot.setAttribute("aria-current", "true");
        } else {
          dot.removeAttribute("aria-current");
        }
      });
    };

    const updateCarousel = () => {
      pageTargets = getPageTargets();
      dotsContainer.replaceChildren();
      dotButtons = [];
      dotsContainer.hidden = pageTargets.length === 0;

      pageTargets.forEach((_, index) => {
        const dot = document.createElement("button");

        dot.type = "button";
        dot.className = "carousel__dot";
        dot.setAttribute(
          "aria-label",
          `Go to page ${index + 1} of ${pageTargets.length}`,
        );

        dot.addEventListener("click", () => {
          const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
          ).matches;

          track.scrollTo({
            left: pageTargets[index],
            behavior: reduceMotion ? "auto" : "smooth",
          });
        });

        dotsContainer.append(dot);
        dotButtons.push(dot);
      });

      updateButtons();
      updateActiveDot();
    };

    prevButton.addEventListener("click", () => {
      track.scrollBy({ left: -track.clientWidth });
    });

    nextButton.addEventListener("click", () => {
      track.scrollBy({ left: track.clientWidth });
    });

    track.addEventListener(
      "scroll",
      () => {
        updateButtons();
        updateActiveDot();
      },
      { passive: true },
    );

    const resizeObserver = new ResizeObserver(updateCarousel);
    resizeObserver.observe(track);

    track.querySelectorAll<HTMLElement>(".carousel__card").forEach((card) => {
      resizeObserver.observe(card);
    });

    updateCarousel();
  });
