'use client';
import Footer from '@/components/footer/Footer';
import HomeProjectInfo from '@/components/homeProjectInfo/HomeProjectInfo';
import ServicesSection from '@/components/services/ServicesSection';
import PrimeiraCTA from '@/components/cta/PrimeiraCTA/PrimeiraCTA';
import HeaderBg from '@/components/Header/HeaderBg';
import SegundaCTA from '@/components/cta/SegundaCTA/SegundaCTA';
export default function Home() {
  return (
    <>
      <HeaderBg />
      <ServicesSection />
      <PrimeiraCTA />
      <SegundaCTA
        title="Turn your idea into digital reality"
        subtitle="From concept to launch, we build web solutions that connect you to your audience."
        buttonText="want my project online"
      />
      <HomeProjectInfo />
      <SegundaCTA />
      <Footer />
    </>
  );
}
