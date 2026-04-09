// Using client 
"use client"; 

// Importing the necessary modules 
import React, { Fragment } from "react";
import Link from "next/link";

// Creating the NotFound component 
const NotFound = () => {
    // Rendering the not found component 
    return (
        <Fragment> 
            <div className="min-h-[80vh] flex items-center justify-center px-4 py-24 bg-white selection:bg-indigo-100">
                <div className="max-w-xl w-full text-center">
                    {/* Animated Icon Section */}
                    <div className="relative mb-8 flex justify-center">
                        <div className="absolute inset-0 bg-indigo-50 rounded-full blur-3xl scale-150 opacity-60"></div>

                        <div className="relative">
                            {/* Custom SVG Fingerprint with "Scan Error" style */}
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-slate-200 w-48 h-48 md:w-64 md:h-64"
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

                            {/* Error Overlay */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <span className="text-8xl md:text-9xl font-black text-indigo-600/90 tracking-tighter">
                                    404
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Text Content */}
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Identity Not Found.
                    </h1>
                    <p className="text-slate-500 text-lg mb-10 leading-relaxed">
                        The minutiae of this page pattern doesn't match our database.
                        It might have been moved, deleted, or never existed in the first place.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/"
                            className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Back to Home
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
                        >
                            Go Back
                        </button>
                    </div>

                    {/* Support Note */}
                    <div className="mt-16 pt-8 border-t border-slate-100">
                        <p className="text-sm text-slate-400">
                            If you believe this is a technical error, please contact
                            <span className="text-indigo-600 font-semibold ml-1 cursor-pointer">Mbonu Chinedum</span>
                        </p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

// Exporting the not found component 
export default NotFound;