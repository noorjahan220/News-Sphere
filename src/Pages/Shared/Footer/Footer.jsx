import React from 'react';
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="bg-zinc-900 border-t border-zinc-800">
            {/* Top curved section */}
            <div className="relative h-12 overflow-hidden">
                <div className="absolute inset-0 bg-zinc-800"></div>
                <div className="absolute inset-0 bg-zinc-900 rounded-t-[100%] transform translate-y-1/2"></div>
            </div>
            
            {/* Main footer content */}
            <div className="max-w-7xl mx-auto px-4 pt-8 pb-12">
                {/* Top section with logo and social links */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    {/* Logo & Company Info */}
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-zinc-900 font-bold text-xl">N</span>
                        </div>
                        <div>
                            <p className="text-white font-bold text-xl">NewsSphere</p>
                            <p className="text-gray-400 text-sm">Reliable NEWS since 1992</p>
                        </div>
                    </div>
                    
                    {/* Social Links */}
                    <div className="flex space-x-4">
                        <a 
                            href="https://twitter.com" 
                            className="bg-zinc-800 hover:bg-amber-500 text-amber-500 hover:text-zinc-900 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                            aria-label="Twitter"
                        >
                            <FaTwitter className="w-4 h-4" />
                        </a>
                        <a 
                            href="https://facebook.com" 
                            className="bg-zinc-800 hover:bg-amber-500 text-amber-500 hover:text-zinc-900 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                            aria-label="Facebook"
                        >
                            <FaFacebook className="w-4 h-4" />
                        </a>
                        <a 
                            href="https://instagram.com" 
                            className="bg-zinc-800 hover:bg-amber-500 text-amber-500 hover:text-zinc-900 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                            aria-label="Instagram"
                        >
                            <FaInstagram className="w-4 h-4" />
                        </a>
                        <a 
                            href="https://linkedin.com" 
                            className="bg-zinc-800 hover:bg-amber-500 text-amber-500 hover:text-zinc-900 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin className="w-4 h-4" />
                        </a>
                        <a 
                            href="https://github.com" 
                            className="bg-zinc-800 hover:bg-amber-500 text-amber-500 hover:text-zinc-900 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                            aria-label="GitHub"
                        >
                            <FaGithub className="w-4 h-4" />
                        </a>
                    </div>
                </div>
                
                {/* Footer Navigation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div>
                        <h4 className="text-white font-semibold mb-4 border-b border-zinc-700 pb-2">
                            <span className="border-b-2 border-amber-500 pb-2">Quick Links</span>
                        </h4>
                        <ul className="space-y-3 mt-4">
                            <li><a href="#" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">About Us</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">Our Team</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">Contact</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">Careers</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4 border-b border-zinc-700 pb-2">
                            <span className="border-b-2 border-amber-500 pb-2">News Categories</span>
                        </h4>
                        <ul className="space-y-3 mt-4">
                            <li><a href="#" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">World</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">Business</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">Technology</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">Science</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4 border-b border-zinc-700 pb-2">
                            <span className="border-b-2 border-amber-500 pb-2">Resources</span>
                        </h4>
                        <ul className="space-y-3 mt-4">
                            <li><a href="#" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">Help Center</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">Documentation</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">API</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">Support</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4 border-b border-zinc-700 pb-2">
                            <span className="border-b-2 border-amber-500 pb-2">Legal</span>
                        </h4>
                        <ul className="space-y-3 mt-4">
                            <li><a href="#" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">Terms of Service</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">Cookie Policy</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-amber-500 transition-colors duration-300">GDPR</a></li>
                        </ul>
                    </div>
                </div>
                
                {/* Featured links - replacing the duplicate newsletter */}
                
                
                {/* Bottom section with copyright and links */}
                <div className="border-t border-zinc-800 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm">
                            &copy; {currentYear} NewsSphere. All rights reserved.
                        </p>
                        <div className="flex flex-wrap gap-6">
                            <a href="#" className="text-gray-500 hover:text-amber-500 text-sm transition-colors duration-300">Sitemap</a>
                            <a href="#" className="text-gray-500 hover:text-amber-500 text-sm transition-colors duration-300">Accessibility</a>
                            <a href="#" className="text-gray-500 hover:text-amber-500 text-sm transition-colors duration-300">Advertise</a>
                            <a href="#" className="text-gray-500 hover:text-amber-500 text-sm transition-colors duration-300">Press Kit</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;