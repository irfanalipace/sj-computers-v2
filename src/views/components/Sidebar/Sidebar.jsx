import { lazy, Suspense } from 'react';
const SidebarMenu = lazy(() => import('./SidebarMenu'));
import Loader from '@common/LoaderComponent/LoaderComponent';
import './Sidebar.css';

export default function Sidebar({ openState, toggleSidebar }) {
  return (
    <div>
      {openState && (
        <div className='sidebarOverlay' onClick={() => toggleSidebar()}></div>
      )}
      <div
        className='sideMenu-container'
        style={{ left: openState ? '0' : '-350px' }}>
        <div
          className='bg-white'
          style={{ width: openState ? '320px' : '0', height: '100%' }}>
          {openState && (
            <Suspense fallback={<Loader />}>
              <SidebarMenu
                openState={openState}
                toggleSidebar={toggleSidebar}
              />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
}
