// Importing the necessary modules 
import Link from "next/link";
import React, { Fragment } from "react";
import { Fingerprint } from "lucide-react";

// Creating a component for the navbar 
const Navbar = () => {
    // Rendering the navbar component 
    return (
        <Fragment>
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <Link className="flex items-center gap-2" href="/">
                            <Fingerprint className="text-indigo-600 w-8 h-8" />
                            <span className="font-bold text-xl tracking-tight">ThumbPrint AI</span>
                        </Link>
                        <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
                            <a href="#how-it-works" className="hover:text-indigo-600 transition">How it Works</a>
                            <a href="#architecture" className="hover:text-indigo-600 transition">Architecture</a>
                            <a href="#setup" className="hover:text-indigo-600 transition">Setup</a>
                        </div>
                        <div> 
                            <Link 
                                href="/login"
                                className="mr-[10px] border border-solid border-[indigo] px-5 py-2 text-sm rounded-md hover:bg-slate-900 hover:text-white transition-all font-bold"> 
                                    Login 
                            </Link>
                            <Link 
                                href="/register"
                                className="bg-indigo-600 text-white px-5 py-2 rounded-[6px] text-sm font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                                Register 
                            </Link>
                        </div>

                    </div>
                </div>
            </nav>
        </Fragment>
    )
}

// Exporting the navbar component 
export default Navbar; 