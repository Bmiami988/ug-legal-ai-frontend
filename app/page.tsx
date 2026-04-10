// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ChatInterface from '@/app/components/ChatInterface';
import HeroSection from '@/app/components/HeroSection';
import FeaturesSection from '@/app/components/FeaturesSection';
import AnimatedBackground from '@/app/components/AnimatedBackground';

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    // Auto-scroll to chat when shown
    if (showChat) {
      setTimeout(() => {
        document.getElementById('chat-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [showChat]);

  return (
    <div className="relative">
      <AnimatedBackground />
      
      {/* Hero Section */}
      <HeroSection onGetStarted={() => setShowChat(true)} />
      
      {/* Features Section */}
      <div ref={ref}>
        {inView && <FeaturesSection />}
      </div>
      
      {/* Chat Interface Section */}
      <section id="chat-section" className="py-16 bg-gradient-to-b from-ug-cream to-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={showChat ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-ug-black mb-3">
                LEGAL ASSISTANT
              </h2>
              <p className="text-ug-mid text-lg">
                Ask questions about Ugandan law and get accurate, source-grounded answers
              </p>
            </div>
            <ChatInterface />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
