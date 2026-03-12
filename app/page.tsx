"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { UploadArea } from "@/features/upload/UploadArea";
import { ProcessingStatus } from "@/features/upload/ProcessingStatus";
import { ChatArea } from "@/features/chat/ChatArea";
import { PDFViewer } from "@/features/pdf-viewer/PDFViewer";
import { useAppStore } from "@/lib/store";
import { useUpload } from "@/features/upload/hooks/useUpload";

export default function Home() {
  const { document } = useAppStore();
  const { uploadFile } = useUpload();
  const [selectedPage, setSelectedPage] = useState<number>(1);

  const isReady = document?.status === "ready";
  const isProcessing = document && document.status !== "ready" && document.status !== "failed";

  return (
    <div className="flex h-screen bg-[rgb(var(--background))]">
      <aside className="w-64 bg-[rgb(var(--surface))] border-r border-[rgb(var(--border))] flex flex-col">
        <div className="p-4 border-b border-[rgb(var(--border))]">
          <h1 className="text-xl font-bold text-[rgb(var(--foreground))]">ChatFile</h1>
          <p className="text-xs text-[rgb(var(--foreground-muted))] mt-1">Document Intelligence</p>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          {document ? (
            <div className="space-y-2">
              <div className="text-xs text-[rgb(var(--foreground-muted))] uppercase tracking-wider mb-2">Active Document</div>
              <div className="bg-[rgb(var(--surface-elevated))] p-3 rounded border border-[rgb(var(--accent))]">
                <div className="text-sm text-[rgb(var(--foreground))] font-medium truncate" title={document.name}>{document.name}</div>
                <div className="text-xs text-[rgb(var(--foreground-muted))] mt-2 space-y-1">
                  <div>{document.pageCount} pages</div>
                  <div>{Math.round(document.size / 1024 / 1024)} MB</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-xs text-[rgb(var(--foreground-muted))] text-center mt-8">
              Upload a document to get started
            </div>
          )}
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-12 bg-[rgb(var(--surface))] border-b border-[rgb(var(--border))] flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <span className="text-xs text-[rgb(var(--foreground-muted))]">
              {document ? `Status: ${document.status}` : 'No document loaded'}
            </span>
          </div>
          <button
            className="text-xs text-[rgb(var(--foreground-muted))] hover:text-[rgb(var(--foreground))] transition-colors px-3 py-1.5"
            aria-label="Open settings"
          >
            Settings
          </button>
        </header>

        {!document && (
          <div className="flex-1 flex">
            <UploadArea onFileSelect={uploadFile} />
          </div>
        )}

        {isProcessing && (
          <div className="flex-1 flex items-center justify-center">
            <ProcessingStatus status={document.status} progress={document.uploadProgress} />
          </div>
        )}

        {isReady && (
          <div className="flex-1 flex overflow-hidden">
            <div className="flex-[4] border-r border-[rgb(var(--border))] overflow-hidden">
              <ChatArea onCitationClick={setSelectedPage} />
            </div>
            <div className="flex-[6] overflow-hidden">
              <PDFViewer documentId={document.id} pdfUrl="/sample.pdf" totalPages={document.pageCount} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
