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
  const trailRef = useRef({ x: -300, y: -300 });
  const isHoveringRef = useRef(false);
  const isOverHeaderRef = useRef(false);
  const animFrameRef = useRef(null);
  const frameRef = useRef(0);
  const [isVisible, setIsVisible] = useState(false);

  const drawRocket = useCallback((ctx, x, y, angleDeg, hovering) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((angleDeg * Math.PI) / 180);
    const s = hovering ? 1.3 : 1.0;
    ctx.scale(s, s);

    // Outer ambient glow
    const glow = ctx.createRadialGradient(0, 0, 1, 0, 0, 20);
    glow.addColorStop(0, 'rgba(147,197,253,0.22)');
    glow.addColorStop(1, 'rgba(37,99,235,0)');
    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, Math.PI * 2);
    ctx.fillStyle = glow;
    ctx.fill();

    // Left fin
    ctx.beginPath();
    ctx.moveTo(-4, 4);
    ctx.lineTo(-11, 13);
    ctx.lineTo(-3, 8);
    ctx.closePath();
    const finGradL = ctx.createLinearGradient(-11, 4, -3, 13);
    finGradL.addColorStop(0, '#1e40af');
    finGradL.addColorStop(1, '#1d4ed8');
    ctx.fillStyle = finGradL;
    ctx.fill();

    // Right fin
    ctx.beginPath();
    ctx.moveTo(4, 4);
    ctx.lineTo(11, 13);
    ctx.lineTo(3, 8);
    ctx.closePath();
    const finGradR = ctx.createLinearGradient(3, 4, 11, 13);
    finGradR.addColorStop(0, '#1e40af');
    finGradR.addColorStop(1, '#1d4ed8');
    ctx.fillStyle = finGradR;
    ctx.fill();

    // Engine bell
    ctx.beginPath();
    ctx.moveTo(-3.5, 9);
    ctx.lineTo(3.5, 9);
    ctx.lineTo(3, 14);
    ctx.lineTo(-3, 14);
    ctx.closePath();
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.strokeStyle = 'rgba(96,165,250,0.4)';
    ctx.lineWidth = 0.6;
    ctx.stroke();

    // Main body
    ctx.beginPath();
    ctx.moveTo(0, -16);
    ctx.bezierCurveTo(6, -8, 7, 0, 6, 9);
    ctx.lineTo(0, 11);
    ctx.lineTo(-6, 9);
    ctx.bezierCurveTo(-7, 0, -6, -8, 0, -16);
    ctx.closePath();
    const body = ctx.createLinearGradient(-7, -16, 7, 11);
    body.addColorStop(0, '#dbeafe');
    body.addColorStop(0.35, '#93c5fd');
    body.addColorStop(0.72, '#2563eb');
    body.addColorStop(1, '#1e3a8a');
    ctx.fillStyle = body;
    ctx.fill();
    ctx.strokeStyle = 'rgba(191,219,254,0.35)';
    ctx.lineWidth = 0.7;
    ctx.stroke();

    // Sheen highlight
    ctx.beginPath();
    ctx.moveTo(-0.5, -15);
    ctx.bezierCurveTo(-3.5, -8, -4, -1, -3, 7);
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = 'rgba(255,255,255,0.45)';
    ctx.stroke();

    // Porthole
    ctx.beginPath();
    ctx.arc(0, -2, 3.4, 0, Math.PI * 2);
    const pGrad = ctx.createRadialGradient(-0.8, -2.8, 0.2, 0, -2, 3.4);
    pGrad.addColorStop(0, hovering ? '#e0f2fe' : '#bfdbfe');
    pGrad.addColorStop(0.6, hovering ? '#7dd3fc' : '#60a5fa');
    pGrad.addColorStop(1, '#1d4ed8');
    ctx.fillStyle = pGrad;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.55)';
    ctx.lineWidth = 0.8;
    ctx.stroke();

    // Nose tip
    ctx.beginPath();
    ctx.arc(0, -15.5, 1.4, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

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
      if (Math.abs(dx) > 0.4 || Math.abs(dy) > 0.4) {
        angleRef.current = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      }
      prevMouseRef.current = { x: mouseRef.current.x, y: mouseRef.current.y };
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Check if over header
      const el = document.elementFromPoint(e.clientX, e.clientY);
      isOverHeaderRef.current = !!(el && el.closest('header'));
      setIsVisible(!isOverHeaderRef.current);
    };

    const onMouseOver = (e) => {
      const el = e.target;
      // Don't set hovering state inside header
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

      // Only spawn particles when NOT over header
      if (!isOverHeaderRef.current && frameRef.current % 2 === 0) {
        const count = hovering ? 4 : 2;
        for (let i = 0; i < count; i++) {
          particlesRef.current.push(createParticle(mx, my, angleRef.current));
        }
      }

      if (particlesRef.current.length > 140) {
        particlesRef.current = particlesRef.current.slice(-140);
      }

      // Always update/draw existing particles so trail fades out naturally
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0.015);
      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.93;
        p.vy *= 0.93;
        p.life -= p.decay;
        drawParticle(ctx, p);
      }

      // Only draw rocket & reticle when NOT over header
      if (!isOverHeaderRef.current) {
        if (hovering) {
          const tx = trailRef.current.x;
          const ty = trailRef.current.y;
          const pulse = 0.45 + 0.25 * Math.sin(frameRef.current * 0.07);

          ctx.save();
          ctx.beginPath();
          ctx.arc(tx, ty, 26, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(96,165,250,${pulse})`;
          ctx.lineWidth = 1;
          ctx.setLineDash([5, 5]);
          ctx.lineDashOffset = -(frameRef.current * 0.5);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(tx, ty, 18, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(147,197,253,${pulse * 0.7})`;
          ctx.lineWidth = 0.8;
          ctx.setLineDash([]);
          ctx.stroke();

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