// app/types/index.ts
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: Source[];
  timestamp: Date;
  processingTime?: number;
}

export interface Source {
  source: string;
  content: string;
  relevance_score?: string;
}

export interface LegalQuery {
  question: string;
  session_id?: string;
}

export interface LegalResponse {
  response: string;
  sources: Source[];
  source_type: 'cache' | 'generated';
  processing_time: number;
  timestamp: string;
  session_id: string;
}

export interface Topic {
  name: string;
  keywords: string[];
}

export interface ApiError {
  error: string;
  detail?: string;
  timestamp: string;
}