// Using the client 
"use client";

// Importing the necessary modules 
import Cookies from 'js-cookie';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import { AttentionSeeker } from 'react-awesome-reveal'; 
import React, { useState, Fragment, useEffect } from 'react';

// Creating the dashboard component 
const Dashboard = () => {
  // Setting the necessary states 
  const [animateKey, setAnimateKey] = useState(0); 
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [inferenceResult, setInferenceResult] = useState(null);

  // Handling the file selection
  const handleFileChange = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setInferenceResult(null); 
    }
  };

  // Creating a function for handling the drag over function 
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Creating a function for handling the drag and drop function 
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  // Creating a function for handling the upload 
  const handleUpload = async () => {
    if (!selectedImage) return;
    setIsUploading(true);
    
    // Get the form data 
    const formData = new FormData();

    // Append the image thumbprint to the form data 
    formData.append('thumbprint', selectedImage);

    // Getting the cookie data 
    const userCookie = Cookies.get("x-auth-token"); 

    // Using try catch block to handle the request to the backend sever 
    try {
      // Set the server url 
      const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard`; 

      // Making a request to the backend server 
      const response = await fetch(serverUrl, {
        headers: { 'x-auth-token': userCookie }, 
        method: 'POST',
        body: formData,
      });

      // Getting the response from the server 
      const data = await response.json();
      setInferenceResult(data);
    } 
    
    // On error generated, catch the error 
    catch (error) {
      // Setting the inference result
      setInferenceResult({ status: 'error', message: 'Connection to ML Server failed.' });
    } 
    // Finally, set the isUploading to be false
    finally {
      setIsUploading(false);
    }
  };

  // Use effect 
  useEffect(() => {
    // Setting the interval 
    const interval = setInterval(() => {
      // Incrementing by 1 
      setAnimateKey(prev => prev + 1); 
    }, 7000); 

    // Clearing the interval 
    return () => clearInterval(interval); 
  }, []); 

  // Rendering the component JSX 
  return (
    <Fragment>
      {/* Adding the navbar */}
      <Navbar />

      {/* Main Background: Pure White */}
      <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 mb-[100px]">
        <main className="max-w-7xl mx-auto px-4 py-12">
          <AttentionSeeker key={animateKey} effect='shake' cascade damping={4000} duration={7000}> 
            {/* Header Section */}
            <div className="mb-10 border-l-4 border-indigo-600 pl-6">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Analysis Terminal</h1>
              <p className="text-slate-500 text-xs mt-1 uppercase tracking-widest font-mono">
                System ID: 4092-X // Status: Ready
              </p>
            </div>
          </AttentionSeeker>

          {/* Select Model Div */}
          <div className="space-y-1 mb-[20px]"> 
            <select
              className="w-[200px] bg-slate-50 border border-blue-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none"
            > 
              <option> Select ML Model </option>
              <option> Default Model </option>
            </select>
            <p className="text-slate-500 text-[12px] mt-1"> <strong> N/B: </strong> Remember, if you do not select a machine learning model, <br /> it will assume you are choosing the <strong> default model. </strong> </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Upload Section: White card with subtle border */}
            <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-700 font-mono">Data Input</h2>
              </div>

              <div 
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`relative group border-2 border-dashed transition-all duration-300 rounded-xl p-12 text-center 
                  ${previewUrl ? 'border-indigo-600 bg-indigo-50/30' : 'border-slate-200 hover:border-indigo-400 bg-slate-50/50'}`}
              >
                <input 
                  type="file" 
                  id="thumb-upload" 
                  hidden 
                  onChange={(e) => handleFileChange(e.target.files[0])}
                  accept="image/*"
                />
                
                {previewUrl ? (
                  <div className="space-y-4">
                    <img src={previewUrl} alt="Preview" className="mx-auto max-h-64 rounded-lg border border-white shadow-md" />
                    <button 
                      onClick={() => {setPreviewUrl(null); setSelectedImage(null);}}
                      className="text-[11px] text-red-600 font-bold uppercase hover:text-red-700"
                    >
                      Reset Scanner
                    </button>
                  </div>
                ) : (
                  <label htmlFor="thumb-upload" className="cursor-pointer block">
                    <svg className="w-12 h-12 mx-auto text-slate-300 mb-4 group-hover:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                    </svg>
                    <p className="text-sm font-bold text-slate-800">Drag & Drop Image</p>
                    <p className="text-[10px] text-slate-400 mt-2 uppercase font-mono">PNG, JPG up to 10MB</p>
                  </label>
                )}
              </div>

              <button 
                onClick={handleUpload}
                disabled={!selectedImage || isUploading}
                className={`mt-8 w-full py-4 text-xs font-bold uppercase tracking-widest transition-all rounded-xl
                  ${!selectedImage || isUploading 
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-100'}`}
              >
                {isUploading ? "Processing Neural Map..." : "Scan Biometrics"}
              </button>
            </section>

            {/* Results Section */}
            <section className="space-y-6">
              <div className="bg-slate-50/50 border border-slate-200 rounded-2xl p-8 min-h-[440px] flex flex-col shadow-inner">
                <div className="flex items-center justify-between mb-8">
                   <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-teal-500"></div>
                      <h2 className="text-sm font-bold uppercase tracking-widest text-slate-700 font-mono">Inference Results</h2>
                   </div>
                   <span className="text-[10px] bg-white px-2 py-1 border border-slate-200 text-slate-400 rounded uppercase font-mono">
                      v3.2.0-Alpha
                   </span>
                </div>

                {inferenceResult ? (
                  <div className="flex-1 flex flex-col justify-center animate-in slide-in-from-bottom-4 duration-500">
                    {inferenceResult.status === 'success' ? (
                      <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
                        <div className="flex items-center gap-5 mb-6">
                          <div className="w-14 h-14 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div>
                            <p className="text-[10px] text-indigo-600 uppercase font-black tracking-widest">Subject Identified</p>
                            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{inferenceResult.owner}</h3>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase font-mono">Confidence Level</p>
                            <p className="text-xl font-bold text-teal-600">{inferenceResult.confidence}%</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase font-mono">ML Latency</p>
                            <p className="text-xl font-bold text-slate-800">{inferenceResult.latency} secs </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-red-50 border border-red-100 p-6 rounded-xl text-center">
                        <p className="text-red-700 font-bold text-sm uppercase font-mono tracking-widest">Scan Failed</p>
                        <p className="text-red-600/70 text-xs mt-2">{inferenceResult.message}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center border border-slate-100 mb-4 shadow-sm">
                      <svg className="w-8 h-8 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="text-slate-300 text-[10px] uppercase tracking-[0.3em] font-bold font-mono">Awaiting Input Data</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Adding the footer */}
      <Footer />
    </Fragment>
  );
};

// Exporting the dashboard 
export default Dashboard;