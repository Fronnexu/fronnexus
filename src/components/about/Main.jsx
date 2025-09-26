'use client';
import { Briefcase, Code2, Github, Instagram, Linkedin } from 'lucide-react';

function ProfileCard({
  image,
  alt,
  role,
  name,
  title,
  description,
  github,
  linkedin,
  instagram,
  reversed = false,
}) {
  return (
    <article
      className={[
        'rounded-3xl border border-stroke-container-divider shadow-lg bg-background/5 backdrop-blur m-16',
        'overflow-hidden',
        'md:grid md:grid-cols-12 md:items-stretch',
        reversed ? 'md:[&>div:first-child]:order-2' : '',
      ].join(' ')}
    >
      <div className="md:col-span-6 h-full flex items-center justify-center">
        <div className="w-full h-full p-[10px]">
          <img
            src={image}
            alt={alt}
            className="w-full h-[515px] object-cover rounded-2xl"
            loading="lazy"
          />
        </div>
      </div>

      <div className="md:col-span-6 h-full p-6 md:p-7 bg-gradient-to-b from-gradient-border-white to-transparent">
        <span className="inline-flex items-center px-3 py-1 rounded-md text-sm border border-stroke-container-divider bg-secundary text-foreground font-medium">
          <Briefcase size={16} className="mr-1" />
          {role}
        </span>

        <h2 className="mt-2 text-2xl font-bold text-foreground">{name}</h2>

        <p className="flex items-center text-primary-70 text-sm mt-1">
          <Code2 size={16} className="mr-1" />
          {title}
        </p>

        <div className="mt-3 text-foreground/90 text-sm leading-relaxed">
          <h3 className="font-semibold mb-1">Meet the Founder</h3>
          <p>{description}</p>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 px-3 py-2 rounded-xl border border-stroke-container-divider bg-secundary hover:bg-primary-70/10 transition text-foreground text-sm font-medium"
            >
              <Github size={16} /> GitHub
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 px-3 py-2 rounded-xl border border-stroke-container-divider bg-secundary hover:bg-primary-70/10 transition text-foreground text-sm font-medium"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
          )}
          {instagram && (
            <a
              href={instagram}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 px-3 py-2 rounded-xl border border-stroke-container-divider bg-secundary hover:bg-primary-70/10 transition text-foreground text-sm font-medium"
            >
              <Instagram size={16} /> Instagram
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function AgencyCard({ reversed = false }) {
  return (
    <article
      className={[
        'rounded-3xl border border-stroke-container-divider shadow-lg bg-background/5 backdrop-blur',
        'overflow-hidden',
        'md:grid md:grid-cols-12 md:items-stretch',
        reversed ? 'md:[&>div:first-child]:order-2' : '',
      ].join(' ')}
    >
      <div className="md:col-span-6 h-full flex items-center justify-center">
        <div className="w-full h-full p-[10px] flex items-center justify-center">
          <img
            src="/assets/image/logosymbol_1x1_high_quality.png"
            alt="FromNexus"
            className="h-[300px] w-auto object-contain rounded-2xl"
            loading="lazy"
          />
        </div>
      </div>

      <div className="md:col-span-6 h-full p-6 md:p-7 bg-gradient-to-b from-gradient-border-white to-transparent">
        <span className="inline-flex items-center px-3 py-1 rounded-md text-sm border border-stroke-container-divider bg-secundary text-foreground font-medium">
          <Briefcase size={16} className="mr-1" />
          AGENCY
        </span>

        <h2 className="mt-2 text-2xl font-bold text-foreground">FROMNEXUS</h2>

        <p className="flex items-center text-primary-70 text-sm mt-1">
          <Code2 size={16} className="mr-1" />
          Tech Agency
        </p>

        <div className="mt-3 text-foreground/90 text-sm leading-relaxed">
          <h3 className="font-semibold mb-1">About the Agency</h3>
          <p>
            We are a digital agency specialized in front-end development,
            design, data analysis, and QA. We deliver high-quality custom
            solutions with remote, borderless collaboration — always
            pixel-perfect and performance-focused.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <a
            href="#"
            className="flex items-center gap-1 px-3 py-2 rounded-xl border border-stroke-container-divider bg-secundary hover:bg-primary-70/10 transition text-foreground text-sm font-medium"
          >
            <Github size={16} /> GitHub
          </a>
          <a
            href="#"
            className="flex items-center gap-1 px-3 py-2 rounded-xl border border-stroke-container-divider bg-secundary hover:bg-primary-70/10 transition text-foreground text-sm font-medium"
          >
            <Linkedin size={16} /> LinkedIn
          </a>
          <a
            href="#"
            className="flex items-center gap-1 px-3 py-2 rounded-xl border border-stroke-container-divider bg-secundary hover:bg-primary-70/10 transition text-foreground text-sm font-medium"
          >
            <Instagram size={16} /> Instagram
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Main() {
  const people = [
    {
      image: '/assets/image/Ericky.jpg',
      alt: 'Ericky Dias',
      role: 'CTO',
      name: 'Ericky Dias',
      title: 'Fullstack Developer',
      description:
        'A Brazilian creative, now based in the Netherlands, passionate about design, code, and problem-solving. With a background that combines creativity and technology, I founded this agency to help brands and businesses thrive.',
      github: '#',
      linkedin: '#',
      instagram: 'https://www.instagram.com/ericky_dias/',
    },
    {
      image: '/assets/image/Gabriel.jpg',
      alt: 'Gabriel Vettorazzi',
      role: 'CEO',
      name: 'Gabriel Vettorazzi',
      title: 'CEO & Entrepreneur',
      description:
        'Brazilian entrepreneur, passionate about technology and innovation. As CEO, I lead with the purpose of transforming ideas into digital solutions that drive growth and inspire new possibilities.',
      github: 'https://github.com/gabrielvettorazzi',
      linkedin: '#',
      instagram: 'https://www.instagram.com/gabrielvettorazzi__/',
    },
  ];

  return (
    <div className="space-y-10">
      {people.map((p, idx) => (
        <ProfileCard key={idx} {...p} reversed={idx % 2 === 1} />
      ))}
      <AgencyCard reversed={people.length % 2 === 1} />
    </div>
  );
}
