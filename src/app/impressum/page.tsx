'use client';

import React from 'react';

const COLORS = {
  RED: '#C4A97C',
  BROWN: '#3A2E2E',
  BG_LIGHT: '#FDFCFB',
};

export default function ImpressumPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.BG_LIGHT }}>
      <main className="py-24 px-6 md:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-serif mb-6" style={{ color: COLORS.RED }}>Impressum</h1>
          <p className="text-lg font-light" style={{ color: COLORS.BROWN }}>
            Platzhalter Impressum – Inhalte folgen.
          </p>
        </div>
      </main>
    </div>
  );
}


