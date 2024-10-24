import React, { useState } from 'react';
import pic1 from '/images/login.jpg';
import AdminNavbar from './AdminNavbar';
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { useLoginMutation } from "../Slice/AdminApiSlice"
import {useDispatch} from "react-redux"
import { setCredentials } from '../Slice/authSlice'
import { toast } from 'react-toastify';
const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const[login]=useLoginMutation()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async(e) => {
    e.preventDefault();
    setIsLoading(true);

    try{
      const response =await login({email,password}).unwrap()
      console.log("response data is here",response)
      const{user,accessToken}=response;
      console.log("Users:", user);
      console.log("Access Token:", accessToken);
      dispatch(setCredentials({user,token:accessToken}))
      navigate('/Admin');
    }

    catch(error){
      toast.error(error?.data?.message || "Login failed")
    }

    finally{
      setIsLoading(false);
      }

  };

  return (
    <div>
        <AdminNavbar/>
   
    <section className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
          <p className="text-xs mt-4 text-[#002D74]">If you are already a member, easily log in</p>

          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <input
              className="p-2 mt-8 rounded-xl border bg-white"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full bg-white"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
                className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                viewBox="0 0 16 16"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <path
                    fillRule="evenodd"
                    d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
                  />
                )}
              </svg>
            </div>
            <button
              className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300 flex justify-center items-center"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" /> Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>

        <div className="md:block hidden w-1/2">
          <img className="rounded-2xl" src={pic1} alt="regpics" />
        </div>
      </div>
    </section>
    <Footer/>
    </div>
  );
};

export default AdminLogin;
