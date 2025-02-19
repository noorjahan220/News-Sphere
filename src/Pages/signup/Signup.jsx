import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Lottie from 'lottie-react';
import registerAnimation from '../../assets/register.json';
// import { Helmet } from 'react-helmet-async';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Signup = () => {
    const { createUser, signInWithGoogle, updateUserProfile } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const handleSignUp = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const photo = e.target.photo.value;

        const isValidPassword =
            password.length >= 6 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (!isValidPassword) {
            toast.error('Password must be at least 6 characters long, with at least one uppercase and one lowercase letter');
            return;
        }

        try {
            await createUser(email, password);
            await updateUserProfile(name, photo);
            const useInfo = { name, email, image: photo, premiumTaken: null };
            
            axiosPublic.post('/users', useInfo)
                .then(res => {
                    if (res.data.insertedId) {
                        toast.success('Successfully registered!');
                        e.target.reset();
                        navigate('/');
                    }
                })
                .catch(error => {
                    toast.error('Failed to save user info.');
                });

        } catch (error) {
            toast.error(`Cannot sign up: ${error.message}`);
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
                        toast.success('Successfully signed up with Google!');
                        navigate('/');
                    })
                    .catch(() => {
                        toast.error('Failed to save user information. Please try again.');
                    });
            })
            .catch(() => {
                toast.error("Cannot sign up, please try again.");
            });
    };

    return (
        <div className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center bg-gray-50 dark:bg-gray-900 p-6 gap-6">
            {/* <Helmet> */}
                <title>Register Page</title>
            {/* </Helmet> */}

            {/* Form Section */}
            <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 transition duration-300 hover:shadow-2xl">
                <h1 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-white">
                    <span className="bg-gradient-to-r from-teal-500 to-teal-600 bg-clip-text text-transparent">
                        Sign Up
                    </span>
                </h1>
                <form onSubmit={handleSignUp} className="space-y-3">
                    <div>
                        <label className="label-text text-black dark:text-gray-300 text-sm">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-200 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="label-text text-black dark:text-gray-300 text-sm">Photo URL</label>
                        <input
                            type="text"
                            name="photo"
                            placeholder="Photo URL"
                            className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-200 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="label-text text-black dark:text-gray-300 text-sm">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-200 py-2"
                            required
                        />
                    </div>
                    <div className="relative">
                        <label className="label-text text-black dark:text-gray-300 text-sm">Password</label>
                        <input
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Your password"
                            className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-200 py-2"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-[2.2rem] text-gray-700 dark:text-gray-300"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <button className="btn w-full bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-lg shadow hover:shadow-lg hover:scale-105 transition duration-300 mt-3">
                        Sign Up
                    </button>
                </form>

                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="btn btn-outline w-full mt-3 border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition duration-300"
                >
                    Sign up with Google
                </button>
                <div className="text-center mt-3 text-gray-600 dark:text-gray-400 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-teal-500 hover:underline">
                        Sign in
                    </Link>
                </div>
            </div>

            {/* Animation Section */}
            <div className="w-full md:w-1/2 flex items-center justify-center">
                <Lottie animationData={registerAnimation} className="w-full max-w-lg" />
            </div>
        </div>
    );
};

export default Signup;
