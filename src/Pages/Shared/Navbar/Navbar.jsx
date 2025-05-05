import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProvider';
import useAdmin from '../../../hooks/useAdmin';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FiMenu, FiX, FiUser, FiLogOut, FiSettings, FiHome, FiFileText, FiPlus, FiList, FiDollarSign, FiStar, FiInfo } from 'react-icons/fi';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const navbarRef = useRef(null);

  // Subscription status check
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

  const isSubscribed = subscriptionStatus?.message === 'User has an active subscription';

  // Handle logout
  const handleLogOut = async () => {
    try {
      await logOut();
      toast.success('Successfully logged out!', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      setShowDropdown(false);
      navigate('/');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Routes configuration
  const publicRoutes = [
    { path: '/', name: 'Home', icon: <FiHome  /> },
    { path: '/allArticles', name: 'All Articles', icon: <FiFileText  /> },
    { path: '/about', name: 'About Us', icon: <FiInfo /> },
  ];

  const userRoutes = user ? [
    { path: '/addArticle', name: 'Add Articles', icon: <FiPlus  /> },
    { path: '/myArticles', name: 'My Articles', icon: <FiList  /> },
    { path: '/subscription', name: 'Subscription', icon: <FiDollarSign  /> },
    ...(isSubscribed ? [{ path: '/premium', name: 'Premium', icon: <FiStar  /> }] : []),
  ] : [];

  const adminRoutes = isAdmin ? [
    { path: '/dashboard/adminHome', name: 'Dashboard', icon: <FiSettings className="mr-1" /> },
  ] : [];

  const activeRoutes = [...publicRoutes, ...userRoutes, ...adminRoutes];

  return (
    <header 
      ref={navbarRef}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-zinc-900 shadow-lg' : 'bg-gradient-to-r from-zinc-800 to-zinc-900'
      }`}
    >
      <div className="w-full max-w-[1920px] mx-auto">
        <div className="flex justify-between items-center px-4 md:px-6 py-4 mx-auto max-w-7xl">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="flex items-center">
              <span className="text-2xl font-black tracking-tighter text-white">NEWS</span>
              <span className="text-2xl font-bold tracking-tight text-amber-500">SPHERE</span>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center flex-1 justify-center mx-8">
            <div className="flex space-x-1 md:space-x-2">
              {activeRoutes.map((route, index) => (
                <Link 
                  key={index}
                  to={route.path}
                  className={`px-1 py-2 text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-colors duration-200 ${
                    location.pathname === route.path
                      ? 'text-amber-500 border-b-2 border-amber-500'
                      : 'text-gray-300 hover:text-amber-400'
                  }`}
                >
                  {route.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* User Section - Fixed Profile Display */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <div
                  className="flex items-center cursor-pointer group"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover border-2 border-amber-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/40';
                      }}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center border-2 border-amber-500">
                      <FiUser size={20} className="text-gray-300" />
                    </div>
                  )}
                  <span className="hidden md:block ml-2 text-sm font-medium whitespace-nowrap text-gray-200 group-hover:text-amber-400 transition-colors">
                    {user.displayName?.split(' ')[0] || 'Profile'}
                  </span>
                </div>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-zinc-800 border border-zinc-700 rounded-md shadow-xl py-1 text-gray-300 z-50">
                    <div className="border-b border-zinc-700 pb-2 pt-1 px-4">
                      <p className="text-sm font-medium text-amber-500 truncate">
                        {user.displayName || 'User'}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      to="/myProfile"
                      className="flex items-center px-4 py-2 text-sm hover:bg-zinc-700 hover:text-amber-400 transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <FiUser size={16} className="mr-2" />
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogOut}
                      className="w-full flex items-center text-left px-4 py-2 text-sm hover:bg-zinc-700 hover:text-red-400 transition-colors"
                    >
                      <FiLogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium border border-zinc-700 rounded bg-zinc-800 hover:bg-zinc-700 transition-colors whitespace-nowrap"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors whitespace-nowrap"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white p-1 focus:outline-none"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              aria-label="Toggle menu"
            >
              {isDrawerOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isDrawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40"
            onClick={() => setIsDrawerOpen(false)}
          ></div>
          <aside
            className={`fixed top-0 right-0 h-full w-72 bg-zinc-900 text-white transform ${
              isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
            } transition-transform ease-in-out duration-300 z-50 overflow-y-auto`}
          >
            <div className="flex justify-between items-center p-6 border-b border-zinc-800">
              <span className="text-xl font-bold text-amber-500">Menu</span>
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => setIsDrawerOpen(false)}
                aria-label="Close menu"
              >
                <FiX size={24} />
              </button>
            </div>

            {user && (
              <div className="p-6 border-b border-zinc-800">
                <div className="flex items-center">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover border-2 border-amber-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/48';
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center border-2 border-amber-500">
                      <FiUser size={20} className="text-gray-300" />
                    </div>
                  )}
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white truncate max-w-[180px]">
                      {user.displayName || 'User'}
                    </p>
                    <p className="text-xs text-gray-400 truncate max-w-[180px]">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <nav className="p-6 space-y-1">
              {activeRoutes.map((route, index) => (
                <Link
                  key={index}
                  to={route.path}
                  className={`flex items-center py-3 px-4 rounded-lg text-base font-medium transition-colors ${
                    location.pathname === route.path
                      ? 'bg-zinc-800 text-amber-500'
                      : 'text-gray-300 hover:bg-zinc-800 hover:text-amber-400'
                  }`}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  {route.icon}
                  {route.name}
                </Link>
              ))}

              {!user ? (
                <div className="mt-6 space-y-3 pt-6 border-t border-zinc-800">
                  <Link
                    to="/login"
                    className="flex items-center justify-center w-full py-3 text-center bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center justify-center w-full py-3 text-center bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div className="mt-6 pt-6 border-t border-zinc-800">
                  <Link
                    to="/myProfile"
                    className="flex items-center py-3 px-4 rounded-lg text-base font-medium text-gray-300 hover:bg-zinc-800 hover:text-amber-400"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    <FiUser size={18} className="mr-3" />
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogOut();
                      setIsDrawerOpen(false);
                    }}
                    className="flex items-center w-full py-3 px-4 rounded-lg text-base font-medium text-gray-300 hover:bg-zinc-800 hover:text-red-400"
                  >
                    <FiLogOut size={18} className="mr-3" />
                    Logout
                  </button>
                </div>
              )}
            </nav>
          </aside>
        </>
      )}
    </header>
  );
};

export default Navbar;