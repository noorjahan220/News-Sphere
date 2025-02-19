import React from 'react';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-teal-600 to-blue-700 py-4 px-4 lg:px-5">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    {/* Logo & Company Info */}
                    <div className="flex items-center gap-3">
                        <div>
                            <p className="text-sm font-semibold text-white">NewsSphere</p>
                            <p className="text-gray-300 text-xs">Reliable NEWS since 1992</p>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-3">
                        <a href="https://github.com" className="text-gray-200 hover:text-gray-300">
                            <FaGithub className="w-4 h-4" />
                        </a>
                        <a href="https://linkedin.com" className="text-gray-200 hover:text-gray-300">
                            <FaLinkedin className="w-4 h-4" />
                        </a>
                        <a href="https://facebook.com" className="text-gray-200 hover:text-gray-300">
                            <FaFacebook className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* Footer Navigation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-2">Quick Links</h4>
                        <ul className="text-gray-300 space-y-1">
                            <li><a href="#" className="hover:text-yellow-400 text-xs">About Us</a></li>
                            <li><a href="#" className="hover:text-yellow-400 text-xs">Services</a></li>
                            <li><a href="#" className="hover:text-yellow-400 text-xs">Contact</a></li>
                            <li><a href="#" className="hover:text-yellow-400 text-xs">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-2">Resources</h4>
                        <ul className="text-gray-300 space-y-1">
                            <li><a href="#" className="hover:text-yellow-400 text-xs">Blog</a></li>
                            <li><a href="#" className="hover:text-yellow-400 text-xs">Documentation</a></li>
                            <li><a href="#" className="hover:text-yellow-400 text-xs">API</a></li>
                            <li><a href="#" className="hover:text-yellow-400 text-xs">Support</a></li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center text-gray-300 text-xs">
                    <p>&copy; {new Date().getFullYear()} - All rights reserved by ACME Industries Ltd.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
