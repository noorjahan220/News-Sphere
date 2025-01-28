import React from 'react';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';  // Facebook, GitHub, LinkedIn icons from react-icons

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-indigo-50 to-blue-50 py-16 px-4 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    {/* Logo & Company Info */}
                    <div className="flex items-center gap-4">
                        {/* You can use a custom logo or SVG for ACME Industries */}
                        <div>
                            <p className="text-lg font-semibold text-gray-800">NewsSphere</p>
                            <p className="text-gray-600">Providing reliable NEWS since 1992</p>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-6">
                        <a href="https://github.com" className="text-gray-700 hover:text-gray-900">
                            <FaGithub className="w-6 h-6" />
                        </a>
                        <a href="https://linkedin.com" className="text-gray-700 hover:text-gray-900">
                            <FaLinkedin className="w-6 h-6" />
                        </a>
                        <a href="https://facebook.com" className="text-gray-700 hover:text-gray-900">
                            <FaFacebook className="w-6 h-6" />
                        </a>
                    </div>
                </div>

                {/* Footer Navigation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h4 className="text-xl font-semibold text-gray-800 mb-4">Quick Links</h4>
                        <ul className="text-gray-600 space-y-2">
                            <li><a href="#" className="hover:text-purple-600">About Us</a></li>
                            <li><a href="#" className="hover:text-purple-600">Services</a></li>
                            <li><a href="#" className="hover:text-purple-600">Contact</a></li>
                            <li><a href="#" className="hover:text-purple-600">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold text-gray-800 mb-4">Resources</h4>
                        <ul className="text-gray-600 space-y-2">
                            <li><a href="#" className="hover:text-purple-600">Blog</a></li>
                            <li><a href="#" className="hover:text-purple-600">Documentation</a></li>
                            <li><a href="#" className="hover:text-purple-600">API</a></li>
                            <li><a href="#" className="hover:text-purple-600">Support</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold text-gray-800 mb-4">Subscribe</h4>
                        <p className="text-gray-600 mb-4">Get the latest updates directly to your inbox.</p>
                        <form>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-4 py-2 rounded-md border border-gray-300 w-full mb-4"
                            />
                            <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center text-gray-600">
                    <p>&copy; {new Date().getFullYear()} - All rights reserved by ACME Industries Ltd.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
