'use client';
import Footer from '@/components/footer/Footer';
import HomeProjectInfo from '@/components/homeProjectInfo/HomeProjectInfo';
import ServicesSection from '@/components/services/ServicesSection';
import HeaderBg from '@/components/Header/HeaderBg';
import SegundaCTA from '@/components/cta/SegundaCTA/SegundaCTA';
export default function Home() {
  return (
    <>
      <HeaderBg />
      <ServicesSection />
      <HomeProjectInfo />
      <SegundaCTA />
      <Footer />
    </>
  );
}
