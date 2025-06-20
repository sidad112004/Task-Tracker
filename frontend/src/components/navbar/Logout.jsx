import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { logout as authLogout } from '../../store/authSlice.js';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await axios.get('/api/user/logout', {
        withCredentials: true,
      });
     
      if (res) {
        dispatch(authLogout());
        toast.success('Logged out successfully');

        navigate('/login');

      } else {
        toast.error('Logout failed on server');
      }
    } catch (err) {
      console.error(err);
      toast.error('Logout failed');
    }
  };

  return (
    <button className="btn btn-outline btn-error" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;
