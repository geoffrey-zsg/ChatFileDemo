'use client';

import { Citation } from '@/lib/types';
import { FileText } from 'lucide-react';

interface CitationListProps {
  citations: Citation[];
  onCitationClick?: (citation: Citation) => void;
}

export function CitationList({ citations, onCitationClick }: CitationListProps) {
  if (!citations.length) return null;

  return (
    <div className="mt-4 pt-4 border-t border-[rgb(var(--border))]">
      <div className="text-xs text-[rgb(var(--foreground-muted))] uppercase tracking-wider mb-2">References</div>
      <div className="space-y-1.5">
        {citations.map((citation, index) => (
          <button
            key={citation.id}
            onClick={() => onCitationClick?.(citation)}
            className="w-full text-left px-3 py-2 text-xs bg-[rgb(var(--surface-elevated))] hover:bg-[rgb(var(--border))] rounded border border-[rgb(var(--border))] hover:border-[rgb(var(--accent))] text-[rgb(var(--foreground))] transition-all"
            title={citation.title}
          >
            <div className="flex items-start gap-2">
              <span className="text-[rgb(var(--accent))] font-semibold">[{index + 1}]</span>
              <div className="flex-1 min-w-0">
                <span className="font-medium">Page {citation.pageNum}</span>
                <span className="text-[rgb(var(--foreground-muted))] ml-2 truncate">{citation.title}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
