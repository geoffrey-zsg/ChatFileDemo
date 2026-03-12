'use client';

import { Citation } from '@/lib/types';
import { usePDFViewer } from './hooks/usePDFViewer';
import { PDFControls } from './PDFControls';

interface PDFViewerProps {
  documentId: string;
  pdfUrl: string;
  totalPages: number;
  citations?: Citation[];
  onCitationClick?: (citation: Citation) => void;
}

export function PDFViewer({
  documentId,
  pdfUrl,
  totalPages,
  citations = [],
  onCitationClick,
}: PDFViewerProps) {
  const {
    currentPage,
    scale,
    isExpanded,
    highlightedCitation,
    goToPage,
    nextPage,
    prevPage,
    zoomIn,
    zoomOut,
    jumpToCitation,
    toggleExpand,
  } = usePDFViewer(totalPages);

  const handleCitationClick = (citation: Citation) => {
    jumpToCitation(citation);
    onCitationClick?.(citation);
  };

  if (!isExpanded) {
    return (
      <div className="border rounded-lg overflow-hidden">
        <PDFControls
          currentPage={currentPage}
          totalPages={totalPages}
          scale={scale}
          isExpanded={isExpanded}
          onPrevPage={prevPage}
          onNextPage={nextPage}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onToggleExpand={toggleExpand}
          onPageChange={goToPage}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col border rounded-lg overflow-hidden h-full">
      <PDFControls
        currentPage={currentPage}
        totalPages={totalPages}
        scale={scale}
        isExpanded={isExpanded}
        onPrevPage={prevPage}
        onNextPage={nextPage}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onToggleExpand={toggleExpand}
        onPageChange={goToPage}
      />

      <div className="flex-1 overflow-auto bg-gray-50 p-4">
        <div
          className="mx-auto bg-white shadow-lg"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
            transition: 'transform 0.2s',
          }}
        >
          <iframe
            src={`${pdfUrl}#page=${currentPage}`}
            className="w-full h-[800px] border-0"
            title={`PDF page ${currentPage}`}
          />
        </div>
      </div>

      {citations.length > 0 && (
        <div className="border-t p-3 bg-white max-h-48 overflow-y-auto">
          <h3 className="text-sm font-semibold mb-2">Citations</h3>
          <div className="space-y-2">
            {citations.map((citation) => (
              <button
                key={citation.id}
                onClick={() => handleCitationClick(citation)}
                className={`w-full text-left p-2 rounded text-sm hover:bg-gray-100 transition-colors ${
                  highlightedCitation === citation.id ? 'bg-yellow-100' : ''
                }`}
              >
                <div className="font-medium text-gray-900">{citation.title}</div>
                <div className="text-gray-600 text-xs">Page {citation.pageNum}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
