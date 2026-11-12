import React, { useEffect, useRef } from 'react';

export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const rnd = (a, b) => Math.random() * (b - a) + a;

    let pts = [];
    let nodes = [];

    const hexRGBA = (hex, a) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r},${g},${b},${a})`;
    };

    const init = () => {
      const pCount = Math.min(Math.floor(W / 20), 80);
      pts = Array.from({ length: pCount }, () => ({
        x: rnd(0, W),
        y: rnd(0, H),
        vx: rnd(-0.25, 0.25),
        vy: rnd(-0.35, -0.05),
        r: rnd(0.6, 2.0),
        o: rnd(0.15, 0.55),
        col: ['#c9a84c', '#7c5cbf', '#1a8fff'][Math.floor(Math.random() * 3)]
      }));

      const nCount = Math.min(Math.floor(W / 110), 16);
      nodes = Array.from({ length: nCount }, () => ({
        x: rnd(0, W),
        y: rnd(0, H),
        vx: rnd(-0.15, 0.15),
        vy: rnd(-0.15, 0.15)
      }));
    };

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      init();
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Draw constellation connections between nodes
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 180) {
            ctx.strokeStyle = `rgba(201, 168, 76, ${(1 - d / 180) * 0.08})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(201, 168, 76, 0.25)';
        ctx.fill();
      }

      // Draw drifting ambient particles
      pts.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = hexRGBA(p.col, p.o);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = H + 10;
          p.x = rnd(0, W);
        }
        if (p.x < 0 || p.x > W) p.vx *= -1;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    init();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.65,
        zIndex: 1
      }}
    />
  );
}
