import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { login as authLogin } from '../../store/authSlice'

function Login() {

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    const loadingToast = toast.loading('Logging in...');


    try {
      const response = await axios.post('/api/user/login',
        formData,
        { withCredentials: true }
      );
      

      
      const userdata = response.data.data;

      if (userdata) {
        dispatch(authLogin(userdata));
      }
      toast.dismiss(loadingToast);
      toast.success(response.data?.message || 'Login successful!');

      
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.dismiss(loadingToast);

      const errorMsg = error?.response?.data?.message || 'Login failed. Please try again.';
      toast.error(errorMsg);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse gap-16">


        <div className="text-center lg:text-left max-w-xl">
          <h1 className="text-5xl font-bold mb-4">Login Now!</h1>
          <p className="py-4 text-lg">
            Welcome back! Please enter your credentials to log in and continue.
          </p>
        </div>


        <div className="card bg-base-100 shadow-2xl md:w-96 w-full p-8 rounded-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label font-semibold">Email</label>
              <input
                type=""
                name="email"
                placeholder="example@email.com"
                className="input input-bordered input-lg w-full"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="label font-semibold">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered input-lg w-full"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-full mt-2">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
