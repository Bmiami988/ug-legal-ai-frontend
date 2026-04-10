// app/components/MessageBubble.tsx
'use client';

import { User, Bot, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import SourceCard from './SourceCard';
import { Message } from '@/app/types';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-3 animate-slide-up ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-ug-red rounded-full flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
      )}
      
      <div className={`max-w-[80%] ${isUser ? 'order-1' : 'order-2'}`}>
        <div className={`rounded-lg p-4 ${
          isUser 
            ? 'bg-ug-warm border-l-4 border-l-ug-yellow' 
            : 'bg-white border-l-4 border-l-ug-red'
        } shadow-sm border border-ug-border`}>
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="text-ug-black mb-2">{children}</p>,
                strong: ({ children }) => <strong className="font-bold text-ug-black">{children}</strong>,
                ul: ({ children }) => <ul className="list-disc ml-4 mb-2">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal ml-4 mb-2">{children}</ol>,
                li: ({ children }) => <li className="text-ug-mid">{children}</li>,
                hr: () => <hr className="my-3 border-ug-border" />,
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
          
          {message.sources && message.sources.length > 0 && (
            <div className="mt-3">
              <details className="text-sm">
                <summary className="cursor-pointer text-ug-red font-semibold hover:text-red-700">
                  📚 Legal Sources ({message.sources.length})
                </summary>
                <div className="mt-2 space-y-2">
                  {message.sources.map((source, idx) => (
                    <SourceCard key={idx} source={source} />
                  ))}
                </div>
              </details>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2 mt-1 text-xs text-ug-mid">
          <Clock className="w-3 h-3" />
          <span>{formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}</span>
          {message.processingTime && !isUser && (
            <span className="ml-2">⚡ {message.processingTime.toFixed(1)}s</span>
          )}
        </div>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-ug-yellow rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-ug-black" />
        </div>
      )}
    </div>
  );
}