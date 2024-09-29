import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ProfileSettings from './components/pages/ProfileSettingsPage';
import LiveViewerDashboard from './components/pages/LiveViewerDashboardPage';
import Dashboard from './components/pages/Dashboard';
import LoginPage from './components/pages/LoginPage';
import React from 'react';

function App() {
  const isAuthenticated = !!localStorage.getItem('username');
  const location = useLocation();
  const navigate = useNavigate();

  const handleExitProfile = () => {
    navigate('/login');
  };

  const shouldShowSidebar = isAuthenticated && location.pathname !== '/login';

  return (
    <div className="flex bg-gray-900 text-gray-100 overflow-hidden">
      <div className="fixed z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
        <div className="absolute inset-0 backdrop-blue-sm" />
      </div>

      {shouldShowSidebar && <Sidebar />}

      {isAuthenticated && location.pathname !== '/login' && (
        <button
          onClick={handleExitProfile}
          className="absolute top-4 right-4 bg-blue-500 text-white py-2 px-4 rounded-lg">
          Exit Profile
        </button>
      )}

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/settings"
          element={isAuthenticated ? <ProfileSettings /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/liveviewer"
          element={isAuthenticated ? <LiveViewerDashboard /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to="/login" replace />} />{' '}
      </Routes>
    </div>
  );
}

export default App;
