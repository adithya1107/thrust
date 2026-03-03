import { useEffect, useRef, useState, useCallback } from 'react';

function createParticle(x, y, angle) {
  const spread = (Math.random() - 0.5) * 0.7;
  const speed = Math.random() * 2.5 + 1.0;
  const rocketAngleRad = ((angle - 90) * Math.PI) / 180;
  const trailAngle = rocketAngleRad + Math.PI + spread;
  return {
    x,
    y,
    vx: Math.cos(trailAngle) * speed,
    vy: Math.sin(trailAngle) * speed,
    life: 1,
    decay: Math.random() * 0.04 + 0.025,
    size: Math.random() * 5 + 2.5,
    type: Math.random() > 0.45 ? 'ion' : 'ember',
  };
}

export default function CustomCursor() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -300, y: -300 });
  const prevMouseRef = useRef({ x: -300, y: -300 });
  const angleRef = useRef(0);
  const smoothAngleRef = useRef(0);
  const trailRef = useRef({ x: -300, y: -300 });
  const isHoveringRef = useRef(false);
  const isOverHeaderRef = useRef(false);
  const animFrameRef = useRef(null);
  const frameRef = useRef(0);
  const [isVisible, setIsVisible] = useState(false);

  // Falcon-inspired rocket — slender, cylindrical, minimal fins
  const drawRocket = useCallback((ctx, x, y, angleDeg, hovering) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((angleDeg * Math.PI) / 180);
    const s = hovering ? 1.18 : 1.0;
    ctx.scale(s, s);

    // ── Subtle ambient halo ──────────────────────────────────────
    const halo = ctx.createRadialGradient(0, 0, 2, 0, 0, 18);
    halo.addColorStop(0, 'rgba(200,220,255,0.09)');
    halo.addColorStop(1, 'rgba(100,160,255,0)');
    ctx.beginPath();
    ctx.arc(0, 0, 18, 0, Math.PI * 2);
    ctx.fillStyle = halo;
    ctx.fill();

    // ── Grid fins (4 small rectangles near base, rotated 45°) ────
    // These sit outside the body, symmetrically
    const finPositions = [[-5.5, 7], [5.5, 7]];
    for (const [fx, fy] of finPositions) {
      ctx.save();
      ctx.translate(fx, fy);
      // Trapezoidal fin shape
      ctx.beginPath();
      ctx.moveTo(fx < 0 ? 0 : 0, -3);
      ctx.lineTo(fx < 0 ? -5 : 5, -1);
      ctx.lineTo(fx < 0 ? -4 : 4, 4);
      ctx.lineTo(fx < 0 ? 0.5 : -0.5, 3.5);
      ctx.closePath();
      const finG = ctx.createLinearGradient(fx < 0 ? -5 : 0, -3, fx < 0 ? 0 : 5, 4);
      finG.addColorStop(0, '#1c2b45');
      finG.addColorStop(1, '#2e4470');
      ctx.fillStyle = finG;
      ctx.fill();
      ctx.strokeStyle = 'rgba(160,190,240,0.18)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
      ctx.restore();
    }

    // ── Engine nozzle bell ───────────────────────────────────────
    ctx.beginPath();
    ctx.moveTo(-3.2, 9.5);
    ctx.lineTo(3.2, 9.5);
    ctx.bezierCurveTo(4.5, 9.5, 4.8, 13, 3.8, 14.5);
    ctx.lineTo(-3.8, 14.5);
    ctx.bezierCurveTo(-4.8, 13, -4.5, 9.5, -3.2, 9.5);
    ctx.closePath();
    const nozzleG = ctx.createLinearGradient(-4, 9.5, 4, 14.5);
    nozzleG.addColorStop(0, '#0d1520');
    nozzleG.addColorStop(0.5, '#1a2840');
    nozzleG.addColorStop(1, '#0d1520');
    ctx.fillStyle = nozzleG;
    ctx.fill();
    ctx.strokeStyle = 'rgba(120,160,220,0.25)';
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // Nozzle inner throat glow
    ctx.beginPath();
    ctx.ellipse(0, 14, 2, 0.9, 0, 0, Math.PI * 2);
    const throatG = ctx.createRadialGradient(0, 14, 0, 0, 14, 2);
    throatG.addColorStop(0, hovering ? 'rgba(180,220,255,0.95)' : 'rgba(140,190,255,0.7)');
    throatG.addColorStop(1, 'rgba(40,80,180,0)');
    ctx.fillStyle = throatG;
    ctx.fill();

    // ── Inter-stage ring (thin band) ─────────────────────────────
    ctx.beginPath();
    ctx.roundRect(-5.2, 4.5, 10.4, 2.2, 0.4);
    const ringG = ctx.createLinearGradient(-5, 4.5, 5, 6.7);
    ringG.addColorStop(0, '#0f1e35');
    ringG.addColorStop(0.4, '#1e3560');
    ringG.addColorStop(1, '#0f1e35');
    ctx.fillStyle = ringG;
    ctx.fill();
    ctx.strokeStyle = 'rgba(140,180,240,0.3)';
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // ── Main cylindrical body (first stage) ──────────────────────
    ctx.beginPath();
    ctx.moveTo(-5.2, 4.5);
    ctx.lineTo(-5.2, 9.5);
    ctx.lineTo(5.2, 9.5);
    ctx.lineTo(5.2, 4.5);
    ctx.closePath();
    const stage1G = ctx.createLinearGradient(-5.2, 0, 5.2, 0);
    stage1G.addColorStop(0, '#0e1a2e');
    stage1G.addColorStop(0.18, '#1e3255');
    stage1G.addColorStop(0.5, '#2a4878');
    stage1G.addColorStop(0.82, '#1e3255');
    stage1G.addColorStop(1, '#0e1a2e');
    ctx.fillStyle = stage1G;
    ctx.fill();

    // ── Second stage + payload fairing body ──────────────────────
    ctx.beginPath();
    ctx.moveTo(-4.5, -10);
    ctx.lineTo(-5.2, 4.5);
    ctx.lineTo(5.2, 4.5);
    ctx.lineTo(4.5, -10);
    ctx.closePath();
    const stage2G = ctx.createLinearGradient(-5.2, -10, 5.2, 4.5);
    stage2G.addColorStop(0, '#c8d8ee');
    stage2G.addColorStop(0.25, '#8aaad0');
    stage2G.addColorStop(0.6, '#2a4878');
    stage2G.addColorStop(1, '#1a3060');
    ctx.fillStyle = stage2G;
    ctx.fill();

    // Side panel lines on second stage — subtle vertical seams
    for (const px of [-1.8, 0, 1.8]) {
      ctx.beginPath();
      ctx.moveTo(px, -8.5);
      ctx.lineTo(px * 1.05, 4.5);
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    // ── Ogive nosecone ───────────────────────────────────────────
    ctx.beginPath();
    ctx.moveTo(0, -20);
    ctx.bezierCurveTo(3.5, -15, 4.5, -13, 4.5, -10);
    ctx.lineTo(-4.5, -10);
    ctx.bezierCurveTo(-4.5, -13, -3.5, -15, 0, -20);
    ctx.closePath();
    const noseG = ctx.createLinearGradient(-4.5, -20, 4.5, -10);
    noseG.addColorStop(0, '#ffffff');
    noseG.addColorStop(0.3, '#d8e8f8');
    noseG.addColorStop(0.7, '#8aaad0');
    noseG.addColorStop(1, '#4a70a8');
    ctx.fillStyle = noseG;
    ctx.fill();
    ctx.strokeStyle = 'rgba(200,220,255,0.2)';
    ctx.lineWidth = 0.4;
    ctx.stroke();

    // Nosecone left highlight
    ctx.beginPath();
    ctx.moveTo(0, -19.5);
    ctx.bezierCurveTo(-1.5, -15, -2.5, -12, -2.8, -10);
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 0.8;
    ctx.stroke();

    // ── Antenna / payload marker — tiny stub at tip ──────────────
    ctx.beginPath();
    ctx.moveTo(0, -20);
    ctx.lineTo(0, -23);
    ctx.strokeStyle = 'rgba(200,220,255,0.6)';
    ctx.lineWidth = 0.7;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, -23, 1, 0, Math.PI * 2);
    ctx.fillStyle = hovering ? 'rgba(180,220,255,0.9)' : 'rgba(150,200,255,0.7)';
    ctx.fill();

    // ── Body left highlight streak ───────────────────────────────
    ctx.beginPath();
    ctx.moveTo(-1.2, -18);
    ctx.bezierCurveTo(-2.8, -8, -3.5, 0, -3.2, 8);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1.0;
    ctx.stroke();

    ctx.restore();
  }, []);

  const drawParticle = useCallback((ctx, p) => {
    ctx.save();
    ctx.globalAlpha = p.life * 0.9;
    const r = p.size * p.life;
    if (p.type === 'ion') {
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r + 1);
      g.addColorStop(0, 'rgba(224,242,254,1)');
      g.addColorStop(0.35, 'rgba(96,165,250,0.85)');
      g.addColorStop(1, 'rgba(37,99,235,0)');
      ctx.beginPath();
      ctx.arc(p.x, p.y, r + 1, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    } else {
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r + 1);
      g.addColorStop(0, 'rgba(255,255,220,1)');
      g.addColorStop(0.3, 'rgba(251,146,60,0.9)');
      g.addColorStop(0.7, 'rgba(220,38,38,0.5)');
      g.addColorStop(1, 'rgba(127,29,29,0)');
      ctx.beginPath();
      ctx.arc(p.x, p.y, r + 1, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    }
    ctx.restore();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      const dx = e.clientX - prevMouseRef.current.x;
      const dy = e.clientY - prevMouseRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 0.4) {
        const rawAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        let diff = rawAngle - smoothAngleRef.current;
        while (diff > 180) diff -= 360;
        while (diff < -180) diff += 360;
        smoothAngleRef.current += diff * 0.22;
        angleRef.current = smoothAngleRef.current;
      }
      prevMouseRef.current = { x: mouseRef.current.x, y: mouseRef.current.y };
      mouseRef.current = { x: e.clientX, y: e.clientY };

      const el = document.elementFromPoint(e.clientX, e.clientY);
      isOverHeaderRef.current = !!(el && el.closest('header'));
      setIsVisible(!isOverHeaderRef.current);
    };

    const onMouseOver = (e) => {
      const el = e.target;
      if (el.closest('header')) {
        isHoveringRef.current = false;
        return;
      }
      isHoveringRef.current =
        el.tagName === 'A' ||
        el.tagName === 'BUTTON' ||
        !!el.closest('a') ||
        !!el.closest('button') ||
        window.getComputedStyle(el).cursor === 'pointer';
    };

    document.addEventListener('mouseleave', () => setIsVisible(false));
    document.addEventListener('mouseenter', () => {
      if (!isOverHeaderRef.current) setIsVisible(true);
    });
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frameRef.current++;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const hovering = isHoveringRef.current;

      trailRef.current.x += (mx - trailRef.current.x) * 0.09;
      trailRef.current.y += (my - trailRef.current.y) * 0.09;

      if (!isOverHeaderRef.current && frameRef.current % 2 === 0) {
        const count = hovering ? 4 : 2;
        for (let i = 0; i < count; i++) {
          particlesRef.current.push(createParticle(mx, my, angleRef.current));
        }
      }

      if (particlesRef.current.length > 140) {
        particlesRef.current = particlesRef.current.slice(-140);
      }

      particlesRef.current = particlesRef.current.filter((p) => p.life > 0.015);
      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.93;
        p.vy *= 0.93;
        p.life -= p.decay;
        drawParticle(ctx, p);
      }

      if (!isOverHeaderRef.current) {
        if (hovering) {
          const tx = trailRef.current.x;
          const ty = trailRef.current.y;
          const pulse = 0.45 + 0.25 * Math.sin(frameRef.current * 0.07);

          ctx.save();
          // Outer dashed orbit ring
          ctx.beginPath();
          ctx.arc(tx, ty, 26, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(96,165,250,${pulse})`;
          ctx.lineWidth = 1;
          ctx.setLineDash([5, 5]);
          ctx.lineDashOffset = -(frameRef.current * 0.5);
          ctx.stroke();

          // Inner solid ring
          ctx.beginPath();
          ctx.arc(tx, ty, 18, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(147,197,253,${pulse * 0.7})`;
          ctx.lineWidth = 0.8;
          ctx.setLineDash([]);
          ctx.stroke();

          // Cardinal tick marks
          ctx.strokeStyle = `rgba(147,197,253,${pulse * 0.5})`;
          ctx.lineWidth = 0.7;
          const len = 8;
          ctx.beginPath();
          ctx.moveTo(tx - 26 - len, ty); ctx.lineTo(tx - 26 + 4, ty);
          ctx.moveTo(tx + 26 - 4, ty);  ctx.lineTo(tx + 26 + len, ty);
          ctx.moveTo(tx, ty - 26 - len); ctx.lineTo(tx, ty - 26 + 4);
          ctx.moveTo(tx, ty + 26 - 4);  ctx.lineTo(tx, ty + 26 + len);
          ctx.stroke();
          ctx.restore();
        }

        drawRocket(ctx, mx, my, angleRef.current, hovering);
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, [drawRocket, drawParticle]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99999,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.2s ease',
      }}
    />
  );
}