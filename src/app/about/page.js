// app/about/page.js
import { Suspense } from 'react';
import LazyMount from '../../components/utils/LazyMount';
import Main from '../../components/about/Main';
import Skills from '../../components/about/Skills';
import HeaderBg from '../../components/Header/HeaderBg';
import SegundaCTA from '../../components/cta/segundacta/SegundaCTA';

export default function Home() {
  return (
    <section className="bg-white dark:bg-background text-primary dark:text-primary">
      <Suspense fallback={null}>
        <HeaderBg
          title="Who We Are"
          description="A digital agency built on passion, precision, and purpose. We blend design, technology, and strategy to create seamless digital experiences for businesses worldwide."
          buttonText="See our Work"
          buttonLink="/projects"
        />
      </Suspense>

      <LazyMount>
        <Skills />
      </LazyMount>
      <LazyMount rootMargin="400px">
        <Main />
        <SegundaCTA />
      </LazyMount>
    </section>
  );
}
