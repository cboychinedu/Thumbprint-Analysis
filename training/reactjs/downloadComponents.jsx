// Using client 
"use client";

// Importing the necessary modules 
import Cookies from 'js-cookie';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import { Clock, User, Zap, Target, Download } from 'lucide-react'; // Added Download icon
import React, { useEffect, useState, Fragment } from 'react';

// Creating the history component 
const History = () => {
    // Setting the state for loading the history data 
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Creating a function for loading the history data 
    const fetchHistory = async () => {
        // Setting the server url 
        const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/history`;

        // Using try catch block to connect to the backend server 
        try {
            // Getting the user cookies 
            const userToken = Cookies.get("x-auth-token");

            // Making a request to the backend server 
            const response = await fetch(serverUrl, {
                method: 'GET',
                headers: { 'x-auth-token': userToken }
            });

            // Getting the response data 
            const data = await response.json();

            // if the data status was a success 
            if (data.status === 'success') {
                // Getting the history data 
                let historyData = JSON.parse(data.history);
                
                // Checking if the returned history was null values 
                if (historyData === null) {
                    // Setting the history values as an empty list 
                    setHistory([])
                }

                // Else if the history data contains data, execute the block of 
                // code below 
                else {
                    // Setting the history values 
                    setHistory(historyData);
                }
            }
        }
        // Catch the error on failed request    
        catch (error) {
            // Log the error message 
            console.log("Failed to load history:", error);
        }
        // Finally, set the loading to false 
        finally {
            // set the loading to false 
            setIsLoading(false);
        }
    };

    // Creating a function to download all history as a JSON file
    const downloadAllHistory = () => {
        // Checking if there is data to export
        if (history.length === 0) return;

        // Creating a blob from the history data
        const blob = new Blob([JSON.stringify(history, null, 2)], { type: 'application/json' });
        
        // Creating a temporary URL for the blob
        const url = URL.createObjectURL(blob);
        
        // Creating a temporary link element
        const link = document.createElement('a');
        link.href = url;
        link.download = `thumbprint_history_export_${new Date().toISOString().split('T')[0]}.json`;
        
        // Appending to body, clicking, and removing
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Cleaning up the URL
        URL.revokeObjectURL(url);
    };

    // Using use effect to render the data on componente mount. 
    useEffect(() => {
        // Execute the function on component load once. 
        fetchHistory();
    }, []);

    // Rendering the JSX history component 
    return (
        <Fragment>
            {/* Adding the Navbar */}
            <Navbar />

            <div className="min-h-screen bg-white text-slate-900 font-sans mb-[100px]">
                {/* Main div */}
                <main className="max-w-7xl mx-auto px-4 py-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                        <div className="border-l-4 border-indigo-600 pl-6">
                            <h1 className="text-3xl font-bold tracking-tight">Analysis History</h1>
                            <p className="text-slate-500 text-xs mt-1 uppercase tracking-widest font-mono">
                                Stored Biometric Logs // User Archive
                            </p>
                        </div>

                        {/* EXPORT ALL BUTTON */}
                        {!isLoading && history.length > 0 && (
                            <button
                                onClick={downloadAllHistory}
                                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all shadow-lg shadow-indigo-100"
                            >
                                <Download size={18} />
                                Export All Data
                            </button>
                        )}
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                        </div>
                    ) : history.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {history.map((item, index) => (
                                <div key={index} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    {/* Thumbprint Preview */}
                                    <div className="h-48 bg-slate-100 flex items-center justify-center overflow-hidden border-b border-slate-100">
                                        <img
                                            src={item.encodedImage}
                                            alt="Analyzed Scan"
                                            className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                                        />
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-4">
                                            <User size={16} className="text-indigo-600" />
                                            <h3 className="font-bold text-lg text-slate-800 uppercase tracking-tight">
                                                {item.owner}
                                            </h3>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="flex items-center gap-1 text-slate-400 uppercase font-mono">
                                                    <Target size={12} /> Confidence
                                                </span>
                                                <span className="font-bold text-teal-600">{item.confidence}%</span>
                                            </div>

                                            <div className="flex justify-between items-center text-xs">
                                                <span className="flex items-center gap-1 text-slate-400 uppercase font-mono">
                                                    <Zap size={12} /> Latency
                                                </span>
                                                <span className="font-bold text-slate-700">{item.latency}s</span>
                                            </div>

                                            <div className="flex justify-between items-center text-[10px] pt-3 border-t border-slate-50">
                                                <span className="flex items-center gap-1 text-slate-300 uppercase font-mono">
                                                    <Clock size={10} /> {item.timestamp || 'N/A'}
                                                </span>
                                                <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">
                                                    Success
                                                </span>
                                            </div>
                                            <div className="flex justify-between gap-2 pt-2">
                                                <button
                                                    className="flex-1 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white font-bold py-2 px-3 rounded-lg text-[10px] uppercase transition-colors border border-red-100"
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    className="flex-1 bg-slate-900 text-white hover:bg-slate-800 py-2 px-3 rounded-lg font-bold text-[10px] uppercase transition-colors"
                                                > 
                                                    Download
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                            <p className="text-slate-400 font-mono text-sm uppercase">No analysis records found in archive.</p>
                        </div>
                    )}
                </main>
            </div>

            {/* Adding the footer */}
            <Footer />
        </Fragment>
    );
};

// Exporting the history 
export default History;