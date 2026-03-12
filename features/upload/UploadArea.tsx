'use client';

import { useRef, useState } from 'react';
import { Upload, FileText } from 'lucide-react';

interface UploadAreaProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export function UploadArea({ onFileSelect, disabled }: UploadAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      onFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[rgb(var(--foreground))] mb-3">Document Analysis</h2>
          <p className="text-[rgb(var(--foreground-muted))]">Upload a PDF document to begin intelligent Q&A and content extraction</p>
        </div>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !disabled && inputRef.current?.click()}
          className={`
            border-2 rounded-lg cursor-pointer transition-all
            ${isDragging
              ? 'border-[rgb(var(--accent))] bg-[rgb(var(--surface))] shadow-lg'
              : 'border-[rgb(var(--border))] bg-[rgb(var(--surface))] hover:border-[rgb(var(--foreground-muted))]'
            }
          `}
        >
          <div className="p-8">
            <div className="flex items-start gap-6 mb-6">
              <div className="w-16 h-16 rounded-lg bg-[rgb(var(--surface-elevated))] flex items-center justify-center flex-shrink-0">
                <FileText className="w-8 h-8 text-[rgb(var(--accent))]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[rgb(var(--foreground))] mb-2">Upload Document</h3>
                <p className="text-sm text-[rgb(var(--foreground-muted))]">
                  Drag and drop your PDF file here, or click to browse from your computer
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-[rgb(var(--border))]">
              <button
                type="button"
                className="px-6 py-3 bg-[rgb(var(--accent))] text-[rgb(var(--background))] hover:opacity-90 transition-opacity font-medium rounded active:scale-95"
                onClick={(e) => {
                  e.stopPropagation();
                  inputRef.current?.click();
                }}
              >
                Select File
              </button>
              <div className="text-xs text-[rgb(var(--foreground-muted))]">
                PDF · Max 100MB · ~2 min processing
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
          <div className="bg-[rgb(var(--surface))] p-4 rounded-lg border border-[rgb(var(--border))]">
            <div className="text-[rgb(var(--foreground-muted))] text-xs mb-1">Supported Formats</div>
            <div className="text-[rgb(var(--foreground))]">PDF documents</div>
          </div>
          <div className="bg-[rgb(var(--surface))] p-4 rounded-lg border border-[rgb(var(--border))]">
            <div className="text-[rgb(var(--foreground-muted))] text-xs mb-1">File Size Limit</div>
            <div className="text-[rgb(var(--foreground))]">Maximum 100 MB</div>
          </div>
          <div className="bg-[rgb(var(--surface))] p-4 rounded-lg border border-[rgb(var(--border))]">
            <div className="text-[rgb(var(--foreground-muted))] text-xs mb-1">Processing Time</div>
            <div className="text-[rgb(var(--foreground))]">~2 minutes average</div>
          </div>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        onChange={handleChange}
        className="hidden"
        disabled={disabled}
      />
    </div>
  );
}
