import React from 'react';

const App = () => {
  
  // --- CONSTANTS ---
  const COLORS = {
    // A muted, dusty red/rust color
    RED: '#B25F5F', 
    // Dark brown for text and titles
    BROWN: '#3A2E2E',
    // Very light beige/off-white background
    BG_LIGHT: '#FDFCFB', 
    // Slightly darker beige for the third section
    BG_SECTION: '#FBF9F8', 
  };
  
  // --- STATE AND HANDLERS ---
  const [scrolled, setScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // --- SUB-COMPONENTS (Defined within App scope to access COLORS) ---

  const Header = ({ scrolled, toggleMenu }) => (
    <header 
      className={`fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 text-white transition-all duration-300 ${
        scrolled ? 'shadow-md bg-black bg-opacity-30 backdrop-blur-sm' : '' 
      }`}
    >
      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleMenu} 
          className="p-2 -m-2 rounded-md hover:bg-white hover:bg-opacity-20 transition duration-150 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Toggle navigation menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
        <span className="text-xl font-serif tracking-widest uppercase">Assisi Wohnen</span>
      </div>
    </header>
  );

  const Hero = () => (
    <div className="relative h-[650px] md:h-[800px] overflow-hidden">
      <img
        src="https://placehold.co/1200x800/69455B/ffffff/jpg?text=Vienna+Skyline+Sunset"
        alt="Vienna skyline at sunset"
        className="absolute inset-0 object-cover w-full h-full"
        style={{ filter: 'brightness(0.9) saturate(1.1) contrast(1.1)' }}
        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/1200x800/69455B/ffffff/jpg?text=Vienna+Skyline+Sunset" }}
      />
      <div className="absolute inset-0 bg-black opacity-10"></div>

      <div className="absolute left-6 bottom-16 md:left-20 md:bottom-24">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight mb-8">
          WIENS<br />
          urbanes Hotel<br />
          im zweiten Bezirk
        </h1>
        <div className="w-10 h-1" style={{ backgroundColor: COLORS.RED }}></div>
      </div>
    </div>
  );

  const SectionHeading = ({ redText, serifText, center = false }) => (
    <div className={center ? "text-center" : "text-left"}>
      {redText && (
        <p className="text-sm font-sans tracking-widest uppercase mb-1" style={{ color: COLORS.RED }}>
          {redText}
        </p>
      )}
      <h2 className="text-4xl font-serif leading-none" style={{ color: COLORS.BROWN }}>
        {serifText}
      </h2>
    </div>
  );

  const ContentBlockOne = () => (
    <section className="py-20 px-6 md:px-20" style={{ backgroundColor: COLORS.BG_LIGHT }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          redText="Assisi Wohnen"
          serifText="Sei willkommen. | be welcome."
        />
        <p className="mt-8 text-lg text-gray-700 max-w-4xl leading-relaxed font-light" style={{ color: COLORS.BROWN }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at
          dignissim mauris. Sed vestibulum mi eget felis volutpat, vitae
          fermentum mi gravida. Duis at ipsum vel nisi accumsan luctus.
          Vestibulum iaculis, nisi id semper varius, enim leo gravida nisl,
          sit amet vulputate nulla sem quis orci. Nam ac nunc nec quam
          ultrices elementum.
        </p>
        <a href="#" className="inline-block mt-4 text-sm font-sans tracking-wider hover:opacity-80 uppercase" style={{ color: COLORS.RED, borderBottom: `1px solid ${COLORS.RED}` }}>
          Alle Zimmer ansehen
        </a>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div>
            <img
              src="https://placehold.co/600x400/DCC7C5/3A2E2E/jpg?text=Cozy+Bedroom"
              alt="A cozy hotel bedroom"
              className="w-full h-auto object-cover rounded-md"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/DCC7C5/3A2E2E/jpg?text=Cozy+Bedroom" }}
            />
            <a href="#" className="inline-block mt-4 text-xs font-sans tracking-wider uppercase" style={{ color: COLORS.RED, borderBottom: `1px solid ${COLORS.RED}` }}>
              Zu den Zimmern
            </a>
          </div>
          <div>
            <img
              src="https://placehold.co/600x400/C8CBC9/3A2E2E/jpg?text=Hotel+Facade"
              alt="Hotel exterior with classic facade"
              className="w-full h-auto object-cover rounded-md"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/C8CBC9/3A2E2E/jpg?text=Hotel+Facade" }}
            />
            <a href="#" className="inline-block mt-4 text-xs font-sans tracking-wider uppercase" style={{ color: COLORS.RED, borderBottom: `1px solid ${COLORS.RED}` }}>
              Die Lage
            </a>
          </div>
        </div>
      </div>
    </section>
  );

  const ContentBlockTwo = () => (
    <section className="py-20 px-6 md:px-20" style={{ backgroundColor: COLORS.BG_LIGHT }}>
      <div className="max-w-6xl mx-auto text-center">
        <SectionHeading
          center
          redText=""
          serifText="Frühstück im Assisi Wohnen"
        />
        
        <p className="mt-4 text-gray-700 font-sans leading-relaxed max-w-2xl mx-auto text-lg font-light" style={{ color: COLORS.BROWN }}>
          Sed vestibulum mi eget felis volutpat, vitae fermentum mi gravida. Duis at ipsum vel nisi accumsan luctus. Vestibulum iaculis, nisi id semper varius, enim leo gravida nisl.
        </p>

        <a href="#" className="inline-block mt-4 text-sm font-sans tracking-wider hover:opacity-80 uppercase" style={{ color: COLORS.RED, borderBottom: `1px solid ${COLORS.RED}` }}>
          Mehr über das Frühstück
        </a>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="flex justify-end">
            <img
              src="https://placehold.co/500x500/A0918F/ffffff/jpg?text=Coffee"
              alt="Coffee cups on a wooden table"
              className="w-full md:w-5/6 h-auto object-cover rounded-md"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/500x500/A0918F/ffffff/jpg?text=Coffee" }}
            />
          </div>
          <div className="flex justify-start">
            <img
              src="https://placehold.co/500x500/E8E3DF/ffffff/jpg?text=Breakfast"
              alt="Healthy breakfast bowls"
              className="w-full md:w-5/6 h-auto object-cover rounded-md"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/500x500/E8E3DF/ffffff/jpg?text=Breakfast" }}
            />
          </div>
        </div>
      </div>
    </section>
  );

  const ContentBlockThree = () => (
    <section className="py-20 px-6 md:px-20" style={{ backgroundColor: COLORS.BG_SECTION }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
        <div className="md:col-span-2">
          <SectionHeading
            redText=""
            serifText="Gastfreundschaft und Designbewusstsein"
          />
          <p className="mt-8 text-lg text-gray-700 leading-relaxed font-light" style={{ color: COLORS.BROWN }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at
            dignissim mauris. Sed vestibulum mi eget felis volutpat, vitae
            fermentum mi gravida. Duis at ipsum vel nisi accumsan luctus.
            Vestibulum iaculis, nisi id semper varius.
          </p>
          <a href="#" className="inline-block mt-4 text-sm font-sans tracking-wider hover:opacity-80 uppercase" style={{ color: COLORS.RED, borderBottom: `1px solid ${COLORS.RED}` }}>
            Unsere Geschichte
          </a>
        </div>
        <div className="md:col-span-1 flex justify-center md:justify-end">
          <img
            src="https://placehold.co/200x200/B25F5F/ffffff/png?text=Portrait"
            alt="Portrait of the hotel owner/designer"
            className="rounded-full w-48 h-48 object-cover border-4 border-white shadow-lg"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/200x200/B25F5F/ffffff/png?text=Portrait" }}
          />
        </div>
      </div>
    </section>
  );

  const ContentBlockFour = () => (
    <section className="py-20 px-6 md:px-20" style={{ backgroundColor: COLORS.BG_LIGHT }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <img
            src="https://placehold.co/600x400/DCC7C5/3A2E2E/jpg?text=Collaboration"
            alt="Two people collaborating on laptops"
            className="w-full h-auto object-cover rounded-md"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/DCC7C5/3A2E2E/jpg?text=Collaboration" }}
          />
        </div>
        <div>
          <SectionHeading
            redText="Meet-ups & Events"
            serifText="Der perfekte Raum für Ihre Ideen."
          />
          <p className="mt-8 text-lg text-gray-700 leading-relaxed font-light" style={{ color: COLORS.BROWN }}>
            Vestibulum iaculis, nisi id semper varius, enim leo gravida nisl,
            sit amet vulputate nulla sem quis orci. Nam ac nunc nec quam
            ultrices elementum. Aliquam at dignissim mauris.
          </p>
          <a href="#" className="inline-block mt-4 text-sm font-sans tracking-wider hover:opacity-80 uppercase" style={{ color: COLORS.RED, borderBottom: `1px solid ${COLORS.RED}` }}>
            Zu den events
          </a>
        </div>
      </div>
    </section>
  );

  const Footer = () => {
    const FooterLink = ({ children }) => (
      <a href="#" className="block mb-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
        {children}
      </a>
    );

    return (
      <footer className="py-20 px-6 md:px-20 border-t" style={{ backgroundColor: COLORS.BG_LIGHT, borderColor: '#EDEAE8' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-xl font-serif mb-4" style={{ color: COLORS.BROWN }}>
              <span className="font-bold">+</span> Assisi Wohnen
            </h3>
            <p className="text-sm mb-4 text-gray-700">
              Karmelitergasse 4, 1020 Wien
            </p>
            <p className="text-xs text-gray-500">
              © 2024 Assisi Wohnen.
              Alle Rechte vorbehalten.
            </p>
          </div>

          <div className="col-span-2 lg:col-span-1 flex justify-center items-center">
            <img
              src="https://placehold.co/150x150/B25F5F/ffffff/png?text=Map+Illustration"
              alt="Map illustration of the hotel's location"
              className="w-32 h-32 object-contain"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x150/B25F5F/ffffff/png?text=Map+Illustration" }}
            />
          </div>

          <div className="lg:col-span-1">
            <FooterLink>Kontakt</FooterLink>
            <FooterLink>Impressum</FooterLink>
            <FooterLink>AGB</FooterLink>
            <FooterLink>Jobs</FooterLink>
          </div>

          <div className="lg:col-span-1">
            <FooterLink>Presse</FooterLink>
            <FooterLink>Newsletter</FooterLink>
            <FooterLink>Datenschutz</FooterLink>
          </div>
        </div>
      </footer>
    );
  };
  
  // --- FINAL RENDER ---
  return (
    <div className="font-sans min-h-screen antialiased" style={{ backgroundColor: COLORS.BG_LIGHT }}>
      
      {/* Custom Tailwind/CSS simulation for the fonts */}
      <style>{`
        /* This simulates the font configuration needed for the design */
        /* NOTE: In a proper Next.js environment, this should be handled in globals.css and layout.tsx */
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        .font-sans {
          font-family: 'Inter', sans-serif;
        }
      `}</style>

      {/* RENDER HEADER */}
      <Header scrolled={scrolled} toggleMenu={toggleMenu} />
      
      {/* Menu Status Message (for demonstration purposes) */}
      {isMenuOpen && (
        <div 
          className="fixed top-20 right-4 z-50 p-3 bg-red-100 text-red-800 rounded-lg shadow-xl text-sm"
          onClick={toggleMenu}
        >
          Menu Clicked! (Click to close)
        </div>
      )}
      
      <main>
        {/* RENDER ALL CONTENT BLOCKS */}
        <Hero />
        <ContentBlockOne />
        <ContentBlockTwo />
        <ContentBlockThree />
        <ContentBlockFour />
      </main>
      
      {/* RENDER FOOTER */}
      <Footer />
    </div>
  );
};

export default App;
