// Using client 
"use client";

// Importing the necessary modules 
import Link from "next/link";
import Cookies from "js-cookie";
import React, { Fragment, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import { Fingerprint } from "lucide-react";
import { useRouter } from 'next/navigation';

// Creating a component for the navbar 
const Navbar = () => {
    // Setting the router object 
    const router = useRouter();

    // Creating a state for the login status, default to false 
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [mounted, setMounted] = useState(false);

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
                setisLoggedIn(decodedCookie.isLoggedIn || false);
            }

            // Catch the eror 
            catch (error) {
                // Set the logged in value as false 
                setisLoggedIn(false);
            }
        }

    })

    // Creating a function to handle the logout session 
    const handleLogout = () => {
        // Remove the user token 
        Cookies.remove("x-auth-token");

        // Wait for 2 seconds and redirect the user to the home page 
        setTimeout(() => {
            // Navigating the user to the home page 
            router.push("/login");
            setisLoggedIn(false);
        }, 2000);
    }

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
                        {isLoggedIn ? (
                            <>
                            </>
                        ) : (
                            <>
                                <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
                                    <a href="/#how-it-works" className="hover:text-indigo-600 transition">How it Works</a>
                                    <a href="/#architecture" className="hover:text-indigo-600 transition">Architecture</a>
                                    <a href="/#setup" className="hover:text-indigo-600 transition">Setup</a>
                                </div>
                            </>
                        )}
                        {isLoggedIn ? (
                            <>
                                <div>
                                    <Link
                                        href="/dashboard"
                                        className="mr-[10px] border border-solid border-[indigo] px-5 py-2 text-sm rounded-md hover:bg-slate-900 hover:text-white transition-all font-bold"
                                    >
                                        Dashboard
                                    </Link>
                                     <Link
                                        href="/history"
                                        className="mr-[10px] border border-solid border-[indigo] px-5 py-2 text-sm rounded-md hover:bg-slate-900 hover:text-white transition-all font-bold"
                                    >
                                        History
                                    </Link>
                                    <button
                                        className="bg-indigo-600 text-white px-5 py-2 rounded-[6px] text-sm font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <Link
                                        href="/login"
                                        className="mr-[10px] border border-solid border-[indigo] px-5 py-2 text-sm rounded-md hover:bg-slate-900 hover:text-white transition-all font-bold"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="bg-indigo-600 text-white px-5 py-2 rounded-[6px] text-sm font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                                        Register
                                    </Link>
                                </div>
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