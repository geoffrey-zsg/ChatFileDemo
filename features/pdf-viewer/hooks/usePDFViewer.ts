import { useState, useCallback } from 'react';
import { Citation } from '@/lib/types';

export function usePDFViewer(totalPages: number) {
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1);
  const [isExpanded, setIsExpanded] = useState(true);
  const [highlightedCitation, setHighlightedCitation] = useState<string | null>(null);

  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  const nextPage = useCallback(() => goToPage(currentPage + 1), [currentPage, goToPage]);
  const prevPage = useCallback(() => goToPage(currentPage - 1), [currentPage, goToPage]);

  const zoomIn = useCallback(() => setScale(s => Math.min(s + 0.25, 3)), []);
  const zoomOut = useCallback(() => setScale(s => Math.max(s - 0.25, 0.5)), []);
  const resetZoom = useCallback(() => setScale(1), []);

  const jumpToCitation = useCallback((citation: Citation) => {
    setCurrentPage(citation.pageNum);
    setHighlightedCitation(citation.id);
    setTimeout(() => setHighlightedCitation(null), 2000);
  }, []);

  const toggleExpand = useCallback(() => setIsExpanded(e => !e), []);

  return {
    currentPage,
    scale,
    isExpanded,
    highlightedCitation,
    goToPage,
    nextPage,
    prevPage,
    zoomIn,
    zoomOut,
    resetZoom,
    jumpToCitation,
    toggleExpand,
  };
}
