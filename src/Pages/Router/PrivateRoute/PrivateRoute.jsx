import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext);
    if (loading) {
        return <h1 className='text-5xl'>loading...........</h1>
    }
    const location=useLocation();
  
    if (user) {
        return children;
    }
    return <Navigate to="/logIn" state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;