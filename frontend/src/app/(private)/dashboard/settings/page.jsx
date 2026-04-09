// Using client 
"use client";

// Importing the necessary modules 
import Cookies from 'js-cookie';
import React, { useState, Fragment, useEffect } from 'react';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import { AttentionSeeker } from 'react-awesome-reveal';
import { Settings as SettingsIcon, UploadCloud, BrainCircuit, ShieldAlert, Save } from 'lucide-react';

// Creating the settings component 
const Settings = () => {
  // Setting the necessary states 
  const [selectedZip, setSelectedZip] = useState(null);
  const [isTraining, setIsTraining] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  // Setting the state for the animation 
  const [animateKey, setAnimateKey] = useState(0); 

  // Handling the ZIP file selection
  const handleZipChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'application/zip' || file.name.endsWith('.zip'))) {
      setSelectedZip(file);
      setUploadStatus(null);
    } else {
      alert("Please upload a valid .zip file");
    }
  };

  // Using use effect to animate the System settings 
  useEffect(() => {
    // Setting the interval 
    const interval = setInterval(() => {
      // Incrementing by 1 
      setAnimateKey(prev => prev + 1); 
    }, 7000); 

    // Clearing the interval 
    return () => clearInterval(interval); 

  }, []); 

  // Function to handle the ML Training Upload
  // const handleStartTraining = async () => {
  //   if (!selectedZip) return;
  //   setIsTraining(true);

  //   const formData = new FormData();
  //   formData.append('dataset', selectedZip);
  //   const userCookie = Cookies.get("x-auth-token");

  //   try {
  //     const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/train`;
  //     const response = await fetch(serverUrl, {
  //       headers: { 'x-auth-token': userCookie },
  //       method: 'POST',
  //       body: formData,
  //     });

  //     const data = await response.json();
  //     setUploadStatus({ status: 'success', message: 'Dataset received. Training started in background.' });
  //   } catch (error) {
  //     setUploadStatus({ status: 'error', message: 'Failed to connect to Training Server.' });
  //   } finally {
  //     setIsTraining(false);
  //   }
  // };

  // Rendering the jsx component 
  return (
    <Fragment>
      {/* Adding the navbar */}
      <Navbar />

      {/* Adding the main div */}
      <div className="min-h-screen bg-white text-slate-900 font-sans mb-[100px]">
        <main className="max-w-5xl mx-auto px-4 py-12">
          <AttentionSeeker key={animateKey} effect='shake' cascade damping={4000} duration={7000}> 
            {/* Header Section */}
            <div className="mb-10 border-l-4 border-indigo-600 pl-6">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">System Settings</h1>
              <p className="text-slate-500 text-xs mt-1 uppercase tracking-widest font-mono">
                Configuration // Neural Network Training
              </p>
            </div>
          </AttentionSeeker>

          <div className="grid lg:grid-cols-3 gap-8">

            {/* Sidebar Navigation (Visual Only for now) */}
            <aside className="lg:col-span-1 space-y-2">
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 text-indigo-600 rounded-xl font-bold text-sm">
                <SettingsIcon size={18} /> General Settings
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl font-bold text-sm transition-all">
                <BrainCircuit size={18} /> ML Training
              </button>
            </aside>

            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-8">

              {/* Training Section */}
              <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <BrainCircuit className="text-indigo-600" size={20} />
                  <h2 className="text-sm font-bold uppercase tracking-widest text-slate-700 font-mono">Model Training Terminal</h2>
                </div>

                <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-6 mb-6">
                  <div className="flex gap-4">
                    <ShieldAlert className="text-indigo-600 shrink-0" size={24} />
                    <div>
                      <p className="text-xs font-bold text-indigo-900 uppercase">Training Protocol</p>
                      <p className="text-[11px] text-indigo-700 mt-1 leading-relaxed">
                        Upload a <strong>.zip</strong> file containing folders of thumbprints.
                        The folder names will be used as labels (e.g., /John_Doe/image1.jpg).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors">
                    <input
                      type="file"
                      id="zip-upload"
                      hidden
                      accept=".zip"
                      onChange={handleZipChange}
                    />
                    <label htmlFor="zip-upload" className="cursor-pointer block">
                      <UploadCloud className="mx-auto text-slate-300 mb-2" size={32} />
                      <p className="text-sm font-bold text-slate-800">
                        {selectedZip ? selectedZip.name : "Select Dataset ZIP"}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1 uppercase font-mono tracking-tighter">
                        Structured folders only
                      </p>
                    </label>
                  </div>

                  <button
                    disabled={!selectedZip || isTraining}
                    className={`w-full py-4 text-xs font-bold uppercase tracking-widest transition-all rounded-xl flex items-center justify-center gap-2
                      ${!selectedZip || isTraining
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-100'}`}
                  >
                    {isTraining ? "Injecting Neural Data..." : "Execute Model Retraining"}
                  </button>

                  {uploadStatus && (
                    <div className={`mt-4 p-4 rounded-lg text-xs font-mono font-bold uppercase ${uploadStatus.status === 'success' ? 'bg-teal-50 text-teal-700' : 'bg-red-50 text-red-700'}`}>
                      {uploadStatus.message}
                    </div>
                  )}
                </div>
              </section>

              {/* General Settings Section */}
              <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <SettingsIcon className="text-slate-400" size={20} />
                  <h2 className="text-sm font-bold uppercase tracking-widest text-slate-700 font-mono">Preferences</h2>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between py-4 border-b border-slate-50">
                    <div>
                      <p className="text-sm font-bold text-slate-800">Automated History Logging</p>
                      <p className="text-[10px] text-slate-400 uppercase font-mono">Store all biometric scans in database</p>
                    </div>
                    <div className="w-10 h-5 bg-indigo-600 rounded-full relative">
                      <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-4 border-b border-slate-50">
                    <div>
                      <p className="text-sm font-bold text-slate-800">High-Precision Inference</p>
                      <p className="text-[10px] text-slate-400 uppercase font-mono">Increase neural layer depth (Slower latency)</p>
                    </div>
                    <div className="w-10 h-5 bg-slate-200 rounded-full relative">
                      <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </main>
      </div>

      {/* Adding the footer */}
      <Footer />
    </Fragment>
  );
};

// Exporting the setting component 
export default Settings;