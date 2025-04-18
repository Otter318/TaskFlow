import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  // Configure axios defaults
  axios.defaults.baseURL = 'http://localhost:8000';
  
  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const response = await axios.get('/users/me/', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data);
        } catch (error) {
          console.error('Failed to get user info:', error);
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setIsLoading(false);
    };
    
    initAuth();
  }, [token]);

  // Update axios authorization header when token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = async (username: string, password: string) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    
    const response = await axios.post('/token', formData);
    const { access_token } = response.data;
    
    setToken(access_token);
    
    // Get user info
    const userResponse = await axios.get('/users/me/', {
      headers: { Authorization: `Bearer ${access_token}` }
    });
    setUser(userResponse.data);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};