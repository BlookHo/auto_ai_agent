import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';

import Navbar from './components/Navbar';
import Home from './components/Home';
import NewDiagnosis from './components/NewDiagnosis';
import Users from './components/users/Users';
import Login from './components/auth/Login';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Admin route component
const AdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsLoading(false);
          return;
        }
        
        const response = await fetch('/api/v1/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const userData = await response.json();
          setIsAdmin(userData.role === 'admin');
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAdmin();
  }, []);
  
  if (isLoading) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }
  
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

const App = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth={false} disableGutters sx={{ height: 'calc(100vh - 60px)' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          
          <Route path="/new" element={
            <ProtectedRoute>
              <NewDiagnosis />
            </ProtectedRoute>
          } />
          
          <Route path="/users" element={
            <ProtectedRoute>
              <AdminRoute>
                <Users />
              </AdminRoute>
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
