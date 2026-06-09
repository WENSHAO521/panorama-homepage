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

    var i18n = {
        en: {
            'lang.btn': '🇹🇼 繁中',
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
            'lang.btn': '🇬🇧 EN',
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
        document.documentElement.classList.toggle('lang-zh', lang === 'zh');
        document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-TW' : 'en');
        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    }

    window.toggleLang = function () {
        var isZh = document.documentElement.classList.contains('lang-zh');
        applyTranslations(isZh ? 'en' : 'zh');
    };

    var saved;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (saved === 'zh') applyTranslations('zh');
}());
