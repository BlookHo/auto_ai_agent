import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authenticating, setAuthenticating] = useState(false);

  const loadUser = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await authService.getCurrentUser();
        setUser(userData);
      }
    } catch (error) {
      console.error('Failed to load user:', error);
      // Clear invalid token
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (email, password) => {
    try {
      setAuthenticating(true);
      const response = await authService.login(email, password);
      
      if (response && response.user && response.token) {
        // Store the token
        localStorage.setItem('token', response.token);
        
        // Update user state
        setUser(response.user);
        return { success: true };
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Login failed:', error);
      return { 
        success: false, 
        error: typeof error === 'string' ? error : 'Login failed. Please check your credentials.' 
      };
    } finally {
      setAuthenticating(false);
    }
  };

  const register = async (email, password, name) => {
    try {
      setAuthenticating(true);
      const response = await authService.register(email, password, name);
      
      if (response && response.user && response.token) {
        // Store the token
        localStorage.setItem('token', response.token);
        
        // Update user state
        setUser(response.user);
        return { success: true };
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      return { 
        success: false, 
        error: typeof error === 'string' ? error : 'Registration failed. Please try again.' 
      };
    } finally {
      setAuthenticating(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
