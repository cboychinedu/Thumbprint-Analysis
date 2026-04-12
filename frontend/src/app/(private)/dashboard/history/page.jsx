// Using client 
"use client";

// Importing the necessary modules 
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import { AttentionSeeker } from 'react-awesome-reveal';
import React, { useEffect, useState, Fragment } from 'react';
import { Clock, User, Zap, Target, Download } from 'lucide-react';

// Creating the history component 
const History = () => {
    // Getting the user cookies 
    const userToken = Cookies.get("x-auth-token") || null;

    // Setting the state for loading the history data 
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Setting the state for the animation 
    const [animateKey, setAnimateKey] = useState(0);

    // Creating a function for deleting the history 
    const deleteItem = (event) => {
        // Getting the ID from the data-key attribute 
        const itemId = event.currentTarget.dataset.key;

        // Triggering the SweetAlert confirmation modal 
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this analysis data!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4f46e5",
            cancelButtonColor: "#4f46e5",
            confirmButtonText: "Yes, delete it!",
            background: "#ffffff",
            color: "#0f172a"
        }).then(async (result) => {
            // If the user clicked the confirm button 
            if (result.isConfirmed) {
                // Using try catch block to send the id to the server 
                try {
                    // Setting the server url for deletion 
                    const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/delete`;

                    // Making the DELETE request to the backend 
                    const response = await fetch(serverUrl, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-auth-token': userToken
                        },
                        body: JSON.stringify({ _id: itemId })
                    });

                    // Getting the response from the server as a JSON object 
                    const data = await response.json();

                    // if the backend confirmed the deletion 
                    if (data.status === "success") {
                        // Updating the local state to remove the item from the UI 
                        setHistory(prev => prev.filter(item => item._id !== itemId));

                        // Showing the success message 
                        Swal.fire(
                            "Deleted!",
                            "The analysis record has been removed!",
                            "success"
                        );
                    }

                    // Else if there was an error 
                    else {
                        // Log the error message 
                        console.log("Error: ", data.message);

                        // Display the swal error 
                        Swal.fire("Error!", "Error deleting the record!", "error");
                    }
                }

                // Catching the error 
                catch (error) {
                    // Displaying the error message 
                    console.log("Error: ", error);

                    // Displaying the swal error 
                    Swal.fire("Error!", "Could not delete the record. Please try again.", "error");
                }
            }
        })

    };

    // Creating a function for loading the history data 
    const fetchHistory = async () => {
        // Setting the server url 
        const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/history`;

        // Using try catch block to connect to the backend server 
        try {
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
                // console.log(historyData);

                // Checking if the returned history was null values 
                if (historyData === null) {
                    // Setting the history values as an empty list 
                    setHistory([]);
                }

                // Else if the history data contains no data, execute the block of 
                // code below 
                else {
                    // Setting the history values 
                    setHistory(historyData);
                }
            }

            // else if the error was occured
            else {
                // Setting the history 
                // console.log(data);
                setHistory("ACCESS_DENIED");
            }
        }
        // Catch the error on failed request    
        catch (error) {
            // Log the error message 
            console.log("Failed to load history:", error);
            setHistory("ACCESS_DENIED");
        }
        // Finally, set the loading to false 
        finally {
            // set the loading to false 
            setIsLoading(false);
        }
    };

    // Using use effect to render the data on componente mount. 
    useEffect(() => {
        // Setting the interval 
        const interval = setInterval(() => {
            // Incrementing by 1 
            setAnimateKey(prev => prev + 1);
        }, 7000)

        // Execute the function on component load once. 
        fetchHistory();

        // Clearing the interval 
        return () => clearInterval(interval);
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
                        <AttentionSeeker key={animateKey} effect="shake" cascade damping={4000} duration={7000}>
                            <div className="border-l-4 border-indigo-600 pl-6">
                                <h1 className="text-3xl font-bold tracking-tight">Analysis History</h1>
                                <p className="text-slate-500 text-xs mt-1 uppercase tracking-widest font-mono">
                                    Stored Biometric Logs // User Archive
                                </p>
                            </div>
                        </AttentionSeeker>

                        {/* EXPORT ALL BUTTON */}
                        {!isLoading && Array.isArray(history) && history.length > 0 ? (
                            <button
                                // onClick={downloadAllHistory}
                                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all shadow-lg shadow-indigo-100"
                            >
                                <Download size={18} />
                                Export All Data
                            </button>
                        ) : (
                            <>
                            </>
                        )}
                    </div>

                    {/* Basic checks to ensure the user is on the database. */}
                    {isLoading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                        </div>
                    ) : history === "ACCESS_DENIED" ? (
                        /* Situation: Authentication failed or status was not success */
                        <div className="text-center py-20">
                            <p className="text-red-500 font-mono text-sm uppercase">
                                Access Denied // Authentication Failure
                            </p>
                        </div>
                    ) : (Array.isArray(history) && history.length > 0) ? (
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
                                                {item.predictedResult}
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
                                                <span className="flex items-center gap-1 text-black uppercase font-mono">
                                                    <Clock size={10} /> {item.timestamp}
                                                </span>
                                                <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">
                                                    Success
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <div>
                                                    <button
                                                        key={item._id}
                                                        data-key={item._id}
                                                        onClick={deleteItem}
                                                        className="bg-red-500 hover:bg-red-700 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-fit"
                                                    >
                                                        Delete Result
                                                    </button>
                                                </div>
                                                <div>
                                                    <button
                                                        key={item._id}
                                                        className="bg-blue-800 hover:bg-blue-950 text-white text-[13px] py-2 px-4 rounded-lg font-semibold w-fit"
                                                    >
                                                        Download Analysis
                                                    </button>
                                                </div>
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