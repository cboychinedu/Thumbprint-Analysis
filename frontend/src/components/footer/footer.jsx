// Importing the necessary modules 
import React, { Fragment } from "react";
import Link from "next/link";

// Creating the footer component
const Footer = () => {
    // Getting the current year 
    const currentYear = new Date().getFullYear();

    // Rendering the footer component
    return (
        <Fragment> 
            <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Top Section: Branding & Newsletter */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
                        <div className="col-span-1">
                            <Link href="/" className="flex items-center gap-2 mb-6">
                                {/* Custom SVG Fingerprint Icon */}
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-indigo-600 w-8 h-8"
                                >
                                    <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.02-.3 3" />
                                    <path d="M14 22a10 10 0 0 0 4.46-1.91" />
                                    <path d="M2 12a10 10 0 0 1 18-6" />
                                    <path d="M20 12a10 10 0 0 1-5.5 8.9" />
                                    <path d="M1 12a10 10 0 0 1 10-10" />
                                    <path d="M12 18c-.3 0-.6-.1-.8-.3l-2.4-2.4" />
                                    <path d="M16 12a4 4 0 0 0-4-4" />
                                    <path d="M8 12a4 4 0 0 1 4-4" />
                                </svg>
                                <span className="font-bold text-2xl tracking-tight text-slate-900">ThumbPrint AI</span>
                            </Link>
                            <p className="text-slate-500 mb-6 max-w-sm leading-relaxed">
                                Empowering developers and security professionals with advanced biometric identification
                                powered by high-fidelity machine learning and Next.js.
                            </p>

                            {/* Social Links using SVGs */}
                            <div className="flex gap-4">
                                <a href="#" className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-indigo-600 hover:text-white transition-all">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                </a>
                                <a href="#" className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-indigo-600 hover:text-white transition-all">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                                </a>
                            </div>
                        </div>

                        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
                            {/* Column 1 */}
                            <div>
                                <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Platform</h4>
                                <ul className="space-y-4 text-sm text-slate-600">
                                    <li><a href="#how-it-works" className="hover:text-indigo-600 transition">How it Works</a></li>
                                    <li><a href="#architecture" className="hover:text-indigo-600 transition">Architecture</a></li>
                                    <li><Link href="/login" className="hover:text-indigo-600 transition">User Login</Link></li>
                                    <li><Link href="/register" className="hover:text-indigo-600 transition">Create Account</Link></li>
                                </ul>
                            </div>

                            {/* Column 2 */}
                            <div>
                                <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Resources</h4>
                                <ul className="space-y-4 text-sm text-slate-600">
                                    <li><a href="#" className="flex items-center gap-1 hover:text-indigo-600 transition">Documentation</a></li>
                                    <li><a href="#" className="hover:text-indigo-600 transition">ML Model Specs</a></li>
                                    <li><a href="#" className="hover:text-indigo-600 transition">System Logs</a></li>
                                    <li><a href="#" className="hover:text-indigo-600 transition">GitHub Repo</a></li>
                                </ul>
                            </div>

                            {/* Newsletter */}
                            <div className="col-span-2 md:col-span-1">
                                <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Stay Updated</h4>
                                <p className="text-sm text-slate-500 mb-4">Subscribe for the latest ML updates.</p>
                                <form className="flex flex-col gap-2">
                                    <input
                                        type="email"
                                        placeholder="Enter email"
                                        className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                    />
                                    <button className="bg-slate-900 text-white text-sm font-bold py-2 rounded-lg hover:bg-indigo-600 transition duration-300">
                                        Subscribe
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section: Copyright & Attribution */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-slate-100 pt-8">
                        <div className="text-slate-400 text-sm">
                            © {currentYear} ThumbPrint AI. All rights reserved.
                        </div>
                        <div className="flex items-center gap-1 text-sm text-slate-500">
                            <span>Built with by</span>
                            <span className="font-bold text-slate-900 hover:text-indigo-600 cursor-pointer transition">
                                Mbonu Chinedum
                            </span>
                        </div>
                        <div className="flex gap-6 text-sm text-slate-400">
                            <a href="#" className="hover:text-slate-600 transition">Privacy Policy</a>
                            <a href="#" className="hover:text-slate-600 transition">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        </Fragment>
    );
};

// Exporting the footer component 
export default Footer;