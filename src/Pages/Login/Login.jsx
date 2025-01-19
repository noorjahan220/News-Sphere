import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import toast from 'react-hot-toast';

const Login = () => {
    const { signIn, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
 
    const location = useLocation();

    const from = location.state?.from?.pathname || "/"

    const handleSignin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then((result) => {
                const user = result.user
                toast.success('Successfully LogIn!');
                navigate(from,{ replace: true});
                
            })
            .catch((error) => {
               
                toast.error('Failed to log in. Please check your credentials.');
            });
            
           
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(() => {
                toast.success('Successfully signed in with Google!');
                navigate('/');
            })
            .catch(() => {
                toast.error("Cannot sign in, please try again.");
            });
    };

    return (
        <div className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
             
            {/* Lottie Animation */}
            {/* <div className="md:w-1/2 w-full flex items-center justify-center mb-8 md:mb-0">
                <Lottie
                    animationData={loginAnimation}
                    className="w-full max-w-lg"
                />
            </div> */}

            {/* Login Form */}
            <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 transition duration-300 hover:shadow-2xl">
                <h1
                    className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                    <span className="bg-gradient-to-r from-teal-500 to-teal-600 bg-clip-text text-transparent">
                        Login
                    </span>
                </h1>
                <form onSubmit={handleSignin} className="space-y-4">
                    <div className="form-group">
                        <label className="label">
                            <span className="label-text text-black dark:text-gray-300">Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="input input-bordered w-full bg-gray-100 text-black dark:bg-gray-700 dark:text-gray-200"
                            required
                        />
                    </div>
                    <div className="form-group relative">
                        <label className="label">
                            <span className="label-text text-black dark:text-gray-300">Password</span>
                        </label>
                        <input
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Your password"
                            className="input input-bordered w-full bg-gray-100 text-black dark:bg-gray-700 dark:text-gray-200"
                            required
                        />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover text-gray-600 dark:text-gray-400">
                                Forgot password?
                            </a>
                        </label>
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-[3.30rem] text-gray-700 dark:text-gray-300"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <div className="form-group mt-6">
                        <button className="btn w-full bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-lg shadow hover:shadow-lg hover:scale-105 transition duration-300">
                            Login
                        </button>
                    </div>
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="btn btn-outline w-full mt-4 border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition duration-300"
                    >
                        Sign in with Google
                    </button>
                    <div className="text-center mt-4 text-gray-600 dark:text-gray-400">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-teal-500 hover:underline">
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;