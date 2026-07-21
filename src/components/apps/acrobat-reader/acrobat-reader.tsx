import { AnimatePresence, motion } from 'framer-motion';

import useUIStore from '@/store/uiStore';
import { LeftPanel, PdfGallery, PdfViewer, RightPanel, SplashScreen, TopBar } from './components';
import { useAcrobatReader } from './hooks';

import './acrobat-reader.scss';

import type { FileSystemItem } from '@/constants/file-system-map';

export const AcrobatReader = ({ appContext, windowId }: { appContext?: FileSystemItem; windowId?: string }) => {
  const isMinimized = useUIStore((state) =>
    windowId ? state.windows.find((win) => win.id === windowId)?.status === 'minimized' : false
  );

  const {
    activeTool,
    currentPage,
    isSplash,
    numPages,
    selectedFile,
    zoomLevel,
    setActiveTool,
    setCurrentPage,
    setIsSplash,
    setNumPages,
    setSelectedFile,
    setZoomLevel,
  } = useAcrobatReader(appContext, windowId);

  return (
    <div className="acrobat-reader-container">
      <AnimatePresence>
        {isSplash ? (
          <SplashScreen onComplete={() => setIsSplash(false)} />
        ) : (
          <motion.div
            className="acrobat-reader-app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <TopBar
              activeTool={activeTool}
              currentPage={currentPage}
              numPages={numPages}
              zoomLevel={zoomLevel}
              onHome={() => setSelectedFile(null)}
              setActiveTool={setActiveTool}
              setCurrentPage={setCurrentPage}
              setZoomLevel={setZoomLevel}
            />

            <div className="acrobat-main-content">
              <LeftPanel />

              <div className="acrobat-center-panel">
                {selectedFile ? (
                  <PdfViewer
                    activeTool={activeTool}
                    currentPage={currentPage}
                    file={selectedFile}
                    zoomLevel={zoomLevel}
                    setCurrentPage={setCurrentPage}
                    setNumPages={setNumPages}
                    setZoomLevel={setZoomLevel}
                    isMinimized={isMinimized}
                  />
                ) : (
                  <PdfGallery onSelectFile={(uri) => setSelectedFile(uri)} />
                )}
              </div>

              <RightPanel />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
