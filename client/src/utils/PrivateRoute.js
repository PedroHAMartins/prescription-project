import { Outlet, Navigate } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";

const PrivateRoutes = () => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const config = {
            headers: {
              Authorization: token
            }
          };

          const response = await Axios.get('http://localhost:3001/api/user', config);
          const isAuthenticated = response.status === 200;
          setAuthenticated(isAuthenticated);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        console.log(error);
        setAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (authenticated === null) {
    return <div>Loading...</div>;
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;