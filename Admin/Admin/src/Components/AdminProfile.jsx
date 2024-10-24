import React, { useState,useEffect } from 'react';
import {  useUpdateAdminMutation } from '../Slice/AdminApiSlice'
import { useSelector,useDispatch } from 'react-redux';
import { setCredentials } from '../Slice/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import pic1 from '/images/shop.jpg';

const AdminProfile = () => {
  const navigate=useNavigate()
  
  const { userInfo } = useSelector((state)=>state.auth)
  
  useEffect(()=>{
    if(!userInfo){
      navigate('/adminlogin')
    }
  },[userInfo,navigate])

  const [updateProfile,{isLoading}]=useUpdateAdminMutation()
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(()=>{
    if(userInfo){
      setName(userInfo.name || "")
      setEmail(userInfo.email || "")
      setPassword(userInfo.password || "")
      }
  },[ userInfo ])

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateUser=await updateProfile({
        id: userInfo._id,
        body: { name, email, password},
      }).unwrap()
      dispatch(setCredentials({ user: updateUser, token: localStorage.getItem('accessToken') })); 
      toast.success('Profile updated successfully');
      navigate('/Admin');
  }

  catch(error){
    toast.error(error.message||'Profile updated Failed');
  }
}

  return (
    <div>
            <h1 className="font-semibold text-2xl underline mb-10">Profile Updation</h1>
    
    <section className="min-h-screen flex items-center justify-center mb-24">
      <div className="bg-gray-100 flex flex-col md:flex-row rounded-2xl shadow-lg max-w-4xl p-5 items-center w-full md:w-auto">
        <div className="w-full md:w-1/2 px-4 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Update Admin Profile</h2>
          <p className="text-xs mt-4 text-[#002D74]">Update your profile information</p>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex items-center gap-2">
              <input
                className="p-2 mt-8 rounded-xl border w-full bg-white"
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
            
              <input
                className="p-2 rounded-xl border w-full bg-white"
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full bg-white"
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
              />
              <svg
                onClick={togglePasswordVisibility}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
                className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                viewBox="0 0 16 16"
              >
                {showPassword ? (
                  <path
                    fillRule="evenodd"
                    d="M15.112 7.612c.96 1.197 1.816 2.522 2.416 3.388-.4.52-1.46 1.48-2.481 2.475-1.017-.992-2.073-1.947-2.477-2.464.603-.87 1.467-2.191 2.542-3.399zm-14.225-.224a13.133 13.133 0 0 1 1.66-2.043c1.37-1.789 3.13-2.957 5.25-2.957 2.12 0 3.879 1.168 5.168 2.457a13.133 13.133 0 0 1 1.655 2.043c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457a13.134 13.134 0 0 1-1.17-1.751c-.073-.105-.137-.201-.195-.288z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
                  />
                )}
              </svg>
            </div>
            <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300" type="submit" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>

        <div className="md:block hidden w-1/2">
          <img className="rounded-2xl" src={pic1} alt='profile-pic' />
        </div>
      </div>
    </section>
    </div>
  );
};

export default AdminProfile;
