import React, { useState } from 'react';
import api from '../API/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // To decode JWT token

interface PopupProps {
  onClose: () => void;
}

const LoginRegisterPopup: React.FC<PopupProps> = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { setIsAuthenticated, setToken, setUserId } = useAuth();
  const [error, setError] = useState('');

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    role: '',
    profileImage: null as File | null,
  });

  // Handle Google Login
  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    try {
      const decoded: any = jwtDecode(credentialResponse.credential);
      console.log('Google User Info:', decoded);

      const response = await api.post('/auth/google-login', {
        token: credentialResponse.credential,
      });

      console.log('Login Successful:', response.data.role);
      toast.success('Google Login Successful');

      Cookies.set('token', response.data.token, { expires: 1 });
      setToken(response.data.token);
      setIsAuthenticated(true);

      if (response.data.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }

      onClose();
    } catch (error) {
      console.error('Google Login Error:', error);
      toast.error('Google Login Failed');
    }
  };

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', credentials, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Login Successful:', response.data.user);
      Cookies.set('token', response.data.token, { expires: 1 });
      Cookies.set('userid', response.data.id,  { expires:1 })
      setToken(response.data.token);
      setUserId(response.data.id)
      setIsAuthenticated(true);
      toast.success('Login Successfully');

      if (response.data.user === 'admin') {
        navigate('/dashboard'); 
      } else {
        navigate('/');
      }

      onClose();
    } catch (error: any) {
      console.error('Login Error:', error);
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  // Handle Registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('userName', formData.userName);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('role', formData.role);
    if (formData.profileImage) {
      formDataToSend.append('profileImage', formData.profileImage);
    }

    try {
      const response = await api.post('/auth/register', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Registration Successful:', response.data);
      toast.success('Registration Successful! You can now log in.');

      setIsLogin(true);
    } catch (error: any) {
      console.error('Registration Error:', error);
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-xl mx-auto relative overflow-hidden transition-all duration-500">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition duration-300"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="relative w-full h-full">
          <div className={`transition-transform duration-700 flex w-[200%] ${isLogin ? 'translate-x-0' : '-translate-x-1/2'}`}>
            {/* Login Form */}
            <div className="w-1/2 p-8 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-l-2xl min-h-[500px] flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full px-4 py-2 rounded-lg focus:outline-none text-gray-800" />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full px-4 py-2 rounded-lg focus:outline-none text-gray-800" />
                <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={() => toast.error('Google Sign-In Failed')} />
                <button type="submit" className="w-full py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-300">Login</button>
                {error && <p className="text-red-200 text-sm text-center">{error}</p>}
              </form>
              <p className="text-sm text-center mt-4">
                <span onClick={() => { onClose(); navigate('/reset-password'); }} className="text-yellow-300 hover:underline cursor-pointer">Forgot Password?</span>
              </p>
              <p className="text-sm text-center mt-4">
                Don't have an account? <span onClick={() => setIsLogin(false)} className="text-yellow-300 hover:underline cursor-pointer">Register here</span>
              </p>
            </div>

            {/* Registration Form */}
            <div className="w-1/2 p-8 bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-r-2xl min-h-[500px] flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
              <form onSubmit={handleRegister} className="space-y-4">
                <input type="text" name="userName" placeholder="Full Name" onChange={handleChange} required className="w-full px-4 py-2 rounded-lg focus:outline-none text-gray-800" />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full px-4 py-2 rounded-lg focus:outline-none text-gray-800" />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full px-4 py-2 rounded-lg focus:outline-none text-gray-800" />
                <input type="file" name="profileImage" onChange={handleChange} className="w-full text-white" />
                <button type="submit" className="w-full py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-300">Register</button>
                {error && <p className="text-red-200 text-sm text-center">{error}</p>}
              </form>
              <p className="text-sm text-center mt-4">
                Already have an account? <span onClick={() => setIsLogin(true)} className="text-yellow-300 hover:underline cursor-pointer">Login here</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterPopup;
