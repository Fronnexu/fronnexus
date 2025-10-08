// components/util/LazyMount.jsx
'use client';
import { useEffect, useRef, useState } from 'react';

export default function LazyMount({ children, rootMargin = '200px' }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [show, rootMargin]);

  return <div ref={ref}>{show ? children : null}</div>;
}
