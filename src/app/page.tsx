'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const COLORS = {
  RED: '#C4A97C',
  BROWN: '#3A2E2E',
  BG_LIGHT: '#FDFCFB',
  BG_SECTION: '#FBF9F8',
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
      // Calculate scroll progress from 0 to 1 over the first 200px
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
          width: 28px;
          height: 22px;
          background: transparent;
          cursor: pointer;
          display: block;
          padding: 4px;
        }

        .burger input {
          display: none;
        }

        .burger span {
          display: block;
          position: absolute;
          height: 2.5px;
          width: 100%;
          background: ${scrolled ? COLORS.RED : 'white'};
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
          top: 20px;
          left: 3px;
        }

        @media (min-width: 768px) {
          .burger {
            width: 24px;
            height: 18px;
            padding: 0;
          }
          
          .burger span {
            height: 2px;
          }
          
          .burger input:checked ~ span:nth-of-type(3) {
            top: 17px;
          }
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
      
      <span className="ml-4 text-lg md:text-xl font-serif tracking-widest uppercase text-white flex">
        {['A', 's', 's', 'i', 's', 'i', ' ', 'W', 'o', 'h', 'n', 'e', 'n'].map((letter, index) => {
          const totalLetters = 13;
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

  const Hero = () => (
    <div className="relative h-screen overflow-hidden">
      <img
        src="/Laverna foto .JPG"
        alt="Assisi Wohnen"
        className="absolute inset-0 object-cover w-full h-full"
        style={{ filter: 'brightness(0.9) saturate(1.1) contrast(1.1)' }}
      />
      <div className="absolute inset-0 bg-black opacity-10"></div>

      <div className="absolute inset-0 flex items-center justify-center md:items-end md:justify-start md:pb-48 md:pl-20">
        <div className="flex flex-col items-center md:items-start text-center md:text-left px-6 md:px-0">
          <h1 
            className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-white leading-tight max-w-xl"
            style={{ textShadow: `1px 1px 0 ${COLORS.RED}, 2px 2px 0 ${COLORS.RED}, 3px 3px 5px rgba(0, 0, 0, 0.2), 4px 4px 5px rgba(0, 0, 0, 0.15)` }}
          >
            Assisi Wohnen
          </h1>
          <p 
            className="mt-5 md:mt-6 text-xl sm:text-2xl md:text-2xl lg:text-3xl font-serif text-white max-w-xl"
            style={{ textShadow: `1px 1px 0 ${COLORS.RED}, 2px 2px 3px rgba(0, 0, 0, 0.15)` }}
          >
            Dein klösterliches Zuhause bei Wien
          </p>
        </div>
      </div>
    </div>
  );

  const SectionHeading = ({ redText, serifText, center = false }: { redText?: string; serifText: string; center?: boolean }) => (
    <div className={center ? "text-center" : "text-left"}>
      {redText && (
        <p className="text-sm font-sans tracking-widest uppercase mb-1" style={{ color: COLORS.RED }}>
          {redText}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-serif leading-tight md:leading-none" style={{ color: COLORS.RED }}>
        {serifText}
      </h2>
    </div>
  );

  const ContentBlockOne = () => (
    <section className="py-16 md:py-20 px-6 md:px-20" style={{ backgroundColor: COLORS.BG_LIGHT }}>
      <style dangerouslySetInnerHTML={{__html: `
        .cta {
          border: none;
          background: none;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        .cta span {
          padding-bottom: 7px;
          letter-spacing: 3px;
          font-size: 13px;
          padding-right: 15px;
          text-transform: uppercase;
        }

        @media (min-width: 768px) {
          .cta span {
            letter-spacing: 4px;
            font-size: 14px;
          }
        }

        .cta svg {
          transform: translateX(-8px);
          transition: all 0.3s ease;
        }

        .cta:hover svg {
          transform: translateX(0);
        }

        .cta:active svg {
          transform: scale(0.9);
        }

        .hover-underline-animation {
          position: relative;
          color: ${COLORS.BROWN};
          padding-bottom: 20px;
        }

        .hover-underline-animation:after {
          content: "";
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: ${COLORS.BROWN};
          transform-origin: bottom right;
          transition: transform 0.25s ease-out;
        }

        .cta:hover .hover-underline-animation:after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }
      `}} />
      <div className="max-w-4xl mx-auto text-center">
        <SectionHeading
          center
          serifText="Über Assisi Wohnen"
        />
        <p className="mt-6 md:mt-10 text-base md:text-lg leading-relaxed font-light px-2" style={{ color: COLORS.BROWN }}>
          Assisi Wohnen ist ein Konzept des Franziskanerordens für gemeinnschaftlich orientiertes Wohnen und Leben an einem klösterlich geprägten Ort. Und das Franziskanerkloster Maria Enzersdorf, unmittelbar bei Wien, ist das erste Kloster, in dem dieses Konzept Wirklichkeit ist. Hier wohnen heute schon rund 10 junge Erwachsenene, die gemeinsam ihren Glauben teilen, den Ort neu zum blühen bringen und von der Spiritualität der Patres profitieren.
        </p>
        <a 
          href="#kontakt" 
          className="cta inline-flex items-center justify-center mt-6 md:mt-8 active:scale-95 transition-transform"
        >
          <span className="hover-underline-animation">Kontaktiere Uns</span>
          <svg width="15px" height="10px" viewBox="0 0 13 10">
            <path d="M1,5 L11,5" stroke={COLORS.BROWN} strokeWidth="2" fill="none"></path>
            <polyline points="8 1 12 5 8 9" stroke={COLORS.BROWN} strokeWidth="2" fill="none"></polyline>
          </svg>
        </a>
      </div>
    </section>
  );

  const ContentBlockTwo = () => {
    const [visibleCards, setVisibleCards] = useState(0);
    const sectionRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleScroll = () => {
        if (!sectionRef.current) return;

        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Berechne wie weit die Section im Viewport ist
        if (rect.top < windowHeight && rect.bottom > 0) {
          // Section ist im Viewport
          const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
          
          // Zeige Karten basierend auf Scroll-Fortschritt
          if (scrollProgress > 0.15 && visibleCards < 1) {
            setVisibleCards(1);
          } else if (scrollProgress > 0.25 && visibleCards < 2) {
            setVisibleCards(2);
          } else if (scrollProgress > 0.35 && visibleCards < 3) {
            setVisibleCards(3);
          }
        }
      };

      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [visibleCards]);

    const cards = [
      {
        title: "Gebet",
        text: "Das Gebet und die Hl. Messe sind die zentralen Elemente unserer Gemeinschaft. Wir vertiefen unseren Glauben in persönlichen Betrachtungen, wobei unsere Wochentagsliturgien an die Bedürfnisse der Berufstätigen angepasst sind.",
        logo: "/Beten.png"
      },
      {
        title: "Mission",
        text: "Wir wollen, dass Maria Enzersdorf ein Ort ist, an dem wir uns nicht selbst genügen, sondern auch für die Welt offen sind und uns für den Nächsten engagieren. Wir sind offen für Menschen, die zu uns kommen und wollen, dass das Evangelium spürbar wird.",
        logo: "/Mission.png"
      },
      {
        title: "Geschwisterlichkeit",
        text: "Wir gehen unseren Weg in aller Individualität gemeinsam. Die Bewohner bringen sich ein in gemeinschaftliche Aktivitäten, wie zB. unseren Garten, Holzverarbeitung und geistige Impulse. Wie bemühen uns um einen einfachen und bewussten Lebensstil.",
        logo: "/Geminschaft.png"
      }
    ];

    return (
      <section ref={sectionRef} className="py-16 md:py-20 px-6 md:px-20" style={{ backgroundColor: COLORS.BG_SECTION }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          center
          serifText="Unsere Eckpfeiler"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-10 md:mt-16">
            {cards.map((card, index) => (
          <div 
                key={index}
                className="p-6 md:p-8 transition-all duration-700 hover:translate-y-[-4px] flex flex-col mx-auto w-full max-w-md md:max-w-none"
            style={{ 
                  borderRadius: '30px',
                  background: '#ffffff',
                  boxShadow: '15px 15px 30px #bebebe, -15px -15px 30px #ffffff',
                  minHeight: '320px',
                  opacity: index < visibleCards ? 1 : 0,
                  transform: index < visibleCards ? 'translateY(0)' : 'translateY(30px)',
                }}
              >
                <h3 className="text-xl md:text-2xl font-serif mb-3 md:mb-4 text-center" style={{ color: '#000000' }}>
                  {card.title}
            </h3>
            <p className="text-sm md:text-base leading-relaxed font-light mb-4 md:mb-6 flex-grow text-center" style={{ color: COLORS.BROWN }}>
                  {card.text}
            </p>
            <div className="flex justify-center items-center mt-auto" style={{ minHeight: '100px' }}>
              <img
                src={card.logo}
                alt={`${card.title} Logo`}
                className="h-20 md:h-24 w-auto object-contain"
              />
          </div>
          </div>
            ))}
        </div>
      </div>
    </section>
  );
  };

  const ContentBlockFour = () => (
    <section className="py-16 md:py-24 px-6 md:px-20" style={{ backgroundColor: COLORS.BG_LIGHT }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 md:hidden">
          <SectionHeading
            center
            serifText="Unser Charisma"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 md:order-1">
            <img
              src="/Franz.png"
              alt="Heiliger Franziskus"
              className="w-full h-auto object-cover rounded-md shadow-lg max-w-md mx-auto md:max-w-none"
            />
          </div>
          <div className="order-1 md:order-2">
            <div className="hidden md:block">
              <SectionHeading
                serifText="Unser Charisma"
              />
            </div>
            <p className="mt-0 md:mt-8 text-base md:text-lg leading-relaxed font-light text-center md:text-left px-2 md:px-0" style={{ color: COLORS.BROWN }}>
              Unsere spirituelle Ausrichtung hat ihr Fundament im Leben und Wirken des Heiligen Franziskus. Die franziskanische DNA prägt das gesamte Projekt: eine Haltung der Einfachheit, Achtsamkeit und Sinnorientierung.
            </p>
          </div>
        </div>
      </div>
    </section>
  );

  const Team = () => (
    <section id="team" className="py-16 md:py-24 px-6 md:px-20 border-t" style={{ backgroundColor: COLORS.BG_SECTION, borderColor: '#EDEAE8' }}>
      <div className="max-w-4xl mx-auto text-center">
        <SectionHeading
          center
          serifText="Team"
        />
        
        <div className="mt-8 md:mt-14 flex flex-col items-center gap-4 md:gap-6">
          <div className="flex justify-center opacity-90">
            <img
              src="/Romed.png"
              alt="Romed Neurohr"
              className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full shadow-md"
            />
          </div>
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-serif" style={{ color: COLORS.RED }}>
              Romed Neurohr
            </h3>
            <p className="mt-1 text-sm md:text-base font-light" style={{ color: COLORS.BROWN }}>
              Hausleiter
            </p>
          </div>
        </div>
      </div>
    </section>
  );

  const Standort = () => {
    const images = [
      { src: "/RP1.png", alt: "Standort Maria Enzersdorf" },
      { src: "/Kirche.png", alt: "Kirche" },
      { src: "/Innenhof.png", alt: "Innenhof" },
      { src: "/Garten.png", alt: "Garten" }
    ];

    return (
      <section className="py-16 md:py-20 px-6 md:px-20" style={{ backgroundColor: COLORS.BG_LIGHT }}>
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            center
            serifText="Standort"
          />
          <div className="mt-10 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-center md:text-left order-1 md:order-1">
              <p className="text-base md:text-lg leading-relaxed font-light px-2 md:px-0" style={{ color: COLORS.BROWN }}>
                Das Franziskanerkloster Maria Enzersdorf liegt ruhig am Fuß des Liechtensteinparks, nahe der Wiener Stadtgrenze. Es ist gut mit öffentlichen Verkehrsmitteln und dem Auto erreichbar und bietet in unmittelbarer Umgebung Wege für Stille, Gebet und Spaziergänge.
              </p>
            </div>
            <div className="flex justify-center w-full order-2 md:order-2">
              <Carousel className="w-full max-w-full md:max-w-sm px-12 md:px-0">
                <CarouselContent>
                  {images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card className="border-0 shadow-none">
                          <CardContent className="flex aspect-square items-center justify-center p-0 overflow-hidden rounded-lg">
                            <img
                              src={image.src}
                              alt={image.alt}
                              className="w-full h-full object-cover"
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const Initiativen = () => (
    <section className="py-16 md:py-32 px-6 md:px-20" style={{ backgroundColor: COLORS.BG_SECTION }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          center
          serifText="Initiativen"
        />
        
        <div className="mt-10 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-center md:text-left">
            <div className="mb-6 md:mb-8 flex justify-center md:justify-start">
              <img
                src="/EMCLogo.png"
                alt="European Mission Campus Logo"
                className="h-12 md:h-16 w-auto object-contain"
                style={{ filter: 'brightness(0) saturate(0)' }}
              />
            </div>
            
            <p className="text-base md:text-lg leading-relaxed font-light mb-3 md:mb-4 px-2 md:px-0" style={{ color: COLORS.BROWN }}>
              Junge Katholiken ausbilden, ausrüsten und aussenden, damit sie das Evangelium verkünden und die Kirche in Europa erneuern.
            </p>
            <p className="text-base md:text-lg leading-relaxed font-light px-2 md:px-0" style={{ color: COLORS.BROWN }}>
              Eine neue Generation von missionarischen Jüngern inspirieren, ausbilden und aussenden, um Europa neu zu evangelisieren. Wir schaffen einen Raum, in dem junge Menschen ihre Berufung entdecken, in Gemeinschaft wachsen und ausgesandt werden können, um die Kultur durch das Evangelium zu verändern.
            </p>
          </div>

          <div className="flex justify-center">
            <img
              src="/EMCfoto.png"
              alt="European Mission Campus"
              className="w-full h-auto object-cover rounded-lg max-w-md md:max-w-none"
              style={{ maxHeight: '500px' }}
            />
          </div>
        </div>
      </div>
    </section>
  );

  const Footer = () => {
    return (
      <>
        <footer className="py-12 md:py-20 px-6 md:px-20 border-t" style={{ backgroundColor: COLORS.BG_LIGHT, borderColor: '#EDEAE8' }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <h3 className="text-xl md:text-2xl font-serif mb-4 md:mb-6" style={{ color: COLORS.RED }}>
                Assisi Wohnen
              </h3>
              <p className="text-sm md:text-base mb-2" style={{ color: COLORS.BROWN }}>
                Hauptstraße 5, 2344 Maria Enzersdorf, Österreich
              </p>
              <p className="text-sm md:text-base mb-4 md:mb-6" style={{ color: COLORS.BROWN }}>
                +43 676 845600100
              </p>
              <p className="text-xs md:text-sm text-gray-500">
                © 2024 Assisi Wohnen. Alle Rechte vorbehalten.
              </p>
            </div>
          </div>
        </footer>
        
        <div className="py-3 md:py-4 px-6 md:px-20 border-t" style={{ backgroundColor: COLORS.BG_SECTION, borderColor: '#EDEAE8' }}>
          <div className="max-w-6xl mx-auto flex justify-center gap-6 md:gap-8">
            <a 
              href="/impressum" 
              className="text-xs md:text-sm transition-colors hover:opacity-70 active:scale-95"
              style={{ color: COLORS.BROWN }}
            >
              Impressum
            </a>
            <a 
              href="#team" 
              className="text-xs md:text-sm transition-colors hover:opacity-70 active:scale-95"
              style={{ color: COLORS.BROWN }}
            >
              Kontakt
            </a>
          </div>
        </div>
      </>
    );
  };
  
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
            animation: 'backgroundFadeIn 0.25s ease-out'
          }}
        >
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes backgroundFadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            
            @keyframes fadeInDelayed {
              0% {
                opacity: 0;
              }
              30% {
                opacity: 0;
              }
              100% {
                opacity: 1;
              }
            }
            
            @keyframes slideInFromTop {
              0% {
                opacity: 0;
                transform: translateY(-10px);
              }
              30% {
                opacity: 0;
                transform: translateY(-10px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            @keyframes slideInScale {
              0% {
                opacity: 0;
                transform: scale(0.95) translateY(10px);
              }
              30% {
                opacity: 0;
                transform: scale(0.95) translateY(10px);
              }
              100% {
                opacity: 1;
                transform: scale(1) translateY(0);
              }
            }
          `}} />
          <div 
            className="absolute inset-0" 
            style={{ backgroundColor: 'rgba(253, 252, 251, 0.65)' }}
          ></div>
          <button 
            onClick={toggleMenu}
            className="absolute top-5 left-6 z-20 w-10 h-10 md:w-7 md:h-7 flex items-center justify-center transition-all duration-200 hover:opacity-70 active:scale-95"
            aria-label="Close menu"
            style={{ animation: 'fadeInDelayed 0.5s ease-out' }}
          >
            <svg 
              width="32" 
              height="32" 
              viewBox="0 0 28 28" 
              fill="none"
              stroke={COLORS.RED}
              strokeWidth="2.5"
              strokeLinecap="round"
              className="w-full h-full"
            >
              <line x1="7" y1="7" x2="21" y2="21" />
              <line x1="21" y1="7" x2="7" y2="21" />
            </svg>
          </button>
          <div 
            className="absolute top-5 left-20 md:left-16 z-10"
            style={{ animation: 'slideInFromTop 0.5s ease-out' }}
          >
            <h1 className="text-lg md:text-xl font-serif tracking-widest uppercase">
              <span style={{ color: COLORS.RED }}>Assisi</span>
              {' '}
              <span style={{ color: '#F5EFE6' }}>Wohnen</span>
            </h1>
          </div>
          <div 
            className="relative z-10 h-full flex items-center justify-center px-6"
            style={{ animation: 'slideInScale 0.5s ease-out' }}
          >
            <nav className="flex flex-col gap-10 md:gap-8 items-center w-full">
              <Link 
                href="/"
                onClick={toggleMenu}
                className="text-5xl md:text-6xl lg:text-7xl font-serif transition-all duration-300 hover:opacity-70 active:scale-95 text-center"
                style={{ color: COLORS.RED }}
              >
                Home
              </Link>
              <Link 
                href="/wohnen"
                onClick={toggleMenu}
                className="text-5xl md:text-6xl lg:text-7xl font-serif transition-all duration-300 hover:opacity-70 active:scale-95 text-center"
                style={{ color: COLORS.BROWN }}
              >
                Wohnen
              </Link>
            </nav>
          </div>
        </div>
      )}
      
      <main>
        <Hero />
        <ContentBlockOne />
        <ContentBlockTwo />
        <Standort />
        <Initiativen />
        <ContentBlockFour />
        <Team />
      </main>
      
      <Footer />
    </div>
  );
}
