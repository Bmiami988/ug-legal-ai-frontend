// app/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import ChatInterface from '@/app/components/ChatInterface';
import TopicPills from '@/app/components/TopicPills';
import Footer from '@/app/components/Footer';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-ug-black border-b-4 border-ug-yellow shadow-lg">
        <div className="container-custom py-6">
          <div className="flex items-center gap-4">
            {/* Flag stripes */}
            <div className="flex flex-col w-2 h-16 overflow-hidden rounded">
              <div className="flex-1 bg-ug-black" />
              <div className="flex-1 bg-ug-yellow" />
              <div className="flex-1 bg-ug-red" />
              <div className="flex-1 bg-ug-black" />
              <div className="flex-1 bg-ug-yellow" />
              <div className="flex-1 bg-ug-red" />
            </div>
            
            <div className="flex-1">
              <h1 className="font-playfair text-2xl md:text-3xl font-bold text-white">
                ⚖️ Uganda Legal Awareness AI
              </h1>
              <p className="text-ug-yellow text-sm md:text-base font-medium">
                Grounded in Ugandan Constitution & Legal Framework
              </p>
            </div>
            
            <div className="bg-ug-red text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
              Beta
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 container-custom py-8">
        <TopicPills />
        <ChatInterface />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}