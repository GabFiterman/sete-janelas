import { Routes, Route } from 'react-router-dom';
import RouteHandler from '@/RouteHandler';

import useUIStore from '@/store/uiStore';
import { useIsMobile } from '@/hooks';

import { Workspace, MobileFallback, BootScreen } from '@/components';

import './styles/index.scss';

function App() {
  const isMobile = useIsMobile();
  const isBooting = useUIStore((state) => state.isBooting);

  return (
    <>
      <BootScreen />
      {!isBooting && isMobile && <MobileFallback />}
      {!isBooting && !isMobile && (
        <div className="App">
          <Workspace />
          <Routes>
            <Route path="/c/*" element={<RouteHandler />} />
            <Route path="/" element={null} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
