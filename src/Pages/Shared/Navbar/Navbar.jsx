import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProvider';
import useAdmin from '../../../hooks/useAdmin';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();

  const handleLogOut = () => {
    logOut()
      .then(() => toast.success('Successfully Logged Out!'))
      .catch((error) => console.log(error));
  };

  const navOptions = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/addArticle">Add Articles</Link></li>
      <li><Link to="/allArticles">All Articles</Link></li>
      <li><Link to="/subscription">Subscription</Link></li>
      <li><Link to="/myArticles">My Articles</Link></li>
      {isAdmin && (
        <li><Link to="/dashboard">Dashboard</Link></li>
      )}

      {user?.subscription && (
        <li><Link to="/premiumArticles">Premium Articles</Link></li>
      )}

      {user ? (
        <li>
          <Link to="/myProfile">
            <img
              className="w-11 h-11 rounded-full"
              src={user?.photoURL || 'https://via.placeholder.com/150'}
              alt="User Avatar"
            />
          </Link>
          <button onClick={handleLogOut} className="text-white bg-red-500 px-4 py-2 rounded ml-2">
            Log Out
          </button>
        </li>
      ) : (
        <>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar fixed z-10 bg-opacity-80 bg-black text-white max-w-screen-xl px-4">
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg">
            {navOptions}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl font-bold">Newsy</Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-6">{navOptions}</ul>
      </div>
    </div>
  );
};

export default Navbar;
