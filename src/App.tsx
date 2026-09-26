import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowDown, ChevronUp, Info, X } from 'lucide-react';
import { useVideoScrub } from './useVideoScrub';

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260821_114821_a8ca298f-be2c-4613-a4dd-51b69e16bbde.mp4';
const DARK = '#1D3045';

const NAV_LINKS = ['OBJETIVO', 'AHORRO', 'INVERSIÓN', 'INGRESOS', 'LIBERTAD'];

interface StaggerProps {
  children: React.ReactNode;
  visible: boolean;
  delayMs?: number;
  className?: string;
  style?: React.CSSProperties;
}

const Stagger: React.FC<StaggerProps> = ({ children, visible, delayMs = 0, className = '', style = {} }) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${delayMs}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollProgress, canvasLive } = useVideoScrub(videoRef, canvasRef, VIDEO_URL, containerRef);

  const [menuOpen, setMenuOpen] = useState(false);
  const [navEntered, setNavEntered] = useState(false);

  // Trigger navbar entrance after 200ms
  useEffect(() => {
    const timer = setTimeout(() => setNavEntered(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Color flips at p > 0.55: DARK -> white
  const isDarkScene = scrollProgress > 0.55;
  const navColor = isDarkScene ? '#FFFFFF' : DARK;

  // Section Opacities
  // s1Opacity: p < 0.20 -> 1, else -> max(0, 1 - (p - 0.20) / 0.08)
  const s1Opacity = scrollProgress < 0.2 ? 1 : Math.max(0, 1 - (scrollProgress - 0.2) / 0.08);

  // s2Opacity: p < 0.32 -> 0, p < 0.40 -> (p - 0.32) / 0.08, p < 0.55 -> 1, else -> max(0, 1 - (p - 0.55) / 0.08)
  const s2Opacity =
    scrollProgress < 0.32
      ? 0
      : scrollProgress < 0.4
      ? (scrollProgress - 0.32) / 0.08
      : scrollProgress < 0.55
      ? 1
      : Math.max(0, 1 - (scrollProgress - 0.55) / 0.08);

  // s3Opacity: p < 0.67 -> 0, p < 0.75 -> (p - 0.67) / 0.08, else -> 1
  const s3Opacity =
    scrollProgress < 0.67
      ? 0
      : scrollProgress < 0.75
      ? (scrollProgress - 0.67) / 0.08
      : 1;

  const s1Visible = s1Opacity > 0.3;
  const s2Visible = s2Opacity > 0.3;
  const s3Visible = s3Opacity > 0.3;

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#070a13] selection:bg-[#1D3045] selection:text-white">
      {/* Sticky Full-Viewport Scene */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        
        {/* 1. Underlying Video Element */}
        <video
          ref={videoRef}
          src={VIDEO_URL}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* 2. Decoded Frame Canvas */}
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-300 ${
            canvasLive ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* 3. Overlay Layer */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between">
          
          {/* NAVBAR */}
          <nav className="absolute top-0 inset-x-0 z-50 pointer-events-auto px-6 sm:px-8 md:px-12 pt-8 sm:pt-12 pb-6 flex items-center justify-between transition-colors duration-500">
            
            {/* Mobile Hamburger (<lg) */}
            <div className="flex lg:hidden items-center">
              <button
                type="button"
                aria-label="Abrir menú"
                onClick={() => setMenuOpen(true)}
                className="flex flex-col justify-center items-start cursor-pointer group"
                style={{ gap: '5px' }}
              >
                <span
                  className="transition-colors duration-500 rounded-full"
                  style={{ width: '24px', height: '2px', backgroundColor: navColor }}
                />
                <span
                  className="transition-colors duration-500 rounded-full"
                  style={{ width: '24px', height: '2px', backgroundColor: navColor }}
                />
                <span
                  className="transition-colors duration-500 rounded-full"
                  style={{ width: '16px', height: '2px', backgroundColor: navColor }}
                />
              </button>
            </div>

            {/* Desktop Left Cluster (lg+) */}
            <div className="hidden lg:flex items-center gap-8 xl:gap-10">
              {NAV_LINKS.map((link, i) => {
                const isActive = i === 0;
                return (
                  <div
                    key={link}
                    className="relative cursor-pointer"
                    style={{
                      opacity: navEntered ? 1 : 0,
                      transform: navEntered ? 'translateY(0)' : 'translateY(-12px)',
                      transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      transitionDelay: `${i * 80 + 100}ms`,
                    }}
                  >
                    <span
                      className="text-xs tracking-[0.15em] uppercase font-medium hover:opacity-70 transition-colors duration-500"
                      style={{ color: navColor }}
                    >
                      {link}
                    </span>
                    {isActive && (
                      <span
                        className="absolute -bottom-3 left-0 w-full transition-colors duration-500"
                        style={{ height: '2px', backgroundColor: navColor }}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Cluster */}
            <div
              className="flex items-center gap-5 sm:gap-6"
              style={{
                opacity: navEntered ? 1 : 0,
                transform: navEntered ? 'translateY(0)' : 'translateY(-12px)',
                transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: '500ms',
              }}
            >
              {/* INFO with circle */}
              <div className="hidden sm:flex items-center gap-2 cursor-pointer group">
                <span
                  className="text-xs tracking-[0.2em] uppercase font-medium transition-colors duration-500"
                  style={{ color: navColor }}
                >
                  INFO
                </span>
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-500"
                  style={{ backgroundColor: navColor }}
                >
                  <Info
                    size={10}
                    style={{ color: isDarkScene ? DARK : '#FFFFFF' }}
                    className="transition-colors duration-500"
                  />
                </div>
              </div>

              {/* MENU */}
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="text-xs tracking-[0.2em] uppercase font-medium hover:opacity-70 transition-colors duration-500 cursor-pointer"
                style={{ color: navColor }}
              >
                MENU
              </button>
            </div>
          </nav>

          {/* SEQUENTIAL CONTENT SECTIONS */}
          <div className="relative w-full h-full">
            
            {/* SECTION 1 — THE GOAL */}
            <section
              className="absolute inset-0 flex items-center px-6 sm:px-8 md:px-20 lg:px-32 transition-opacity duration-100 ease-out"
              style={{
                opacity: s1Opacity,
                pointerEvents: s1Opacity > 0.5 ? 'auto' : 'none',
              }}
            >
              <div className="w-full max-w-4xl">
                <Stagger visible={s1Visible} delayMs={0}>
                  <h1
                    className="text-[clamp(2rem,5vw,5rem)] font-light uppercase leading-[1.2] tracking-tight"
                    style={{ color: DARK }}
                  >
                    Financial freedom
                  </h1>
                </Stagger>

                <Stagger visible={s1Visible} delayMs={150}>
                  <p
                    className="mt-6 text-sm tracking-[0.3em] uppercase font-medium"
                    style={{ color: '#1D304590' }}
                  >
                    Build stability. Buy back your time.
                  </p>
                </Stagger>
              </div>

              {/* Bottom-right button */}
              <div className="absolute bottom-12 right-6 sm:right-8 md:right-12">
                <Stagger visible={s1Visible} delayMs={300}>
                  <button
                    type="button"
                    aria-label="Avanzar"
                    onClick={() => {
                      if (containerRef.current) {
                        window.scrollTo({
                          top: (containerRef.current.offsetHeight - window.innerHeight) * 0.45,
                          behavior: 'smooth',
                        });
                      }
                    }}
                    className="w-12 h-12 rounded-full border flex items-center justify-center hover:opacity-70 transition-all duration-300 cursor-pointer"
                    style={{ borderColor: 'rgba(29, 48, 69, 0.5)', color: DARK }}
                  >
                    <ArrowRight size={18} />
                  </button>
                </Stagger>
              </div>
            </section>

            {/* SECTION 2 — BUILDING THE FOUNDATION */}
            <section
              className="absolute inset-0 flex items-center justify-center px-6 sm:px-8 transition-opacity duration-100 ease-out"
              style={{
                opacity: s2Opacity,
                pointerEvents: s2Opacity > 0.5 ? 'auto' : 'none',
              }}
            >
              <div className="max-w-[900px] w-full text-center">
                <Stagger visible={s2Visible} delayMs={0}>
                  <h2
                    className="text-[clamp(1.5rem,4.5vw,4.5rem)] font-extralight tracking-wide leading-[1.3] uppercase text-center"
                    style={{ color: DARK }}
                  >
                    Save with{' '}
                    <span style={{ color: 'rgba(29, 48, 69, 0.8)' }}>discipline</span>, invest with{' '}
                    <span style={{ color: 'rgba(29, 48, 69, 0.8)' }}>purpose</span>, and build income that gives you more control over your{' '}
                    <span style={{ color: 'rgba(29, 48, 69, 0.5)' }}>time</span>.
                  </h2>
                </Stagger>
              </div>

              {/* Right Column Controls */}
              <div className="absolute bottom-16 right-6 sm:right-8 md:right-12 flex flex-col items-center gap-4">
                <Stagger visible={s2Visible} delayMs={200}>
                  <button
                    type="button"
                    aria-label="Desplazar hacia abajo"
                    onClick={() => {
                      if (containerRef.current) {
                        window.scrollTo({
                          top: (containerRef.current.offsetHeight - window.innerHeight) * 0.85,
                          behavior: 'smooth',
                        });
                      }
                    }}
                    className="w-12 h-12 rounded-full border flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity"
                    style={{ borderColor: 'rgba(29, 48, 69, 0.4)', color: DARK }}
                  >
                    <ArrowDown size={18} />
                  </button>
                </Stagger>

                {/* Three Dots */}
                <Stagger visible={s2Visible} delayMs={350} className="flex flex-col items-center gap-2 mt-4">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: DARK }} />
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'rgba(29, 48, 69, 0.4)' }} />
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'rgba(29, 48, 69, 0.4)' }} />
                </Stagger>

                {/* ChevronUp */}
                <Stagger visible={s2Visible} delayMs={500} className="mt-2">
                  <button
                    type="button"
                    aria-label="Volver arriba"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity"
                    style={{ borderColor: 'rgba(29, 48, 69, 0.3)', color: 'rgba(29, 48, 69, 0.8)' }}
                  >
                    <ChevronUp size={16} />
                  </button>
                </Stagger>
              </div>
            </section>

            {/* SECTION 3 — THE RESULT */}
            <section
              className="absolute inset-0 flex items-center justify-end px-6 sm:px-8 md:px-20 lg:px-32 transition-opacity duration-100 ease-out"
              style={{
                opacity: s3Opacity,
                pointerEvents: s3Opacity > 0.5 ? 'auto' : 'none',
              }}
            >
              <div className="max-w-2xl w-full text-left">
                <Stagger visible={s3Visible} delayMs={0}>
                  <p className="text-white/60 text-lg tracking-wide mb-4 font-light">
                    Your time. Your choices.
                  </p>
                </Stagger>

                <Stagger visible={s3Visible} delayMs={150}>
                  <h2 className="text-[clamp(2rem,4vw,4rem)] font-light text-white leading-[1.2] uppercase tracking-wide mb-8">
                    Work toward freedom,
                    <br />
                    live on your terms.
                  </h2>
                </Stagger>

                <Stagger visible={s3Visible} delayMs={300}>
                  <div
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-4 cursor-pointer group"
                  >
                    <span className="text-sm tracking-[0.3em] text-white/80 uppercase font-medium">
                      Start building
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <ArrowRight size={16} className="text-gray-800" />
                    </div>
                  </div>
                </Stagger>
              </div>
            </section>

          </div>

        </div>

      </div>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-500 ease-modal-ease ${
          menuOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'
        }`}
        style={{ backgroundColor: DARK }}
      >
        <div
          className={`w-full h-full flex flex-col justify-between transition-transform duration-500 ease-modal-ease ${
            menuOpen ? 'translate-y-0' : '-translate-y-8'
          }`}
        >
          {/* Close button Top Right */}
          <div className="flex justify-end px-6 sm:px-8 pt-8 sm:pt-12">
            <button
              type="button"
              aria-label="Cerrar menú"
              onClick={() => setMenuOpen(false)}
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Links Centered Vertically */}
          <div className="flex flex-col justify-center px-8 sm:px-12 space-y-4 my-auto">
            {NAV_LINKS.map((link, i) => {
              const isActive = i === 0;
              return (
                <div
                  key={link}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                    opacity: menuOpen ? 1 : 0,
                    transition: 'opacity 0.5s ease, transform 0.5s ease',
                    transitionDelay: `${i * 60}ms`,
                  }}
                  className="cursor-pointer"
                >
                  <span
                    className={`text-2xl sm:text-3xl font-light tracking-wide uppercase transition-colors ${
                      isActive ? 'text-white' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {link}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Mobile Footer */}
          <div className="flex items-center gap-6 text-xs tracking-[0.2em] uppercase text-white/60 px-8 sm:px-12 pb-10">
            <span className="cursor-pointer hover:text-white transition-colors">NEWS</span>
            <span className="cursor-pointer hover:text-white transition-colors">CONTACT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
