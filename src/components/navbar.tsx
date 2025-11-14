import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Login from "../PopUps/AuthPopup";
import Register from "../PopUps/Register";
import Cookies from "js-cookie";
import api from '../API/api';
import axios from "axios";

const Navbar: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState({ location: "" });
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
 
  const navigate = useNavigate();


  // Get authentication state and functions from AuthContext
  const { isAuthenticated, setIsAuthenticated,  token} = useAuth();

  useEffect(() => {
    if (token) {  }
  }, [token]);


  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8080/getCategory");
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch locations when a category is selected
  const handleCategoryChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = Number(e.target.value);
    setSelectedCategory(categoryId);
    setSearchQuery({ location: "" });
    setVehicles([]); // Clear previous vehicle results

    if (!categoryId) return;

    try {
      const res = await axios.get(`http://localhost:8080/search?category_id=${categoryId}`);
      setLocations(res.data);
    } catch (error) {
      console.error("Error fetching locations", error);
    }
  };

  // Handle location search input
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery({ location: query });
  
    console.log("Locations Data:", locations); // Debugging
  
    if (query.length > 0) {
      const filtered = locations
        ?.filter((loc) => loc.toLowerCase().includes(query.toLowerCase())) || [];
  
      setFilteredLocations(filtered);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  // Fetch vehicles when a location is selected
  const handleLocationSelect = async (location: string) => {
    if (!selectedCategory) {
      alert("Please select a category first.");
      return;
    }

    setSearchQuery({ location });
    setShowDropdown(false);

    try {
      const res = await axios.get(
        `http://localhost:8080/search?category_id=${selectedCategory}&location=${location}`
      );
      setVehicles(res.data);
    } catch (error) {
      console.error("Error fetching vehicles", error);
    }
  };
 
  const handleAuthClick = async () => {
    if (isAuthenticated) {
      try {
        // Send request to logout endpoint
        await api.post('auth/logout', {
          method: 'POST',
          credentials: 'include',
        });
        Cookies.remove('token', { path: '/' });
        setIsAuthenticated(false);
        navigate("/");
      } catch (error) {
        console.error("Logout Error: ", error);
      }
    } else {
      setIsLoginOpen(true);
    }
  };

  const openRegister = () => {
    setIsLoginOpen(false);
    
  };

  const closeModals = () => {
    setIsLoginOpen(false);
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-[#400E54] to-[#1E6EE6] shadow-md fixed w-full z-50">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            BrandLogo
          </Link>
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-multi-level"
            aria-expanded={openDropdown === "main"}
            onClick={() => setOpenDropdown(openDropdown === "main" ? null : "main")}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <div
            className={`w-full md:block md:w-auto ${
              openDropdown === "main" ? "block" : "hidden"
            }`}
          >
            <ul className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
              <li>
                <Link
                  to="/"
                  className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white transition duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/home"
                  className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white transition duration-300"
                >
                  Cars
                </Link>
              </li>
              <li>
                <button
                  onClick={handleAuthClick}
                  className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white transition duration-300"
                >
                  {isAuthenticated ? "Logout" : "Login"}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {isLoginOpen && (
        <Login onClose={closeModals} onRegisterClick={openRegister} />
      )}
     
    </>
  );
};

export default Navbar;







