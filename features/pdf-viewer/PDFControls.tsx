'use client';

import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Minimize2 } from 'lucide-react';

interface PDFControlsProps {
  currentPage: number;
  totalPages: number;
  scale: number;
  isExpanded: boolean;
  onPrevPage: () => void;
  onNextPage: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onToggleExpand: () => void;
  onPageChange: (page: number) => void;
}

export function PDFControls({
  currentPage,
  totalPages,
  scale,
  isExpanded,
  onPrevPage,
  onNextPage,
  onZoomIn,
  onZoomOut,
  onToggleExpand,
  onPageChange,
}: PDFControlsProps) {
  return (
    <div className="flex items-center justify-between gap-4 p-2 bg-gray-100 border-b">
      <div className="flex items-center gap-2">
        <button
          onClick={onPrevPage}
          disabled={currentPage === 1}
          className="p-1 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1">
          <input
            type="number"
            value={currentPage}
            onChange={(e) => onPageChange(Number(e.target.value))}
            className="w-12 px-1 text-center border rounded"
            min={1}
            max={totalPages}
          />
          <span className="text-sm text-gray-600">/ {totalPages}</span>
        </div>

        <button
          onClick={onNextPage}
          disabled={currentPage === totalPages}
          className="p-1 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded"
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onZoomOut}
          className="p-1 hover:bg-gray-200 rounded"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-5 h-5" />
        </button>

        <span className="text-sm text-gray-600 min-w-[3rem] text-center">
          {Math.round(scale * 100)}%
        </span>

        <button
          onClick={onZoomIn}
          className="p-1 hover:bg-gray-200 rounded"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-5 h-5" />
        </button>

        <button
          onClick={onToggleExpand}
          className="p-1 hover:bg-gray-200 rounded ml-2"
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
        >
          {isExpanded ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
