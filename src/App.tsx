import { Routes, Route } from 'react-router-dom';
import RouteHandler from '@/RouteHandler';

import useUIStore from '@/store/uiStore';

import { Workspace, BootScreen } from '@/components';

import './styles/index.scss';

function App() {
  const isBooting = useUIStore((state) => state.isBooting);

  return (
    <>
      <BootScreen />
      {!isBooting && (
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
