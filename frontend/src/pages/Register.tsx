import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../services/api';

export const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      await authApi.register({ username, email, password });
      navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
    } catch (err: any) {
      let errorMessage = 'Failed to register. Please try again.';
      if (err.response?.data?.detail) {
        errorMessage = err.response.data.detail;
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
          Create a new account
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                {isLoading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="text-center">
              <p className="text-sm text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};