// components/about/Hero.jsx
import Image from 'next/image';
import Link from 'next/link';
import { heroAboutInfo } from '@/components/utils/heroInfo'; // opcional: se não existir, o fallback cuida

function blurDataURL(w = 16, h = 12) {
  const svg = `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g"><stop stop-color="#eee" offset="20%"/><stop stop-color="#ddd" offset="50%"/><stop stop-color="#eee" offset="70%"/></linearGradient></defs><rect width="${w}" height="${h}" fill="#eee"/><rect width="${w}" height="${h}" fill="url(#g)"/></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

export default function Hero() {
  const hero = (heroAboutInfo && heroAboutInfo[0]) || {
    title: 'About us',
    description:
      'We blend design, engineering and data to ship fast, reliable web products.',
    btn: 'Get in touch',
    image:
      'https://i.pinimg.com/736x/55/e0/bf/55e0bf3e556c60a058e6095f416dba8f.jpg', // troque para sua imagem/AVIF
    alt: 'Our team',
  };

  return (
    <section className="bg-background px-6 md:px-10 lg:px-16 py-12 md:py-16">
      <div className="mx-auto max-w-6xl grid items-center gap-10 md:grid-cols-2">
        <div className="text-center md:text-left max-w-xl md:max-w-none mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            {hero.title}
          </h1>
          <p className="text-base text-primary-70 leading-relaxed mb-6">
            {hero.description}
          </p>
          <Link
            href="/contact"
            prefetch
            className="inline-block bg-gray-100 text-t-dark-btn text-sm font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition md:hover:-translate-y-0.5"
          >
            {hero.btn}
          </Link>
        </div>
      </div>
    </section>
  );
}
