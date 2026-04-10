// app/components/MessageBubble.tsx
'use client';

import { User, Bot, Clock, Copy, Check, ThumbsUp, ThumbsDown } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import SourceCard from './SourceCard';
import { Message } from '@/app/types';
import toast from 'react-hot-toast';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFeedback = (type: 'helpful' | 'not helpful') => {
    toast.success(`Thanks for your feedback!`, {
      icon: type === 'helpful' ? '👍' : '👎',
    });
  };

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-r from-ug-red to-red-700 rounded-full flex items-center justify-center shadow-lg">
          <Bot className="w-5 h-5 text-white" />
        </div>
      )}
      
      <div className={`max-w-[80%] ${isUser ? 'order-1' : 'order-2'}`}>
        <div className={`rounded-2xl p-4 ${
          isUser 
            ? 'bg-gradient-to-r from-ug-yellow to-yellow-500 text-ug-black' 
            : 'bg-white shadow-lg border border-ug-border'
        }`}>
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={tomorrow}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
                p: ({ children }) => <p className="text-ug-black mb-2 leading-relaxed">{children}</p>,
                strong: ({ children }) => <strong className="font-bold text-ug-black">{children}</strong>,
                ul: ({ children }) => <ul className="list-disc ml-4 mb-2 space-y-1">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal ml-4 mb-2 space-y-1">{children}</ol>,
                li: ({ children }) => <li className="text-ug-mid">{children}</li>,
                hr: () => <hr className="my-3 border-ug-border" />,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-ug-red pl-4 italic text-ug-mid">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
          
          {message.sources && message.sources.length > 0 && (
            <div className="mt-3">
              <details className="text-sm">
                <summary className="cursor-pointer text-ug-red font-semibold hover:text-red-700 transition-colors">
                  📚 LEGAL SOURCES ({message.sources.length})
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
        
        <div className="flex items-center gap-3 mt-1 ml-2">
          <div className="flex items-center gap-2 text-xs text-ug-mid">
            <Clock className="w-3 h-3" />
            <span>{formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}</span>
            {message.processingTime && !isUser && (
              <span className="ml-2">⚡ {message.processingTime.toFixed(1)}s</span>
            )}
          </div>
          
          {!isUser && (
            <div className="flex gap-1">
              <button
                onClick={handleCopy}
                className="p-1 hover:bg-ug-warm rounded transition-colors text-ug-mid hover:text-ug-red"
                title="Copy response"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              </button>
              <button
                onClick={() => handleFeedback('helpful')}
                className="p-1 hover:bg-ug-warm rounded transition-colors text-ug-mid hover:text-green-600"
                title="Helpful"
              >
                <ThumbsUp className="w-3 h-3" />
              </button>
              <button
                onClick={() => handleFeedback('not helpful')}
                className="p-1 hover:bg-ug-warm rounded transition-colors text-ug-mid hover:text-ug-red"
                title="Not helpful"
              >
                <ThumbsDown className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-r from-ug-yellow to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
          <User className="w-5 h-5 text-ug-black" />
        </div>
      )}
    </div>
  );
}
