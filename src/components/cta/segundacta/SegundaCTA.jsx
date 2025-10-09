'use client';
// components/CTASection.jsx
import PixelBlast from '../PixelBlast';

export default function CTASection({
  title = 'Let’s Create Something\nAmazing Together!',
  subtitle = 'Reach out today!',
  buttonText = 'Contact Us',
  buttonHref = '/contact',
  actions,
  height = 'h-[450px]',
  className = '',
  glow = true,
  pixel = {
    variant: 'circle',
    pixelSize: 6,
    color: '#B19EEF',
    patternScale: 3,
    patternDensity: 1.2,
    pixelSizeJitter: 0.5,
    enableRipples: true,
    rippleSpeed: 0.4,
    rippleThickness: 0.12,
    rippleIntensityScale: 1.5,
    liquid: true,
    liquidStrength: 0.12,
    liquidRadius: 1.2,
    liquidWobbleSpeed: 5,
    speed: 0.6,
    edgeFade: 0.25,
    transparent: true,
  },
}) {
  const titleLines = Array.isArray(title) ? title : String(title).split('\n');

  return (
    <section
      className={`relative mt-10 mb-10 w-full ${height} flex items-center justify-center overflow-hidden ${className}`}
    >
      {/* PixelBlast como fundo absoluto */}
      <div className="hidden md:block absolute inset-0 -z-10">
        <PixelBlast
          variant={pixel.variant}
          pixelSize={pixel.pixelSize}
          color={pixel.color}
          patternScale={pixel.patternScale}
          patternDensity={pixel.patternDensity}
          pixelSizeJitter={pixel.pixelSizeJitter}
          enableRipples={pixel.enableRipples}
          rippleSpeed={pixel.rippleSpeed}
          rippleThickness={pixel.rippleThickness}
          rippleIntensityScale={pixel.rippleIntensityScale}
          liquid={pixel.liquid}
          liquidStrength={pixel.liquidStrength}
          liquidRadius={pixel.liquidRadius}
          liquidWobbleSpeed={pixel.liquidWobbleSpeed}
          speed={pixel.speed}
          edgeFade={pixel.edgeFade}
          transparent={pixel.transparent}
        />
      </div>

      <div className="relative z-10 w-full text-center px-6">
        {/* Glow suave atrás do texto (opcional) */}
        {glow && (
          <div className="pointer-events-none absolute -inset-x-24 -top-24 h-64 md:h-72 bg-gradient-to-r from-indigo-500/25 via-fuchsia-500/25 to-blue-500/25 blur-3xl rounded-full mx-auto" />
        )}

        <div className="relative mx-auto max-w-5xl py-10 md:py-14">
          <h2
            className="text-primary font-extrabold tracking-tight leading-tight
                       text-3xl sm:text-4xl md:text-6xl drop-shadow-[0_6px_24px_rgba(79,70,229,0.55)]"
          >
            {titleLines[0]}
            {titleLines.length > 1 && (
              <>
                <br className="hidden sm:block" />
                <span className="block">{titleLines.slice(1).join(' ')}</span>
              </>
            )}
          </h2>

          {subtitle ? (
            <p className="mt-4 text-primary-70 text-sm sm:text-base">
              {subtitle}
            </p>
          ) : null}

          <div className="mt-6">
            {actions ? (
              actions
            ) : (
              <a
                href={buttonHref}
                className="inline-flex items-center gap-2 rounded-xl 
                  bg-neutral-900/20 backdrop-blur-md 
                  px-5 py-3 text-sm font-semibold text-t-light-btn 
                  shadow-lg shadow-black/10 ring-1 ring-white/10
                  transition-all duration-300 
                  hover:scale-[1.03] hover:bg-neutral-900/30 hover:ring-white/20
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
              >
                {buttonText}
                <span className="text-lg -mr-1">↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
