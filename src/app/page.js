import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import ClientHomeProjectInfo from '../components/client/ClientHomeProjectInfo';
import ClientSegundaCTA from '../components/client/ClientSegundaCTA';

const HeaderBg = dynamic(() => import('../components/Header/HeaderBg'), {
  loading: () => null,
});
const ServicesSection = dynamic(
  () => import('../components/services/ServicesSection'),
  { loading: () => null },
);

export default function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <HeaderBg
          title="We Design, Build &"
          highlight="Scale Your Digital"
          subtitle="Presence."
          description="Fronnexus is a global digital agency specializing in front-end development, UI/UX design, data analysis, and quality assurance. We partner with startups and established businesses to craft high-performance web experiences that convert visitors into customers."
          buttonText="Explore Our Services"
          buttonLink="/about"
        />
      </Suspense>

      <Suspense fallback={null}>
        <ServicesSection />
      </Suspense>

      <Suspense fallback={null}>
        <ClientSegundaCTA
          title="Turn your idea into"
          subtitle="digital reality."
          buttonText="Start Your Project"
        />
      </Suspense>

      <ClientHomeProjectInfo />

      <Suspense fallback={null}>
        <ClientSegundaCTA
          title="Ready to grow your"
          subtitle="online presence?"
          buttonText="Let's Talk"
        />
      </Suspense>
    </>
  );
}
