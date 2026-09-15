// Minimal vanilla-JS progressive enhancement for the global shell.
// No framework, no state library -- <details> and <dialog> do almost
// all of the work natively (open/close, keyboard activation on
// <summary>, and for <dialog>: focus trapping, Escape-to-close, and
// returning focus to the invoker). This script only adds the handful
// of things neither element provides on its own:
//
//   1. Exclusive mega menus  -- opening one closes the others.
//   2. Click-outside-closes  -- for mega menus and the language switcher
//      (native <details> has no such behaviour).
//   3. Escape closes any open <details class="js-dismissible">
//      (native <dialog> already closes on Escape by itself).
//   4. Mobile nav open/close via <dialog>.showModal()/.close(), plus a
//      belt-and-braces scroll lock.
//   5. A subtle sticky-header shadow state after the page scrolls past
//      a 1px sentinel -- via IntersectionObserver, not a scroll listener.
//
// Deliberate discipline against the "[hidden] vs. CSS display" bug
// class flagged in docs/NAVIGATION.md: nothing here ever sets
// `element.style.display` or toggles a `.u-hidden`-style class on
// these elements. Visibility is controlled ONLY by the `open` attribute
// (<details>, <dialog>) -- see web/src/styles/navigation.css, where
// every panel's `display` is declared exclusively inside a
// `[open] > .panel` / `dialog[open]` selector, never on the bare class.

function closeDismissibles(except?: HTMLDetailsElement) {
  document.querySelectorAll<HTMLDetailsElement>('details.js-dismissible[open]').forEach((el) => {
    if (el !== except) el.open = false;
  });
}

function initMegaMenus() {
  const megaMenus = document.querySelectorAll<HTMLDetailsElement>('details.js-dismissible');
  if (!megaMenus.length) return;

  megaMenus.forEach((el) => {
    el.addEventListener('toggle', () => {
      if (el.open) closeDismissibles(el);
    });
  });

  document.addEventListener('click', (event) => {
    const target = event.target as Node;
    const openOnes = document.querySelectorAll<HTMLDetailsElement>('details.js-dismissible[open]');
    openOnes.forEach((el) => {
      if (!el.contains(target)) el.open = false;
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const openOne = document.querySelector<HTMLDetailsElement>('details.js-dismissible[open]');
    if (!openOne) return;
    event.stopPropagation();
    const summary = openOne.querySelector('summary');
    openOne.open = false;
    (summary as HTMLElement | null)?.focus();
  });
}

function initMobileNav() {
  const dialog = document.querySelector<HTMLDialogElement>('#mobile-nav');
  if (!dialog) return;
  const openButtons = document.querySelectorAll<HTMLButtonElement>('[data-open-mobile-nav]');
  const closeButtons = dialog.querySelectorAll<HTMLButtonElement>('[data-close-mobile-nav]');

  const lockScroll = () => document.documentElement.style.setProperty('overflow', 'hidden');
  const unlockScroll = () => document.documentElement.style.removeProperty('overflow');

  openButtons.forEach((btn) =>
    btn.addEventListener('click', () => {
      closeDismissibles();
      dialog.showModal();
      lockScroll();
    })
  );

  closeButtons.forEach((btn) => btn.addEventListener('click', () => dialog.close()));

  dialog.addEventListener('close', unlockScroll);

  // Native <dialog> Escape-to-close and focus trap/return already work;
  // this only ensures the scroll lock is released for every close path.
}

function initStickyHeader() {
  const header = document.querySelector<HTMLElement>('[data-site-header]');
  const sentinel = document.querySelector<HTMLElement>('[data-header-sentinel]');
  if (!header || !sentinel || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    ([entry]) => header.classList.toggle('is-scrolled', !entry.isIntersecting),
    { threshold: 0 }
  );
  observer.observe(sentinel);
}

initMegaMenus();
initMobileNav();
initStickyHeader();
