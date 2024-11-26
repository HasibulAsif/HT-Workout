import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {!isLandingPage && <Sidebar />}
      <main className={`flex-1 p-8 overflow-auto ${isLandingPage ? 'w-full' : ''}`}>
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;