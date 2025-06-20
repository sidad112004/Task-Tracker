import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Authlayout({ children, role = "USER"}) {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const userRole = useSelector((state) => state.auth.role);
  const userData = useSelector((state) => state.auth.userdata);
  const [loader, setLoader] = useState(true);
  // console.log(authStatus, userRole, userData)
  //  console.log(userData)

  useEffect(() => {
    setLoader(true);
  

    if (!authStatus) {
       setLoader(false);
       navigate('/login');
    } else if (role !== userRole) {
      navigate('/');
    } 
     setLoader(false);
  }, [authStatus, userRole, navigate, role]);


  if (loader) {
    return <div className="text-center text-xl py-10">...Loading</div>;
  }

  return <>{children}</>;
}

export default Authlayout;
