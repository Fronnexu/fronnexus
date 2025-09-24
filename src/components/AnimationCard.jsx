'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

/**
 * Animated background with floating circles that wander randomly
 * inside the bounds of the parent container.
 */
export default function AnimatedBackground({
  count = 20,
  className = '',
  minSize = 10, // px
  maxSize = 48, // px
  opacity = 0.35,
}) {
  const containerRef = useRef(null);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });
  const [circles, setCircles] = useState([]);

  // soft palette (with alpha added via inline opacity)
  const palette = useMemo(
    () => [
      '#60A5FA', // blue-400
      '#34D399', // emerald-400
      '#F472B6', // pink-400
      '#F59E0B', // amber-500
      '#A78BFA', // violet-400
      '#38BDF8', // sky-400
      '#22D3EE', // cyan-400
      '#F87171', // red-400
      '#FB923C', // orange-400
      '#4ADE80', // green-400
      '#FCA5A5', // red-300
      '#93C5FD', // blue-300
      '#C4B5FD', // violet-300
      '#67E8F9', // cyan-300
      '#FCD34D', // amber-300
      '#86EFAC', // green-300
      '#F9A8D4', // pink-300
      '#FDE68A', // yellow-300
      '#A7F3D0', // teal-300
      '#D8B4FE', // purple-300
    ],
    []
  );

  // generate initial circles once we know container size
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateBounds = () => {
      const rect = el.getBoundingClientRect();
      setBounds({ width: rect.width, height: rect.height });
    };
    updateBounds();
    const ro = new ResizeObserver(updateBounds);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // initialize circles after bounds known
  useEffect(() => {
    if (!bounds.width || !bounds.height) return;
    const items = Array.from({ length: count }).map((_, i) => {
      const size = rand(minSize, maxSize);
      const { x, y } = randomPosition(bounds.width, bounds.height, size);
      return {
        id: i,
        size,
        color: palette[i % palette.length],
        x,
        y,
        duration: rand(6, 14), // seconds
        delay: rand(0, 8), // seconds
      };
    });
    setCircles(items);
  }, [bounds.width, bounds.height, count, minSize, maxSize, palette]);

  // wandering animation: periodically move each circle to a new random position
  useEffect(() => {
    if (!bounds.width || !bounds.height || circles.length === 0) return;

    const timers = circles.map((c, idx) => {
      // staggered start to avoid sync movement
      const start = setTimeout(() => {
        tickMove(idx);
        const id = setInterval(() => tickMove(idx), (c.duration + 1) * 1000);
        timers.push(id);
      }, c.delay * 1000);
      return start;
    });

    function tickMove(index) {
      setCircles((prev) => {
        const next = [...prev];
        const item = next[index];
        if (!item) return prev;
        const { x, y } = randomPosition(bounds.width, bounds.height, item.size);
        // optionally vary duration subtly to feel organic
        const duration = clamp(item.duration + rand(-2, 2), 5, 16);
        next[index] = { ...item, x, y, duration };
        return next;
      });
    }

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [bounds.width, bounds.height, circles.length]);

  return (
    <div
      ref={containerRef}
      className={[
        'pointer-events-none absolute inset-0 overflow-hidden',
        // allow custom positioning via parent (e.g., relative on parent)
        className,
      ].join(' ')}
      aria-hidden
    >
      {circles.map((c) => (
        <div
          key={c.id}
          style={{
            position: 'absolute',
            left: c.x,
            top: c.y,
            width: c.size,
            height: c.size,
            backgroundColor: c.color,
            opacity,
            borderRadius: '9999px',
            filter: 'blur(0px)',
            mixBlendMode: 'screen',
            transitionProperty: 'left, top',
            transitionTimingFunction: 'ease-in-out',
            transitionDuration: `${c.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function randomPosition(width, height, size) {
  // keep a 5% margin to reduce clipping at edges
  const marginX = Math.max(10, width * 0.05);
  const marginY = Math.max(10, height * 0.05);
  const x = rand(marginX, Math.max(marginX, width - size - marginX));
  const y = rand(marginY, Math.max(marginY, height - size - marginY));
  return { x, y };
}

