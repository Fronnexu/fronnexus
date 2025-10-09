'use client';

import dynamic from 'next/dynamic';

const SegundaCTA = dynamic(
  () => import('../cta/SegundaCTA/SegundaCTA').then((m) => m.default),
  { ssr: false, loading: () => null },
);

export default SegundaCTA;
