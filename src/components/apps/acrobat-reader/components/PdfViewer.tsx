import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// NOTE: Set up the worker for pdfjs using Vite's ?url syntax to prevent bundling freezes
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const ZOOM_STEPS = [0.125, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 3.5, 4];

interface VirtualPageWrapperProps {
  pageNumber: number;
  zoomLevel: number;
  innerRef: (el: HTMLDivElement | null) => void;
}

const VirtualPageWrapper = ({ pageNumber, zoomLevel, innerRef }: VirtualPageWrapperProps) => {
  const localRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [pageSize, setPageSize] = useState<{ width: number; height: number } | null>(null);

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      localRef.current = node;
      innerRef(node);
    },
    [innerRef]
  );

  useEffect(() => {
    if (!localRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0].isIntersecting);
      },
      {
        rootMargin: '2000px',
      }
    );
    observer.observe(localRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={setRefs}
      className="acrobat-pdf-page-wrapper"
      style={{
        minHeight: pageSize ? `${pageSize.height * zoomLevel}px` : `${842 * zoomLevel}px`,
        minWidth: pageSize ? `${pageSize.width * zoomLevel}px` : `${595 * zoomLevel}px`,
      }}
    >
      {isVisible ? (
        <Page
          pageNumber={pageNumber}
          scale={zoomLevel}
          className="acrobat-pdf-page"
          renderTextLayer={true}
          renderAnnotationLayer={true}
          onLoadSuccess={(page) => {
            setPageSize({ width: page.originalWidth, height: page.originalHeight });
          }}
        />
      ) : (
        <div
          className="acrobat-pdf-page acrobat-pdf-page-placeholder"
          style={{
            width: pageSize ? `${pageSize.width * zoomLevel}px` : `${595 * zoomLevel}px`,
            height: pageSize ? `${pageSize.height * zoomLevel}px` : `${842 * zoomLevel}px`,
            background: '#fff',
          }}
        />
      )}
    </div>
  );
};

interface PdfViewerProps {
  file: string;
  zoomLevel: number;
  setZoomLevel: (zoom: number) => void;
  currentPage: number;
  setCurrentPage: (num: number) => void;
  setNumPages: (num: number) => void;
  activeTool: 'selection' | 'hand';
}

export const PdfViewer = ({
  file,
  zoomLevel,
  setZoomLevel,
  currentPage,
  setCurrentPage,
  setNumPages,
  activeTool,
}: PdfViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [internalNumPages, setInternalNumPages] = useState<number>(0);
  const pageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const internalPage = useRef<number>(1);

  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const scrollPos = useRef({ left: 0, top: 0 });

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setInternalNumPages(numPages);
    pageRefs.current = new Array(numPages).fill(null);
  };

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        if (e.deltaY < 0) {
          const nextZoom = ZOOM_STEPS.find((z) => z > zoomLevel) || 4;
          setZoomLevel(nextZoom);
        } else {
          const nextZoom = [...ZOOM_STEPS].reverse().find((z) => z < zoomLevel) || 0.125;
          setZoomLevel(nextZoom);
        }
      }
    },
    [zoomLevel, setZoomLevel]
  );

  const onMouseDown = (e: React.MouseEvent) => {
    if (activeTool !== 'hand' || !containerRef.current) return;
    const scrollParent = containerRef.current.parentElement;
    if (!scrollParent) return;
    isDragging.current = true;
    startPos.current = { x: e.pageX, y: e.pageY };
    scrollPos.current = { left: scrollParent.scrollLeft, top: scrollParent.scrollTop };
    containerRef.current.style.cursor = 'grabbing';
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || activeTool !== 'hand' || !containerRef.current) return;
    const scrollParent = containerRef.current.parentElement;
    if (!scrollParent) return;
    e.preventDefault();
    const dx = e.pageX - startPos.current.x;
    const dy = e.pageY - startPos.current.y;
    scrollParent.scrollLeft = scrollPos.current.left - dx;
    scrollParent.scrollTop = scrollPos.current.top - dy;
  };

  const onMouseUpOrLeave = () => {
    isDragging.current = false;
    if (containerRef.current && activeTool === 'hand') {
      containerRef.current.style.cursor = 'grab';
    }
  };

  useEffect(() => {
    if (internalPage.current !== currentPage) {
      const pageEl = pageRefs.current[currentPage - 1];
      if (pageEl) {
        pageEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        internalPage.current = currentPage;
      }
    }
  }, [currentPage]);

  useEffect(() => {
    const container = containerRef.current?.parentElement;
    if (!container || internalNumPages === 0) return;

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.top + containerRect.height / 2;

      let minDistance = Infinity;
      let closestPage = internalPage.current;

      pageRefs.current.forEach((pageEl, index) => {
        if (!pageEl) return;
        const rect = pageEl.getBoundingClientRect();
        const pageCenter = rect.top + rect.height / 2;
        const distance = Math.abs(pageCenter - containerCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestPage = index + 1;
        }
      });

      if (closestPage !== internalPage.current) {
        internalPage.current = closestPage;
        setCurrentPage(closestPage);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [internalNumPages, setCurrentPage]);

  const pages = Array.from(new Array(internalNumPages), (_, index) => (
    <VirtualPageWrapper
      key={`page_${index + 1}`}
      pageNumber={index + 1}
      zoomLevel={zoomLevel}
      innerRef={(el) => {
        pageRefs.current[index] = el;
      }}
    />
  ));

  return (
    <div
      className={`acrobat-pdf-viewer-container tool-${activeTool}`}
      ref={containerRef}
      onWheel={handleWheel}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUpOrLeave}
      onMouseLeave={onMouseUpOrLeave}
    >
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        className="acrobat-pdf-document"
        loading={<div className="acrobat-loading">Loading PDF...</div>}
      >
        {pages}
      </Document>
    </div>
  );
};
