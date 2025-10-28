#!/bin/bash

# Define constants
SOURCE_FILE="generated.tsx"
COMPONENTS_DIR="src/components"
PAGE_FILE="src/app/page.tsx"
CONSTANTS_FILE="${COMPONENTS_DIR}/constants.ts"
COMPONENTS=(
    "Header" 
    "Hero" 
    "SectionHeading" 
    "ContentBlockOne" 
    "ContentBlockTwo" 
    "ContentBlockThree" 
    "ContentBlockFour" 
    "Footer"
)

# --- Helper function to extract content based on markers using awk ---
extract_block() {
    local block_name=$1
    local start_marker="// --- START $block_name: "
    local end_marker="// --- END $block_name: "
    awk -v start="$start_marker" -v end="$end_marker" '
        $0 ~ start { recording = 1; next }
        $0 ~ end { recording = 0; next }
        recording
    ' "$SOURCE_FILE"
}

# --- Main Script Execution ---

echo "Starting component integration process..."

# 1. Create components directory if it doesn't exist
if [ ! -d "$COMPONENTS_DIR" ]; then
    mkdir -p "$COMPONENTS_DIR"
    echo "Created directory: $COMPONENTS_DIR"
fi

# 2. Extract COLORS constant to constants.ts
echo "Extracting COLORS constant..."
{
    echo "// Constants for theme colors and styles"
    extract_block "CONSTANTS: COLORS"
    echo "export default COLORS;"
} > "$CONSTANTS_FILE"
echo "Generated ${CONSTANTS_FILE}"


# 3. Extract and wrap individual components
for COMPONENT in "${COMPONENTS[@]}"; do
    TARGET_FILE="${COMPONENTS_DIR}/${COMPONENT}.tsx"
    echo "Extracting ${COMPONENT}..."
    
    # Start file with necessary imports
    {
        echo "import React from 'react';"
        # Import COLORS constant if not the constants file itself
        if [ "$COMPONENT" != "SectionHeading" ]; then 
            echo "import COLORS from '../components/constants';"
        fi
        
        # SectionHeading is used by all content blocks, import it globally for them
        if [[ "$COMPONENT" == ContentBlock* ]]; then
            echo "import SectionHeading from './SectionHeading';"
        fi
        
        # Extract the component function body
        extract_block "COMPONENT: ${COMPONENT}"
        
        # Export the component
        echo "export default $COMPONENT;"
    } > "$TARGET_FILE"
    echo "Generated ${TARGET_FILE}"
done

# 4. Create the main page.tsx
echo "Generating ${PAGE_FILE}..."

# Imports for page.tsx
PAGE_CONTENT=$(cat <<EOF
import React from 'react';
import { useState, useEffect } from 'react';
import COLORS from '../components/constants';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ContentBlockOne from '../components/ContentBlockOne';
import ContentBlockTwo from '../components/ContentBlockTwo';
import ContentBlockThree from '../components/ContentBlockThree';
import ContentBlockFour from '../components/ContentBlockFour';
import Footer from '../components/Footer';

// Define the main component which was previously 'App'
const AssisiWohnenHomePage = () => {
  
  // State for scroll effect and menu visibility
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Handlers
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  // Effect to monitor scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="font-sans min-h-screen antialiased" style={{ backgroundColor: COLORS.BG_LIGHT }}>
      
      {/* Header and Scroll Effect */}
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
        <Hero />
        <ContentBlockOne />
        <ContentBlockTwo />
        <ContentBlockThree />
        <ContentBlockFour />
      </main>
      <Footer />
    </div>
  );
};

export default AssisiWohnenHomePage;
EOF
)

echo "$PAGE_CONTENT" > "$PAGE_FILE"
echo "Successfully created and populated $PAGE_FILE with component structure."

echo "Integration complete. Please run the following manual step:"
echo "--------------------------------------------------------"
echo "MANUAL STEP: FONT CONFIGURATION (for visual match)"
echo "--------------------------------------------------------"
echo "To match the original design's aesthetic, you need to configure Playfair Display and Inter fonts."
echo "1. In 'src/app/layout.tsx', import the fonts from next/font/google:"
echo "   import { Inter, Playfair_Display } from 'next/font/google';"
echo "   "
echo "   const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });"
echo "   const playfairDisplay = Playfair_Display({ subsets: ['latin'], weight: '700', variable: '--font-playfair' });"
echo "   "
echo "2. Apply the classes to the root HTML tag in 'src/app/layout.tsx':"
echo "   <html lang='en' className={\`\${inter.variable} \${playfairDisplay.variable}\`}>"
echo "   "
echo "3. Add the following CSS to 'src/app/globals.css' to apply the fonts:"
echo "   .font-serif { font-family: var(--font-playfair), serif; }"
echo "   .font-sans { font-family: var(--font-inter), sans-serif; }"
echo "   "

echo "The application is now integrated. Run 'npm run dev' to view the result."
