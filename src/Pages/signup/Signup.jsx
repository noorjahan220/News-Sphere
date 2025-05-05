import React, { useContext, useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Lottie from 'lottie-react';
import registerAnimation from '../../assets/register.json';

const Signup = () => {
    const { createUser, signInWithGoogle, updateUserProfile, user } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    // Check if user is already logged in
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleSignUp = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const photo = e.target.photo.value;

        const isValidPassword =
            password.length >= 6 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (!isValidPassword) {
            toast.error('Password must be at least 6 characters long, with at least one uppercase and one lowercase letter', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            });
            return;
        }

        try {
            await createUser(email, password);
            await updateUserProfile(name, photo);
            const userInfo = { name, email, image: photo, premiumTaken: null };
            
            axiosPublic.post('/users', userInfo)
                .then(res => {
                    if (res.data.insertedId) {
                        toast.success('Successfully registered!', {
                            style: {
                                borderRadius: '10px',
                                background: '#333',
                                color: '#fff',
                            },
                            iconTheme: {
                                primary: '#f59e0b',
                                secondary: '#fff'
                            }
                        });
                        e.target.reset();
                        navigate('/');
                    }
                })
                .catch(error => {
                    toast.error('Failed to save user info.', {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        }
                    });
                });

        } catch (error) {
            toast.error(`Cannot sign up: ${error.message}`, {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            });
        }
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                const userInfo = {
                    email: result.user.email,
                    name: result.user.displayName,
                    image: result.user.photoURL,
                };

                axiosPublic.post('/users', userInfo)
                    .then(() => {
                        toast.success('Successfully signed up with Google!', {
                            style: {
                                borderRadius: '10px',
                                background: '#333',
                                color: '#fff',
                            },
                            iconTheme: {
                                primary: '#f59e0b',
                                secondary: '#fff'
                            }
                        });
                        navigate('/');
                    })
                    .catch(() => {
                        toast.error('Failed to save user information.', {
                            style: {
                                borderRadius: '10px',
                                background: '#333',
                                color: '#fff',
                            }
                        });
                    });
            })
            .catch(() => {
                toast.error("Cannot sign up, please try again.", {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    }
                });
            });
    };

    return (
        <div className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center p-6 bg-gradient-to-b from-zinc-900 to-zinc-800">
            <title>Register - NewsSphere</title>

            {/* Signup Form */}
            <div className="w-full max-w-md bg-gradient-to-b from-zinc-800 to-zinc-900 border border-zinc-700 shadow-lg rounded-xl p-8 transition duration-300 hover:shadow-2xl relative overflow-hidden">
                {/* Decorative accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-amber-600"></div>
                
                <h1 className="text-3xl font-bold text-center mb-6 text-white">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-600">
                        Create Account
                    </span>
                </h1>
                
                <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-300 mb-1 ml-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-gray-200 focus:outline-none focus:border-amber-500 transition-colors"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-300 mb-1 ml-1">
                            Photo URL
                        </label>
                        <input
                            type="text"
                            name="photo"
                            placeholder="Enter photo URL"
                            className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-gray-200 focus:outline-none focus:border-amber-500 transition-colors"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-300 mb-1 ml-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-gray-200 focus:outline-none focus:border-amber-500 transition-colors"
                            required
                        />
                    </div>
                    
                    <div className="form-group relative">
                        <label className="block text-sm font-medium text-gray-300 mb-1 ml-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Create a password"
                                className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-gray-200 focus:outline-none focus:border-amber-500 transition-colors"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-500 transition-colors"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                            </button>
                        </div>
                        <div className="mt-1 ml-1">
                            <p className="text-xs text-gray-400">
                                Password must be at least 6 characters with uppercase, lowercase, and special characters
                            </p>
                        </div>
                    </div>
                    
                    <div className="form-group mt-8">
                        <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-3 px-4 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                            Sign Up
                        </button>
                    </div>
                    
                    <div className="relative flex items-center justify-center mt-6 mb-6">
                        <div className="absolute inset-x-0 top-1/2 h-px bg-zinc-700"></div>
                        <div className="relative bg-zinc-800 px-4 text-sm text-gray-400">
                            Or continue with
                        </div>
                    </div>
                    
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-zinc-900 border border-zinc-700 rounded-lg text-gray-200 hover:border-amber-500 hover:text-amber-400 transition-all duration-300"
                    >
                        <FaGoogle size={18} />
                        <span>Sign up with Google</span>
                    </button>
                    
                    <div className="text-center mt-6 text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="text-amber-500 hover:text-amber-400 font-medium hover:underline transition-colors">
                            Sign In
                        </Link>
                    </div>
                </form>
            </div>

        
        </div>
    );
};

export default Signup;