// app/components/Footer.tsx
'use client';

import { Github, Twitter, Mail, Heart, Scale, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ug-black text-white mt-auto">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2">
              <Scale className="w-6 h-6 text-ug-yellow" />
              <h3 className="font-playfair text-xl font-bold">UGANDA LEGAL AI</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Empowering Ugandans with accessible legal information through artificial intelligence.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="text-gray-400 hover:text-ug-yellow transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-ug-yellow transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-ug-yellow transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-bold text-ug-yellow mb-3 tracking-wide">QUICK LINKS</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-ug-yellow transition-colors">ABOUT US</a></li>
              <li><a href="#" className="hover:text-ug-yellow transition-colors">HOW IT WORKS</a></li>
              <li><a href="#" className="hover:text-ug-yellow transition-colors">LEGAL SOURCES</a></li>
              <li><a href="#" className="hover:text-ug-yellow transition-colors">FAQ</a></li>
            </ul>
          </motion.div>

          {/* Legal Topics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-bold text-ug-yellow mb-3 tracking-wide">LEGAL TOPICS</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-ug-yellow transition-colors">CONSTITUTIONAL RIGHTS</a></li>
              <li><a href="#" className="hover:text-ug-yellow transition-colors">CRIMINAL LAW</a></li>
              <li><a href="#" className="hover:text-ug-yellow transition-colors">FAMILY LAW</a></li>
              <li><a href="#" className="hover:text-ug-yellow transition-colors">LAND & PROPERTY</a></li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-bold text-ug-yellow mb-3 tracking-wide">CONTACT</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Kampala, Uganda</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+256 XXX XXX XXX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@ugandalegal.ai</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="border-t border-gray-800 mt-8 pt-6 text-center"
        >
          <p className="text-gray-400 text-sm">
            © {currentYear} UGANDA LEGAL AI. ALL RIGHTS RESERVED.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            ⚠️ THIS AI PROVIDES LEGAL INFORMATION, NOT LEGAL ADVICE. ALWAYS CONSULT A QUALIFIED LAWYER.
          </p>
          <div className="flex justify-center gap-4 mt-3 text-xs text-gray-500">
            <a href="#" className="hover:text-ug-yellow transition-colors">PRIVACY POLICY</a>
            <span>•</span>
            <a href="#" className="hover:text-ug-yellow transition-colors">TERMS OF SERVICE</a>
            <span>•</span>
            <a href="#" className="hover:text-ug-yellow transition-colors">DISCLAIMER</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
