'use client';

import dynamic from 'next/dynamic';

const HomeProjectInfo = dynamic(
  () => import('../../components/homeProjectInfo/HomeProjectInfo'),
  {
    ssr: false,
    loading: () => (
      <div className="max-w-7xl mx-auto px-4 md:px-10 my-16">
        <div className="h-8 w-48 rounded bg-white/10 animate-pulse mb-6" />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="h-64 rounded-3xl bg-white/10 animate-pulse" />
          <div className="h-64 rounded-3xl bg-white/10 animate-pulse" />
          <div className="h-64 rounded-3xl bg-white/10 animate-pulse" />
        </div>
      </div>
    ),
  },
);

export default function ClientHomeProjectInfo() {
  return <HomeProjectInfo />;
}
