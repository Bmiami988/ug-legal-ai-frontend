// app/components/FeaturesSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Zap, Shield, FileText, Globe, Clock, Users } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'INSTANT RESPONSES',
    description: 'Get answers to your legal questions in seconds, powered by advanced AI technology.',
    color: 'from-yellow-400 to-yellow-600',
  },
  {
    icon: Shield,
    title: 'ACCURATE & GROUNDED',
    description: 'Every response is backed by official Ugandan legal documents and sources.',
    color: 'from-red-500 to-red-700',
  },
  {
    icon: FileText,
    title: 'SOURCE CITATION',
    description: 'View the exact legal sources used to generate each answer.',
    color: 'from-ug-black to-gray-700',
  },
  {
    icon: Globe,
    title: 'COMPREHENSIVE COVERAGE',
    description: 'Covering Constitution, Penal Code, Land Act, Marriage Act, and more.',
    color: 'from-yellow-400 to-yellow-600',
  },
  {
    icon: Clock,
    title: '24/7 AVAILABLE',
    description: 'Access legal information anytime, anywhere, at no cost.',
    color: 'from-red-500 to-red-700',
  },
  {
    icon: Users,
    title: 'FOR EVERYONE',
    description: 'Designed for citizens, students, and legal professionals alike.',
    color: 'from-ug-black to-gray-700',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-white to-ug-cream">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 gradient-text">
            POWERFUL FEATURES
          </h2>
          <p className="text-ug-mid text-lg max-w-2xl mx-auto">
            Everything you need to understand Ugandan law in one intelligent platform
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-ug-border hover:border-ug-red/30">
                <div className={`w-14 h-14 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-playfair text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-ug-mid">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-8 border-t border-ug-border"
        >
          {[
            { number: '4,700+', label: 'LEGAL CHUNKS' },
            { number: '15+', label: 'LEGAL SOURCES' },
            { number: '< 3s', label: 'AVG RESPONSE' },
            { number: '24/7', label: 'AVAILABILITY' },
          ].map((stat, idx) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-sm font-semibold text-ug-mid tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
