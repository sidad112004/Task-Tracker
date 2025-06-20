import React, { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Createtask from './pages/Createtask';
import Detailtask from './pages/Detailtask';
import Updateuser from './pages/Updateuser';
import Authlayout from './components/Authlayout';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login as authLogin, logout as authLogout } from './store/authSlice';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
     
      try {
        const res = await axios.get('/api/user/getuser', { withCredentials: true });
        // console.log(res)  
        if (res.data && res.data.data) {
          dispatch(authLogin(res.data.data));
        } else {
          dispatch(authLogout());
         
        }
      } catch (err) {
        dispatch(authLogout());
        console.error('Auth check failed:', err);
        redirect('/login');
      } finally {
       
        setLoading(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Authlayout >
          <Home />
        </Authlayout>
      )
    },
    {
      path: '/signup',
      element: (
       
          <Signup />
       
      )
    },
    {
      path: '/login',
      element: (
        
          <Login />
        
      )
    },
    {
      path: '/createtask',
      element: (
        <Authlayout >
          <Createtask />
        </Authlayout>
      )
    },
    {
      path: '/detailtask/:id',
      element: (
        <Authlayout >
          <Detailtask />
        </Authlayout>
      )
    },
    {
      path: '/updateuser',
      element: (
        <Authlayout role="ADMIN">
          <Updateuser />
        </Authlayout>
      )
    },
  ]);

  if (loading) return <div className="text-center py-20 text-xl">Checking authentication...</div>;

  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
