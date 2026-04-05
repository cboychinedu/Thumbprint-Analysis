"use client";

// Importing the necessary modules 
import Cookies from 'js-cookie';
import React, { Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Fingerprint, 
  Mail, 
  Lock, 
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';

// Creating the Login component 
const Login = () => {
    // 
    const router = useRouter();

    // Remove the cookies 
    // Creating a function to handle the logout session 
    const handleLogout = () => {
        // Remove the user token 
        Cookies.remove("x-auth-token");

        // Wait for 2 seconds and redirect the user to the home page 
        setInterval(() => {
            // Navigating the user to the home page 
            router.push("/");
        }, 2000);
    }

    // setting the cookies 
    const setCookie = () => {
        Cookies.set("x-auth-token",
            JSON.stringify({ "username": "mike adams", "email": "mikeadams@gmail.com" }),
            {
                expires: 1,
                path: '/' // Ensure the cookie is accessible globally
            }
        );

        alert("Cookie set!");
        // Trigger a redirect or refresh so the middleware sees the new state
    };

    // Rendering the login component 
    return (
        <Fragment>
            {/* Adding the navbar */}
            <Navbar /> 

            {/* Adding the main div */}
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 selection:bg-indigo-100">
                {/* Background Decorative Elements */}
                <div className="absolute inset-0 overflow-hidden -z-10">
                    <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-3xl opacity-50" />
                    <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-teal-50 rounded-full blur-3xl opacity-50" />
                </div>

                <div className="max-w-5xl w-full grid md:grid-cols-2 bg-white rounded-3xl shadow-2xl shadow-slate-200 overflow-hidden border border-slate-100">

                    {/* Left Side: Branding/Visual */}
                    <div className="hidden md:flex flex-col justify-between p-12 bg-slate-900 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-12">
                                <Fingerprint className="text-indigo-400 w-10 h-10" />
                                <span className="font-bold text-2xl tracking-tight">ThumbPrint AI</span>
                            </div>
                            <h2 className="text-4xl font-bold leading-tight mb-6">
                                Secure Biometric <br />
                                <span className="text-indigo-400">Access Control.</span>
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Log in to access your dashboard, manage biometric records, and run real-time ML inferences.
                            </p>
                        </div>

                        <div className="relative z-10 space-y-4">
                            <div className="flex items-center gap-3 text-sm text-slate-300">
                                <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-indigo-400" />
                                </div>
                                Encrypted Data Transmission
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-300">
                                <div className="w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-teal-400" />
                                </div>
                                Real-time Neural Analysis
                            </div>
                        </div>

                        {/* Decorative Fingerprint Background Pattern */}
                        <Fingerprint className="absolute -bottom-20 -right-20 w-80 h-80 text-slate-800 opacity-50" />
                    </div>

                    {/* Right Side: Login Form */}
                    <div className="p-8 md:p-16 flex flex-col justify-center">
                        <div className="mb-10 text-center md:text-left">
                            <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
                            <p className="text-slate-500">Please enter your details to sign in.</p>
                        </div>

                        <form className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type="email"
                                        placeholder="name@company.com"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition duration-200"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-semibold text-slate-700">Password</label>
                                    <a href="#" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition">Forgot password?</a>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition duration-200"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2 py-2">
                                <input type="checkbox" id="remember" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                                <label htmlFor="remember" className="text-sm text-slate-600 select-none">Remember for 30 days</label>
                            </div>

                            <button className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 group">
                                Sign In
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>

                        {/* Social Logins */}
                        <div className="mt-10">
                            <div className="relative mb-8 text-center">
                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                                <span className="relative px-4 bg-white text-slate-400 text-xs font-medium uppercase tracking-wider">Or continue with</span>
                            </div>
                        </div>

                        <p className="mt-10 text-center text-sm text-slate-500">
                            Don't have an account? <Link href="/register" className="text-indigo-600 font-bold hover:underline">Register now </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Adding the footer  */}
            <Footer /> 
        </Fragment>
    )
}

export default Login