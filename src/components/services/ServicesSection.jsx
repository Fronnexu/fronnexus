/**
 * @author gabrielvettorazzi
 */
import React from 'react';
import { FiMonitor, FiPenTool, FiDatabase, FiCheckCircle } from 'react-icons/fi';

const SERVICES_ITEMS = [
  {
    icon: <FiMonitor size={48} className="bg-background" />,
    title: 'Front-End Development',
  },
  {
    icon: <FiPenTool size={48} className="bg-background" />,
    title: 'Web Design',
  },
  {
    icon: <FiDatabase size={48} className="bg-background" />,
    title: 'Data Analysis',
  },
  {
    icon: <FiCheckCircle size={48} className="bg-background" />,
    title: 'Quality Assurance (QA)',
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-background pt-20 pb-32 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center w-[324px] mx-auto mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">Services</h2>
          <p className="text-[20px] font-mono">
           From visual identity to flawless code and data-driven decisions, we offer a full stack of custom digital services. Our team blends design creativity, high-quality front-end development, data analysis, and rigorous QA to deliver seamless digital experiences.
          </p>
        </div>
        <div className="grid grid-cols-1 m-3   gap-6">
          {SERVICES_ITEMS.map((service, index) => (
            <div 
              key={index}
              className="flex items-center gap-6 p-6 bg-background rounded-3xl shadow-lg shadow-gray-400 border border-gray-200 transition-transform duration-300 hover:scale-105"
            >
              {service.icon}
              <h3 className="text-xl font-mono text-primary-70">
                {service.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}