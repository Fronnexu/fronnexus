/**
 * @author gabrielvettorazzi
 */
import React from 'react';
import { FiMonitor, FiPenTool, FiDatabase, FiCheckCircle } from 'react-icons/fi';

const SERVICES_ITEMS = [
  {
    icon: <FiMonitor size={36} className="bg-background" />,
    title: 'Front-End Development',
  },
  {
    icon: <FiPenTool size={36} className="bg-background" />,
    title: 'Web Design',
  },
  {
    icon: <FiDatabase size={36} className="bg-background" />,
    title: 'Data Analysis',
  },
  {
    icon: <FiCheckCircle size={36} className="bg-background" />,
    title: 'Quality Assurance (QA)',
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-background pt-20 pb-32 py-16 px-4 sm:px-6 lg:px-8">
      
    </section>
  );
}