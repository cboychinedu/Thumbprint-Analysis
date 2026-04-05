// Using the client 
"use client"; 

// Importing the necessary modules 
import React, { Fragment, useState } from 'react';
import {
    Fingerprint,
    Mail,
    Lock,
    User,
    UserPlus,
    ShieldCheck,
    CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import AlertBox from '@/components/alertbox/alertbox';

// Creating the register component 
export default function Register() {
    // Setting the router 
    const router = useRouter(); 

    // Setting the state for the alert visibility and messaging 
    const [showAlert, setShowAlert] = useState(false); 
    const [status, setStatus] = useState(null); 
    const [alertMessage, setAlertMessage] = useState(null); 

    // Setting the state for the input data
    const [fullname, setFullname] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [confirmPassword, setConfirmPassword] = useState(""); 

    // Creating a function for closing the alert box 
    const closeAlert = () => {
        // Setting the necessary states to null and false 
        setShowAlert(false); 
        setStatus(null); 
        setAlertMessage(null); 
    }

    // Creating a function for handling the register button 
    const handleRegister = async (event) => {
        // Prevent default submission 
        event.preventDefault(); 

        // Checking the fullname 
        if (fullname === "") {
            // Showing the alert box 
            setAlertMessage("Fullname is required!"); 
            setStatus("info"); 
            setShowAlert(true); 
            return; 
        }

        // Checking the email 
        else if (email === "" || !email.includes("@")) {
            // Showing the alert box 
            setAlertMessage("Email address is required!"); 
            setStatus("info"); 
            setShowAlert(true); 
            return; 
        }

        // Checking the password 
        else if (password.trim() === "") {
            // Showing the alert box 
            setAlertMessage("Password field cannot be empty!"); 
            setStatus("info"); 
            setShowAlert(true); 
            return; 
        }

        // Checking the confirm password 
        else if (confirmPassword.trim() === "") {
            // Showing the alert box 
            setAlertMessage("Please confirm your password!"); 
            setStatus("info"); 
            setShowAlert(true); 
            return; 
        }

        // Checking if the passwords match 
        else if (password.trim() !== confirmPassword.trim()) {
            // Showing the alert box 
            setAlertMessage("Passwords do not match!"); 
            setStatus("info"); 
            setShowAlert(true); 
            return; 
        }

        // Else if all validations pass, execute the block of code below 
        else {
            // Getting the registration data 
            const registrationData = JSON.stringify({
                fullname: fullname.trim(), 
                email: email.trim(), 
                password: password.trim() 
            }); 

            // Setting the backend server url 
            const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/register`;

            // Using try catch block to send the request to the backend server 
            try {
                // Making the request to the register route 
                const response = await fetch(serverUrl, {
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json'}, 
                    body: registrationData
                }); 

                // if there was no response from the server 
                if (!response.ok) {
                    // Handle the server side error 
                    const errorData = await response.json(); 

                    // Display the error message 
                    setAlertMessage(errorData.message || "Registration failed!"); 
                    setStatus("error"); 
                    setShowAlert(true); 

                    // Auto hide the alert after 5 seconds 
                    setTimeout(() => setShowAlert(false), 5000); 
                    return; 
                }

                // Else if the server returned a response, get the response and 
                // convert it into a json object 
                else {
                    // Convert the data into json object 
                    const responseData = await response.json(); 

                    // if the user was registered, execute this block of code 
                    if (responseData.status === "success") {
                        // Display the status message 
                        setAlertMessage(responseData.message); 
                        setStatus("success"); 
                        setShowAlert(true); 

                        // Auto hide, and navigate the user to the login page 
                        setTimeout(() => {
                            // Hide the message 
                            setShowAlert(false); 

                            // Navigate the user to the login page 
                            router.push('/login')
                        }, 6000)
                    }

                    // Else, if the response data was an error 
                    else {
                        // Display the status message 
                        setAlertMessage(responseData.message); 
                        setStatus("error"); 
                        setShowAlert(true); 

                        // Auto hide the error after 7 minutes 
                        setTimeout(() => setShowAlert(false), 7000); 
                        return; 
                    }
                }
            }

            // Catch the error 
            catch (error) {
                // Log the error to the console 
                console.log("error: ", error.message); 

                // Display the error message 
                setAlertMessage("Error connecting to the server!"); 
                setStatus("error"); 
                setShowAlert(true); 

                // Auto hide the error after 7 seconds 
                setTimeout(() => setShowAlert(false), 7000); 
                return; 
            }
             
        }
    }

    // Rendering the register component 
    return (
        <Fragment>
            {/* Creating the navbar */}
            <Navbar />

            {/* Sliding Alert Component for feedback */}
            {showAlert && (
                <AlertBox status={status} alertMessage={alertMessage} onClose={closeAlert} /> 
            )}

            {/* Creating the main component */}
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 selection:bg-indigo-100">
                {/* Background Decorative Elements */}
                <div className="absolute inset-0 overflow-hidden -z-10">
                    <div className="absolute -top-[5%] -right-[5%] w-[35%] h-[35%] bg-indigo-100 rounded-full blur-3xl opacity-50" />
                    <div className="absolute top-[20%] -left-[10%] w-[30%] h-[30%] bg-teal-50 rounded-full blur-3xl opacity-40" />
                </div>

                <div className="max-w-5xl w-full grid md:grid-cols-2 bg-white rounded-3xl shadow-2xl shadow-slate-200 overflow-hidden border border-slate-100">
                    {/* Left Side: Information & Trust */}
                    <div className="hidden md:flex flex-col justify-between p-12 bg-indigo-600 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-12">
                                <Fingerprint className="text-white w-10 h-10" />
                                <span className="font-bold text-2xl tracking-tight text-white">ThumbPrint AI</span>
                            </div>
                            <h2 className="text-4xl font-bold leading-tight mb-6">
                                Join the future of <br />
                                <span className="text-indigo-200">Identity Verification.</span>
                            </h2>

                            <div className="space-y-6 mt-10">
                                <div className="flex items-start gap-4">
                                    <CheckCircle2 className="mt-1 text-indigo-300" size={20} />
                                    <div>
                                        <h4 className="font-semibold">Secure ML Integration</h4>
                                        <p className="text-indigo-100 text-sm">Your biometric data is processed using state-of-the-art neural networks.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <CheckCircle2 className="mt-1 text-indigo-300" size={20} />
                                    <div>
                                        <h4 className="font-semibold">Real-time Dashboard</h4>
                                        <p className="text-indigo-100 text-sm">Instant results and confidence scoring for every thumbprint upload.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <CheckCircle2 className="mt-1 text-indigo-300" size={20} />
                                    <div>
                                        <h4 className="font-semibold">Developer Friendly</h4>
                                        <p className="text-indigo-100 text-sm">Powered by a robust Flask Blueprint backend and Next.js frontend.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 pt-10 border-t border-indigo-500/50">
                            <p className="text-indigo-100 text-sm italic">
                                "Building secure biometric systems has never been more accessible."
                            </p>
                            <p className="mt-2 font-bold text-sm">— Mbonu Chinedum, Creator</p>
                        </div>

                        {/* Decorative Background Icon */}
                        <ShieldCheck className="absolute -bottom-10 -left-10 w-64 h-64 text-indigo-700 opacity-30" />
                    </div>

                    {/* Right Side: Registration Form */}
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                        <div className="mb-8 text-center md:text-left">
                            <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h1>
                            <p className="text-slate-500 text-sm">Sign up to start analyzing biometric thumbprints.</p>
                        </div>

                        <form className="space-y-4">
                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition duration-200 text-sm"
                                        onChange={(event) => {
                                            // Closing the alert 
                                            closeAlert(); 

                                            // Setting the fullname 
                                            setFullname(event.target.value); 
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type="email"
                                        placeholder="name@company.com"
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition duration-200 text-sm"
                                        onChange={(event) => {
                                            // Closing the alert 
                                            closeAlert(); 

                                            // Setting the email 
                                            setEmail(event.target.value); 
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition duration-200 text-sm"
                                            onChange={(event) => {
                                                // Closing the alert 
                                                closeAlert(); 

                                                // Setting the password 
                                                setPassword(event.target.value); 
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Confirm Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition duration-200 text-sm"
                                            onChange={(event) => {
                                                // Closing the alert 
                                                closeAlert(); 

                                                // Setting the confirm password 
                                                setConfirmPassword(event.target.value); 
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2">
                                <p className="text-[11px] text-slate-500 mb-4 leading-relaxed">
                                    By registering, you agree to our <span className="text-indigo-600 font-medium cursor-pointer">Terms of Service</span> and <span className="text-indigo-600 font-medium cursor-pointer">Privacy Policy</span> regarding biometric data processing.
                                </p>

                                <button 
                                    className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 group"
                                    onClick={handleRegister}
                                >
                                    Create Account
                                    <UserPlus size={18} className="group-hover:scale-110 transition-transform" />
                                </button>
                            </div>
                        </form>

                        <p className="mt-8 text-center text-sm text-slate-500">
                            Already have an account? <Link href="/login" className="text-indigo-600 font-bold hover:underline"> Login </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Adding the footer */}
            <Footer /> 
        </Fragment>
    );
}