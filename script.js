const year = document.querySelector("[data-year]");
const root = document.documentElement;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (year) {
  year.textContent = String(new Date().getFullYear());
}

root.classList.add("js");

const revealItems = document.querySelectorAll("[data-reveal]");

if (reducedMotion.matches) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8%" },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

let frameRequested = false;

const updateScene = () => {
  const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollRange > 0 ? window.scrollY / scrollRange : 0;
  root.style.setProperty("--scroll-progress", progress.toFixed(4));
  root.style.setProperty("--orbit-y", `${Math.min(window.scrollY * 0.11, 90)}px`);
  frameRequested = false;
};

const requestSceneUpdate = () => {
  if (frameRequested) return;
  frameRequested = true;
  window.requestAnimationFrame(updateScene);
};

window.addEventListener("scroll", requestSceneUpdate, { passive: true });
updateScene();

if (!reducedMotion.matches && window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener(
    "pointermove",
    (event) => {
      const xRatio = event.clientX / window.innerWidth - 0.5;
      const yRatio = event.clientY / window.innerHeight - 0.5;
      root.style.setProperty("--pointer-x", `${event.clientX}px`);
      root.style.setProperty("--pointer-y", `${event.clientY}px`);
      root.style.setProperty("--orbit-x", `${xRatio * 28}px`);
      root.style.setProperty("--orbit-pointer-y", `${yRatio * 20}px`);
      root.style.setProperty("--title-x", `${xRatio * 12}px`);
      root.style.setProperty("--title-x-negative", `${xRatio * -12}px`);
    },
    { passive: true },
  );
}


// All first-release ticket calls-to-action open one Ticket Tailor checkout.
const ticketLinks = document.querySelectorAll("[data-ticket-checkout]");
ticketLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (window.TTWidget && typeof window.TTWidget.loadEvent === "function") {
      event.preventDefault();
      try {
        window.TTWidget.loadEvent("onelyfetxc", 2536275, "website");
      } catch (error) {
        window.location.assign(link.href);
      }
    }
    // If the widget script is blocked or unavailable, follow the normal checkout URL.
  });
});
