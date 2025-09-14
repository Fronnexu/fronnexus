"use client";
import { Briefcase, Code2, Github, Instagram, Linkedin } from "lucide-react";

function ProfileCard({ image, alt, role, name, title, description, github, linkedin, instagram }) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 
                    flex flex-col md:flex-row md:w-7xl md:mx-auto m-4">
      <div className="md:w-1/2">
        <img
          src={image}
          alt={alt}
          className="w-full h-96 object-contain md:rounded-l-2xl md:rounded-r-none md:m-3"
        />
      </div>
       <div className="p-6 md:w-1/2 flex flex-col justify-start">
        <span className="inline-flex items-center px-3 py-1 rounded-md text-sm border-1 text-gray-700 font-medium">
          <Briefcase size={16} className="mr-1" />
          {role}
        </span>
        <h2 className="mt-2 text-2xl font-bold text-gray-900">{name}</h2>
        <p className="flex items-center text-gray-600 text-sm mt-1">
          <Code2 size={16} className="mr-1" />
          {title}
        </p>
        <div className="mt-3 text-gray-700 text-sm leading-relaxed">
          <h3 className="font-semibold mb-1">Meet the Founder</h3>
          <p>{description}</p>
        </div>
        <div className="flex flex-wrap gap-1 mt-4">
          {github && (
            <a href={github} className="flex items-center gap-1 px-2 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-100 transition">
              <Github size={16} /> GitHub
            </a>
          )}
          {linkedin && (
            <a href={linkedin} className="flex items-center gap-1 px-2 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-100 transition">
              <Linkedin size={16} /> LinkedIn
            </a>
          )}
          {instagram && (
            <a href={instagram} className="flex items-center gap-1 px-2 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-100 transition">
              <Instagram size={16} /> Instagram
            </a>
          )}
        </div>
      </div>

    </div>
  );
}

function AgencyCard() {
  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 
                     flex flex-col md:flex-row-reverse md:w-7xl md:mx-auto m-4">
      <div className="md:w-1/2 justify-center flex items-center">
        <img
          src="/assets/image/logosymbol_1x1_high_quality.png"
          alt="A"
          className="h-60 object-cover md:rounded-r-2xl md:rounded-l-none"
        />
      </div>

      <div className="p-6 md:w-1/2 flex flex-col justify-center"> 
        <span className="inline-flex items-center px-3 py-1 rounded-md text-sm border-1 text-gray-700 font-medium">
          <Briefcase size={16} className="mr-1" />
          AGENCY
        </span>
        <h2 className="mt-2 text-2xl font-bold text-gray-900">FRONEXUS</h2>
        <p className="flex items-center text-gray-600 text-sm mt-1">
          <Code2 size={16} className="mr-1" />
          Tech Agency
        </p>
        <div className="mt-3 text-gray-700 text-sm leading-relaxed">
          <h3 className="font-semibold mb-1">About the Agency</h3>
          <p>
            We are a digital agency specialized in front-end development, design, data analysis, and QA. 
            Our mission is to deliver high-quality, custom solutions that help businesses thrive in a digital-first world. 
            We believe in remote work, borderless collaboration, and clear communication. 
            Operating globally, our team is multicultural, adaptable, and focused on precision — 
            always delivering pixel-perfect results with high performance.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <a href="#" className="flex items-center gap-1 px-2 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-100 transition">
            <Github size={16} /> GitHub
          </a>
          <a href="#" className="flex items-center gap-1 px-2 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-100 transition">
            <Linkedin size={16} /> LinkedIn
          </a>
          <a href="#" className="flex items-center gap-1 px-2 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-100 transition">
            <Instagram size={16} /> Instagram
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Main() {
  return (
    <div className="space-y-10">
      <ProfileCard
        image="/assets/image/Ericky.jpg"
        alt="Ericky Dias"
        role="CTO"
        name="Ericky Dias"
        title="Fullstack Developer"
        description="A Brazilian creative, now based in the Netherlands, passionate about design, code, and problem-solving. With a background that combines creativity and technology, I founded this agency to help brands and businesses thrive."
        github="#"
        linkedin="#"
        instagram="https://www.instagram.com/ericky_dias/"
      />

      <ProfileCard
        image="/assets/image/Gabriel.jpg"
        alt="Gabriel Vettorazzi"
        role="CEO"
        name="Gabriel Vettorazzi"
        title="CEO & Entrepreneur"
        description="Brazilian entrepreneur, passionate about technology and innovation. As CEO, I lead with the purpose of transforming ideas into digital solutions that not only drive impact and growth, but also inspire new possibilities."
        github="https://github.com/gabrielvettorazzi"
        linkedin="#"
        instagram="https://www.instagram.com/gabrielvettorazzi__/"
      />

      <AgencyCard />
    </div>
  );
}
