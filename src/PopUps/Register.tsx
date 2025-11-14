import React, { useState } from "react";
import api from '../API/api'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import Cookies from "js-cookie";


const Register = () => {
    const navigate = useNavigate();
    const {setIsAuthenticated} = useAuth();

    const [formData , setFormData] = useState({
        userName:'',
        email:'',
        password: '',
        role: '',
        profileImage:null
    });

   const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value , files} = e.target;
    setFormData((prev) => ({
        ...prev,

        [name]:files ? files[0] : value
    }))
   }

   const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    const form  = new FormData();

    form.append('username', formData.userName);
    form.append('email', formData.email);
    form.append('password', formData.password);
    form.append('role', formData.role);
    if(formData.profileImage) {
        form.append('profileImage',formData.profileImage )
    }

    try{
        await api.post('auth', form, {
            headers:{"Content-Type": "multipart/form-data"}
        })
        toast.success("Registerd Successfully");
        
        //  Cookies.set("token", response.data.token, {expires: 7 })
        navigate('/Login')
    } catch (error:any) {
        console.error ('RegisterError:', error.response.data.message)
    }
   }



   return (
    <>
     <div className="">
            <div className="">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        type="text"
                        name="userName"
                        placeholder="Username"
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input 
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input 
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input 
                        type="text"
                        name="role"
                        placeholder="Role"
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input 
                        type="file"
                        name="profileImage"
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                   
                        <button 
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 mr-2"
                        >
                            Register
                        </button>
                 
                </form>
            </div>
        </div>

    </>
   )
}


export default Register;


