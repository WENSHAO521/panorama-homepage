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
