import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Table from './components/home';
import Navbar from './components/navbar';
import Banner from './components/banner';
import Blog from './components/blogs';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './Admin/Dashboard';
import Home from './components/home';
import ResetPassword from './components/ResetPassword';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SearchResult from './pages/SearchResults'

function AppContent() {
  const location = useLocation();
  const hideNavbarRoutes = ['/dashboard']; // Add admin-related routes where you want to hide Navbar

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/card-details" element={<Table />} />
        <Route path="/" element={<Banner />} />
        <Route path="/home" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path='/search' element={<SearchResult/>} />
      </Routes>
    </>
  );
}

function UserApp() {
  return (
    <GoogleOAuthProvider clientId="1086572075880-mlcr0bsab9pj94us8jn3h8p1rk5ivbsp.apps.googleusercontent.com">
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default UserApp;
