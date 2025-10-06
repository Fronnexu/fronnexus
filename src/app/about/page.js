// app/about/page.js
import { Suspense } from 'react';
import Hero from '@/components/about/Hero';
import LazyMount from '@/components/utils/LazyMount';
import Main from '@/components/about/Main';
import Skills from '@/components/about/Skills';
import Footer from '@/components/footer/Footer';

export default function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <Hero />
      </Suspense>

      <LazyMount>
        <Skills />
      </LazyMount>
      <LazyMount rootMargin="400px">
        <Main />
      </LazyMount>
      <Footer />
    </>
  );
}
