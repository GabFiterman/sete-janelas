import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import useWorkspace from './use-workspace';
import useUIStore from '@/store/uiStore';

import { FixedMenu, StartMenu, Window } from '@/components';
import { IconLinkLabel } from './components';

import './workspace.scss';

function Workspace() {
  const { workspaceIcons, windows, setViewport } = useUIStore();
  const { style, constraintsRef, handleIconClick } = useWorkspace();

  useEffect(() => {
    function handleResize() {
      setViewport(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [setViewport]);

  return (
    <div className="workspace" style={style} onMouseDown={() => handleIconClick()}>
      <div className="workspace-canvas">
        <AnimatePresence>
          {windows.map((window) => (
            <Window key={window.id} id={window.id} />
          ))}
        </AnimatePresence>

        <div className="workspace-canvas-icons" ref={constraintsRef}>
          {workspaceIcons.map((workspaceIcon) => {
            return (
              <IconLinkLabel
                key={`${workspaceIcon.path}_${workspaceIcon.dragVersion ?? 0}`}
                icon={workspaceIcon}
                constraintsRef={constraintsRef}
              />
            );
          })}
        </div>
      </div>
      <div className="workspace-floating-menu-container" onMouseDown={(e) => e.stopPropagation()}>
        <StartMenu />
      </div>
      <div className="workspace-fixed-menu-container" onMouseDown={(e) => e.stopPropagation()}>
        <FixedMenu />
      </div>
    </div>
  );
}

export default Workspace;
