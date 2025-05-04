import React, { useState } from 'react';
import { EnvelopeIcon, BellIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const NewsLetter = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            // This would connect to your subscription service in a real app
            setSubscribed(true);
            setEmail('');
            // Reset after 3 seconds
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    return (
        <section className="bg-zinc-900 relative overflow-hidden py-16 px-4">
            {/* Abstract background elements */}
            <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-amber-500/5 blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl"></div>
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto bg-zinc-800 rounded-2xl p-1">
                    <div className="bg-gradient-to-br from-zinc-800 to-zinc-800 border border-zinc-700 rounded-xl p-8 shadow-xl relative overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full blur-xl transform -translate-x-1/2 translate-y-1/2"></div>
                        
                        {/* Header */}
                        <div className="flex flex-col items-center mb-8">
                            <div className="bg-amber-500/20 p-3 rounded-full mb-4">
                                <EnvelopeIcon className="w-8 h-8 text-amber-500" />
                            </div>
                            <h2 className="text-3xl font-bold mb-2 text-white">
                                Stay <span className="text-amber-500">Informed</span>
                            </h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-amber-500/30 via-amber-500 to-amber-500/30 rounded-full mb-4"></div>
                            <p className="text-gray-400 text-center max-w-lg">
                                Subscribe to our newsletter and never miss important updates, exclusive content, and breaking news
                            </p>
                        </div>
                        
                        {/* Form */}
                        {!subscribed ? (
                            <form onSubmit={handleSubmit} className="relative">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="relative flex-grow">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <BellIcon className="h-5 w-5 text-amber-500" />
                                        </div>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="bg-zinc-700 border border-zinc-600 w-full pl-12 pr-4 py-3 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                            placeholder="Enter your email address"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-zinc-900 font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-amber-500/20 flex items-center justify-center"
                                    >
                                        Subscribe Now
                                    </button>
                                </div>
                                
                                {/* Features list */}
                                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div className="flex items-center text-gray-400 text-sm">
                                        <div className="w-5 h-5 bg-amber-500/20 rounded-full flex items-center justify-center mr-2">
                                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                        </div>
                                        Weekly Updates
                                    </div>
                                    <div className="flex items-center text-gray-400 text-sm">
                                        <div className="w-5 h-5 bg-amber-500/20 rounded-full flex items-center justify-center mr-2">
                                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                        </div>
                                        Exclusive Content
                                    </div>
                                    <div className="flex items-center text-gray-400 text-sm">
                                        <div className="w-5 h-5 bg-amber-500/20 rounded-full flex items-center justify-center mr-2">
                                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                        </div>
                                        Unsubscribe Anytime
                                    </div>
                                </div>
                            </form>
                        ) : (
                            <div className="flex flex-col items-center text-center py-6">
                                <div className="bg-amber-500/20 p-3 rounded-full mb-4">
                                    <CheckCircleIcon className="w-8 h-8 text-amber-500" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">Thank You for Subscribing!</h3>
                                <p className="text-gray-400">
                                    You've successfully subscribed to our newsletter.
                                    Check your inbox soon for our latest updates!
                                </p>
                            </div>
                        )}

                        {/* Optional trust badges */}
                        <div className="mt-8 pt-6 border-t border-zinc-700">
                            <div className="flex flex-col sm:flex-row items-center justify-between">
                                <p className="text-xs text-gray-500 mb-4 sm:mb-0">
                                    We respect your privacy. Unsubscribe at any time.
                                </p>
                                <div className="flex items-center space-x-4">
                                    <span className="text-xs text-gray-500">Trusted by</span>
                                    <div className="flex space-x-3">
                                        <div className="w-6 h-6 bg-zinc-700 rounded-full"></div>
                                        <div className="w-6 h-6 bg-zinc-700 rounded-full"></div>
                                        <div className="w-6 h-6 bg-zinc-700 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsLetter;