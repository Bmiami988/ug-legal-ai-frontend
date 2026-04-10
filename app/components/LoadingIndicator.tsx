// app/components/LoadingIndicator.tsx
'use client';

import { Loader2 } from 'lucide-react';

export default function LoadingIndicator() {
  return (
    <div className="flex gap-3 justify-start animate-slide-up">
      <div className="flex-shrink-0 w-8 h-8 bg-ug-red rounded-full flex items-center justify-center">
        <Loader2 className="w-5 h-5 text-white animate-spin" />
      </div>
      <div className="bg-white rounded-lg p-4 shadow-sm border border-ug-border">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-ug-red rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-ug-red rounded-full animate-pulse delay-100" />
          <div className="w-2 h-2 bg-ug-red rounded-full animate-pulse delay-200" />
          <span className="text-sm text-ug-mid ml-2">Researching legal documents...</span>
        </div>
      </div>
    </div>
  );
}