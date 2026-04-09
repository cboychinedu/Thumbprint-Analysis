// Using client 
"use client";

// Importing the necessary modules 
import React, { Fragment, useEffect, useState } from 'react';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import {
    Code2,
    Binary,
    Cpu,
    Globe,
    ShieldCheck,
    Workflow
} from 'lucide-react';
import { AttentionSeeker } from 'react-awesome-reveal';

// Creating the About component 
const About = () => {
    // Setting the state 
    const [animateKey, setAnimateKey] = useState(0);

    // Use effect 
    useEffect(() => {
        // Setting the interval 
        const interval = setInterval(() => {
            // Incrementing by 1 
            setAnimateKey(prev => prev + 1);
        }, 7000);

        // 
        return () => clearInterval(interval);
    }, []);

    // Rendering the jsx 
    return (
        <Fragment>
            <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100">
                {/* Adding the navbar */}
                <Navbar />

                <main className="max-w-7xl mx-auto px-4 py-12">

                    {/* Header Section */}
                    <AttentionSeeker key={animateKey} effect='shake' cascade damping={4000} duration={7000}>
                        <div className="mb-16 border-l-4 border-indigo-600 pl-6">
                            <h1 className="text-4xl font-bold tracking-tight text-slate-900">Project Documentation</h1>
                            <p className="text-slate-500 text-xs mt-1 uppercase tracking-widest font-mono">
                                Identity System v3.2.0 // Core Philosophy & Tech Stack
                            </p>
                        </div>
                    </AttentionSeeker>

                    {/* Mission & Vision Grid */}
                    <div className="grid lg:grid-cols-2 gap-12 mb-20">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                <Globe className="text-indigo-600" size={24} />
                                The Vision
                            </h2>
                            <p className="text-slate-600 leading-relaxed">
                                ThumbPrint AI was engineered to bridge the gap between low-level biometric hardware and modern web interfaces.
                                Our goal is to provide a seamless, full-stack environment where <strong>ridge pattern analysis</strong>
                                and <strong>minutiae extraction</strong> are handled with the precision of a production-grade
                                security system.
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                Originally conceived in Nigeria, this project emphasizes the use of <strong>C++ for performance-critical
                                    logic</strong> and Python for the flexibility of neural network training, all wrapped in a robust
                                React/Next.js ecosystem.
                            </p>
                        </div>

                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 shadow-inner">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-700 font-mono mb-6">Core Values</h3>
                            <div className="space-y-4">
                                {[
                                    { label: "Data Integrity", icon: <Binary size={16} />, desc: "Strict adherence to biometric encoding standards." },
                                    { label: "Neural Precision", icon: <Cpu size={16} />, desc: "Minimizing false positives through rigorous ML training." },
                                    { label: "Clean Architecture", icon: <Workflow size={16} />, desc: "Modular codebases built for maintainability." }
                                ].map((value, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <div className="p-2 bg-white border border-slate-200 rounded-lg text-indigo-600 shadow-sm">
                                            {value.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-slate-800">{value.label}</h4>
                                            <p className="text-xs text-slate-500 mt-0.5">{value.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Technical Breakdown Section */}
                    <section className="mb-20">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold">The Technical Core</h2>
                            <p className="text-slate-500 text-sm mt-2">Explaining the mechanics behind the scanner</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                                    <ShieldCheck />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Secure Ingestion</h3>
                                <p className="text-sm text-slate-600">
                                    Images are processed through a secure pipeline where filenames are sanitized and metadata is
                                    scrubbed before the ML inference engine takes over.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-lg flex items-center justify-center mb-4">
                                    <Code2 />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Flask Backend</h3>
                                <p className="text-sm text-slate-600">
                                    Our Python-based server acts as the central coordinator, utilizing JWT for stateless authentication
                                    and serving as the bridge to the TensorFlow/PyTorch models.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 bg-slate-100 text-slate-700 rounded-lg flex items-center justify-center mb-4">
                                    <Binary />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Ridge Mapping</h3>
                                <p className="text-sm text-slate-600">
                                    The neural network focuses on local ridge characteristics (minutiae), transforming image data into
                                    a high-dimensional vector for accurate identification.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Development Credits */}
                    <div className="bg-slate-900 rounded-3xl p-10 text-center text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Code2 size={120} />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Developed by Engr. Mbonu Chinedum</h2>
                        <p className="text-slate-400 text-sm max-w-xl mx-auto mb-8 font-mono tracking-tight">
                            Full-stack Software Engineer & Chemical Engineer with over 10 years of experience
                            building robust, mission-critical systems.
                        </p>
                        <div className="flex justify-center gap-6">
                            <a href="#" className="text-indigo-400 hover:text-indigo-300 font-bold text-xs uppercase tracking-widest">GitHub</a>
                            <a href="#" className="text-indigo-400 hover:text-indigo-300 font-bold text-xs uppercase tracking-widest">Portfolio</a>
                            <a href="#" className="text-indigo-400 hover:text-indigo-300 font-bold text-xs uppercase tracking-widest">Documentation</a>
                        </div>
                    </div>

                </main>

                <Footer />
            </div>
        </Fragment>
    );
};

// Exporting the About component 
export default About;