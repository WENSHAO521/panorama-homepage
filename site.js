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
        if (hasDot) return null;
        var num = parseInt(clean.replace(/[^0-9]/g, ''), 10);
        if (isNaN(num) || num <= 0) return null;
        return { value: num, suffix: isPlus ? '+' : '' };
    }

    function runCounter(el, target, suffix) {
        var duration = 1100, startTime = null;
        el.textContent = '0' + suffix;
        function tick(ts) {
            if (!startTime) startTime = ts;
            var p = Math.min((ts - startTime) / duration, 1);
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

/* ─────────────────────────────────────────────────────────────────
   Hero canvas — 6 scholarly themes, crossfade every ~6 s
   Themes: Biology · Medicine · Climate · Technology · Arts · Chemistry
───────────────────────────────────────────────────────────────── */
(function () {
    'use strict';
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var W = 0, H = 0, raf = null, tick = 0;
    var curIdx = 0, nxtIdx = 1, timer = 0;
    var HOLD = 340, FADE = 80;           /* frames: display time + crossfade */
    var bufA, ctxA, bufB, ctxB;
    var TD = {};                         /* per-theme persistent data */

    /* cubic bezier point */
    function bz(u, p0, p1, p2, p3) {
        var v = 1 - u;
        return v*v*v*p0 + 3*v*v*u*p1 + 3*v*u*u*p2 + u*u*u*p3;
    }

    /* left vignette — keeps hero text readable */
    function vignette(c, r, g, b) {
        var vg = c.createLinearGradient(0, 0, W * 0.52, 0);
        vg.addColorStop(0, 'rgba('+r+','+g+','+b+',.84)');
        vg.addColorStop(1, 'rgba('+r+','+g+','+b+',0)');
        c.globalAlpha = 1; c.fillStyle = vg; c.fillRect(0, 0, W, H);
    }

    /* ═══════════════════════════════════════
       THEME 0 · BIOLOGY — neural cell
    ═══════════════════════════════════════ */
    function initBio() {
        var sx = W * 0.63, sy = H * 0.52, sr = Math.min(W, H) * 0.038;
        var axons = [];
        for (var i = 0; i < 13; i++) {
            var ang = (i / 13) * Math.PI * 2 + (Math.random() - 0.5) * 0.35;
            var len = 85 + Math.random() * 210;
            var curl = (Math.random() - 0.5) * 1.3;
            var a = {
                x0: sx, y0: sy,
                cp1x: sx + Math.cos(ang + curl * 0.3) * len * 0.3,
                cp1y: sy + Math.sin(ang + curl * 0.3) * len * 0.3,
                cp2x: sx + Math.cos(ang + curl * 0.65) * len * 0.7,
                cp2y: sy + Math.sin(ang + curl * 0.65) * len * 0.7,
                ex: sx + Math.cos(ang) * len,
                ey: sy + Math.sin(ang) * len,
                op: 0.35 + Math.random() * 0.28,
                nodes: []
            };
            var nn = 1 + Math.floor(Math.random() * 3);
            for (var k = 0; k < nn; k++) {
                a.nodes.push({ at: 0.15 + Math.random() * 0.75, r: 2.5 + Math.random() * 4, type: Math.random() < 0.55 ? 'red' : 'lav', ph: Math.random() * Math.PI * 2 });
            }
            axons.push(a);
        }
        var dust = [];
        for (var i = 0; i < 80; i++) {
            dust.push({ x: Math.random()*W, y: Math.random()*H, vx: (Math.random()-0.5)*0.04, vy: (Math.random()-0.5)*0.04, sz: 0.3+Math.random()*0.7, op: 0.06+Math.random()*0.13, col: Math.random()<0.4 ? [255,90,110] : [165,125,230] });
        }
        return { sx: sx, sy: sy, sr: sr, axons: axons, dust: dust, sigs: [] };
    }

    function drawBio(c, t, noUpd) {
        var d = TD.bio;
        var g = c.createRadialGradient(d.sx, d.sy, 0, d.sx, d.sy, H * 0.9);
        g.addColorStop(0, 'rgba(60,14,105,.22)'); g.addColorStop(1, 'rgba(14,4,28,0)');
        c.globalAlpha = 1; c.fillStyle = g; c.fillRect(0, 0, W, H);

        for (var i = 0; i < d.dust.length; i++) {
            var p = d.dust[i]; c.globalAlpha = p.op;
            c.beginPath(); c.arc(p.x, p.y, p.sz, 0, Math.PI * 2);
            c.fillStyle = 'rgb('+p.col[0]+','+p.col[1]+','+p.col[2]+')'; c.fill();
            if (!noUpd) { p.x += p.vx; p.y += p.vy; if (p.x < -4) p.x = W+3; if (p.x > W+4) p.x = -3; if (p.y < -4) p.y = H+3; if (p.y > H+4) p.y = -3; }
        }

        c.lineCap = 'round';
        for (var i = 0; i < d.axons.length; i++) {
            var a = d.axons[i];
            var passes = [[14,0.07],[6,0.14],[1.3,0.62]];
            for (var pi = 0; pi < 3; pi++) {
                c.globalAlpha = a.op * passes[pi][1]; c.strokeStyle = 'rgba(185,145,238,1)'; c.lineWidth = passes[pi][0];
                c.beginPath(); c.moveTo(a.x0, a.y0); c.bezierCurveTo(a.cp1x, a.cp1y, a.cp2x, a.cp2y, a.ex, a.ey); c.stroke();
            }
            for (var k = 0; k < a.nodes.length; k++) {
                var n = a.nodes[k];
                var nx = bz(n.at, a.x0, a.cp1x, a.cp2x, a.ex), ny = bz(n.at, a.y0, a.cp1y, a.cp2y, a.ey);
                var pr = n.r * (1 + 0.18 * Math.sin(t * 0.035 + n.ph));
                var ng = c.createRadialGradient(nx, ny, 0, nx, ny, pr * 3.5);
                if (n.type === 'red') { ng.addColorStop(0, 'rgba(255,95,115,.85)'); ng.addColorStop(1, 'rgba(185,28,28,0)'); }
                else                  { ng.addColorStop(0, 'rgba(210,185,255,.72)'); ng.addColorStop(1, 'rgba(130,90,210,0)'); }
                c.globalAlpha = 1; c.fillStyle = ng; c.beginPath(); c.arc(nx, ny, pr*3.5, 0, Math.PI*2); c.fill();
                c.globalAlpha = .82; c.fillStyle = n.type === 'red' ? 'rgb(255,125,140)' : 'rgb(225,205,255)';
                c.beginPath(); c.arc(nx, ny, pr*0.52, 0, Math.PI*2); c.fill();
            }
        }

        if (!noUpd && Math.random() < 0.012 && d.sigs.length < 4)
            d.sigs.push({ ai: Math.floor(Math.random() * d.axons.length), at: 0, spd: 0.005 + Math.random() * 0.004 });
        var live = [];
        for (var i = 0; i < d.sigs.length; i++) {
            var sig = d.sigs[i]; if (!noUpd) sig.at += sig.spd; if (sig.at >= 1) continue; live.push(sig);
            var a = d.axons[sig.ai];
            var sx = bz(sig.at, a.x0, a.cp1x, a.cp2x, a.ex), sy = bz(sig.at, a.y0, a.cp1y, a.cp2y, a.ey);
            var fo = sig.at < 0.1 ? sig.at * 10 : (sig.at > 0.9 ? (1 - sig.at) * 10 : 1);
            var sg = c.createRadialGradient(sx, sy, 0, sx, sy, 7);
            sg.addColorStop(0, 'rgba(240,220,255,.90)'); sg.addColorStop(1, 'rgba(180,120,240,0)');
            c.globalAlpha = fo; c.fillStyle = sg; c.beginPath(); c.arc(sx, sy, 7, 0, Math.PI*2); c.fill();
            c.globalAlpha = fo * .85; c.fillStyle = '#fff'; c.beginPath(); c.arc(sx, sy, 1.5, 0, Math.PI*2); c.fill();
        }
        if (!noUpd) d.sigs = live;

        var pulse = 1 + 0.06 * Math.sin(t * 0.022);
        var sg = c.createRadialGradient(d.sx, d.sy, 0, d.sx, d.sy, d.sr * 5 * pulse);
        sg.addColorStop(0, 'rgba(210,160,255,.50)'); sg.addColorStop(.3, 'rgba(160,90,230,.28)'); sg.addColorStop(.7, 'rgba(100,30,170,.10)'); sg.addColorStop(1, 'rgba(50,8,90,0)');
        c.globalAlpha = 1; c.fillStyle = sg; c.beginPath(); c.arc(d.sx, d.sy, d.sr*5*pulse, 0, Math.PI*2); c.fill();
        var sg2 = c.createRadialGradient(d.sx, d.sy, 0, d.sx, d.sy, d.sr * pulse);
        sg2.addColorStop(0, 'rgba(240,220,255,.92)'); sg2.addColorStop(.5, 'rgba(185,125,250,.70)'); sg2.addColorStop(1, 'rgba(120,55,210,.28)');
        c.globalAlpha = 1; c.fillStyle = sg2; c.beginPath(); c.arc(d.sx, d.sy, d.sr*pulse, 0, Math.PI*2); c.fill();
        vignette(c, 8, 5, 12);
    }

    /* ═══════════════════════════════════════
       THEME 1 · MEDICINE — DNA + ECG
    ═══════════════════════════════════════ */
    function drawMed(c, t) {
        var cx = W * 0.74, amp = 32, wl = 95, off = t * 0.38;
        var bg = c.createRadialGradient(cx, H*.5, 0, cx, H*.5, H*.9);
        bg.addColorStop(0, 'rgba(75,8,8,.25)'); bg.addColorStop(1, 'rgba(20,3,3,0)');
        c.globalAlpha = 1; c.fillStyle = bg; c.fillRect(0, 0, W, H);
        c.lineCap = 'round';

        for (var s = 0; s < 2; s++) {
            var lwArr = [12, 5, 1.4], opArr = [0.06, 0.12, 0.22];
            for (var pi = 0; pi < 3; pi++) {
                c.globalAlpha = opArr[pi]; c.strokeStyle = 'rgba(220,160,160,1)'; c.lineWidth = lwArr[pi];
                c.beginPath();
                for (var y = -10; y <= H+10; y += 3) { var ph = ((y-off)/wl)*Math.PI*2 + s*Math.PI; var x = cx + Math.sin(ph)*amp; y===-10 ? c.moveTo(x,y) : c.lineTo(x,y); }
                c.stroke();
            }
        }
        var span = wl / 6;
        c.lineWidth = 0.7;
        for (var y = 0; y <= H + span; y += span) {
            var adjY = y - (off % span); if (adjY < -5 || adjY > H+5) continue;
            var phA = ((adjY-off)/wl)*Math.PI*2;
            var xA = cx + Math.sin(phA)*amp, xB = cx + Math.sin(phA+Math.PI)*amp;
            var dep = Math.abs(Math.cos(phA)), isRed = Math.sin(y*0.32) > 0;
            c.globalAlpha = 0.04+dep*0.11; c.strokeStyle = 'rgba(200,150,150,1)';
            c.beginPath(); c.moveTo(xA, adjY); c.lineTo(xB, adjY); c.stroke();
            c.globalAlpha = 0.12+dep*0.16;
            c.beginPath(); c.arc(xA, adjY, 2.5, 0, Math.PI*2); c.fillStyle = isRed ? 'rgb(255,80,80)' : '#e5e5e5'; c.fill();
            c.beginPath(); c.arc(xB, adjY, 2.5, 0, Math.PI*2); c.fillStyle = isRed ? '#e5e5e5' : 'rgb(255,80,80)'; c.fill();
        }

        var ecgY = H*0.5, ecgA = H*0.10, period = W*0.25, ecgOff = (t*0.9) % period;
        c.globalAlpha = 0.18; c.strokeStyle = 'rgb(220,80,80)'; c.lineWidth = 1.2;
        c.beginPath();
        for (var x = 0; x <= W; x += 2) {
            var pp = ((x + ecgOff) % period) / period, yo;
            if (pp<0.35) yo=0; else if (pp<0.38) yo=-ecgA*0.15; else if (pp<0.40) yo=ecgA*0.15; else if (pp<0.42) yo=-ecgA; else if (pp<0.44) yo=ecgA*0.25; else if (pp<0.52) yo=-ecgA*0.12; else yo=0;
            x===0 ? c.moveTo(x, ecgY+yo) : c.lineTo(x, ecgY+yo);
        }
        c.stroke();
        vignette(c, 8, 4, 4);
    }

    /* ═══════════════════════════════════════
       THEME 2 · CLIMATE — globe + currents
    ═══════════════════════════════════════ */
    function drawClimate(c, t) {
        var gcx = W*0.60, gcy = H*0.50, gr = Math.min(W,H)*0.28, PERS = 0.28, ROT = t*0.003;
        var bg = c.createRadialGradient(gcx, gcy, 0, gcx, gcy, H*.95);
        bg.addColorStop(0, 'rgba(5,32,68,.26)'); bg.addColorStop(1, 'rgba(2,9,22,0)');
        c.globalAlpha = 1; c.fillStyle = bg; c.fillRect(0, 0, W, H);
        c.strokeStyle = 'rgb(100,170,240)';

        for (var i = 1; i < 8; i++) {
            var phi = (i/8)*Math.PI, latR = gr*Math.sin(phi), latY = gcy - gr*Math.cos(phi);
            c.globalAlpha = 0.09; c.lineWidth = 0.5;
            c.beginPath(); c.ellipse(gcx, latY, latR, latR*PERS, 0, 0, Math.PI*2); c.stroke();
        }
        for (var i = 0; i < 12; i++) {
            var lon = (i/12)*Math.PI*2 + ROT, cosL = Math.cos(lon); if (cosL < -0.18) continue;
            var dep = Math.max(0, cosL);
            c.globalAlpha = 0.06+dep*0.13; c.lineWidth = 0.4+dep*0.3;
            c.beginPath();
            for (var j = 0; j <= 40; j++) { var th = (j/40)*Math.PI; j===0 ? c.moveTo(gcx+gr*Math.sin(th)*cosL, gcy-gr*Math.cos(th)) : c.lineTo(gcx+gr*Math.sin(th)*cosL, gcy-gr*Math.cos(th)); }
            c.stroke();
        }
        c.globalAlpha = 0.18; c.lineWidth = 0.7; c.beginPath(); c.ellipse(gcx, gcy, gr, gr*PERS, 0, 0, Math.PI*2); c.stroke();
        c.globalAlpha = 0.20; c.lineWidth = 1.0; c.beginPath(); c.arc(gcx, gcy, gr, 0, Math.PI*2); c.stroke();

        for (var li = 1; li < 8; li++) {
            var phi = (li/8)*Math.PI, latR = gr*Math.sin(phi), latY = gcy - gr*Math.cos(phi);
            for (var lo = 0; lo < 12; lo++) {
                var cosL = Math.cos((lo/12)*Math.PI*2 + ROT); if (cosL < 0.1) continue;
                var red = (li+lo)%6===0;
                c.globalAlpha = cosL*(red ? 0.45 : 0.22);
                c.beginPath(); c.arc(gcx+latR*cosL, latY, red?2.2:1.4, 0, Math.PI*2);
                c.fillStyle = red ? 'rgb(185,28,28)' : 'rgb(100,200,255)'; c.fill();
            }
        }
        for (var i = 0; i < 10; i++) {
            var sAng = (i/10)*Math.PI*2 + t*0.0015, aR = gr*(0.85+i*0.12), aSpan = Math.PI*(0.18+((i*37)%10)*0.04);
            c.globalAlpha = 0.055+(i%3)*0.015; c.strokeStyle = 'rgba(60,140,220,1)'; c.lineWidth = 0.9;
            c.beginPath(); c.arc(gcx, gcy, aR, sAng, sAng+aSpan); c.stroke();
        }
        vignette(c, 3, 7, 14);
    }

    /* ═══════════════════════════════════════
       THEME 3 · TECHNOLOGY — circuit board
    ═══════════════════════════════════════ */
    function initTech() {
        var nodes = [], traces = [];
        for (var r = 0; r < 7; r++) for (var col = 0; col < 10; col++) {
            if (Math.random() < 0.28) continue;
            nodes.push({ x: W*0.44+(col/10)*W*0.54+(Math.random()-0.5)*18, y: H*0.10+(r/7)*H*0.85+(Math.random()-0.5)*14, r: 1.5+Math.random()*2.5, ph: Math.random()*Math.PI*2, red: Math.random()<0.12 });
        }
        for (var i = 0; i < nodes.length; i++) for (var j = i+1; j < nodes.length; j++) {
            var dx = nodes[i].x-nodes[j].x, dy = nodes[i].y-nodes[j].y;
            if (Math.sqrt(dx*dx+dy*dy) < W*0.11 && Math.random() < 0.38)
                traces.push({ x0:nodes[i].x, y0:nodes[i].y, x1:nodes[j].x, y1:nodes[j].y, mx:nodes[i].x+(nodes[j].x-nodes[i].x)*(Math.random()<0.5?0:1) });
        }
        return { nodes: nodes, traces: traces, pulses: [] };
    }

    function drawTech(c, t, noUpd) {
        var d = TD.tech;
        var bg = c.createRadialGradient(W*.65, H*.5, 0, W*.65, H*.5, H*1.0);
        bg.addColorStop(0, 'rgba(4,12,45,.22)'); bg.addColorStop(1, 'rgba(2,5,14,0)');
        c.globalAlpha = 1; c.fillStyle = bg; c.fillRect(0, 0, W, H);
        c.lineCap = 'square';

        for (var i = 0; i < d.traces.length; i++) {
            var tr = d.traces[i];
            var tlw = [8, 3, 0.7], top = [0.055, 0.11, 0.26];
            for (var pi = 0; pi < 3; pi++) {
                c.globalAlpha = top[pi]; c.strokeStyle = 'rgba(40,120,200,1)'; c.lineWidth = tlw[pi];
                c.beginPath(); c.moveTo(tr.x0,tr.y0); c.lineTo(tr.mx,tr.y0); c.lineTo(tr.mx,tr.y1); c.lineTo(tr.x1,tr.y1); c.stroke();
            }
        }
        for (var i = 0; i < d.nodes.length; i++) {
            var n = d.nodes[i], pr = n.r*(1+0.22*Math.sin(t*0.042+n.ph));
            var ng = c.createRadialGradient(n.x,n.y,0,n.x,n.y,pr*4);
            ng.addColorStop(0, n.red?'rgba(255,75,75,.60)':'rgba(55,150,255,.55)');
            ng.addColorStop(1, n.red?'rgba(185,28,28,0)':'rgba(20,80,200,0)');
            c.globalAlpha = 1; c.fillStyle = ng; c.beginPath(); c.arc(n.x,n.y,pr*4,0,Math.PI*2); c.fill();
            c.globalAlpha = .68; c.fillStyle = n.red?'rgb(255,100,100)':'rgb(90,175,255)';
            c.beginPath(); c.arc(n.x,n.y,pr*0.6,0,Math.PI*2); c.fill();
        }

        if (!noUpd && Math.random()<0.015 && d.pulses.length<5)
            d.pulses.push({ ti: Math.floor(Math.random()*d.traces.length), at: 0, spd: 0.006+Math.random()*0.006 });
        var live = [];
        for (var i = 0; i < d.pulses.length; i++) {
            var pl = d.pulses[i]; if (!noUpd) pl.at += pl.spd; if (pl.at >= 1) continue; live.push(pl);
            var tr = d.traces[pl.ti], ppx, ppy;
            if (pl.at < 0.5)      { var pp = pl.at*2;      ppx = tr.x0+(tr.mx-tr.x0)*pp; ppy = tr.y0; }
            else if (pl.at < 0.75){ var pp = (pl.at-0.5)*4; ppx = tr.mx; ppy = tr.y0+(tr.y1-tr.y0)*pp; }
            else                  { var pp = (pl.at-0.75)*4; ppx = tr.mx+(tr.x1-tr.mx)*pp; ppy = tr.y1; }
            var fo = pl.at<0.08 ? pl.at*12.5 : (pl.at>0.92?(1-pl.at)*12.5:1);
            var sg = c.createRadialGradient(ppx,ppy,0,ppx,ppy,8);
            sg.addColorStop(0,'rgba(200,230,255,.88)'); sg.addColorStop(1,'rgba(40,120,255,0)');
            c.globalAlpha = fo; c.fillStyle = sg; c.beginPath(); c.arc(ppx,ppy,8,0,Math.PI*2); c.fill();
            c.globalAlpha = fo*.85; c.fillStyle='#fff'; c.beginPath(); c.arc(ppx,ppy,2,0,Math.PI*2); c.fill();
        }
        if (!noUpd) d.pulses = live;
        vignette(c, 3, 5, 12);
    }

    /* ═══════════════════════════════════════
       THEME 4 · ARTS & HUMANITIES — staff + notes
    ═══════════════════════════════════════ */
    function initArts() {
        var noteChars = ['♩','♪','♫','♬'];
        var notes = [];
        for (var i = 0; i < 22; i++) notes.push({ x: Math.random()*W, y: Math.random()*H, vx: (Math.random()-0.5)*0.055, vy: (Math.random()-0.5)*0.045, sz: 13+Math.random()*20, op: 0.08+Math.random()*0.11, ch: noteChars[Math.floor(Math.random()*4)], rot: (Math.random()-0.5)*0.4 });
        var curves = [];
        for (var i = 0; i < 7; i++) curves.push({ x0:W*0.48+Math.random()*W*0.4, y0:Math.random()*H, cp1x:W*0.48+Math.random()*W*0.35, cp1y:Math.random()*H, cp2x:W*0.52+Math.random()*W*0.35, cp2y:Math.random()*H, ex:W*0.44+Math.random()*W*0.45, ey:Math.random()*H, op:0.07+Math.random()*0.08 });
        return { notes: notes, curves: curves };
    }

    function drawArts(c, _t, noUpd) {
        var d = TD.arts;
        var bg = c.createRadialGradient(W*.58, H*.5, 0, W*.58, H*.5, H*.9);
        bg.addColorStop(0,'rgba(40,22,4,.22)'); bg.addColorStop(1,'rgba(12,6,2,0)');
        c.globalAlpha = 1; c.fillStyle = bg; c.fillRect(0, 0, W, H);

        var sY = H*.50, sS = H*.058;
        for (var i = 0; i < 5; i++) {
            var ly = sY + (i-2)*sS;
            c.globalAlpha = 0.13; c.strokeStyle = 'rgb(195,160,95)'; c.lineWidth = 0.65;
            c.beginPath(); c.moveTo(W*.42, ly); c.lineTo(W, ly); c.stroke();
        }
        c.lineCap = 'round';
        for (var i = 0; i < d.curves.length; i++) {
            var cv = d.curves[i];
            c.globalAlpha = cv.op; c.strokeStyle = 'rgba(195,160,90,1)'; c.lineWidth = 1.1;
            c.beginPath(); c.moveTo(cv.x0,cv.y0); c.bezierCurveTo(cv.cp1x,cv.cp1y,cv.cp2x,cv.cp2y,cv.ex,cv.ey); c.stroke();
        }
        c.textAlign = 'center'; c.textBaseline = 'middle';
        for (var i = 0; i < d.notes.length; i++) {
            var n = d.notes[i]; c.globalAlpha = n.op;
            c.save(); c.translate(n.x, n.y); c.rotate(n.rot);
            c.font = Math.round(n.sz)+'px Inter,Arial'; c.fillStyle = 'rgb(195,165,95)'; c.fillText(n.ch, 0, 0); c.restore();
            if (!noUpd) { n.x+=n.vx; n.y+=n.vy; if(n.x<-22)n.x=W+16; if(n.x>W+22)n.x=-16; if(n.y<-22)n.y=H+16; if(n.y>H+22)n.y=-16; }
        }
        vignette(c, 7, 4, 2);
    }

    /* ═══════════════════════════════════════
       THEME 5 · CHEMISTRY — atom + molecules
    ═══════════════════════════════════════ */
    function initChem() {
        var mols = [];
        for (var i = 0; i < 9; i++) {
            var sz = 0.5+Math.random()*1.0;
            mols.push({ x:W*(0.45+Math.random()*0.52), y:Math.random()*H, vx:(Math.random()-0.5)*0.04, vy:(Math.random()-0.5)*0.04, ang:Math.random()*Math.PI*2, rspd:(Math.random()>0.5?1:-1)*0.0018, sz:sz, hexR:20*sz, bLen:(23+Math.random()*15)*sz, op:0.08+Math.random()*0.10, sides:Math.random()<0.55?6:(Math.random()<0.6?5:4) });
        }
        return { mols: mols };
    }

    function drawChem(c, t, noUpd) {
        var d = TD.chem, acx = W*0.65, acy = H*0.50, ar = Math.min(W,H)*0.22;
        var bg = c.createRadialGradient(acx, acy, 0, acx, acy, H*.9);
        bg.addColorStop(0,'rgba(4,35,38,.24)'); bg.addColorStop(1,'rgba(2,11,13,0)');
        c.globalAlpha = 1; c.fillStyle = bg; c.fillRect(0, 0, W, H);

        var ng = c.createRadialGradient(acx,acy,0,acx,acy,13);
        ng.addColorStop(0,'rgba(255,200,100,.65)'); ng.addColorStop(1,'rgba(200,120,0,0)');
        c.globalAlpha = 1; c.fillStyle = ng; c.beginPath(); c.arc(acx,acy,13,0,Math.PI*2); c.fill();
        c.globalAlpha = .70; c.fillStyle = 'rgb(255,218,120)'; c.beginPath(); c.arc(acx,acy,4.5,0,Math.PI*2); c.fill();

        for (var orb = 0; orb < 3; orb++) {
            var eAng = t*0.025*(1+orb*0.35) + orb*Math.PI*2/3;
            c.save(); c.translate(acx, acy); c.rotate(orb*Math.PI/3);
            c.globalAlpha = 0.11; c.strokeStyle = 'rgba(70,215,190,1)'; c.lineWidth = 0.6;
            c.beginPath(); c.ellipse(0, 0, ar, ar*0.28, 0, 0, Math.PI*2); c.stroke();
            var ex = ar*Math.cos(eAng), ey = ar*0.28*Math.sin(eAng);
            var eg = c.createRadialGradient(ex,ey,0,ex,ey,6);
            eg.addColorStop(0,'rgba(70,255,215,.82)'); eg.addColorStop(1,'rgba(20,190,155,0)');
            c.globalAlpha = 1; c.fillStyle = eg; c.beginPath(); c.arc(ex,ey,6,0,Math.PI*2); c.fill();
            c.globalAlpha = .75; c.fillStyle = 'rgb(90,255,225)'; c.beginPath(); c.arc(ex,ey,1.8,0,Math.PI*2); c.fill();
            c.restore();
        }

        c.lineCap = 'round';
        for (var i = 0; i < d.mols.length; i++) {
            var m = d.mols[i], step = (Math.PI*2)/m.sides;
            c.globalAlpha = m.op; c.strokeStyle = '#9ecece'; c.lineWidth = 0.85;
            c.beginPath();
            for (var s = 0; s < m.sides; s++) { var a = m.ang+step*s; s===0?c.moveTo(m.x+m.hexR*Math.cos(a),m.y+m.hexR*Math.sin(a)):c.lineTo(m.x+m.hexR*Math.cos(a),m.y+m.hexR*Math.sin(a)); }
            c.closePath(); c.stroke();
            for (var s = 0; s < m.sides; s++) {
                var a = m.ang+step*s, bx = m.x+m.hexR*Math.cos(a), by = m.y+m.hexR*Math.sin(a), ex = bx+m.bLen*Math.cos(a), ey2 = by+m.bLen*Math.sin(a);
                c.globalAlpha = m.op*.60; c.lineWidth = 0.65; c.beginPath(); c.moveTo(bx,by); c.lineTo(ex,ey2); c.stroke();
                c.globalAlpha = m.op*1.15; c.beginPath(); c.arc(ex,ey2,(s%3===0?2.4:1.7)*m.sz,0,Math.PI*2);
                c.fillStyle = (s%3===0)?'rgb(185,28,28)':'#b8d8d5'; c.fill();
            }
            c.globalAlpha = m.op*1.3; c.beginPath(); c.arc(m.x,m.y,3*m.sz,0,Math.PI*2); c.fillStyle='#d8eeec'; c.fill();
            if (!noUpd) { m.ang+=m.rspd; m.x+=m.vx; m.y+=m.vy; if(m.x<-100)m.x=W+80; if(m.x>W+100)m.x=-80; if(m.y<-100)m.y=H+80; if(m.y>H+100)m.y=-80; }
        }
        vignette(c, 3, 7, 8);
    }

    /* ═══════════════════════════════════════
       Orchestration
    ═══════════════════════════════════════ */
    var THEMES = [drawBio, drawMed, drawClimate, drawTech, drawArts, drawChem];

    function resize() {
        W = canvas.offsetWidth || 1200;
        H = canvas.offsetHeight || 480;
        canvas.width = W; canvas.height = H;
        bufA = document.createElement('canvas'); bufA.width = W; bufA.height = H; ctxA = bufA.getContext('2d');
        bufB = document.createElement('canvas'); bufB.width = W; bufB.height = H; ctxB = bufB.getContext('2d');
    }

    function initAll() {
        resize();
        TD.bio  = initBio();
        TD.tech = initTech();
        TD.arts = initArts();
        TD.chem = initChem();
    }

    function frame() {
        tick++; timer++;
        var fading = timer > HOLD;
        var progress = fading ? Math.min((timer - HOLD) / FADE, 1) : 0;
        if (progress >= 1) { curIdx = nxtIdx; nxtIdx = (nxtIdx + 1) % THEMES.length; timer = 0; }

        ctxA.clearRect(0, 0, W, H);
        THEMES[curIdx](ctxA, tick, false);

        ctx.clearRect(0, 0, W, H);
        ctx.globalAlpha = 1 - progress;
        ctx.drawImage(bufA, 0, 0);

        if (fading && progress > 0 && progress < 1) {
            ctxB.clearRect(0, 0, W, H);
            THEMES[nxtIdx](ctxB, tick, true);
            ctx.globalAlpha = progress;
            ctx.drawImage(bufB, 0, 0);
        }

        ctx.globalAlpha = 1;
        raf = requestAnimationFrame(frame);
    }

    window.addEventListener('resize', function () {
        if (raf) cancelAnimationFrame(raf);
        initAll(); timer = 0; curIdx = 0; nxtIdx = 1; tick = 0;
        frame();
    });

    initAll(); frame();
}());

/* ─────────────────────────────────────────────────────────────────
   Language Switcher — English / 繁體中文
───────────────────────────────────────────────────────────────── */
(function () {
    'use strict';

    var STORAGE_KEY = 'panorama-lang';

    var LANGUAGES = {
        en: { short: 'EN', name: 'English', htmlLang: 'en' },
        zh: { short: '繁中', name: '繁體中文', htmlLang: 'zh-HK' }
    };

    var i18n = {
        en: {
            'lang.btn': '繁體中文',
            'nav.home': 'Home',
            'nav.journals': 'Journals',
            'nav.for-authors': 'For Authors',
            'nav.ethics': 'Ethics',
            'nav.open-access': 'Open Access',
            'nav.join-eb': 'Join Editorial Board',
            'nav.about': 'About',
            'footer.brand-intro': 'International scholarly journals with structured submission workflows and transparent publication policies.',
            'footer.admin-contact': 'Administrative Contact',
            'footer.journals-policies': 'Journals & Policies',
            'footer.journal-directory': 'Journal Directory',
            'footer.pub-ethics': 'Publication Ethics',
            'footer.oa-policy': 'Open Access Policy',
            'footer.indexing': 'Indexing & Archiving',
            'footer.authors-info': 'Authors & Information',
            'footer.author-guide': 'Author Guide',
            'footer.join-eb': 'Join Editorial Board',
            'footer.about': 'About',
            'footer.contact': 'Contact',
            'footer.editorial-dir': 'Editorial Directory',
            'footer.copyright': '©2025~2026 Panorama Scholarly Group Ltd. All rights reserved.',
            'index.kicker': 'Home',
            'index.h1': 'Find the right journal and submit with confidence.',
            'index.lead': 'Panorama Scholarly Group supports international journals through structured editorial workflows. Authors can evaluate journal fit, review policy requirements, and proceed through clearly defined submission pathways before peer review begins.',
            'index.badge.peer': 'Peer Reviewed',
            'index.badge.oa': 'Open Access',
            'index.badge.doi': 'Crossref DOI',
            'index.btn.journals': 'Find a Journal',
            'index.btn.authors': 'Author Guide',
            'index.stat.journals': 'Active Journals',
            'index.stat.clusters': 'Subject Clusters',
            'index.stat.articles': 'Published Articles',
            'index.stat.doi': 'Crossref DOI Prefix',
            'about.kicker': 'About',
            'about.h1': 'Institutional profile and journal operating framework.',
            'about.lead': 'Panorama Scholarly Group maintains a multidisciplinary journal portfolio with journal-level editorial management and shared policy baselines for ethics and access.',
            'contact.kicker': 'Contact',
            'contact.h1': 'Administrative and policy contact for the journal platform.',
            'contact.lead': 'Use this page for general, administrative, or policy enquiries addressed to Panorama Scholarly Group as publisher. For submission-related matters, please contact the relevant journal directly through its editorial portal.',
            'authors.kicker': 'Author Guide',
            'authors.h1': 'Complete submission guidance from preparation to publication.',
            'authors.lead': 'This guide covers journal selection, manuscript preparation, peer review expectations, and post-publication rights for Panorama Scholarly Group journals.',
            'journals.kicker': 'Journal Directory',
            'journals.h1': 'Browse and filter journals by subject, field, or ISSN.',
            'journals.lead': 'All Panorama Scholarly Group journals accept submissions through their individual editorial portals. Confirm journal fit and review requirements before submitting.',
            'ethics.kicker': 'Publication Ethics',
            'ethics.h1': 'Baseline publication ethics requirements across all journals.',
            'ethics.lead': 'All Panorama Scholarly Group journals operate under a shared publication ethics baseline covering editorial conduct, author obligations, and integrity requirements.',
            'oa.kicker': 'Open Access',
            'oa.h1': 'Open access terms, licensing, and rights guidance.',
            'oa.lead': 'All journals in the Panorama Scholarly Group portfolio publish under open access terms. Author rights, licensing conditions, and repository permissions are defined at journal level.',
            'indexing.kicker': 'Indexing & Archiving',
            'indexing.h1': 'Discovery databases, preservation archives, and DOI registration.',
            'indexing.lead': 'Panorama Scholarly Group journals are registered with Crossref for DOI assignment and participate in digital preservation programmes to ensure long-term article availability.',
            'eb.kicker': 'Join Editorial Board',
            'eb.h1': 'Become an Editorial Board Member.',
            'eb.lead': "Panorama Scholarly Group's journals invite scholars worldwide to join their editorial boards. We welcome researchers with strong academic backgrounds and peer-review experience to help uphold the quality of international scholarly publishing.",
            'eb.panel.title': 'How to Apply',
            'eb.panel.materials.dt': 'Materials Required',
            'eb.panel.materials.dd': 'Curriculum Vitae (CV)',
            'eb.panel.email.dt': 'Send To',
            'eb.panel.subject.dt': 'Email Subject',
            'eb.panel.subject.dd': 'Editorial Board Application — [Journal Name]',
            'eb.panel.reply.dt': 'Response Time',
            'eb.panel.reply.dd': 'Within 4 weeks of receipt',
            'eb.s1.kicker': 'Application Requirements',
            'eb.s1.h2': 'Eligibility criteria and responsibilities.',
            'eb.s1.q1.h3': 'Eligibility',
            'eb.s1.q1.r1.label': 'Academic Background',
            'eb.s1.q1.r1.p': 'Applicants should hold a doctoral degree or equivalent academic qualification, with a track record of peer-reviewed publications in a relevant field.',
            'eb.s1.q1.r2.label': 'Research Experience',
            'eb.s1.q1.r2.p': 'Applicants should have independent research experience and be familiar with current developments in their discipline.',
            'eb.s1.q1.r3.label': 'Peer Review Experience',
            'eb.s1.q1.r3.p': 'Experience providing peer review for international academic journals is preferred.',
            'eb.s1.q2.h3': 'Responsibilities',
            'eb.s1.q2.r1.label': 'Manuscript Review',
            'eb.s1.q2.r1.p': 'Provide expert peer review for submitted manuscripts within the board member\'s area of expertise, offering fair and constructive evaluations.',
            'eb.s1.q2.r2.label': 'Academic Standards',
            'eb.s1.q2.r2.p': 'Assist the editor-in-chief in upholding the journal\'s academic quality standards and ensuring published content meets disciplinary norms.',
            'eb.s1.q2.r3.label': 'Journal Development',
            'eb.s1.q2.r3.p': 'Optionally participate in special issue planning, calls for papers, and promoting the journal within your institution and academic community.',
            'eb.s1.q3.h3': 'Application Materials',
            'eb.s1.q3.r1.label': 'CV Contents',
            'eb.s1.q3.r1.p': 'Please include: full name, institutional affiliation, title, research focus, representative publications (with DOI or link), and peer review history.',
            'eb.s1.q3.r2.label': 'Target Journal',
            'eb.s1.q3.r2.p': 'Please state in your email the journal(s) you wish to join. If unsure, browse the journal directory to find the best match for your research.',
            'eb.s1.q3.r3.label': 'File Format',
            'eb.s1.q3.r3.p': 'Submit your CV as a PDF or Word document (max 10 MB) as an email attachment.',
            'eb.s1.q4.h3': 'Contact the Editorial Office',
            'eb.s1.q4.r1.label': 'General Enquiries',
            'eb.s1.q4.r2.label': 'Subject Line Format',
            'eb.s1.q4.r2.p': 'Editorial Board Application — [Journal Name], e.g. Editorial Board Application — Journal of Engineering Systems & Applications',
            'eb.s1.q4.r3.label': 'Note',
            'eb.s1.q4.r3.p': 'All applications are treated in confidence. There is no application fee or membership charge for editorial board positions.',
            'eb.s2.kicker': 'Journal Directory',
            'eb.s2.h2': 'Contact each journal\'s editorial office directly.',
            'eb.s2.th.journal': 'Journal',
            'eb.s2.th.abbr': 'Abbr.',
            'eb.s2.th.cluster': 'Cluster',
            'eb.s2.th.email': 'Editorial Email',
            'eb.s3.kicker': 'Related Resources',
            'eb.s3.h2': 'Learn more about our journals.'
        },
        zh: {
            'lang.btn': 'English',
            'nav.home': '首頁',
            'nav.journals': '期刊目錄',
            'nav.for-authors': '投稿指南',
            'nav.ethics': '倫理規範',
            'nav.open-access': '開放取用',
            'nav.join-eb': '加入編委會',
            'nav.about': '關於我們',
            'footer.brand-intro': '出版結合清晰投稿流程與透明出版政策的國際學術期刊。',
            'footer.admin-contact': '行政聯絡',
            'footer.journals-policies': '期刊與政策',
            'footer.journal-directory': '期刊目錄',
            'footer.pub-ethics': '出版倫理',
            'footer.oa-policy': '開放取用政策',
            'footer.indexing': '索引與典藏',
            'footer.authors-info': '作者資訊',
            'footer.author-guide': '投稿指南',
            'footer.join-eb': '加入編委會',
            'footer.about': '關於我們',
            'footer.contact': '聯絡我們',
            'footer.editorial-dir': '編委目錄',
            'footer.copyright': '©2025~2026 Panorama Scholarly Group Ltd. 版權所有。',
            'index.kicker': '首頁',
            'index.h1': '尋找適合期刊，放心投稿。',
            'index.lead': 'Panorama Scholarly Group 支持國際學術期刊，提供結構化的編輯工作流程。作者可評估期刊適配度、審閱政策要求，並在同行評審開始前，按清晰的投稿路徑推進。',
            'index.badge.peer': '同行評審',
            'index.badge.oa': '開放取用',
            'index.badge.doi': 'Crossref DOI',
            'index.btn.journals': '瀏覽期刊',
            'index.btn.authors': '投稿指南',
            'index.stat.journals': '活躍期刊',
            'index.stat.clusters': '學科群組',
            'index.stat.articles': '已發表文章',
            'index.stat.doi': 'Crossref DOI 前綴',
            'about.kicker': '關於我們',
            'about.h1': '機構簡介與期刊運營框架',
            'about.lead': 'Panorama Scholarly Group 維護多學科期刊群組，採用期刊層級的編輯管理模式，並設有統一的倫理與開放取用政策基準。',
            'contact.kicker': '聯絡我們',
            'contact.h1': '平台行政與政策聯絡',
            'contact.lead': '本頁面適用於向 Panorama Scholarly Group 提出的一般行政或政策詢問。稿件相關事宜，請直接透過相關期刊的投稿入口聯繫。',
            'authors.kicker': '投稿指南',
            'authors.h1': '從準備到出版的完整投稿指引',
            'authors.lead': '本指南涵蓋期刊選擇、稿件準備、同行評審流程，以及出版後版權事宜。',
            'journals.kicker': '期刊目錄',
            'journals.h1': '依學科、領域或 ISSN 瀏覽與篩選期刊。',
            'journals.lead': '所有期刊均透過各自的編輯入口接受投稿。投稿前請確認期刊適配度並審閱相關要求。',
            'ethics.kicker': '出版倫理',
            'ethics.h1': '各期刊統一遵守的出版倫理基準',
            'ethics.lead': '所有期刊均遵循共同的出版倫理基準，涵蓋編輯行為規範、作者義務與學術誠信要求。',
            'oa.kicker': '開放取用',
            'oa.h1': '開放取用條款、授權與版權指引',
            'oa.lead': '所有期刊均以開放取用形式出版。作者版權、授權條款及存儲庫許可依各期刊規定執行。',
            'indexing.kicker': '索引與典藏',
            'indexing.h1': '索引資料庫、典藏與 DOI 登記',
            'indexing.lead': '本集團期刊已向 Crossref 登記 DOI，並參與數位典藏計畫，確保文章長期可取用。',
            'eb.kicker': '加入編委會',
            'eb.h1': '誠邀專家學者加入編委會',
            'eb.lead': 'Panorama Scholarly Group 旗下各期刊誠邀全球各學科學者加入編委會，歡迎具備深厚學術背景與同行評審經驗的研究人員申請，共同維護國際學術出版的高水準。',
            'eb.panel.title': '申請方式',
            'eb.panel.materials.dt': '提交材料',
            'eb.panel.materials.dd': '個人簡歷（CV）',
            'eb.panel.email.dt': '發送至',
            'eb.panel.subject.dt': '郵件主題',
            'eb.panel.subject.dd': 'Editorial Board Application — [期刊名稱]',
            'eb.panel.reply.dt': '回覆周期',
            'eb.panel.reply.dd': '收到申請後 4 週內回覆',
            'eb.s1.kicker': '申請須知',
            'eb.s1.h2': '編委資格條件與職責說明',
            'eb.s1.q1.h3': '申請資格',
            'eb.s1.q1.r1.label': '學術背景',
            'eb.s1.q1.r1.p': '申請人應具備博士學位或同等學術資歷，並在相關領域擁有一定數量的同行評審出版物。',
            'eb.s1.q1.r2.label': '研究經驗',
            'eb.s1.q1.r2.p': '具有獨立開展科學研究的經驗，熟悉本學科前沿動態。',
            'eb.s1.q1.r3.label': '評審經驗',
            'eb.s1.q1.r3.p': '有為國際學術期刊提供同行評審服務的經歷者優先。',
            'eb.s1.q2.h3': '編委職責',
            'eb.s1.q2.r1.label': '稿件評審',
            'eb.s1.q2.r1.p': '在所在研究領域內對投稿進行專業審稿，提供公正、建設性的評審意見。',
            'eb.s1.q2.r2.label': '學術把關',
            'eb.s1.q2.r2.p': '協助主編維護期刊學術品質標準，確保刊發內容符合本領域學術規範。',
            'eb.s1.q2.r3.label': '期刊發展',
            'eb.s1.q2.r3.p': '可參與期刊專題策劃、徵稿活動，並推動期刊在所在機構及學術社群中的傳播。',
            'eb.s1.q3.h3': '申請材料要求',
            'eb.s1.q3.r1.label': 'CV 內容',
            'eb.s1.q3.r1.p': '請在簡歷中注明：姓名、所在機構、職稱、研究方向、代表性發表物（含 DOI 或連結）及同行評審經歷。',
            'eb.s1.q3.r2.label': '意向期刊',
            'eb.s1.q3.r2.p': '請在郵件正文中注明希望加入的期刊名稱。如不確定，可瀏覽期刊目錄後選擇最符合研究方向的期刊。',
            'eb.s1.q3.r3.label': '文件格式',
            'eb.s1.q3.r3.p': '簡歷請以 PDF 或 Word 格式附件發送，文件大小不超過 10 MB。',
            'eb.s1.q4.h3': '聯絡編輯部',
            'eb.s1.q4.r1.label': '通用詢問',
            'eb.s1.q4.r2.label': '郵件主題格式',
            'eb.s1.q4.r2.p': 'Editorial Board Application — [期刊名稱]，例如：Editorial Board Application — Journal of Engineering Systems & Applications',
            'eb.s1.q4.r3.label': '注意事項',
            'eb.s1.q4.r3.p': '編輯部將對所有申請進行保密處理。編委職位不收取任何申請費或會員費。',
            'eb.s2.kicker': '期刊目錄',
            'eb.s2.h2': '直接聯絡各期刊編輯部。',
            'eb.s2.th.journal': '期刊名稱',
            'eb.s2.th.abbr': '縮寫',
            'eb.s2.th.cluster': '學科群組',
            'eb.s2.th.email': '編輯部郵箱',
            'eb.s3.kicker': '相關資源',
            'eb.s3.h2': '瞭解更多期刊資訊'
        }
    };

    var autoText = {
        zh: {
            'Panorama Scholarly Group': 'Panorama Scholarly Group',
            'International Scholarly Journals': '國際學術期刊',
            'Indexed, archived, and registered with': '已被索引、典藏與註冊於',
            'View full indexing details': '查看完整索引資訊',
            'Journal Discovery': '期刊探索',
            'Search by title, discipline, or ISSN before you submit.': '投稿前可依標題、學科或 ISSN 搜尋。',
            'Open Journal Directory': '開啟期刊目錄',
            'Search by title, abbreviation, field, or ISSN': '依標題、縮寫、領域或 ISSN 搜尋',
            'Search': '搜尋',
            'Browse All Journals': '瀏覽全部期刊',
            'Explore the full directory by subject cluster.': '依學科群組瀏覽完整目錄。',
            'AI & Engineering': 'AI 與工程',
            'Technology-focused titles.': '聚焦科技領域的期刊。',
            'Policy & Society': '政策與社會',
            'Governance and social science journals.': '治理與社會科學期刊。',
            'Humanities & Arts': '人文與藝術',
            'Philosophy, religion, and arts journals.': '哲學、宗教與藝術期刊。',
            'Confirm Journal Fit': '確認期刊適配度',
            'Review aims, scope, article types, and disciplinary alignment in the journal directory.': '在期刊目錄中查看宗旨、範圍、文章類型與學科匹配度。',
            'Review Requirements': '審閱投稿要求',
            'Check ethics declarations, open-access terms, and manuscript formatting requirements.': '確認倫理聲明、開放取用條款與稿件格式要求。',
            'Submit Manuscript': '提交稿件',
            'Upload your manuscript, metadata, and required declarations through the journal submission page.': '透過期刊投稿頁面上傳稿件、元資料與必要聲明。',
            'Complete Peer Review': '完成同行評審',
            'Address reviewer comments, submit revisions, and proceed through final editorial decisions.': '回應審稿意見、提交修訂稿，並完成最終編輯決定流程。',
            'Ready to submit? Review the complete author guide first.': '準備投稿？請先查看完整作者指南。',
            'Covers formatting, declarations, peer review, and post-publication rights.': '涵蓋格式、聲明、同行評審與出版後權利。',
            'Full Author Guide': '完整作者指南',
            'Recent Research': '最新研究',
            'Recent publications from across the journal portfolio.': '期刊組合中的最新出版文章。',
            'Browse all journals': '瀏覽全部期刊',
            'Governance': '治理',
            'Editorial workflows supported by a consistent policy framework.': '以一致政策框架支撐的編輯工作流程。',
            'All journals operate under shared baseline requirements for authorship integrity, peer-review confidentiality, conflict disclosure, and post-publication correction practices.': '所有期刊均遵循共同基準要求，涵蓋作者署名誠信、同行評審保密、利益衝突披露與出版後更正實務。',
            'Editorial responsibilities, peer review conduct, originality standards, and correction procedures.': '編輯職責、同行評審行為、原創性標準與更正程序。',
            'Licensing terms, author rights language, and repository guidance.': '授權條款、作者權利表述與存儲庫指引。',
            'Discovery databases, preservation archives, and DOI registration details.': '探索資料庫、保存典藏與 DOI 註冊詳情。',
            'Institutional Profile': '機構簡介',
            'Operating model, portfolio structure, and policy framework.': '運營模式、期刊組合結構與政策框架。',

            'Core Information': '核心資訊',
            'Operating Focus': '運營重點',
            'International scholarly journals': '國際學術期刊',
            'Workflow Structure': '工作流程結構',
            'Journal-level editorial processing': '期刊層級編輯處理',
            'Policy Layer': '政策層面',
            'Publication ethics and open-access policy framework': '出版倫理與開放取用政策框架',
            'DOI Registration': 'DOI 註冊',
            'Crossref member — prefix 10.63802': 'Crossref 會員 — 前綴 10.63802',
            'Active Journals': '活躍期刊',
            'Subject Clusters': '學科群組',
            'Published Articles': '已發表文章',
            'Crossref DOI Prefix': 'Crossref DOI 前綴',
            'Operating Framework': '運營框架',
            'How the journal platform is structured.': '期刊平台的結構方式。',
            'Portfolio Architecture': '期刊組合架構',
            'Titles are grouped into four subject clusters for discovery and editorial routing: Technology & Engineering, Health & Sustainability, Policy, Education & Society, and Humanities & Arts.': '期刊按四個學科群組組織，以便探索與編輯分流：科技與工程、健康與永續、政策、教育與社會，以及人文與藝術。',
            'Editorial Handling': '編輯處理',
            'Each journal manages submissions and peer review within its defined scope and standards, with editorial oversight at journal level.': '各期刊在其界定範圍與標準內管理投稿與同行評審，並由期刊層級進行編輯監督。',
            'Policy Consistency': '政策一致性',
            'Shared policy pages establish baseline requirements across the portfolio for publication ethics, open access, and conflict disclosure.': '共享政策頁面為整個期刊組合建立出版倫理、開放取用與利益衝突披露的基準要求。',
            'Public Access Layer': '公開取用層',
            'Journal pages, policy pages, and published articles are publicly available. DOIs are registered with Crossref for persistent citation and discovery.': '期刊頁面、政策頁面與已出版文章均公開可用。DOI 透過 Crossref 註冊，以支援持久引用與探索。',
            'Discover journals and access submission routes.': '探索期刊並進入投稿路徑。',
            'View the baseline conduct standards across journals.': '查看各期刊共同遵循的基準行為標準。',
            'Review access models, licensing, and rights terms.': '審閱取用模式、授權與權利條款。',
            'Check discovery databases and archiving commitments.': '查看探索資料庫與典藏承諾。',
            'Journals are indexed and archived for long-term discovery and preservation.': '期刊已被索引與典藏，以支援長期探索與保存。',
            'Full indexing details': '完整索引資訊',
            'Journal content is archived in CLOCKSS, LOCKSS, and the PKP Preservation Network to ensure continued access in the event of publisher discontinuation. DOIs are registered through Crossref (prefix 10.63802) for persistent citation and resolution.': '期刊內容典藏於 CLOCKSS、LOCKSS 與 PKP Preservation Network，以確保出版方停止服務時仍可持續取用。DOI 透過 Crossref（前綴 10.63802）註冊，以支援持久引用與解析。',
            'Editorial Transparency': '編輯透明度',
            'Policy framework and editorial accountability.': '政策框架與編輯問責。',
            'The platform operates under shared policy requirements that apply across all journals. Editorial boards and reviewer conduct are governed by published standards. External references for editorial profiles are maintained at the editorial directory.': '平台依據適用於全部期刊的共同政策要求運作。編委會與審稿人行為受已發布標準規範。編輯個人資料的外部參考由編委目錄維護。',
            'External references for editorial profile transparency.': '用於提升編輯資料透明度的外部參考。',
            'Reach the platform for administrative or policy enquiries.': '就行政或政策問題聯絡平台。',

            'Contact Summary': '聯絡摘要',
            'Registered Address': '註冊地址',
            'Room 1508, 15/F., Grand Plaza, Kowloon, Hong Kong': '香港九龍 Grand Plaza 15 樓 1508 室',
            'Submission Matters': '投稿事宜',
            'Contact the relevant journal directly via its editorial portal': '請透過相關期刊的編輯入口直接聯絡',
            'Contact Information': '聯絡資訊',
            'How to reach the platform.': '如何聯絡平台。',
            'Email': '電子郵件',
            'Use this address for': '此地址適用於',
            'Administrative questions, policy questions, indexing and archiving enquiries, partnership or institutional enquiries, and any matters addressed to Panorama Scholarly Group as publisher.': '行政問題、政策問題、索引與典藏查詢、合作或機構查詢，以及任何致 Panorama Scholarly Group 作為出版方的事項。',
            'Response expectation': '回覆預期',
            'Enquiries are reviewed by administrative staff. Response times vary; complex or policy-related enquiries may require additional time.': '查詢由行政人員審閱。回覆時間不一；複雜或政策相關查詢可能需要較長時間。',
            'Office Address': '辦公地址',
            'Legal Name': '法定名稱',
            'Jurisdiction': '司法管轄區',
            'Hong Kong Special Administrative Region, China': '中國香港特別行政區',
            'Submission & Editorial Matters': '投稿與編輯事宜',
            'Manuscript Submissions': '稿件投稿',
            'Submissions are handled at journal level. Access the relevant journal\'s submission portal via the journal directory.': '投稿由期刊層級處理。請透過期刊目錄進入相關期刊的投稿入口。',
            'Review Status Enquiries': '審稿狀態查詢',
            'Log in to the relevant journal\'s editorial portal at journals.panorama-sg.com to check submission and review status.': '請登入 journals.panorama-sg.com 上相關期刊的編輯入口，查看投稿與審稿狀態。',
            'The author guide covers journal selection, submission, peer review, and post-publication rights.': '作者指南涵蓋期刊選擇、投稿、同行評審與出版後權利。',
            'Policy & Ethics Enquiries': '政策與倫理查詢',
            'Ethics and Conduct': '倫理與行為',
            'Enquiries regarding publication ethics policy, editorial conduct, or appeals processes should be directed to contact@panorama-sg.com with a clear description of the matter.': '有關出版倫理政策、編輯行為或申訴流程的查詢，請發送至 contact@panorama-sg.com，並清楚描述相關事項。',
            'Open Access and Rights': '開放取用與權利',
            'Questions about licensing, author rights, or repository terms should reference the Open Access Policy and include the relevant journal name and DOI where applicable.': '有關授權、作者權利或存儲庫條款的問題，請參考開放取用政策，並在適用時包含相關期刊名稱與 DOI。',
            'Indexing and Archiving': '索引與典藏',
            'Institutional or librarian enquiries about ISSN registration, DOI, CLOCKSS, or LOCKSS participation can be directed to the platform email.': '機構或圖書館員關於 ISSN 註冊、DOI、CLOCKSS 或 LOCKSS 參與的查詢，可寄送至平台郵箱。',
            'Related Resources': '相關資源',
            'Policies and platform information.': '政策與平台資訊。',
            'Browse all 22 journals with submission routes.': '瀏覽全部 22 種期刊及其投稿路徑。',
            'Full submission guidance from preparation to publication.': '從準備到出版的完整投稿指引。',
            'Editorial conduct and integrity requirements.': '編輯行為與誠信要求。',
            'DOI, archiving, and discovery database information.': 'DOI、典藏與探索資料庫資訊。',

            'Quick Reference': '快速參考',
            'Step 1': '步驟 1',
            'Step 2': '步驟 2',
            'Step 3': '步驟 3',
            'Step 4': '步驟 4',
            'After Publication': '出版後',
            'Identify journal fit and scope': '確認期刊適配度與範圍',
            'Review ethics and OA requirements': '審閱倫理與 OA 要求',
            'Submit via journal editorial portal': '透過期刊編輯入口投稿',
            'Respond to peer review': '回應同行評審',
            'DOI assigned; author rights apply': '分配 DOI；適用作者權利',
            'Find a Journal': '尋找期刊',
            'Ethics Policy': '倫理政策',
            'Guide Sections': '指南章節',
            '1. Journal Selection': '1. 期刊選擇',
            '2. Before You Submit': '2. 投稿前',
            '3. Manuscript Preparation': '3. 稿件準備',
            '4. Submission Process': '4. 投稿流程',
            '5. Peer Review': '5. 同行評審',
            '6. After Publication': '6. 出版後',
            'Selecting the right journal before submission is the first and most important step. A submission to a journal outside its defined scope will typically be desk-rejected without review, delaying your work unnecessarily.': '投稿前選擇合適期刊是第一步，也是最重要的一步。若稿件不符合期刊範圍，通常會在未送審前被退稿，造成不必要延誤。',
            'How to assess journal fit': '如何評估期刊適配度',
            'Review the journal aims and scope statement on the journal home page.': '查看期刊首頁的宗旨與範圍說明。',
            'Check published issues to confirm the journal regularly publishes work comparable to yours in discipline, methodology, and scope.': '查看已出版期次，確認該期刊是否定期發表與你研究在學科、方法與範圍上相近的作品。',
            'Confirm the subject cluster: Technology & Engineering, Health & Sustainability, Policy, Education & Society, or Humanities & Arts.': '確認學科群組：科技與工程、健康與永續、政策、教育與社會，或人文與藝術。',
            'Note article types accepted: original research, review articles, theoretical contributions, creative or reflective work (where applicable).': '注意可接受的文章類型：原創研究、綜述文章、理論貢獻、創作或反思性作品（如適用）。',
            'Using the journal directory': '使用期刊目錄',
            'The journal directory allows you to filter by subject cluster and keyword. Each journal entry links directly to the journal home page and submission portal. ISSN status is indicated for journals where registration is complete.': '期刊目錄可依學科群組和關鍵字篩選。每個期刊條目均直接連結至期刊首頁與投稿入口。已完成註冊的期刊會標示 ISSN 狀態。',
            'Before uploading your manuscript, confirm that you have reviewed and can comply with the platform\'s shared policy requirements. Individual journals may apply additional requirements — these are detailed on each journal\'s home page.': '上傳稿件前，請確認你已審閱並能遵守平台共同政策要求。各期刊可能有額外要求，詳情列於各期刊首頁。',
            'Publication ethics requirements': '出版倫理要求',
            'The submission must be original and not under review at another journal simultaneously.': '投稿必須為原創，且不得同時在其他期刊審稿中。',
            'All authors must be listed and must have contributed substantively to the work.': '所有作者均須列名，並對作品有實質貢獻。',
            'Conflicts of interest, funding sources, or relationships that could be seen as influencing the work must be disclosed.': '必須披露可能被視為影響作品的利益衝突、資助來源或相關關係。',
            'Any overlap with previously published work must be disclosed and appropriately cited.': '與既有出版作品的任何重疊均須披露並適當引用。',
            'All required ethical approvals must be confirmed.': '所有必要倫理批准均須確認。',
            'The full ethics policy is available at': '完整倫理政策見',
            'Open access and licensing': '開放取用與授權',
            'Panorama Scholarly Group journals publish on an open access basis. Authors should confirm the applicable licensing terms, APC status, and rights framework before final submission. This information is available on each journal\'s home page and in the Open Access Policy.': 'Panorama Scholarly Group 期刊以開放取用形式出版。作者在最終投稿前應確認適用授權條款、APC 狀態與權利框架。相關資訊可於各期刊首頁與開放取用政策中查看。',
            'Formatting requirements vary by journal. Authors should follow the instructions for authors published on the relevant journal home page. The following general principles apply across the portfolio.': '格式要求因期刊而異。作者應遵循相關期刊首頁發布的作者須知。以下一般原則適用於整個期刊組合。',
            'General formatting guidance': '一般格式指引',
            'Manuscripts should be submitted in a standard word-processing format (e.g., .docx or .pdf, as specified by the journal).': '稿件應以標準文字處理格式提交（例如 .docx 或 .pdf，依期刊規定）。',
            'Include a structured abstract where the journal requires one.': '若期刊要求，請包含結構式摘要。',
            'Keywords should be included as specified in the journal instructions.': '請依期刊說明提供關鍵字。',
            'References should follow the citation style specified by the journal. Include DOIs for all cited works where available.': '參考文獻應遵循期刊指定引用格式。若可取得，請為所有引用作品提供 DOI。',
            'Tables, figures, and images should be submitted at the resolution and in the format specified by the journal.': '表格、圖表與圖片應依期刊指定解析度與格式提交。',
            'Required declarations': '必要聲明',
            'Author contributions:': '作者貢獻：',
            'Conflict of interest:': '利益衝突：',
            'Ethics approval:': '倫理批准：',
            'Data availability:': '資料可得性：',
            'Funding:': '資助：',
            'Submissions are handled at journal level through the journal\'s editorial submission portal, hosted at journals.panorama-sg.com. There is no centralised submission system for the entire portfolio.': '投稿透過各期刊在 journals.panorama-sg.com 上的編輯投稿入口於期刊層級處理。整個期刊組合沒有集中式投稿系統。',
            'Submitting your manuscript': '提交稿件',
            'Go to the journal\'s home page via the journal directory or directly at journals.panorama-sg.com/index.php/[journal-id].': '透過期刊目錄進入期刊首頁，或直接訪問 journals.panorama-sg.com/index.php/[journal-id]。',
            'Click the Submission link and create or log in to an account in the journal\'s editorial submission portal.': '點擊投稿連結，並在期刊編輯投稿入口建立帳號或登入。',
            'Follow the submission steps to upload your manuscript, metadata, and required declarations.': '依照投稿步驟上傳稿件、元資料與必要聲明。',
            'Submit for editorial review. You will receive a confirmation email from the journal\'s submission system.': '提交進入編輯審查。你將收到期刊投稿系統發出的確認郵件。',
            'Initial editorial review': '初步編輯審查',
            'After submission, an editor will assess whether the manuscript is within scope and meets minimum policy requirements. Manuscripts that do not meet these requirements may be desk-rejected at this stage.': '投稿後，編輯會評估稿件是否符合範圍並達到最低政策要求。不符合要求的稿件可能在此階段被初審退稿。',
            'All journals in the portfolio use peer review. The specific review model (single-blind, double-blind, or open review) is determined at journal level and described on each journal\'s home page.': '期刊組合中的所有期刊均採用同行評審。具體評審模式（單盲、雙盲或開放評審）由期刊層級決定，並於各期刊首頁說明。',
            'What to expect during review': '評審期間可預期事項',
            'After editorial acceptance for review, your manuscript will be sent to independent reviewers with relevant expertise.': '經編輯接受進入評審後，稿件將送交具相關專長的獨立審稿人。',
            'Reviewers are expected to provide objective, evidence-based assessments in accordance with the publication ethics policy.': '審稿人應依據出版倫理政策提供客觀、基於證據的評估。',
            'Review timelines vary by journal and by the availability of reviewers in the relevant field.': '評審時間因期刊及相關領域審稿人可用性而異。',
            'The editorial decision will be communicated to the corresponding author.': '編輯決定將通知通訊作者。',
            'Responding to reviewer comments': '回應審稿意見',
            'Where revision is requested, submit a detailed response letter addressing each reviewer comment individually.': '若要求修訂，請提交詳細回覆信，逐條回應每位審稿人的意見。',
            'Revised manuscripts should clearly indicate all changes made.': '修訂稿應清楚標示所有修改內容。',
            'Authors who disagree with a reviewer comment should provide a substantive, evidence-based explanation in the response letter.': '若作者不同意審稿意見，應在回覆信中提供實質且基於證據的說明。',
            'Appeals': '申訴',
            'Authors who consider that a rejection decision was based on a procedural or evaluative error may submit a reasoned appeal through the journal\'s editorial contact. Appeals should identify the specific basis for the appeal.': '若作者認為退稿決定基於程序或評估錯誤，可透過期刊編輯聯絡方式提交有理由的申訴。申訴應指出具體依據。',
            'Upon acceptance and publication, the article will receive a Crossref DOI and will be listed on the journal\'s published content page at journals.panorama-sg.com.': '文章接收並出版後，將取得 Crossref DOI，並列於 journals.panorama-sg.com 的期刊已出版內容頁。',
            'DOI and citation': 'DOI 與引用',
            'Each published article is assigned a DOI with the prefix 10.63802, registered with Crossref. Authors should use this DOI when citing their own work and when providing citation information to institutions or funding bodies. DOIs resolve via doi.org.': '每篇已出版文章均分配前綴為 10.63802 的 DOI，並在 Crossref 註冊。作者引用自身作品或向機構、資助單位提供引用資訊時，應使用該 DOI。DOI 透過 doi.org 解析。',
            'Author rights': '作者權利',
            'Authors retain rights as specified in the publication agreement for their journal. Authors may share and post their work consistent with the applicable Creative Commons license. Confirm the specific rights applicable to your article in your publication agreement and on the journal\'s home page.': '作者依其期刊出版協議保留相應權利。作者可依適用的 Creative Commons 授權分享與發布作品。請在出版協議及期刊首頁確認文章適用的具體權利。',
            'Repository deposit': '存儲庫存放',
            'Repository deposit of accepted manuscripts or published versions is governed by the Open Access Policy. Authors depositing work should cite the version of record accurately and include the published DOI.': '接收稿或出版版本的存儲庫存放受開放取用政策規範。作者存放作品時應準確引用記錄版本，並包含已出版 DOI。',
            'Corrections': '更正',
            'If a significant error is identified in a published article, contact the journal editor promptly. The journal will determine whether a correction notice, erratum, or other action is appropriate.': '若已出版文章發現重大錯誤，請及時聯絡期刊編輯。期刊將判斷是否需要發布更正通知、勘誤或採取其他行動。',
            'Policies, directory, and contact.': '政策、目錄與聯絡資訊。',
            'Find and filter journals by subject and ISSN status.': '依學科與 ISSN 狀態尋找及篩選期刊。',
            'Ethics requirements for all submissions and reviews.': '適用於所有投稿與評審的倫理要求。',
            'Licensing, rights, and repository deposit guidance.': '授權、權利與存儲庫存放指引。',
            'Reach the platform for submission or policy questions.': '就投稿或政策問題聯絡平台。',

            'Directory Scope': '目錄範圍',
            'Total Titles': '期刊總數',
            '4 disciplinary groups': '4 個學科群組',
            'Submission Routing': '投稿分流',
            'Direct links to journal home and submission pages': '直接連結至期刊首頁與投稿頁',
            'Search Tools': '搜尋工具',
            'Portfolio-level journal discovery and routing.': '期刊組合層級的探索與分流。',
            'Loading journals...': '正在載入期刊...',
            'Keyword': '關鍵字',
            'Title, abbreviation, field, or ISSN': '標題、縮寫、領域或 ISSN',
            'Cluster': '群組',
            'All clusters': '全部群組',
            'Technology & Engineering': '科技與工程',
            'Health & Sustainability': '健康與永續',
            'Policy, Education & Society': '政策、教育與社會',
            'ISSN': 'ISSN',
            'All status': '全部狀態',
            'Registered': '已註冊',
            'Pending': '待註冊',
            'Sort': '排序',
            'Title A–Z': '標題 A–Z',
            'ISSN status': 'ISSN 狀態',
            'Before Submission: Ethics': '投稿前：倫理',
            'Review authorship, originality, and disclosure requirements.': '審閱作者署名、原創性與披露要求。',
            'Before Submission: Open Access': '投稿前：開放取用',
            'Check licensing and rights conditions.': '確認授權與權利條件。',
            'Full submission workflow from preparation to decision.': '從準備到決定的完整投稿流程。',
            'View discovery databases and preservation archives.': '查看探索資料庫與保存典藏。',
            'Journal Home': '期刊首頁',
            'Submit': '投稿',
            'No journals match the current filters.': '沒有期刊符合目前篩選條件。',
            'A peer-reviewed international journal within the Panorama Scholarly Group portfolio.': 'Panorama Scholarly Group 期刊組合中的同行評審國際期刊。',
            'journal found': '種期刊符合條件',
            'journals found': '種期刊符合條件',

            'Policy Scope': '政策範圍',
            'Applies To': '適用對象',
            'Authors, reviewers, editors, and editorial boards': '作者、審稿人、編輯與編委會',
            'Core Areas': '核心領域',
            'Originality, review conduct, disclosures, and corrections': '原創性、評審行為、披露與更正',
            'Outcome': '目標',
            'Integrity of the scholarly record': '維護學術記錄完整性',
            'Core Rules': '核心規則',
            'Ethics requirements used in editorial handling.': '編輯處理中使用的倫理要求。',
            'Editorial decisions': '編輯決定',
            'Editorial decisions are based on journal scope, scholarly merit, and policy compliance, independent of personal or institutional bias.': '編輯決定基於期刊範圍、學術價值與政策合規性，不受個人或機構偏見影響。',
            'Peer review conduct': '同行評審行為',
            'Reviewers are expected to provide objective, evidence-based assessments and maintain manuscript confidentiality throughout review.': '審稿人應提供客觀、基於證據的評估，並在整個評審期間維護稿件保密性。',
            'Originality and citation': '原創性與引用',
            'Submissions must be original, properly cited, and free from undisclosed duplicate or redundant publication.': '投稿必須為原創、引用適當，且不得存在未披露的一稿多投或重複出版。',
            'Conflict disclosure': '利益衝突披露',
            'Authors, reviewers, and editors should disclose relationships that could reasonably be seen as influencing editorial judgment.': '作者、審稿人與編輯應披露可能被合理視為影響編輯判斷的關係。',
            'Corrections and retractions': '更正與撤稿',
            'When significant issues are confirmed after publication, journals may issue corrections, expressions of concern, or retractions as appropriate.': '出版後若確認存在重大問題，期刊可視情況發布更正、關切聲明或撤稿。',
            'Confidentiality and data use': '保密與資料使用',
            'Unpublished manuscript content should not be used for personal research, teaching, or distribution without explicit permission from the rights holder.': '未出版稿件內容不得在未獲權利持有人明確許可下用於個人研究、教學或分發。',
            'Appeals and concerns': '申訴與關切',
            'Authors may submit a reasoned appeal where they identify a substantive procedural or evaluative issue in editorial handling.': '若作者認為編輯處理存在實質程序或評估問題，可提交有理由的申訴。',
            'Select a journal and review submission pages.': '選擇期刊並查看投稿頁面。',
            'Check license and rights conditions before submission.': '投稿前確認授權與權利條件。',
            'Contact the platform for ethics-policy questions.': '就倫理政策問題聯絡平台。',

            'Access Models': '取用模式',
            'Journal-specific (Diamond OA or Gold OA)': '依期刊而定（鑽石 OA 或金色 OA）',
            'Licensing': '授權',
            'Creative Commons terms specified at journal level': '由期刊層級指定的 Creative Commons 條款',
            'Rights Language': '權利表述',
            'Author rights and publication permissions': '作者權利與出版許可',
            'Open-access requirements used across the portfolio.': '整個期刊組合使用的開放取用要求。',
            'Public access principle': '公開取用原則',
            'Published research is made available online under each journal\'s open-access policy and publication agreement.': '已出版研究依各期刊開放取用政策與出版協議在線提供。',
            'Journal-level OA model': '期刊層級 OA 模式',
            'Journals may apply different operating models. Authors should confirm APC, waiver, or no-APC conditions before final submission.': '不同期刊可採用不同運營模式。作者應在最終投稿前確認 APC、豁免或無 APC 條件。',
            'License disclosure': '授權披露',
            'Applicable licenses are communicated at journal level. Authors should verify permitted reuse before publication.': '適用授權由期刊層級說明。作者應在出版前確認允許的再使用範圍。',
            'Author rights and permissions': '作者權利與許可',
            'Unless agreements specify otherwise, authors retain key rights while granting non-exclusive publication and distribution permissions.': '除非協議另有規定，作者保留主要權利，同時授予非排他性出版與分發許可。',
            'Repository and archiving': '存儲庫與典藏',
            'Repository deposit should follow journal terms and preserve accurate citation of the version of record.': '存儲庫存放應遵循期刊條款，並保留對記錄版本的準確引用。',
            'Third-party content': '第三方內容',
            'Authors are responsible for securing permissions for third-party figures, tables, or images where required by license or copyright law.': '若授權或著作權法要求，作者負責取得第三方圖、表或圖片的使用許可。',
            'Version clarity': '版本清晰性',
            'Where multiple versions are posted, records should clearly identify accepted manuscript versus final published version.': '若發布多個版本，記錄應清楚區分接收稿與最終出版版本。',
            'Confirm OA terms on each journal page.': '在各期刊頁面確認 OA 條款。',
            'Review complementary conduct and integrity requirements.': '審閱補充性的行為與誠信要求。',
            'View archiving and preservation commitments.': '查看典藏與保存承諾。',
            'Contact the platform for rights and OA questions.': '就權利與 OA 問題聯絡平台。',

            'At a Glance': '概覽',
            'DOI Registrar': 'DOI 註冊機構',
            'Preservation': '保存',
            'CLOCKSS, LOCKSS, PKP Preservation Network': 'CLOCKSS、LOCKSS、PKP Preservation Network',
            'Discovery': '探索',
            'Google Scholar, BASE, Dimensions, OpenAlex, Semantic Scholar': 'Google Scholar、BASE、Dimensions、OpenAlex、Semantic Scholar',
            'ISSN Registration': 'ISSN 註冊',
            'ISSN International Centre': 'ISSN 國際中心',
            'Digital Object Identifiers': '數位物件識別碼',
            'Persistent identifiers registered through Crossref.': '透過 Crossref 註冊的持久識別碼。',
            'Crossref Membership': 'Crossref 會員資格',
            'Panorama Scholarly Group is a Crossref member publisher. All accepted articles receive a DOI registered in the Crossref metadata database.': 'Panorama Scholarly Group 是 Crossref 會員出版方。所有接收文章均取得註冊於 Crossref 元資料庫的 DOI。',
            'DOI Prefix': 'DOI 前綴',
            'The platform DOI prefix is': '平台 DOI 前綴為',
            'Individual journal DOIs follow the format 10.63802/[journal-id].[volume].[issue].[article-id].': '各期刊 DOI 遵循格式 10.63802/[journal-id].[volume].[issue].[article-id]。',
            'Persistent Resolution': '持久解析',
            'All DOIs resolve to the article landing page at journals.panorama-sg.com via the DOI Foundation resolver at doi.org.': '所有 DOI 均透過 doi.org 的 DOI Foundation 解析器解析至 journals.panorama-sg.com 上的文章落地頁。',
            'Metadata Standards': '元資料標準',
            'Article metadata including title, authors, abstract, and references is deposited with Crossref at the time of publication for downstream discovery and citation.': '文章標題、作者、摘要與參考文獻等元資料會在出版時提交至 Crossref，以支援後續探索與引用。',
            'DOIs enable persistent citation of the published version of record. Authors and institutions citing Panorama Scholarly Group articles should use the assigned DOI rather than the direct URL to ensure long-term link integrity.': 'DOI 可支援對已出版記錄版本的持久引用。作者與機構引用 Panorama Scholarly Group 文章時，應使用分配的 DOI，而非直接 URL，以確保長期連結完整性。',
            'Discovery Databases': '探索資料庫',
            'Journals are indexed in major scholarly search and discovery platforms.': '期刊已被主要學術搜尋與探索平台索引。',
            'Article-level indexing via Google\'s scholarly search engine.': '透過 Google 學術搜尋引擎進行文章層級索引。',
            'Bielefeld Academic Search Engine — one of the largest academic search engines worldwide.': 'Bielefeld Academic Search Engine，全球最大的學術搜尋引擎之一。',
            'Research intelligence platform for scholarly discovery and analytics.': '用於學術探索與分析的研究情報平台。',
            'Open catalog of global scholarly metadata and citation networks.': '全球學術元資料與引用網路的開放目錄。',
            'AI-powered academic search engine from the Allen Institute for AI.': 'Allen Institute for AI 提供的 AI 驅動學術搜尋引擎。',
            'Official DOI registration and metadata for all published articles.': '所有已出版文章的官方 DOI 註冊與元資料。',
            'Preservation & Archiving': '保存與典藏',
            'Long-term preservation through distributed archiving networks.': '透過分散式典藏網路進行長期保存。',
            'Controlled LOCKSS network providing dark archive preservation for journals in the event of publisher discontinuation.': '受控 LOCKSS 網路，為期刊在出版方停止服務時提供暗典藏保存。',
            'Distributed digital preservation network enabling participating libraries to preserve their own copies of content.': '分散式數位保存網路，使參與圖書館能保存其自身內容副本。',
            'A LOCKSS-based preservation network operated by the Public Knowledge Project, designed specifically for journals on the editorial platform.': '由 Public Knowledge Project 運營、基於 LOCKSS 的保存網路，專為編輯平台上的期刊設計。',
            'Open research repository operated by CERN, enabling open deposit and citation of research outputs.': '由 CERN 運營的開放研究存儲庫，支援研究成果的開放存放與引用。',
            'Panorama Scholarly Group journals participate in the CLOCKSS, LOCKSS, and PKP Preservation Network archiving programs. In the event of publisher discontinuation or content unavailability, archived content will be released by the CLOCKSS network to ensure continued access.': 'Panorama Scholarly Group 期刊參與 CLOCKSS、LOCKSS 與 PKP Preservation Network 典藏計畫。若出版方停止服務或內容不可用，典藏內容將由 CLOCKSS 網路釋出，以確保持續取用。',
            'Authors depositing preprints or accepted manuscripts in Zenodo or institutional repositories should follow the version and citation guidance in the Open Access Policy to preserve the integrity of the version of record.': '作者將預印本或接收稿存放於 Zenodo 或機構存儲庫時，應遵循開放取用政策中的版本與引用指引，以維護記錄版本的完整性。',
            'Registration & Identifiers': '註冊與識別碼',
            'International registration bodies and identifier systems.': '國際註冊機構與識別碼系統。',
            'International Standard Serial Number registered with the ISSN International Centre for each qualifying journal title.': '符合條件的期刊標題向 ISSN 國際中心註冊國際標準連續出版物號。',
            'International Standard Name Identifier for publisher and contributor identity management.': '用於出版方與貢獻者身份管理的國際標準名稱識別碼。',
            'German national bibliography providing metadata registration for open access publications.': '德國國家書目，為開放取用出版物提供元資料註冊。',
            'The international body governing the Digital Object Identifier system used for article persistent identifiers.': '管理數位物件識別碼系統的國際機構，該系統用於文章持久識別碼。',
            'Journals with registered ISSNs have been verified by the ISSN International Centre. Journals with pending ISSN status are in the registration process. Authors requiring ISSN confirmation should check the individual journal page or contact the platform directly.': '已註冊 ISSN 的期刊已由 ISSN 國際中心核驗。ISSN 待註冊期刊仍在註冊流程中。需要 ISSN 確認的作者應查看單一期刊頁面或直接聯絡平台。',
            'Policy and submission information.': '政策與投稿資訊。',
            'Browse all 22 journals with ISSN and cluster information.': '瀏覽全部 22 種期刊及其 ISSN、群組資訊。',
            'Review licensing, repository, and rights guidance.': '審閱授權、存儲庫與權利指引。',
            'Editorial integrity and peer review conduct standards.': '編輯誠信與同行評審行為標準。',
            'Enquiries': '查詢',
            'Contact the platform for indexing or archiving questions.': '就索引或典藏問題聯絡平台。',
            'Read Article →': '閱讀文章 →'
        }
    };

    function currentLang() {
        return document.documentElement.getAttribute('data-lang') || 'en';
    }

    function textMap(lang) {
        return autoText[lang] || {};
    }

    function reverseTextMap(lang) {
        var out = {};
        var map = textMap(lang);
        Object.keys(map).forEach(function (key) { out[map[key]] = key; });
        return out;
    }

    function skipAutoNode(node) {
        var el = node.nodeType === 1 ? node : node.parentElement;
        return !el || !!(el.closest && el.closest('script,style,noscript,pre,code,kbd,samp,textarea,.lang-menu'));
    }

    function replacePreservingEdgeSpace(value, translated) {
        var leading = value.match(/^\s*/)[0];
        var trailing = value.match(/\s*$/)[0];
        return leading + translated + trailing;
    }

    function translateAutoTextNode(node, lang) {
        if (!node || skipAutoNode(node)) return;
        var trimmed = node.nodeValue.trim();
        if (!trimmed) return;
        if (lang === 'zh') {
            var countMatch = trimmed.match(/^(\d+)\s+journals?\s+found$/);
            if (countMatch) {
                node.nodeValue = replacePreservingEdgeSpace(node.nodeValue, countMatch[1] + ' 種期刊符合條件');
                return;
            }
        } else {
            var zhCountMatch = trimmed.match(/^(\d+)\s+種期刊符合條件$/);
            if (zhCountMatch) {
                node.nodeValue = replacePreservingEdgeSpace(node.nodeValue, zhCountMatch[1] + ' journals found');
                return;
            }
        }
        if (lang === 'en') {
            ['zh'].forEach(function (code) {
                var rev = reverseTextMap(code);
                if (rev[trimmed]) node.nodeValue = replacePreservingEdgeSpace(node.nodeValue, rev[trimmed]);
            });
            return;
        }
        var translated = textMap(lang)[trimmed];
        if (translated) node.nodeValue = replacePreservingEdgeSpace(node.nodeValue, translated);
    }

    function translateAutoAttributes(root, lang) {
        var scope = root && root.querySelectorAll ? root : document;
        var attrMap = lang === 'en' ? reverseTextMap('zh') : textMap(lang);
        scope.querySelectorAll('input[placeholder], textarea[placeholder], [aria-label]').forEach(function (el) {
            if (skipAutoNode(el)) return;
            ['placeholder', 'aria-label'].forEach(function (attr) {
                var value = el.getAttribute(attr);
                if (value && attrMap[value]) el.setAttribute(attr, attrMap[value]);
            });
        });
    }

    function applyAutoTranslations(lang, root) {
        var start = root || document.body;
        if (!start || skipAutoNode(start)) return;
        if (start.nodeType === 3) {
            translateAutoTextNode(start, lang);
            return;
        }
        var walker = document.createTreeWalker(start, NodeFilter.SHOW_TEXT, {
            acceptNode: function (node) {
                return skipAutoNode(node) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
            }
        });
        var nodes = [];
        var node;
        while ((node = walker.nextNode())) nodes.push(node);
        nodes.forEach(function (textNode) { translateAutoTextNode(textNode, lang); });
        translateAutoAttributes(start, lang);
    }

    function setLangMenuOpen(menu, open) {
        if (!menu) return;
        menu.classList.toggle('open', open);
        var toggle = menu.querySelector('[data-lang-toggle]');
        if (toggle) toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    function updateLangButtons(lang) {
        var meta = LANGUAGES[lang] || LANGUAGES.en;
        document.querySelectorAll('.lang-menu').forEach(function (menu) {
            var current = menu.querySelector('.lang-current');
            var toggle = menu.querySelector('[data-lang-toggle]');
            if (current) current.textContent = meta.short;
            if (toggle) toggle.setAttribute('aria-label', 'Select language: ' + meta.name);
            menu.querySelectorAll('[data-lang-option]').forEach(function (option) {
                var active = option.getAttribute('data-lang-option') === lang;
                option.setAttribute('aria-checked', active ? 'true' : 'false');
            });
        });
    }

    function applyTranslations(lang) {
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            if (lang === 'zh') {
                if (!el.hasAttribute('data-i18n-orig')) {
                    el.setAttribute('data-i18n-orig', el.textContent);
                }
                var zh = i18n.zh[key];
                if (zh !== undefined) el.textContent = zh;
            } else {
                var orig = el.getAttribute('data-i18n-orig');
                if (orig !== null) el.textContent = orig;
            }
        });
        if (!LANGUAGES[lang]) lang = 'en';
        document.documentElement.classList.toggle('lang-zh', lang === 'zh');
        document.documentElement.setAttribute('lang', LANGUAGES[lang].htmlLang);
        document.documentElement.setAttribute('data-lang', lang);
        applyAutoTranslations(lang);
        updateLangButtons(lang);
        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    }

    window.toggleLang = function () {
        applyTranslations(currentLang() === 'zh' ? 'en' : 'zh');
    };

    window.setLanguage = function (lang) {
        applyTranslations(lang);
    };

    document.querySelectorAll('[data-lang-toggle]').forEach(function (btn) {
        btn.addEventListener('click', function (event) {
            event.stopPropagation();
            var menu = btn.closest('.lang-menu');
            var open = !(menu && menu.classList.contains('open'));
            document.querySelectorAll('.lang-menu.open').forEach(function (other) { setLangMenuOpen(other, false); });
            setLangMenuOpen(menu, open);
        });
    });

    document.querySelectorAll('[data-lang-option]').forEach(function (option) {
        option.addEventListener('click', function (event) {
            event.stopPropagation();
            applyTranslations(option.getAttribute('data-lang-option') || 'en');
            setLangMenuOpen(option.closest('.lang-menu'), false);
        });
    });

    document.addEventListener('click', function () {
        document.querySelectorAll('.lang-menu.open').forEach(function (menu) { setLangMenuOpen(menu, false); });
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            document.querySelectorAll('.lang-menu.open').forEach(function (menu) { setLangMenuOpen(menu, false); });
        }
    });

    var saved;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    applyTranslations(saved === 'zh' ? 'zh' : 'en');

    if (window.MutationObserver) {
        new MutationObserver(function (mutations) {
            var lang = currentLang();
            if (lang === 'en') return;
            mutations.forEach(function (mutation) {
                mutation.addedNodes.forEach(function (node) { applyAutoTranslations(lang, node); });
            });
        }).observe(document.body, { childList: true, subtree: true });
    }
}());
