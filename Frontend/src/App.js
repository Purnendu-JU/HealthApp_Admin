import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Nav from './Components/Nav';
import "./App.css";
import Login from './Components/login';
import Home from './Components/Home';
import PutItem from './Components/PutItems';
import PrivateRoute from './PrivateRoute';
import { Container } from "@mui/material";
import CreateAdmin from './Components/signup';
import ViewOrder from './Components/vieworder';
import Reviews from './Components/Review';

function Layout({ children }) {
  return (
    <Container>
      {children}
    </Container>
  );
}

function AppWrapper() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Update isLoggedIn on route change (login success case)
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [location]);

  return (
    <>
      {location.pathname !== '/login' && isLoggedIn && <Nav />}
      <Routes>
        <Route path="/login" element={<Container><Login /></Container>} />
        <Route path="/" element={
          <PrivateRoute>
            <Layout><Home /></Layout>
          </PrivateRoute>
        } />
        <Route path="/put-item" element={
          <PrivateRoute>
            <Layout><PutItem /></Layout>
          </PrivateRoute>
        } />
        <Route path="/create-account" element={
          <PrivateRoute>
            <Layout><CreateAdmin /></Layout>
          </PrivateRoute>
        } />
        <Route path="/view" element={
          <PrivateRoute>
            <Layout><ViewOrder /></Layout>
          </PrivateRoute>
        } />
        <Route path="/reviews" element={
          <PrivateRoute>
            <Layout><Reviews /></Layout>
          </PrivateRoute>
        } />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
