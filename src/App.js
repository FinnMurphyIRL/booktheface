// src/App.js
import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import AuthenticatedHome from './pages/AuthenticatedHome';
import Profile from './pages/Profile';
import Friends from './pages/Friends';
import SearchPage from './pages/SearchPage';
import './styles/global.css';

const PrivateRoute = ({ children }) => {
  const { auth, loading } = useContext(AuthContext);
  if (loading) {
    return <div>Loading...</div>;
  }
  return auth ? children : <Navigate to="/" replace />;
};

function App() {
  const { auth, loading } = useContext(AuthContext);

  useEffect(() => {
    console.log('Auth state:', auth);
    console.log('Loading state:', loading);
  }, [auth, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={auth ? <Navigate to="/home" replace /> : <Home />} />
            <Route path="/home" element={<PrivateRoute><AuthenticatedHome /></PrivateRoute>} />
            <Route path="/profile/:userId" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/friends" element={<PrivateRoute><Friends /></PrivateRoute>} />
            <Route path="/search" element={<PrivateRoute><SearchPage /></PrivateRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

function AppWithAuth() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AppWithAuth;