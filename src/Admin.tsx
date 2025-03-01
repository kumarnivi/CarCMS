import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Table from './components/home';
import Navbar from './components/navbar';
import Banner from './components/banner';
import Blog from './components/blogs';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './Admin/Dashboard';
import Home from './components/home'
import ResetPassword from './components/ResetPassword';
import { GoogleOAuthProvider } from '@react-oauth/google';


function admin() {
  return (
    <GoogleOAuthProvider clientId="1086572075880-mlcr0bsab9pj94us8jn3h8p1rk5ivbsp.apps.googleusercontent.com">
        <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
      <Route path='/dashboard' element={<Dashboard/>} />
   
   
      </Routes>
    </Router>
    </AuthProvider>

</GoogleOAuthProvider>
  
  );
}

export default admin;
