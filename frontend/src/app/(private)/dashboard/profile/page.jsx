// Using client 
"use client";

// Importing the necessary modules 
import Cookies from 'js-cookie';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import { AttentionSeeker } from 'react-awesome-reveal';
import React, { useEffect, useState, Fragment } from 'react';
import { User, Mail, ShieldCheck, Database, Fingerprint, Activity } from 'lucide-react';

// Creating the profile component 
const Profile = () => {
    // Setting necessary states
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Setting the state for the animation 
    const [animateKey, setAnimateKey] = useState(0); 

    // Creating a function for loading the user profile data
    const fetchProfile = async () => {
        // Setting the server url 
        const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/profile`;

        try {
            // Getting the user cookies 
            const userToken = Cookies.get("x-auth-token");

            // Making a request to the backend server 
            const response = await fetch(serverUrl, {
                method: 'GET',
                headers: { 'x-auth-token': userToken }
            });

            const data = await response.json();

            if (data.status === 'success') {
                setUser(data.user);
            }
        } catch (error) {
            console.log("Failed to load profile:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Using use effect to render data on mount
    useEffect(() => {
        // Setting the interval 
        const interval = setInterval(() => {
            // Incrementing by 1 
            setAnimateKey(prev => prev + 1); 
        }, 7000); 

        // Running the fetch profile on component mount 
        fetchProfile();

        // Clearing the interval 
        return () => clearInterval(interval); 

    }, []);

    // Rendering the JSX profile component
    return (
        <Fragment>
            {/* Adding the Navbar */}
            <Navbar />

            <div className="min-h-screen bg-white text-slate-900 font-sans mb-[100px]">
                <main className="max-w-4xl mx-auto px-4 py-12">
                    <AttentionSeeker key={animateKey} effect="shake" cascade damping={4000} duration={7000}> 
                        {/* Header Section */}
                        <div className="mb-10 border-l-4 border-indigo-600 pl-6">
                            <h1 className="text-3xl font-bold tracking-tight">Engineer Profile</h1>
                            <p className="text-slate-500 text-xs mt-1 uppercase tracking-widest font-mono">
                                Authorized Personnel // Credentials Management
                            </p>
                        </div>
                    </AttentionSeeker>

                    {isLoading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                        </div>
                    ) : user ? (
                        <div className="grid gap-8">
                            
                            {/* User Identity Card */}
                            <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="w-20 h-20 bg-indigo-50 rounded-2xl flex items-center justify-center border border-indigo-100 text-indigo-600">
                                        <User size={40} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900">{user.fullname}</h2>
                                        <p className="text-indigo-600 font-mono text-sm font-bold uppercase tracking-widest">System Administrator</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-slate-400 uppercase font-mono font-bold tracking-widest flex items-center gap-2">
                                            <Mail size={12} /> Registered Email
                                        </label>
                                        <p className="text-slate-700 font-medium">{user.email}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-slate-400 uppercase font-mono font-bold tracking-widest flex items-center gap-2">
                                            <ShieldCheck size={12} /> Security Clearance
                                        </label>
                                        <p className="text-teal-600 font-bold uppercase text-sm">Level 4 // Bio-Auth Verified</p>
                                    </div>
                                </div>
                            </section>

                            {/* System stats card */}
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                                    <Database className="text-indigo-500 mb-2" size={20} />
                                    <p className="text-[10px] text-slate-500 uppercase font-mono font-bold">Node Identity</p>
                                    <p className="text-lg font-bold text-slate-800">THUMB-DB-01</p>
                                </div>
                                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                                    <Fingerprint className="text-indigo-500 mb-2" size={20} />
                                    <p className="text-[10px] text-slate-500 uppercase font-mono font-bold">ML Framework</p>
                                    <p className="text-lg font-bold text-slate-800">TensorFlow Core</p>
                                </div>
                                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                                    <Activity className="text-indigo-500 mb-2" size={20} />
                                    <p className="text-[10px] text-slate-500 uppercase font-mono font-bold">Status</p>
                                    <p className="text-lg font-bold text-teal-600 uppercase tracking-tighter">Active Session</p>
                                </div>
                            </div>

                            {/* Account Actions */}
                            <div className="flex flex-col md:flex-row gap-4 pt-4">
                                <button className="flex-1 bg-slate-900 text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg">
                                    Update Password
                                </button>
                                <button className="flex-1 border border-red-200 bg-red-50 text-red-600 py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
                                    Request Account Closure
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-red-500 font-mono text-sm uppercase">Access Denied // Authentication Failure</p>
                        </div>
                    )}
                </main>
            </div>

            {/* Adding the footer */}
            <Footer />
        </Fragment>
    );
};

// Exporting the profile page
export default Profile;