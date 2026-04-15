/**
 * Admin Login Interface - Level 4 Security Clearance 
 * Author: Mbonu Chinedum
 */

// Using client 
"use client";

// Importing the necessary modules 
import React, { useState, Fragment } from 'react';
import {
    Lock,
    Mail,
    ShieldCheck,
    ArrowRight,
    Terminal,
    AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { Fade, Slide, AttentionSeeker } from 'react-awesome-reveal';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

// Creating the admin component 
const AdminRegister = () => {
    // Initializing routing and state management 
    const router = useRouter();

    // State for handling input credentials 
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        keyCode: ""
    });

    // State for UI feedback and loading indicators 
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    // Rendering the admin login component 
    return (
        <Fragment>
            {/* The main container uses a centered grid layout to focus the user's attention on the terminal-styled card.*/}
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans selection:bg-indigo-100">
                {/* Animated Card Container */}
                <div className="w-full max-w-md">
                    <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden">

                        {/* Header: Visual Security Branding */}
                        <div className="bg-slate-900 p-8 text-center relative">
                            <div className="absolute top-4 right-4 text-slate-700 opacity-20">
                                <Terminal size={60} />
                            </div>

                            <AttentionSeeker effect="pulse" duration={2500}>
                                <div className="w-16 h-16 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <ShieldCheck size={32} className="text-indigo-400" />
                                </div>
                            </AttentionSeeker>

                            <h1 className="text-white text-xl font-bold tracking-tighter uppercase">
                                Admin Register
                            </h1>
                            <p className="text-slate-500 font-mono text-[10px] mt-1 tracking-[0.2em] uppercase">
                                Identification System v2.0
                            </p>
                        </div>

                        {/* Login Form Body */}
                        <div className="p-8">
                            {errorMessage && (
                                <Fade>
                                    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 flex items-center gap-3 text-red-700">
                                        <AlertCircle size={18} />
                                        <p className="text-xs font-mono font-bold uppercase">{errorMessage}</p>
                                    </div>
                                </Fade>
                            )}

                            <form className="space-y-5">
                                {/* Email Input Field */}
                                <div className="space-y-1">
                                    <label className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-widest ml-1">
                                        Personnel Email
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            placeholder="chinedu@engineer.com"
                                            className="w-full bg-slate-50 border border-slate-200 py-4 pl-12 pr-4 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-sm"


                                        />
                                    </div>
                                </div>

                                {/* Key Code Field */}
                                <div className="space-y-1">
                                    <label className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-widest ml-1">
                                        Key Code
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                        <input
                                            type="password"
                                            name="password"
                                            required
                                            placeholder="••••••••"
                                            className="w-full bg-slate-50 border border-slate-200 py-4 pl-12 pr-4 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-sm"

                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div className="space-y-1">
                                    <label className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-widest ml-1">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                        <input
                                            type="password"
                                            name="password"
                                            required
                                            placeholder="••••••••"
                                            className="w-full bg-slate-50 border border-slate-200 py-4 pl-12 pr-4 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-sm"

                                        />
                                    </div>
                                </div>

                                {/* Submit Action */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg flex items-center justify-center gap-2 group disabled:opacity-50 mt-4"
                                >
                                    {isLoading ? "Validating..." : (
                                        <Fragment>
                                            Authenticate Access
                                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </Fragment>
                                    )}
                                </button>
                            </form>

                            {/* Footer Links (Internal to Card) */}
                            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center text-[10px] font-mono uppercase tracking-tight text-slate-400">
                                <Link href="/admin/login" className="hover:text-indigo-600 cursor-pointer">Login</Link>
                                <span
                                    onClick={() => router.push('/admin')}
                                    className="hover:text-slate-900 cursor-pointer"
                                >
                                    Return to Gateway
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* System Footer Metadata */}
                    <div className="mt-8 text-center">
                        <p className="text-[9px] text-slate-400 font-mono uppercase tracking-[0.3em]">
                            Security Node: LAG-NG-01 // Encrypted Session
                        </p>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

// Exporting the admin login component 
export default AdminRegister; 