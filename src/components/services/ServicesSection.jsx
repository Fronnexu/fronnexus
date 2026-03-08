import { FiMonitor, FiPenTool, FiDatabase, FiCheckCircle } from 'react-icons/fi';
import ScrollReveal from '../utils/ScrollReveal';

const SERVICES_ITEMS = [
  {
    icon: <FiMonitor size={28} />,
    title: 'Front-End Development',
    description:
      'We build fast, accessible, and responsive interfaces using React, Next.js, and Tailwind CSS. Our code is clean, scalable, and optimized for performance — delivering sub-second load times and smooth user interactions.',
  },
  {
    icon: <FiPenTool size={28} />,
    title: 'Web Design & UI/UX',
    description:
      'From wireframes to pixel-perfect layouts, we design user-centered experiences that look stunning and convert. We use Figma for prototyping and iterate closely with clients to ensure every detail aligns with their brand.',
  },
  {
    icon: <FiDatabase size={28} />,
    title: 'Data Analysis & Insights',
    description:
      'We turn raw data into actionable dashboards, reports, and visualizations that drive smarter decisions. Whether it\'s tracking KPIs, user behavior, or market trends — we make your data work for you.',
  },
  {
    icon: <FiCheckCircle size={28} />,
    title: 'Quality Assurance',
    description:
      'Rigorous testing across devices and browsers ensures every release is stable, performant, and bug-free. We use automated and manual QA workflows to catch issues before they reach your users.',
  },
];

export default function ServicesSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-[rgba(139,92,246,0.2)] bg-[rgba(139,92,246,0.08)] text-[#a78bfa] mb-4">
              What We Do
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
              End-to-End Digital Services
            </h2>
            <p className="mt-4 text-primary-70 max-w-2xl mx-auto text-base leading-relaxed">
              From visual identity to flawless code and data-driven strategy, Fronnexus
              delivers a complete suite of digital services tailored to help your business
              stand out, perform better, and grow faster in an increasingly competitive market.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_ITEMS.map((service, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div className="glass-card group rounded-2xl p-6 h-full flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-[rgba(139,92,246,0.1)] flex items-center justify-center text-[#8b5cf6] mb-4 transition-colors group-hover:bg-[rgba(139,92,246,0.15)]">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-primary-70 leading-relaxed flex-1">
                  {service.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
