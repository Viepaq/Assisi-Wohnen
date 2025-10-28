'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const COLORS = {
  RED: '#C4A97C',
  BROWN: '#3A2E2E',
  BG_LIGHT: '#FDFCFB',
  BG_SECTION: '#FBF9F8',
};

export default function Wohnen() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
      setScrollProgress(Math.min(scrollY / 200, 1));
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const Header = ({ scrolled, scrollProgress, toggleMenu, isMenuOpen }: { scrolled: boolean; scrollProgress: number; toggleMenu: () => void; isMenuOpen: boolean }) => (
    <header 
      className="fixed top-0 left-0 right-0 z-20 flex items-center px-6 py-5 text-white transition-all duration-300"
    >
      <style dangerouslySetInnerHTML={{__html: `
        .burger {
          position: relative;
          width: 24px;
          height: 18px;
          background: transparent;
          cursor: pointer;
          display: block;
        }

        .burger input {
          display: none;
        }

        .burger span {
          display: block;
          position: absolute;
          height: 2px;
          width: 100%;
          background: ${COLORS.RED};
          border-radius: 9px;
          opacity: 1;
          left: 0;
          transform: rotate(0deg);
          transition: .25s ease-in-out;
        }

        .burger span:nth-of-type(1) {
          top: 0px;
          transform-origin: left center;
        }

        .burger span:nth-of-type(2) {
          top: 50%;
          transform: translateY(-50%);
          transform-origin: left center;
        }

        .burger span:nth-of-type(3) {
          top: 100%;
          transform-origin: left center;
          transform: translateY(-100%);
        }

        .burger input:checked ~ span:nth-of-type(1) {
          transform: rotate(45deg);
          top: 0px;
          left: 3px;
        }

        .burger input:checked ~ span:nth-of-type(2) {
          width: 0%;
          opacity: 0;
        }

        .burger input:checked ~ span:nth-of-type(3) {
          transform: rotate(-45deg);
          top: 17px;
          left: 3px;
        }
      `}} />
      
      <label className="burger" style={{ display: 'flex', alignItems: 'center' }}>
        <input 
          type="checkbox" 
          checked={isMenuOpen}
          onChange={toggleMenu}
          aria-label="Toggle navigation menu"
        />
        <span></span>
        <span></span>
        <span></span>
      </label>
      
      <span className="ml-4 text-xl font-serif tracking-widest uppercase flex" style={{ color: COLORS.RED }}>
        {['W', 'o', 'h', 'n', 'e', 'n'].map((letter, index) => {
          const totalLetters = 6;
          const fadeStart = index / totalLetters * 0.6;
          const fadeEnd = fadeStart + 0.4;
          const opacity = scrollProgress <= fadeStart ? 1 : scrollProgress >= fadeEnd ? 0 : 1 - (scrollProgress - fadeStart) / (fadeEnd - fadeStart);
          
          return (
            <span
              key={index}
              className="inline-block transition-opacity duration-100"
              style={{
                opacity: opacity
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          );
        })}
      </span>
    </header>
  );

  return (
    <div className="font-sans min-h-screen antialiased" style={{ backgroundColor: COLORS.BG_LIGHT }}>
      <Header scrolled={scrolled} scrollProgress={scrollProgress} toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-30"
          style={{ 
            backgroundImage: 'url(/Menucomic.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
          `}} />
          <div 
            className="absolute inset-0" 
            style={{ backgroundColor: 'rgba(253, 252, 251, 0.65)' }}
          ></div>
          <button 
            onClick={toggleMenu}
            className="absolute top-5 left-6 z-20 w-7 h-7 flex items-center justify-center transition-all duration-200 hover:opacity-70"
            aria-label="Close menu"
          >
            <svg 
              width="28" 
              height="28" 
              viewBox="0 0 28 28" 
              fill="none"
              stroke={COLORS.RED}
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="7" y1="7" x2="21" y2="21" />
              <line x1="21" y1="7" x2="7" y2="21" />
            </svg>
          </button>
          <div className="absolute top-5 left-16 z-10">
            <h1 className="text-xl font-serif tracking-widest uppercase">
              <span style={{ color: COLORS.RED }}>Assisi</span>
              {' '}
              <span style={{ color: '#F5EFE6' }}>Wohnen</span>
            </h1>
          </div>
          <div className="relative z-10 h-full flex items-center justify-center">
            <nav className="flex flex-col gap-8 items-center">
              <Link 
                href="/"
                className="text-6xl md:text-7xl font-serif transition-all duration-300 hover:opacity-70"
                style={{ color: COLORS.BROWN }}
              >
                Home
              </Link>
              <Link 
                href="/wohnen"
                className="text-6xl md:text-7xl font-serif transition-all duration-300 hover:opacity-70"
                style={{ color: COLORS.RED }}
              >
                Wohnen
              </Link>
            </nav>
          </div>
        </div>
      )}
      
      <main>
        {/* Allgemeiner Text Bereich mit Garten Bild */}
        <section className="pt-32 pb-20 px-6 md:px-20" style={{ backgroundColor: COLORS.BG_LIGHT }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-serif mb-12 text-center" style={{ color: COLORS.RED }}>
              Über das Wohnen
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-lg leading-relaxed font-light mb-6" style={{ color: COLORS.BROWN }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                </p>
                <p className="text-lg leading-relaxed font-light" style={{ color: COLORS.BROWN }}>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
                </p>
              </div>
              <div className="flex items-start">
                <img
                  src="/Garten1.png"
                  alt="Garten"
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                  style={{ maxHeight: '300px', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Was wir bieten Bereich */}
        <section className="py-20 px-6 md:px-20" style={{ backgroundColor: COLORS.BG_SECTION }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-serif mb-16 text-center" style={{ color: COLORS.RED }}>
              Was wir bieten
            </h2>
            
            {/* Bullet Point 1 - Bild links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
              <div className="flex justify-center">
                <img
                  src="/Garten1.png"
                  alt="Angebot 1"
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                  style={{ maxWidth: '400px', maxHeight: '300px', objectFit: 'cover' }}
                />
              </div>
              <div>
                <div className="flex items-start">
                  <span 
                    className="mr-4 mt-1 text-2xl flex-shrink-0"
                    style={{ color: COLORS.RED }}
                  >
                    •
                  </span>
                  <div>
                    <h3 className="text-2xl font-serif mb-4" style={{ color: COLORS.RED }}>
                      Platzhalter Punkt 1
                    </h3>
                    <p className="text-lg leading-relaxed font-light" style={{ color: COLORS.BROWN }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bullet Point 2 - Bild rechts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
              <div className="order-2 md:order-1">
                <div className="flex items-start">
                  <span 
                    className="mr-4 mt-1 text-2xl flex-shrink-0"
                    style={{ color: COLORS.RED }}
                  >
                    •
                  </span>
                  <div>
                    <h3 className="text-2xl font-serif mb-4" style={{ color: COLORS.RED }}>
                      Platzhalter Punkt 2
                    </h3>
                    <p className="text-lg leading-relaxed font-light" style={{ color: COLORS.BROWN }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2 flex justify-center">
                <img
                  src="/Innenhof.png"
                  alt="Angebot 2"
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                  style={{ maxWidth: '400px', maxHeight: '300px', objectFit: 'cover' }}
                />
              </div>
            </div>

            {/* Bullet Point 3 - Bild links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center">
                <img
                  src="/Kirche.png"
                  alt="Angebot 3"
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                  style={{ maxWidth: '400px', maxHeight: '300px', objectFit: 'cover' }}
                />
              </div>
              <div>
                <div className="flex items-start">
                  <span 
                    className="mr-4 mt-1 text-2xl flex-shrink-0"
                    style={{ color: COLORS.RED }}
                  >
                    •
                  </span>
                  <div>
                    <h3 className="text-2xl font-serif mb-4" style={{ color: COLORS.RED }}>
                      Platzhalter Punkt 3
                    </h3>
                    <p className="text-lg leading-relaxed font-light" style={{ color: COLORS.BROWN }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Heimkriterien Bereich */}
        <section className="py-20 px-6 md:px-20" style={{ backgroundColor: COLORS.BG_LIGHT }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-serif mb-8 text-center" style={{ color: COLORS.RED }}>
              Heimkriterien
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-serif mb-3" style={{ color: COLORS.RED }}>
                  Kriterium 1
                </h3>
                <p className="text-lg leading-relaxed font-light" style={{ color: COLORS.BROWN }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-serif mb-3" style={{ color: COLORS.RED }}>
                  Kriterium 2
                </h3>
                <p className="text-lg leading-relaxed font-light" style={{ color: COLORS.BROWN }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-serif mb-3" style={{ color: COLORS.RED }}>
                  Kriterium 3
                </h3>
                <p className="text-lg leading-relaxed font-light" style={{ color: COLORS.BROWN }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-20 px-6 md:px-20 border-t" style={{ backgroundColor: COLORS.BG_LIGHT, borderColor: '#EDEAE8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h3 className="text-2xl font-serif mb-6" style={{ color: COLORS.RED }}>
              Assisi Wohnen
            </h3>
            <p className="text-base mb-2" style={{ color: COLORS.BROWN }}>
              Hauptstraße 5, 2344 Maria Enzersdorf, Österreich
            </p>
            <p className="text-base mb-6" style={{ color: COLORS.BROWN }}>
              +43 676 845600100
            </p>
            <p className="text-sm text-gray-500">
              © 2024 Assisi Wohnen. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </footer>
      
      <div className="py-4 px-6 md:px-20 border-t" style={{ backgroundColor: COLORS.BG_SECTION, borderColor: '#EDEAE8' }}>
        <div className="max-w-6xl mx-auto flex justify-center gap-8">
          <a 
            href="#impressum" 
            className="text-sm transition-colors hover:opacity-70"
            style={{ color: COLORS.BROWN }}
          >
            Impressum
          </a>
          <a 
            href="#kontakt" 
            className="text-sm transition-colors hover:opacity-70"
            style={{ color: COLORS.BROWN }}
          >
            Kontakt
          </a>
        </div>
      </div>
    </div>
  );
}

