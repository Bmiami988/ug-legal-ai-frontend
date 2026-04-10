// app/components/SourceCard.tsx
'use client';

import { FileText, TrendingUp } from 'lucide-react';
import { Source } from '@/app/types';

interface SourceCardProps {
  source: Source;
}

export default function SourceCard({ source }: SourceCardProps) {
  return (
    <div className="bg-ug-warm rounded-md p-3 border border-ug-border">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-ug-red" />
          <span className="font-semibold text-sm text-ug-black">{source.source}</span>
        </div>
        {source.relevance_score && (
          <div className="flex items-center gap-1 text-xs text-ug-mid">
            <TrendingUp className="w-3 h-3" />
            <span>Score: {source.relevance_score}</span>
          </div>
        )}
      </div>
      <p className="text-sm text-ug-mid line-clamp-3">{source.content}</p>
    </div>
  );
}