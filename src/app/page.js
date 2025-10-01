'use client';
import Footer from '@/components/footer/Footer';
import HomeProjectInfo from '@/components/homeProjectInfo/HomeProjectInfo';
import ServicesSection from '@/components/services/ServicesSection';
import CallToAction from '@/components/cta/CallToAction';
export default function Home() {
  return (
    <>
      <CallToAction />
      <ServicesSection />
      <HomeProjectInfo />

      <Footer />
    </>
  );
}
