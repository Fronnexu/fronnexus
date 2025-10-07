'use client';

import React from 'react';
import LightRays from './LightRays';

export default function HeaderBg({
  title = '',
  highlight = '',
  subtitle = '',
  description = '',
  buttonText = '',
  buttonLink = '',
}) {
  return (
    <section className="relative -mt-20 w-full h-screen min-h-[600px] isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <LightRays
          raysOrigin="top-center"
          raysColor="#AD46FF"
          raysSpeed={1.5}
          lightSpread={20}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="opacity-70"
        />
      </div>

      <div className="mx-auto max-w-5xl px-6 py-auto md:py-24 lg:py-28 flex items-center min-h-[600px]">
        <div className="max-w-3xl mt-36">
          <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-6xl md:text-7xl leading-[1.05]">
            {title}
            <br className="hidden sm:block" />
            <span>{highlight}</span>
            <span className="block">{subtitle}</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-secondary/90">
            {description}
          </p>

          <div className="mt-8">
            <a
              href={buttonLink}
              className="inline-flex items-center gap-2 rounded-xl 
               bg-neutral-900/20 backdrop-blur-md 
               px-5 py-3 text-sm font-semibold text-t-light-btn 
               shadow-lg shadow-black/10 ring-1 ring-white/10
               transition-all duration-300 
               hover:scale-[1.03] hover:bg-neutral-900/30 hover:ring-white/20
               focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
            >
              {buttonText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
