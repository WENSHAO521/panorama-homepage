// Scroll reveal for below-the-fold sections, site-wide.
//
// Each top-level <section> in <main> that starts below the first screen has
// its content blocks marked `.reveal-item` (hidden: opacity 0, nudged down) and
// is observed; when it scrolls into view the blocks fade up, lightly staggered.
// Nothing is hidden unless this script runs, so no-JS and reduced-motion
// visitors see everything immediately. Decorative layers (wallpapers,
// textures, aria-hidden art) and positioned/sticky elements are never touched.

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduce && 'IntersectionObserver' in window) {
  const DECORATIVE = /wallpaper|texture|backdrop|__art\b|__bg\b|contours/i;

  const animatable = (el: Element): el is HTMLElement => {
    if (!(el instanceof HTMLElement)) return false;
    if (['SCRIPT', 'STYLE', 'TEMPLATE'].includes(el.tagName)) return false;
    if (el.getAttribute('aria-hidden') === 'true') return false;
    if (DECORATIVE.test(el.className)) return false;
    const position = getComputedStyle(el).position;
    return position !== 'absolute' && position !== 'fixed' && position !== 'sticky';
  };

  const groups = new Map<Element, HTMLElement[]>();
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        groups.get(entry.target)?.forEach((el) => el.classList.add('is-revealed'));
        io.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
  );

  const sections = Array.from(document.querySelectorAll<HTMLElement>('main section')).filter(
    (section) => !section.parentElement?.closest('section') && !/hero/.test(section.className),
  );

  for (const section of sections) {
    if (section.getBoundingClientRect().top < window.innerHeight) continue; // already on screen
    const items = Array.from(section.children).filter(animatable);
    if (!items.length) continue;
    items.forEach((el, index) => {
      el.classList.add('reveal-item');
      el.style.setProperty('--reveal-delay', `${Math.min(index, 4) * 70}ms`);
    });
    groups.set(section, items);
    io.observe(section);
  }
}
