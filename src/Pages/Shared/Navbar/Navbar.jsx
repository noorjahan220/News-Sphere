import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProvider';
import useAdmin from '../../../hooks/useAdmin';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    setShowDropdown(false);
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#56021F] text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6 py-3">
        <Link to="/" className="text-2xl font-extrabold text-yellow-400">NewsSphere</Link>

        <nav className="hidden lg:flex space-x-6 text-base font-semibold">
          <Link to="/" className="hover:text-yellow-400">Home</Link>
          <Link to="/allArticles" className="hover:text-yellow-400">All Articles</Link>
          {(!user || location.pathname === '/about') && <Link to="/about" className="hover:text-yellow-400">About Us</Link>}
          {user && (
            <>
              <Link to="/addArticle" className="hover:text-yellow-400">Add Articles</Link>
              <Link to="/myArticles" className="hover:text-yellow-400">My Articles</Link>
              <Link to="/subscription" className="hover:text-yellow-400">Subscription</Link>
              {subscriptionStatus?.message === 'User has an active subscription' && (
                <Link to="/premium" className="hover:text-yellow-400">Premium Articles</Link>
              )}
            </>
          )}
          {isAdmin && <Link to="/dashboard/adminHome" className="hover:text-yellow-400">Dashboard</Link>}
        </nav>

        <div className="flex items-center space-x-4">
          <div className="relative" ref={dropdownRef}>
            {user ? (
              <img
                src={user.photoURL || '/default-profile.png'}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-white hover:border-gray-300"
                onClick={() => setShowDropdown(!showDropdown)}
              />
            ) : null}
            {showDropdown && user && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-800">
                <Link to="/myProfile" className="block px-4 py-2 hover:bg-gray-100">My Profile</Link>
                <button onClick={handleLogOut} className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
              </div>
            )}
          </div>

          {!user && (
            <div className="hidden lg:flex space-x-3">
              <Link to="/login" className="bg-[#7D1C4A] px-3 py-1 rounded-lg hover:bg-[#9A275F]">Login</Link>
              <Link to="/signup" className="bg-[#7D1C4A] px-3 py-1 rounded-lg hover:bg-[#9A275F]">Register</Link>
            </div>
          )}

          <button className="lg:hidden text-white" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
            {isDrawerOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {isDrawerOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsDrawerOpen(false)}></div>}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-[#7D1C4A] text-white transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform ease-in-out duration-300 z-50`}>
        <button className="absolute top-4 right-4 text-white" onClick={() => setIsDrawerOpen(false)}>
          <FiX size={28} />
        </button>
        <ul className="p-6 space-y-4 text-lg font-semibold">
          <li><Link to="/" onClick={() => setIsDrawerOpen(false)}>Home</Link></li>
          <li><Link to="/allArticles" onClick={() => setIsDrawerOpen(false)}>All Articles</Link></li>
          {(!user || location.pathname === '/about') && <li><Link to="/about" onClick={() => setIsDrawerOpen(false)}>About Us</Link></li>}
          {user ? (
            <>
              <li><Link to="/addArticle" onClick={() => setIsDrawerOpen(false)}>Add Articles</Link></li>
              <li><Link to="/myArticles" onClick={() => setIsDrawerOpen(false)}>My Articles</Link></li>
              <li><Link to="/subscription" onClick={() => setIsDrawerOpen(false)}>Subscription</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/login" onClick={() => setIsDrawerOpen(false)}>Login</Link></li>
              <li><Link to="/signup" onClick={() => setIsDrawerOpen(false)}>Register</Link></li>
            </>
          )}
        </ul>
      </aside>
    </header>
  );
};

export default Navbar;
