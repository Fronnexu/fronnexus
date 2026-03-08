import { Suspense } from 'react';
import Main from '../../components/about/Main';
import Skills from '../../components/about/Skills';
import HeaderBg from '../../components/Header/HeaderBg';
import SegundaCTA from '../../components/cta/segundacta/SegundaCTA';

export default function AboutPage() {
  return (
    <section className="bg-background text-primary">
      <Suspense fallback={null}>
        <HeaderBg
          title="Built on Passion,"
          highlight="Driven by"
          subtitle="Precision."
          description="Fronnexus is a multicultural digital agency operating globally. We blend design thinking, modern technology, and strategic data analysis to build digital products that help businesses scale. Every pixel, every line of code — crafted with purpose."
          buttonText="See Our Work"
          buttonLink="/projects"
        />
      </Suspense>

      <Skills />

      <Main />

      <SegundaCTA
        title="Want to join our team or"
        subtitle="start a project?"
        buttonText="Get in Touch"
      />
    </section>
  );
}
