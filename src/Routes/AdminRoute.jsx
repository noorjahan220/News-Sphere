import React, { useContext } from 'react';
import useAdmin from '../hooks/useAdmin';
import { AuthContext } from '../Providers/AuthProvider';
import { ThreeDots } from 'react-loader-spinner';
import { Navigate, useLocation } from 'react-router-dom';


const AdminRoute = (children) => {
    const [user,loading] = useContext(AuthContext); 
    const [isAdmin,isAdminLoading] = useAdmin();
    const location = useLocation()
    if (loading || isAdminLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <ThreeDots
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        )
    }
    if (user && isAdmin) {
        return children;
    }
    return <Navigate to='/login' state={{from:location}} replace></Navigate>
};

export default AdminRoute;