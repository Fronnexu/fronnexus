// app/page.js
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Footer from '@/components/footer/Footer';
import ClientHomeProjectInfo from '@/components/client/ClientHomeProjectInfo';
import ClientSegundaCTA from '@/components/client/ClientSegundaCTA';

const HeaderBg = dynamic(() => import('@/components/Header/HeaderBg'), {
  loading: () => null,
});
const ServicesSection = dynamic(
  () => import('@/components/services/ServicesSection'),
  { loading: () => null },
);

export default function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <HeaderBg
          title="Empowering your"
          highlight="digital presence"
          subtitle="with precision."
          description="We craft seamless web experiences that merge creativity, technology, and strategy."
          buttonText="Meet Our Team"
          buttonLink="/about"
        />
      </Suspense>

      <Suspense fallback={null}>
        <ServicesSection />
      </Suspense>

      <Suspense fallback={null}>
        <ClientSegundaCTA
          title="Turn your idea into digital reality"
          subtitle="From concept to launch, we build web solutions that connect you to your audience."
          buttonText="want my project online"
        />
      </Suspense>

      <ClientHomeProjectInfo />

      <Suspense fallback={null}>
        <ClientSegundaCTA />
      </Suspense>

      <Footer />
    </>
  );
}
