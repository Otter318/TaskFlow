import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-white text-xl font-bold">
              Task Manager
            </Link>
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-300">Welcome, {user?.username}</span>
                <button
                  onClick={handleLogout}
                  className="rounded-md bg-gray-700 px-3 py-2 text-sm font-medium text-white hover:bg-gray-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="rounded-md bg-gray-700 px-3 py-2 text-sm font-medium text-white hover:bg-gray-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

