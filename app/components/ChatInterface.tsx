// app/components/ChatInterface.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Sparkles, Trash2, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import MessageBubble from './MessageBubble';
import LoadingIndicator from './LoadingIndicator';
import { Message, LegalResponse } from '@/app/types';

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Load session ID from localStorage
  useEffect(() => {
    const storedSession = localStorage.getItem('legal_ai_session');
    if (storedSession) {
      setSessionId(storedSession);
    } else {
      const newSession = Math.random().toString(36).substring(7);
      setSessionId(newSession);
      localStorage.setItem('legal_ai_session', newSession);
    }
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/legal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: userMessage.content,
          session_id: sessionId,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to get response');
      }

      const data: LegalResponse = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        sources: data.sources,
        timestamp: new Date(data.timestamp),
        processingTime: data.processing_time,
      };

      setMessages(prev => [...prev, assistantMessage]);
      toast.success('Response received!', {
        icon: '⚖️',
        duration: 2000,
      });
    } catch (error) {
      console.error('Error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to get response');
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again in a moment.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    if (messages.length > 0) {
      setMessages([]);
      toast.success('Chat cleared successfully');
    }
  };

  const copyChat = () => {
    const chatText = messages.map(m => 
      `${m.role.toUpperCase()}: ${m.content}`
    ).join('\n\n---\n\n');
    
    navigator.clipboard.writeText(chatText);
    setCopiedId('full');
    toast.success('Chat copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-ug-border">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-ug-black to-ug-dark px-6 py-4 border-b border-ug-yellow/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-ug-red to-red-700 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-playfair text-white font-bold">LEGAL ASSISTANT</h3>
              <p className="text-ug-yellow text-xs">Powered by AI • Grounded in Ugandan Law</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={copyChat}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/70 hover:text-white"
              title="Copy chat"
            >
              {copiedId === 'full' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={clearChat}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/70 hover:text-ug-red"
              title="Clear chat"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-ug-cream/30 to-white"
      >
        {messages.length === 0 ? (
          <WelcomeScreen />
        ) : (
          <AnimatePresence>
            {messages.map((message, idx) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <MessageBubble message={message} />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
        {isLoading && <LoadingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-ug-border bg-white">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question about Ugandan law..."
              rows={1}
              className="w-full px-4 py-3 pr-12 resize-none rounded-xl border-2 border-ug-border focus:border-ug-red focus:outline-none transition-colors text-ug-black placeholder-ug-mid"
              disabled={isLoading}
            />
            {input && (
              <div className="absolute right-3 bottom-3 text-xs text-ug-mid">
                {input.length}/500
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-ug-red to-red-700 text-white p-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            )}
          </button>
        </div>
        <div className="flex justify-between items-center mt-2 text-xs text-ug-mid">
          <div className="flex gap-3">
            <span>⚡ Instant responses</span>
            <span>📚 Source cited</span>
          </div>
          <span>Press Enter to send, Shift+Enter for new line</span>
        </div>
      </form>
    </div>
  );
}

function WelcomeScreen() {
  const exampleQuestions = [
    "WHAT ARE MY RIGHTS IF ARRESTED?",
    "HOW IS PROPERTY DIVIDED IN A DIVORCE?",
    "WHAT ARE THE PENALTIES FOR THEFT?",
    "CAN I BE EVICTED FROM MY LAND?",
    "WHAT IS THE LEGAL WORKING AGE IN UGANDA?",
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="w-20 h-20 bg-gradient-to-r from-ug-red to-ug-yellow rounded-full flex items-center justify-center mb-6"
      >
        <Scale className="w-10 h-10 text-white" />
      </motion.div>
      
      <h3 className="font-playfair text-2xl font-bold mb-2">WELCOME TO UGANDA LEGAL AI</h3>
      <p className="text-ug-mid mb-6 max-w-md">
        Ask any question about Ugandan law and get accurate, source-grounded answers instantly.
      </p>
      
      <div className="w-full max-w-lg">
        <p className="text-sm font-semibold text-ug-mid mb-3 text-left">TRY ASKING:</p>
        <div className="space-y-2">
          {exampleQuestions.map((q, idx) => (
            <motion.button
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => {
                const textarea = document.querySelector('textarea');
                if (textarea) {
                  textarea.value = q;
                  textarea.dispatchEvent(new Event('input', { bubbles: true }));
                }
              }}
              className="w-full text-left px-4 py-3 bg-ug-warm hover:bg-ug-yellow/30 rounded-lg transition-colors text-sm font-medium"
            >
              {q}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
