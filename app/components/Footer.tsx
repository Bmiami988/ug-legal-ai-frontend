// app/components/Footer.tsx
'use client';

import { Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-ug-border mt-8">
      <div className="container-custom py-6">
        <div className="text-center">
          <p className="text-sm text-ug-mid">
            <strong className="text-ug-black">Uganda Legal AI</strong> &nbsp;·&nbsp; 
            Grounded Legal Intelligence &nbsp;·&nbsp;
            <a href="#" className="text-ug-red hover:underline">Disclaimer</a> &nbsp;·&nbsp;
            <a href="#" className="text-ug-red hover:underline">Privacy Policy</a>
          </p>
          <p className="text-xs text-ug-mid mt-2">
            This AI provides legal information, not legal advice. Always consult a qualified lawyer.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="#" className="text-ug-mid hover:text-ug-red transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="text-ug-mid hover:text-ug-red transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="text-ug-mid hover:text-ug-red transition-colors">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}