(function () {
    'use strict';

    // Respect user motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    /* ── Scroll-reveal ── */
    var REVEAL_SELECTORS = [
        '.section-head',
        '.steps-grid article',
        '.article-card',
        '.policy-item',
        '.indexer-card',
        '.indexer-chip',
        '.quick-links a',
        '.trust-links a',
        '.stat-cell',
        '.hero-stat',
        '.directory-item',
        '.guide-section',
        '.contact-block',
        '.archive-statement',
        '.steps-cta',
        '.indexer-strip-head'
    ];

    var revealObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            revealObs.unobserve(entry.target);
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

    REVEAL_SELECTORS.forEach(function (sel) {
        document.querySelectorAll(sel).forEach(function (el) {
            // Stagger siblings inside a grid container
            var parent = el.parentElement;
            if (parent) {
                var siblings = Array.prototype.slice.call(parent.children);
                var idx = siblings.indexOf(el);
                if (idx >= 1 && idx <= 4) el.classList.add('d' + idx);
            }
            el.classList.add('reveal');
            revealObs.observe(el);
        });
    });

    /* ── Number counter ── */
    function parseTarget(text) {
        var clean = text.trim();
        var isPlus = clean.slice(-1) === '+';
        var hasDot = clean.indexOf('.') !== -1 && !isPlus;
        if (hasDot) return null; // Skip DOI prefix like 10.63802
        var num = parseInt(clean.replace(/[^0-9]/g, ''), 10);
        if (isNaN(num) || num <= 0) return null;
        return { value: num, suffix: isPlus ? '+' : '' };
    }

    function runCounter(el, target, suffix) {
        var duration = 1100;
        var startTime = null;
        el.textContent = '0' + suffix;
        function tick(ts) {
            if (!startTime) startTime = ts;
            var p = Math.min((ts - startTime) / duration, 1);
            // Ease-out cubic
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.floor(eased * target) + suffix;
            if (p < 1) requestAnimationFrame(tick);
            else el.textContent = target + suffix;
        }
        requestAnimationFrame(tick);
    }

    var counterObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var el = entry.target;
            var parsed = parseTarget(el.textContent);
            if (parsed) runCounter(el, parsed.value, parsed.suffix);
            counterObs.unobserve(el);
        });
    }, { threshold: 0.6 });

    document.querySelectorAll('.stat-cell strong, .hero-stat strong').forEach(function (el) {
        counterObs.observe(el);
    });

    /* ── Kicker red-line grow on scroll ── */
    var kickerObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('animated');
            kickerObs.unobserve(entry.target);
        });
    }, { threshold: 0.8 });

    document.querySelectorAll('.kicker').forEach(function (el) {
        kickerObs.observe(el);
    });

})();
