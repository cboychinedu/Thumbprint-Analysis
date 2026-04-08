// Using client 
"use client";

// Importing the necessary modules 
import Link from "next/link";
import Cookies from "js-cookie";
import React, { Fragment, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import { Fingerprint, Menu, X } from "lucide-react"; // Added Menu and X for mobile
import { useRouter } from 'next/navigation';

// Creating a component for the navbar 
const Navbar = () => {
    // Setting the router object 
    const router = useRouter();

    // Creating a state for the login status, default to false 
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [mounted, setMounted] = useState(false);
    
    // NEW: State to handle mobile menu toggle
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Using use effect 
    useEffect(() => {
        // Mounting the component 
        setMounted(true);

        // Getting the user's cookie 
        const userCookie = Cookies.get("x-auth-token");

        // If the user cookies is present 
        if (userCookie) {
            // Using try, catch block to decode the user cookie 
            try {
                // Decode the cookie
                const decodedCookie = jwtDecode(userCookie);
                // @ts-ignore
                setisLoggedIn(decodedCookie.isLoggedIn || false);
            }

            // Catch the eror 
            catch (error) {
                // Set the logged in value as false 
                setisLoggedIn(false);
            }
        }
    }, []); // Added empty dependency array for best practice

    // Creating a function to handle the logout session 
    const handleLogout = () => {
        // Remove the user token 
        Cookies.remove("x-auth-token");

        // Wait for 2 seconds and redirect the user to the home page 
        setTimeout(() => {
            // Navigating the user to the home page 
            router.push("/login");
            setisLoggedIn(false);
        }, 1000); // Reduced to 1s for better UX
    }

    // Don't render anything until mounted to prevent hydration mismatch
    if (!mounted) return null;

    // Rendering the navbar component 
    return (
        <Fragment>
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        {/* Logo */}
                        <Link className="flex items-center gap-2 z-[60]" href={isLoggedIn ? "/dashboard": "/" }>
                            <Fingerprint className="text-indigo-600 w-8 h-8" />
                            <span className="font-bold text-xl tracking-tight">ThumbPrint AI</span>
                        </Link>

                        {/* Desktop Middle Links (Hidden on Mobile) */}
                        {!isLoggedIn && (
                            <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
                                <a href="/#how-it-works" className="hover:text-indigo-600 transition">How it Works</a>
                                <a href="/#architecture" className="hover:text-indigo-600 transition">Architecture</a>
                                <a href="/#setup" className="hover:text-indigo-600 transition">Setup</a>
                                <a href="/about" className="hover:text-indigo-600 transition"> About </a>
                                <a href="/contact" className="hover:text-indigo-600 transition-all"> Contact </a>
                            </div>
                        )}

                        {/* Desktop Auth Buttons (Hidden on Mobile) */}
                        <div className="hidden md:flex items-center">
                            {isLoggedIn ? (
                                <div className="flex gap-2">
                                    <Link href="/dashboard" className="border border-indigo-600 px-5 py-2 text-sm rounded-md hover:bg-slate-900 hover:text-white transition-all font-bold text-indigo-600">
                                        Dashboard
                                    </Link>
                                    <Link href="/dashboard/history" className="border border-indigo-600 px-5 py-2 text-sm rounded-md hover:bg-slate-900 hover:text-white transition-all font-bold text-indigo-600">
                                        History
                                    </Link>
                                    <Link href="/dashboard/profile" className="border border-indigo-600 px-5 py-2 text-sm rounded-md hover:bg-slate-900 hover:text-white transition-all font-bold text-indigo-600"> 
                                        Profile 
                                    </Link>
                                    <Link href="/dashboard/settings" className="border border-indigo-600 px-5 py-2 text-sm rounded-md hover:bg-slate-900 hover:text-white transition-all font-bold text-indigo-600"> 
                                        Settings 
                                    </Link>
                                    <button
                                        className="bg-indigo-600 text-white px-5 py-2 rounded-[6px] text-sm font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="flex gap-2">
                                    <Link href="/login" className="border border-indigo-600 px-5 py-2 text-sm rounded-md hover:bg-slate-900 hover:text-white transition-all font-bold text-indigo-600">
                                        Login
                                    </Link>
                                    <Link href="/register" className="bg-indigo-600 text-white px-5 py-2 rounded-[6px] text-sm font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Toggle Button (Hidden on Desktop) */}
                        <div className="md:hidden flex items-center z-[60]">
                            <button 
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-slate-600 p-2 focus:outline-none"
                            >
                                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <div className={`md:hidden absolute w-full bg-white border-b border-slate-200 transition-all duration-300 ease-in-out ${isMenuOpen ? 'top-16 opacity-100' : '-top-96 opacity-0 pointer-events-none'}`}>
                    <div className="px-4 pt-2 pb-6 space-y-2 shadow-xl">
                        {!isLoggedIn ? (
                            <>
                                <a href="/#how-it-works" onClick={() => setIsMenuOpen(false)} className="block px-3 py-4 text-base font-medium text-slate-600 border-b border-slate-50">How it Works</a>
                                <a href="/#architecture" onClick={() => setIsMenuOpen(false)} className="block px-3 py-4 text-base font-medium text-slate-600 border-b border-slate-50">Architecture</a>
                                <a href="/#setup" onClick={() => setIsMenuOpen(false)} className="block px-3 py-4 text-base font-medium text-slate-600 border-b border-slate-50">Setup</a>
                                <a href="/about" onClick={() => setIsMenuOpen(false)} className="block px-3 py-4 text-base font-medium text-slate-600 border-b border-slate-50"> About </a>
                                <a href="/contact" onClick={() => setIsMenuOpen(false)} className="block px-3 py-4 text-base font-medium text-slate-600 border-b border-slate-50"> Contact </a>
                                <div className="grid grid-cols-2 gap-3 pt-4">
                                    <Link href="/login" onClick={() => setIsMenuOpen(false)} className="text-center border border-indigo-600 py-3 rounded-md font-bold text-indigo-600">Login</Link>
                                    <Link href="/register" onClick={() => setIsMenuOpen(false)} className="text-center bg-indigo-600 text-white py-3 rounded-md font-bold">Register</Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="block px-3 py-4 text-base font-medium text-slate-600 border-b border-slate-50">Dashboard</Link>
                                <Link href="/dashboard/history" onClick={() => setIsMenuOpen(false)} className="block px-3 py-4 text-base font-medium text-slate-600 border-b border-slate-50">History</Link>
                                <Link href="/dashboard/profile" onClick={() => setIsMenuOpen(false)} className="block px-3 py-4 text-base font-medium text-slate-600 border-b border-slate-50">Profile</Link>
                                <Link href="/dashboard/settings" onClick={() => setIsMenuOpen(false)} className="block px-3 py-4 text-base font-medium text-slate-600 border-b border-slate-50">Settings</Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full mt-4 bg-red-50 text-red-600 py-3 rounded-md font-bold border border-red-100"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </Fragment>
    )
}

// Exporting the navbar component 
export default Navbar;