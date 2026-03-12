"use client";

import { Brain, HelpCircle } from "lucide-react";

interface HeaderProps {
  documentName?: string;
  pageCount?: number;
  fileSize?: number;
}

export function Header({ documentName, pageCount, fileSize }: HeaderProps) {
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "";
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)}MB`;
  };

  return (
    <header className="border-b bg-white px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Brain className="w-6 h-6 text-blue-500" />
        <h1 className="text-lg font-semibold">ChatFile</h1>
      </div>

      <div className="flex-1 text-center text-sm text-gray-600">
        {documentName ? (
          <span>
            📄 {documentName}
            {pageCount && ` (${pageCount}页`}
            {fileSize && `, ${formatFileSize(fileSize)}`}
            {pageCount && ")"}
          </span>
        ) : (
          <span>暂未加载文档</span>
        )}
      </div>

      <button className="p-2 hover:bg-gray-100 rounded-lg" aria-label="帮助">
        <HelpCircle className="w-5 h-5 text-gray-600" />
      </button>
    </header>
  );
}
