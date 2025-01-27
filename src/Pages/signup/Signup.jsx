import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAxiosSecure from '../../hooks/useAxiosSecure';



const Signup = () => {
    const axiosPublic = useAxiosPublic();
    const { createUser, signInWithGoogle, updateUserProfile } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
const axiosSecure = useAxiosSecure()

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
            // create user entry in the database
            const useInfo = {
                name: name,
                email: email,
                image: photo,
                premiumTaken: null
            }
            axiosSecure.get('/user-status')
            .then(res=>{
                if (res.data.insertedId) {
                    console.log("user status added")
                  
                }
            })
            
            axiosPublic.post('/users', useInfo)
                .then(res => {
                    if (res.data.insertedId) {
                        console.log("user added in database")
                        toast.success('Successfully registered!');
                        e.target.reset();
                        navigate('/');
                    }
                })



        } catch (error) {
            // Error feedback
            toast.error(`Cannot sign up: ${error.message}`);
        }
    };


    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                if (result.user) {
                    const userInfo = {
                        email: result.user.email,
                        name: result.user.displayName,
                        image: result.user.photoURL,
                    };
    
                    
                    axiosPublic.post('/users', userInfo)
                        .then((res) => {
                            console.log(res.data);
                            toast.success('Successfully signed up with Google!');
                            navigate('/');
                        })
                        .catch((error) => {
                            console.error('Error saving user info to the backend:', error);
                            toast.error('Failed to save user information. Please try again.');
                        });
                } else {
                    toast.error('Google sign-in failed. Please try again.');
                }
            })
            .catch((error) => {
                console.error('Error during Google sign-in:', error);
                toast.error("Cannot sign up, please try again.");
            });
    };
    

    return (
        <div className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center bg-gray-50 dark:bg-gray-900 p-6 gap-8">

            {/* Form Section */}
            <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 transition duration-300 hover:shadow-2xl">
                <h1
                    className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                    <span className="bg-gradient-to-r from-teal-500 to-teal-600 bg-clip-text text-transparent">
                        Sign Up
                    </span>
                </h1>
                <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="form-group">
                        <label className="label">
                            <span className="label-text text-black dark:text-gray-300">Name</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-200"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="label">
                            <span className="label-text text-black dark:text-gray-300">Photo URL</span>
                        </label>
                        <input
                            type="text"
                            name="photo"
                            placeholder="Photo URL"
                            className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-200"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="label">
                            <span className="label-text text-black dark:text-gray-300">Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-200"
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
                            className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-200"
                            required
                        />
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
                            Sign Up
                        </button>
                    </div>
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="btn btn-outline w-full mt-4 border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition duration-300"
                    >
                        Sign up with Google
                    </button>
                    <div className="text-center mt-4 text-gray-600 dark:text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="text-teal-500 hover:underline">
                            Sign in
                        </Link>
                    </div>
                </form>
            </div>

            {/* Animation Section */}
            {/* <div className="w-full md:w-1/2 flex items-center justify-center">
        <Lottie
          animationData={registerAnimation}
          className="w-full max-w-lg"
        />
      </div> */}
        </div>
    );
};

export default Signup;
