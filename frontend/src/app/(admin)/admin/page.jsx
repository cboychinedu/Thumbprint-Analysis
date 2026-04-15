/* =================================================================
 * Admin Gateway - Authorized Personnel Only
 * Author: Engr. Mbonu Chinedum 
 * ================================================================= */

"use client";

import React, { Fragment } from 'react';
import Link from 'next/link';
import {
    ShieldAlert,
    Lock,
    Key,
    UserPlus,
    Terminal,
    Server,
    Activity
} from 'lucide-react';
import { Fade, Slide, AttentionSeeker } from 'react-awesome-reveal';


const Admin = () => {
    return (
        <Fragment>
            <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
                {/* Adding the navbar */}

                {/* Hero / Warning Section */}
                <header className="relative py-24 overflow-hidden border-b border-slate-200 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center">
                            <Fade direction="down" triggerOnce>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 mb-6">
                                    <ShieldAlert size={16} className="animate-pulse" />
                                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest">
                                        Restricted Access Zone
                                    </span>
                                </div>
                            </Fade>

                            <AttentionSeeker effect="pulse" duration={2000}>
                                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tighter">
                                    Central Admin <span className="text-indigo-600">Console</span>
                                </h1>
                            </AttentionSeeker>

                            <p className="max-w-xl mx-auto text-slate-500 font-mono text-sm leading-relaxed mb-10">
                                System identification and biometric database management portal.
                                Please provide L4 credentials to proceed to the secure node.
                            </p>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <Link href="/admin/login" className="w-full sm:w-48">
                                    <button className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl active:scale-95">
                                        <Lock size={14} /> System Login
                                    </button>
                                </Link>

                                <Link href="/admin/register" className="w-full sm:w-48">
                                    <button className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:border-indigo-400 hover:text-indigo-600 transition-all active:scale-95">
                                        <UserPlus size={14} /> Request Access
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Subtle Background Decoration */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none">
                        <Terminal size={400} className="mx-auto" />
                    </div>
                </header>

                {/* Quick System Stats / Info */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-3 gap-6">
                            <Slide direction="up" cascade damping={0.1}>
                                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                                        <Server size={20} />
                                    </div>
                                    <h4 className="text-sm font-bold uppercase tracking-widest mb-2">Kernel Status</h4>
                                    <p className="text-xs text-slate-500 font-mono italic">Node: THUMB-ML-MAIN v2.0.4 - Operational</p>
                                </div>

                                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                    <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-lg flex items-center justify-center mb-4">
                                        <Activity size={20} />
                                    </div>
                                    <h4 className="text-sm font-bold uppercase tracking-widest mb-2">Traffic Monitor</h4>
                                    <p className="text-xs text-slate-500 font-mono italic">Active Streams: 12 Encryption: AES-256</p>
                                </div>

                                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                    <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center mb-4">
                                        <Key size={20} />
                                    </div>
                                    <h4 className="text-sm font-bold uppercase tracking-widest mb-2">Vault Security</h4>
                                    <p className="text-xs text-slate-500 font-mono italic">Master Key Rotation: Required in 4 days</p>
                                </div>
                            </Slide>
                        </div>
                    </div>
                </section>

                {/* Adding the footer */}
            </div>
        </Fragment>
    );
};

export default Admin;