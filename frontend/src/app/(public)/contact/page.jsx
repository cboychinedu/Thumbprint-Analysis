// Using client 
"use client";

// Importing the necessary modules 
import React, { useState, Fragment } from 'react';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import { 
  Mail, 
  MapPin, 
  Send, 
  MessageSquare, 
  Terminal, 
  Globe 
} from 'lucide-react';

/**
 * Contact Component
 * Designed by Engr. Mbonu Chinedum
 * Purpose: Technical support and inquiry portal for the Biometric AI system.
 */
const Contact = () => {
    // Setting necessary states for the contact form 
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'Technical Inquiry',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Creating a function to handle form changes 
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Creating a function to handle form submission 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Mocking a server delay for the submission process
        setTimeout(() => {
            alert("Signal transmitted successfully. Our engineers will review your inquiry.");
            setIsSubmitting(false);
            setFormData({ name: '', email: '', subject: 'Technical Inquiry', message: '' });
        }, 1500);
    };

    // Rendering the contact jsx page 
    return (
        <Fragment>
            {/* Navigation Header */}
            <Navbar />

            <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100">
                <main className="max-w-7xl mx-auto px-4 py-12">
                    
                    {/* Page Header Section */}
                    <div className="mb-16 border-l-4 border-indigo-600 pl-6">
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900">Contact Terminal</h1>
                        <p className="text-slate-500 text-xs mt-1 uppercase tracking-widest font-mono">
                            Communication Node // Secure Message Uplink
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12">
                        
                        {/* Technical Information Sidebar */}
                        <div className="lg:col-span-1 space-y-8">
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 font-mono mb-6">Global Access</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-indigo-600">
                                            <Mail size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 uppercase font-mono font-bold">Inquiry Email</p>
                                            <p className="text-slate-700 font-medium">support@thumbprint-ai.io</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-indigo-600">
                                            <MapPin size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 uppercase font-mono font-bold">Development Hub</p>
                                            <p className="text-slate-700 font-medium">Warri, Delta State, Nigeria</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-indigo-600">
                                            <Globe size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 uppercase font-mono font-bold">Network Status</p>
                                            <p className="text-teal-600 font-bold text-xs uppercase">Operational // Systems Normal</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* System Message Log (Visual Element) */}
                            <div className="bg-slate-900 rounded-2xl p-6 text-indigo-400 font-mono text-[11px] shadow-xl">
                                <div className="flex gap-1.5 mb-4">
                                    <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                                    <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                                    <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                                </div>
                                <p className="text-slate-500 mb-1">{">"} Initializing contact protocols...</p>
                                <p className="text-slate-500 mb-1">{">"} Encrypting buffer channels...</p>
                                <p className="text-indigo-300 italic">{">"} Ready for user input_</p>
                            </div>
                        </div>

                        {/* Contact Form Section */}
                        <div className="lg:col-span-2">
                            <section className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm">
                                <div className="flex items-center gap-2 mb-8">
                                    <MessageSquare className="text-indigo-600" size={20} />
                                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-700 font-mono">Transmission Form</h2>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] text-slate-400 uppercase font-mono font-bold ml-1">Full Name</label>
                                            <input 
                                                type="text" 
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="e.g. John Doe"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] text-slate-400 uppercase font-mono font-bold ml-1">Email Address</label>
                                            <input 
                                                type="email" 
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="e.g. name@company.com"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] text-slate-400 uppercase font-mono font-bold ml-1">Subject Matter</label>
                                        <select 
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none"
                                        >
                                            <option>Technical Inquiry</option>
                                            <option>ML Model Collaboration</option>
                                            <option>API Access Request</option>
                                            <option>Security Reporting</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] text-slate-400 uppercase font-mono font-bold ml-1">Detailed Message</label>
                                        <textarea 
                                            name="message"
                                            required
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="5"
                                            placeholder="Describe your technical inquiry..."
                                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                                        ></textarea>
                                    </div>

                                    <button 
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full py-4 text-xs font-bold uppercase tracking-widest transition-all rounded-xl flex items-center justify-center gap-2
                                            ${isSubmitting 
                                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                                                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-100'}`}
                                    >
                                        {isSubmitting ? "Processing Signal..." : "Send Transmission"}
                                        <Send size={14} />
                                    </button>
                                </form>
                            </section>
                        </div>
                    </div>
                </main>
                
                {/* Using the footer */}
                <Footer />
            </div>
        </Fragment>
    );
};

// Exporting the contact component 
export default Contact;