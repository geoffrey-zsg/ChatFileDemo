// 文档相关类型
export interface Document {
  id: string;
  name: string;
  size: number;
  pageCount: number;
  status: DocumentStatus;
  uploadProgress?: number;
  processingStep?: ProcessingStep;
  createdAt: Date;
}

export type DocumentStatus =
  | 'uploading'
  | 'parsing'
  | 'chunking'
  | 'indexing'
  | 'ready'
  | 'failed';

export type ProcessingStep =
  | 'upload'
  | 'parse'
  | 'chunk'
  | 'index';

// 对话相关类型
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: Citation[];
  timestamp: Date;
  status?: 'sending' | 'streaming' | 'complete' | 'error';
}

export interface Citation {
  id: string;
  chunkId: string;
  pageNum: number;
  title: string;
  content: string;
  score: number;
}

// API 相关类型
export interface UploadResponse {
  documentId: string;
  status: DocumentStatus;
}

export interface ChatRequest {
  documentId: string;
  message: string;
  history: Message[];
}

export interface ChatResponse {
  message: string;
  citations: Citation[];
}
