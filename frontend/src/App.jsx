// App.jsx
import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login as authLogin } from './store/authSlice';



const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  }
]);

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      toast.loading('Checking authentication...');
      try {
        const response = await axios.get('/user/getuser', {
          withCredentials: true,
        });

        if (response.data && response.data.data) {
          const userData = response.data.data;
          dispatch(authLogin(userData));
        }

      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        toast.dismiss();
      }
    };

    checkAuth();
  }, []);

  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
