import React, { useState, ChangeEvent } from 'react';

import MaxWidthWrapper from './MaxWidthWrapper';
import { useDispatch } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner'; // Loader component from react-loader-spinner

interface FormData {
  
  email: string;
  password: string;

}

const Login: React.FC = () => {
 
  const [formData, setFormData] = useState<FormData>({  password: '', email:'' });
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // Loading state

 


  

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Sorry Try Again")
      return dispatch(signInFailure('Please fill the all fields'));
    }
    try {
        setLoading(true)
      dispatch(signInStart());
      const res = await fetch('https://jobera.onrender.com/api/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error("Sorry Try Again")
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        toast.success("Logging You in")
        dispatch(signInSuccess(data));
        navigate(`/profile/${data.username}`);
      }
    } catch (error) {
      toast.error("Sorry Try Again")
      dispatch(signInFailure(error));
    }
    finally{
        setLoading(false)
    }
  };

  return (

       
        <MaxWidthWrapper className="flex mx-auto">
            <Toaster/>
          <div className="w-full max-w-md mx-auto mt-10 mb-10">
            <h1 className="text-center font-bold text-xl"> Login</h1>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
             
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Your Email</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Enter Your Email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="******************"
                  onChange={handleChange}
                  required
                />
              </div>
           
           
            
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto"
                  type="submit"
                >
                  {loading ? <Oval color="#fff" height={24} width={24} /> : 'Login'}
                </button>
              </div>
            </form>
          </div>
        </MaxWidthWrapper>
    
  );
};

export default Login;
