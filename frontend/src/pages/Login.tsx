import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login(username, password);
      navigate('/');
    } catch (err: any) {
      let errorMessage = 'Failed to login. Please check your credentials.';
      if (err.response?.status === 401) {
        errorMessage = 'Invalid username or password.';
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-700">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-700 bg-gray-800 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-white"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-700 bg-gray-800 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-white"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="text-center">
              <p className="text-sm text-gray-400">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-indigo-400 hover:text-indigo-300">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};