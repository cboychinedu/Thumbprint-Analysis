/**
 * Admin Register Interface - Level 4 Security Clearance 
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
    Gauge,
    AlertCircle,
    KeyRound
} from 'lucide-react';
import Link from 'next/link';
import { Fade, AttentionSeeker } from 'react-awesome-reveal';
import { useRouter } from 'next/navigation';

// Creating the admin component 
const AdminRegister = () => {
    // Initializing routing and state management 
    const router = useRouter();

    // Setting the initial error/status message 
    const initialMessage = "Your status message will be displayed here...";

    // State for handling input credentials 
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        keyCode: ""
    });

    // State for UI feedback and loading indicators 
    const [isLoading, setIsLoading] = useState(false);
    const [errorStatus, setErrorStatus] = useState(false);
    const [errorMessage, setErrorMessage] = useState(initialMessage);

    // Update state based on input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Creating a function for handling the register button
    const handleRegister = async (e) => {
        // Preventing default submission 
        e.preventDefault();

        // Set is loading to true 
        // setIsLoading(true);

        // Checking the email 
        if (credentials.email === "") {
            // Setting the error 
            setErrorStatus(true);
            setErrorMessage("Email address is required!");
            return;
        }

        // Checking if the email includes the "@" symbol 
        else if (!credentials.email.includes("@")) {
            // Setting the error 
            setErrorStatus(true);
            setErrorMessage("Email address is missing the @ symbol");
        }

        // Checking the system key code 
        else if (credentials.keyCode === "") {
            // Setting the error 
            setErrorStatus(true);
            setErrorMessage("System key code is required!");
            return;
        }

        // Checking the password 
        else if (credentials.password === "") {
            // Setting the error 
            setErrorStatus(true);
            setErrorMessage("Password field cannot be empty!");
            return;
        }

        // Else if all fields were completed 
        else {
            // Convert the data into a json object 
            const adminData = JSON.stringify(credentials);

            // Setting the backend server url 
            const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/register`;

            // Using try catch block to send the request to the backend server 
            try {
                // Making the request to the admin register route 
                const response = await fetch(serverUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: adminData
                });

                // if there was no response from the server 
                if (!response.ok) {
                    // Handle the server side error 
                    const errorData = await response.json();

                    // Display the error message 
                    setErrorStatus(true);
                    setErrorMessage(errorData.message || "Registration failed!");

                    // Auto hide the alert after 5 seconds 
                    setTimeout(() => {
                        // Remove the error message 
                        setErrorMessage(null);
                        setErrorStatus(false);
                        setIsLoading(false);
                        return;
                    }, 5000);

                }

                // Else if the server returned a response, get the response and convert it into a json object 
                else {
                    // Convert the data into a json object 
                    const responseData = await response.json();

                    // if the user was registered, execute the block of code below 
                    if (responseData.status === "success") {
                        // Display the status message 
                        setErrorMessage(responseData.message);

                        // Auto hide, and navigate the user to the login page 
                        setTimeout(() => {
                            // Navigate the user to the admin login page 
                            router.push("/admin/login");
                        }, 5000);

                    }

                    // Else if the response data was an error, execute the block 
                    // of code below 
                    else {
                        // Display the error message 
                        setErrorStatus(true);
                        setErrorMessage(responseData.message);
                        setIsLoading(false);

                        // Auto hide the error after 7 seconds 
                        setTimeout(() => {
                            setErrorStatus(false);
                            setErrorMessage(initialMessage);
                            setIsLoading(false);
                            return;
                        }, 7000)
                    }
                }

            }

            // Catch the error 
            catch (error) {
                // Log the error to the console 
                console.log("error: ", error.message);

                // Display the error to the admin 
                setErrorStatus(true);
                setErrorMessage("Error connecting to the server!");
                setIsLoading(false);

                // Auto hide the error after 7 seconds 
                setTimeout(() => {
                    setErrorStatus(false);
                    setErrorMessage(initialMessage);
                    setIsLoading(false);
                    return;
                }, 7000)
            }
        }
    };

    // Rendering the admin login component 
    return (
        <Fragment>
            <main className="flex items-center justify-center min-h-[80vh] p-4">
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

                        {/* Form Body */}
                        <div className="p-8">
                            {/* Error display */}
                            <div>
                                {errorStatus ? (
                                    <Fade>
                                        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 flex items-center gap-3 text-red-700">
                                            <AlertCircle size={18} />
                                            <p className="text-xs font-mono font-bold uppercase">[INFO]: {errorMessage} </p>
                                        </div>
                                    </Fade>
                                ) : (
                                    <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-200 flex items-center gap-3 text-green-700">
                                        <Gauge size={18} />
                                        <p className="text-xs font-mono font-bold uppercase"> [INFO]: {errorMessage} </p>
                                    </div>
                                )}
                            </div>

                            {/* Form display */}
                            <form className="space-y-5" onSubmit={handleRegister}>
                                {/* Personnel Email */}
                                <div className="space-y-1">
                                    <label className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-widest ml-1">
                                        Admin Email
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                        <input
                                            type="email"
                                            name="email"
                                            value={credentials.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="chinedu@engineer.com"
                                            className="w-full bg-slate-50 border border-slate-200 py-4 pl-12 pr-4 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Key Code Field (Fixed name to match state) */}
                                <div className="space-y-1">
                                    <label className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-widest ml-1">
                                        System Key Code
                                    </label>
                                    <div className="relative">
                                        <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                        <input
                                            type="password"
                                            name="keyCode"
                                            value={credentials.keyCode}
                                            onChange={handleChange}
                                            required
                                            placeholder="Encrypted Key Code"
                                            className="w-full bg-slate-50 border border-slate-200 py-4 pl-12 pr-4 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div className="space-y-1">
                                    <label className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-widest ml-1">
                                        Access Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                        <input
                                            type="password"
                                            name="password"
                                            value={credentials.password}
                                            onChange={handleChange}
                                            required
                                            placeholder="••••••••"
                                            className="w-full bg-slate-50 border border-slate-200 py-4 pl-12 pr-4 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-sm"
                                        />
                                    </div>
                                </div>

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

                    <div className="mt-8 text-center">
                        <p className="text-[9px] text-slate-400 font-mono uppercase tracking-[0.3em]">
                            Security Node: LAG-NG-01 // Encrypted Session
                        </p>
                    </div>
                </div>
            </main>
        </Fragment>
    )
}

// Exporting the admin login component 
export default AdminRegister; 