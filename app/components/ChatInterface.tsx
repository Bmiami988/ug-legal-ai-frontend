// app/components/ChatInterface.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import MessageBubble from './MessageBubble';
import LoadingIndicator from './LoadingIndicator';
import { Message, LegalResponse } from '@/app/types';

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const clearChat = () => {
    setMessages([]);
    toast.success('Chat cleared');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-280px)]">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {messages.length === 0 ? (
          <WelcomeScreen onQuestionClick={(question) => {
            setInput(question);
            setTimeout(() => handleSubmit(new Event('submit') as any), 100);
          }} />
        ) : (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        )}
        {isLoading && <LoadingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="bg-white rounded-xl shadow-md border-2 border-ug-border focus-within:border-ug-red transition-colors">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question about Ugandan law..."
            rows={1}
            className="w-full px-4 py-3 resize-none focus:outline-none bg-transparent text-ug-black placeholder-ug-mid"
            disabled={isLoading}
          />
          <div className="flex justify-between items-center px-3 pb-2">
            <button
              type="button"
              onClick={clearChat}
              className="text-xs text-ug-mid hover:text-ug-red transition-colors"
            >
              Clear chat
            </button>
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-ug-red text-white p-2 rounded-lg hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function WelcomeScreen({ onQuestionClick }: { onQuestionClick: (question: string) => void }) {
  const exampleQuestions = [
    "What are my rights if arrested?",
    "How is property divided in a divorce?",
    "What are the penalties for theft?",
    "Can I be evicted from my land?",
    "What is the legal working age in Uganda?",
  ];

  return (
    <div className="bg-white rounded-xl border border-ug-border p-6 animate-fade-in">
      <h2 className="font-playfair text-xl font-bold text-ug-black mb-3">
        Welcome — how can I help you today?
      </h2>
      <p className="text-ug-mid mb-4">
        Ask me about Ugandan law in plain language. I draw directly from official legal texts.
      </p>
      <div className="mb-4">
        <p className="text-sm font-semibold text-ug-mid mb-2">Try asking:</p>
        <div className="flex flex-wrap gap-2">
          {exampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => onQuestionClick(q)}
              className="bg-ug-warm border border-ug-border rounded-md px-3 py-1.5 text-sm text-ug-black hover:bg-ug-yellow hover:border-ug-yellow transition-all"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-ug-warm border-l-4 border-ug-red p-3 rounded-r-md text-sm text-ug-mid">
        ⚠️ This tool provides legal information, not legal advice. Always consult a qualified lawyer for your specific situation.
      </div>
    </div>
  );
}