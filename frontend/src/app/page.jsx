/* =================================================================
 * Author: Engr. Mbonu Chinedum 
 * Date Created: 2026-03-30 7:17:56 PM
 * Date Modified: 2026-04-05 5:43:33 AM
 * Location: Nigeria (Tinubu Administration)
 * * LICENSE: Creative Commons Attribution-NonCommercial 4.0 (CC BY-NC)
 * =================================================================
 * This software is provided as Open Source for educational and 
 * personal use. You are free to:
 * - SHARE: Copy and redistribute the material in any medium.
 * - ADAPT: Remix, transform, and build upon the material.
 *
 * UNDER THE FOLLOWING TERMS:
 * - ATTRIBUTION: You must give appropriate credit to the author.
 * - NON-COMMERCIAL: You may NOT use the material for commercial 
 * purposes. This software cannot be sold or used for profit.
 * ================================================================= */

// Importing the necessary modules 
import React, { Fragment } from 'react';
import {
  Cpu,
  ShieldCheck,
  UploadCloud,
  Search,
  Zap,
  Terminal,
  CheckCircle2
} from 'lucide-react';
import Footer from '@/components/footer/footer';
import Navbar from '@/components/navbar/navbar';
import { Fade, Zoom, Slide, Reveal, AttentionSeeker, Hinge } from 'react-awesome-reveal';

// Creating the home component 
const Home = () => {
  return (
    <Fragment>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
        {/* Adding the navbar */}
        <Navbar />

        {/* Hero Section */}
        <header className="relative py-20 overflow-hidden">
          <Fade cascade duration={5000}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <AttentionSeeker effect='bounce' cascade duration={7000}> 
                  <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
                    Biometric 
                    <span className="hover:italic transition-all duration-[3000ms] hover:text-blue-950"> Identification </span> <br />
                    <span className="text-indigo-600">Powered by Machine Learning</span>
                  </h1>
                </AttentionSeeker>
                <p className="max-w-2xl mx-auto text-lg text-slate-600 mb-10">
                  A comprehensive full-stack application designed to identify individuals through
                  advanced ridge pattern analysis and minutiae extraction.
                </p>
              </div>
            </div>
          </Fade>
        </header>

        {/* Process Section */}
        <section id="how-it-works" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">The Identification Pipeline</h2>
              <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: <ShieldCheck />, title: "1. Authentication", desc: "Secure user registration and login management via Flask Blueprints." },
                { icon: <UploadCloud />, title: "2. Image Upload", desc: "Users upload high-quality thumbprint images through a modern Next.js dashboard." },
                { icon: <Cpu />, title: "3. ML Inference", desc: "A pre-trained model analyzes ridge patterns and minutiae in real-time." },
                { icon: <Search />, title: "4. Backend Processing", desc: "Flask processes requests and coordinates between the DB and the ML engine." },
                { icon: <Zap />, title: "5. Real-time Rendering", desc: "Identification results are returned via JSON and rendered instantly." },
                { icon: <CheckCircle2 />, title: "6. Result Retrieval", desc: "Get owner info and confidence scores with high precision." },
              ].map((step, index) => (
                <Slide direction={step.title == "4. Backend Processing" ? "right" : "left"} cascade key={index}>
                  <div key={index} className="p-6 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-50 transition duration-300">

                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                </Slide>
              ))}
            </div>
          </div>
        </section>

        {/* Architecture Section */}
        <section id="architecture" className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Built with Modern Tech Stack</h2>
                <div className="space-y-8">
                  <Zoom cascade direction='right' delay={250}>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-1 bg-indigo-500 rounded-full"></div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">Backend (Flask)</h4>
                        <p className="text-slate-600">Modular Blueprint workflow, custom log formatting, and integrated Python ML libraries (TensorFlow/PyTorch).</p>
                      </div>
                    </div>
                  </Zoom>
                  <Zoom cascade direction='left' delay={250}>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-1 bg-teal-500 rounded-full"></div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">Frontend (Next.js)</h4>
                        <p className="text-slate-600">React Server Components, App Router for navigation, and Tailwind CSS for a responsive interface.</p>
                      </div>
                    </div>
                  </Zoom>
                </div>
              </div>
              <Fade direction='right' duration={1800}>
                <div className="bg-slate-900 rounded-2xl p-8 text-indigo-400 font-mono text-sm shadow-2xl">
                  <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <p className="text-slate-500 mb-2">// Project Structure</p>
                  <p>├── backend/</p>
                  <p className="pl-4">├── routes/ <span className="text-slate-500"># Auth & Dashboard</span></p>
                  <p className="pl-4">├── notebooks/ <span className="text-slate-500"># Model Training</span></p>
                  <p className="pl-4">└── app.py</p>
                  <p>├── frontend/</p>
                  <p className="pl-4">├── src/app/ <span className="text-slate-500"># Next.js Pages</span></p>
                  <p className="pl-4">└── components/</p>
                </div>
              </Fade>
            </div>
          </div>
        </section>

        {/* Setup Section */}
        <section id="setup" className="py-20 bg-white">
          <AttentionSeeker effect='shake' cascade duration={5000}>
            <Fade cascade duration={2800}>
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <AttentionSeeker effect='shake' cascade duration={5000}>
                  <h2 className="text-3xl font-bold mb-10 text-center">Get Started Locally</h2>
                </AttentionSeeker>
                <div className="space-y-6">
                  <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg">
                    <div className="bg-slate-800 px-4 py-2 text-slate-400 text-xs flex justify-between">
                      <span>Terminal - Installation</span>
                      <Terminal size={14} />
                    </div>
                    <div className="p-6 text-indigo-300 font-mono text-sm">
                      <p className="mb-2"><span className="text-teal-400"># Clone Repo</span></p>
                      <p className="mb-4">git clone https://github.com/cboychinedu/Thumbprint-Analysis</p>
                      <p className="mb-2"><span className="text-teal-400"># Backend Setup</span></p>
                      <p>cd backend && pip install -r requirements.txt</p>
                      <p className="mb-4">python app.py</p>
                      <p className="mb-2"><span className="text-teal-400"># Frontend Setup</span></p>
                      <p>cd frontend && npm install</p>
                      <p>npm run dev</p>
                    </div>
                  </div>
                </div>
              </div>
            </Fade>
          </AttentionSeeker>
        </section>

        {/* Adding the footer */}
        <Footer />
      </div>
    </Fragment>
  );
}

// Exporting the home component 
export default Home; 