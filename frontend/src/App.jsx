import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login as authLogin, logout as authLogout } from './store/authSlice';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('/api/user/getuser', {
          withCredentials: true,
        });



        if (res.data && res.data.data) {

          dispatch(authLogin(res.data.data));
        } else {
          dispatch(authLogout());
          navigate('/login');
        }
      } catch (err) {
        dispatch(authLogout());
        console.error('Auth check failed:', err);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [dispatch, navigate]);

  if (loading) return <div className="text-center py-20 text-xl">Checking authentication...</div>;

  return (
    <>
      <Navbar />
      <Outlet />
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </>
  );
}

export default App;
