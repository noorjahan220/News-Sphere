import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProvider';
import useAdmin from '../../../hooks/useAdmin';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: subscriptionStatus } = useQuery({
    queryKey: ['subscriptionStatus', user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosSecure.get('/user-status');
      return res.data;
    },
    enabled: !!user?.email,
    staleTime: 1000 * 60 * 5,
  });

  const handleLogOut = async () => {
    await logOut();
    toast.success('Successfully logged out!');
  };

  return (
    <div className="navbar bg-gray-800 p-4 text-white shadow-lg">
      <div className="flex items-center justify-between w-full max-w-screen-2xl mx-auto">
        {/* Title */}
        <div className="flex-shrink-0 mx-4 min-w-[160px]">
          <Link to="/" className="text-2xl font-extrabold tracking-wide text-yellow-400 hover:text-yellow-500 transition-all">
            NewsSphere
          </Link>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="lg:hidden">
          <label htmlFor="my-drawer" className="btn btn-ghost drawer-button text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
        </div>

        {/* Navbar Links for Desktop */}
        <div className="hidden lg:flex items-center space-x-3 mx-4 text-base font-semibold whitespace-nowrap min-w-max">
          <Link to="/" className="hover:text-yellow-400 transition px-2">Home</Link>
          <Link to="/allArticles" className="hover:text-yellow-400 transition px-2">All Articles</Link>

          {user && (
            <>
              <Link to="/addArticle" className="hover:text-yellow-400 transition px-2">Add Articles</Link>
              <Link to="/myArticles" className="hover:text-yellow-400 transition px-2">My Articles</Link>
              <Link to="/subscription" className="hover:text-yellow-400 transition px-2">Subscription</Link>
              {subscriptionStatus?.message === 'User has an active subscription' && (
                <Link to="/premium" className="hover:text-yellow-400 transition px-2">Premium Articles</Link>
              )}
            </>
          )}

          {isAdmin && (
            <Link to="/dashboard/adminHome" className="hover:text-yellow-400 transition px-2">Dashboard</Link>
          )}
        </div>

        {/* User Profile & Logout Button */}
        <div className="flex-shrink-0 flex items-center space-x-3 mx-4">
          {user ? (
            <>
              <img
                src={user.photoURL || '/default-profile.png'}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-yellow-400 hover:border-yellow-500"
                onClick={() => navigate('/myProfile')}
              />
              <button
                onClick={handleLogOut}
                className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition text-nowrap font-bold text-[14px]"
              >
                LogOut
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Drawer - Mobile Menu */}
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content"></div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-60 bg-gray-800 text-white">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/allArticles">All Articles</Link></li>
            {user && (
              <>
                <li><Link to="/addArticle">Add Articles</Link></li>
                <li><Link to="/myArticles">My Articles</Link></li>
                <li><Link to="/subscription">Subscription</Link></li>
                {subscriptionStatus?.message === 'User has an active subscription' && (
                  <li><Link to="/premium">Premium Articles</Link></li>
                )}
              </>
            )}
            {isAdmin && <li><Link to="/dashboard/adminHome">Dashboard</Link></li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;