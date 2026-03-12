'use client';

import { DocumentStatus } from '@/lib/types';
import { CheckCircle2, Loader2 } from 'lucide-react';

interface ProcessingStatusProps {
  status: DocumentStatus;
  progress?: number;
}

const steps = [
  { key: 'uploading', label: '上传中' },
  { key: 'parsing', label: '解析文档' },
  { key: 'chunking', label: '分块处理' },
  { key: 'indexing', label: '建立索引' },
  { key: 'ready', label: '完成' },
];

export function ProcessingStatus({ status, progress }: ProcessingStatusProps) {
  const currentIndex = steps.findIndex(s => s.key === status);

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-8 bg-[rgb(var(--surface))] rounded-lg border border-[rgb(var(--border))]" role="status" aria-live="polite" aria-atomic="true">
      <div className="flex items-center justify-between border-b border-[rgb(var(--border))] pb-4">
        <div>
          <h3 className="text-base text-[rgb(var(--foreground))] font-semibold">Processing Document</h3>
          <p className="text-xs text-[rgb(var(--foreground-muted))] mt-1">Estimated time: ~2 minutes</p>
        </div>
        <div className="text-sm font-semibold text-[rgb(var(--accent))]">
          {currentIndex + 1}/{steps.length}
        </div>
      </div>

      {status === 'uploading' && progress !== undefined && (
        <div className="w-full bg-[rgb(var(--surface-elevated))] h-2 rounded-full overflow-hidden">
          <div
            className="bg-[rgb(var(--accent))] h-2 transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div className="grid grid-cols-5 gap-3">
        {steps.map((step, index) => (
          <div key={step.key} className="flex flex-col items-center gap-2">
            <div className={`w-full h-1 rounded-full transition-colors ${
              index < currentIndex ? 'bg-[rgb(var(--success))]' :
              index === currentIndex ? 'bg-[rgb(var(--accent))]' :
              'bg-[rgb(var(--surface-elevated))]'
            }`} />
            <div className="flex items-center gap-2">
              {index < currentIndex ? (
                <CheckCircle2 className="w-5 h-5 text-[rgb(var(--success))]" />
              ) : index === currentIndex ? (
                <Loader2 className="w-5 h-5 text-[rgb(var(--accent))] animate-spin" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-[rgb(var(--border))]" />
              )}
            </div>
            <span className={`text-xs text-center ${
              index <= currentIndex ? 'text-[rgb(var(--foreground))] font-medium' : 'text-[rgb(var(--foreground-muted))]'
            }`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
