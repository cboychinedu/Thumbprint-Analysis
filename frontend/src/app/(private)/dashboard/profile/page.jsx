// Using client
"use client";

// Importing the necessary modules
import Cookies from "js-cookie";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import { AttentionSeeker } from "react-awesome-reveal";
import React, { useEffect, useState, Fragment } from "react";
import RightAlertBox from "@/components/alertbox/rightAlertbox";
import {
  User,
  Mail,
  ShieldCheck,
  Database,
  Fingerprint,
  Activity,
  X,
  Lock,
} from "lucide-react";

// Creating the profile component
const Profile = () => {
  // Setting the state for the alert visibility and messaging 
  const [showAlert, setShowAlert] = useState(false);
  const [status, setStatus] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  // Setting necessary states
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Setting the state for the animation
  const [animateKey, setAnimateKey] = useState(0);

  // Setting the states for the password modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);

  // Creating a function for closing the alert box 
  const closeAlert = () => {
    // Setting the necessary states to null and false 
    setShowAlert(false);
    setStatus(null);
    setAlertMessage(null);

  }

  // Creating a function for loading the user profile data
  const fetchProfile = async () => {
    // Setting the server url
    const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/profile`;

    // Using try catch block
    try {
      // Getting the user cookies
      const userToken = Cookies.get("x-auth-token");

      // Making a request to the backend server
      const response = await fetch(serverUrl, {
        method: "GET",
        headers: { "x-auth-token": userToken },
      });

      // Getting the response data
      const data = await response.json();

      // if the data status was a success
      if (data.status === "success") {
        // Setting the user data
        setUser(data.user);
      }

      // Else set the value to null
      else {
        // Setting null point value
        setUser(null);
      }
    } catch (error) {
      console.log("Failed to load profile:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Creating a function to handle password update
  const handleUpdatePassword = async (e) => {
    // Preventing event submission
    e.preventDefault();
    setIsUpdating(true);

    // Setting the server url 
    const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/update-password`;

    // Checking if the old password field is not empty 
    if (passwordData.oldPassword === "") {
      // Showing the alert box 
      setAlertMessage("Current password is missing!");
      setStatus("info");
      setShowAlert(true);
      setIsUpdating(false);
      return;
    }

    // Checking if the new password field is not empty 
    else if (passwordData.newPassword === "") {
      // Showing the alert box 
      setAlertMessage("New password is missing!");
      setStatus("info");
      setShowAlert(true);
      setIsUpdating(false);
      return;
    }

    // Checking if the confirm password field is empty 
    else if (passwordData.confirmPassword === "") {
      // Showing the alert box 
      setAlertMessage("Confirm password is missing!");
      setStatus("info");
      setShowAlert(true);
      setIsUpdating(false);
      return;
    }

    // if the passwords do not match
    else if (passwordData.newPassword !== passwordData.confirmPassword) {
      // Showing the alert box 
      setAlertMessage("New passwords do not match!");
      setStatus("info");
      setShowAlert(true);
      setIsUpdating(false);
      return;
    }

    // Else if a conditions were satified, execute the block of code 
    // below 
    else {
      // Using try catch block to send the new password to the backend server 
      try {
        // Getting the user token from the cookies storage 
        const userToken = Cookies.get("x-auth-token");

        // Making the "PUT" request to the server 
        const response = await fetch(serverUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": userToken,
          },
          body: JSON.stringify({
            oldPassword: passwordData.oldPassword,
            newPassword: passwordData.newPassword,
          }),
        });

        // Getting the response data as a json object 
        const data = await response.json();

        // if the data status was a success, execute the block 
        // of code below 
        if (data.status === "success") {
          // Show the alert box for 7 seconds 
          setAlertMessage("Password changed!");
          setStatus("success");
          setShowAlert(true);

          // Delay for 7 seconds 
          setInterval(() => {
            // Removing the modal screen and the alert box
            setIsModalOpen(false);
            setAlertMessage(null);
            setStatus(null);
            setShowAlert(false);

            // Removing the data from the state 
            setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });

            // Closing up 
            return;
          }, 4000);

          // Closing up 
          return;
        }

        // Else if the status was an error 
        else {
          // Show the alert box 
          setAlertMessage(data.message || "Update failed!");
          setStatus("error");
          setShowAlert(true);
          return;
        }
      }

      // Catching the error 
      catch (error) {
        // Log the error to the console 
        console.log("Error updating password:", error.message);

        // Display the error message 
        setAlertMessage("Error connecting to the server!");
        setStatus("error");
        setShowAlert(true);

        // Auto hide the error after 7 seconds 
        setTimeout(() => setShowAlert(false), 7000);
        return;
      }

      // Finally, set the updating value to false 
      finally {
        // Change the updating state to false 
        setIsUpdating(false);
      }
    }

  };

  // Using use effect to render data on mount
  useEffect(() => {
    // Setting the interval
    const interval = setInterval(() => {
      // Incrementing by 1
      setAnimateKey((prev) => prev + 1);
    }, 7000);

    // Running the fetch profile on component mount
    fetchProfile();

    // Clearing the interval
    return () => clearInterval(interval);
  }, []);

  // Rendering the JSX profile component
  return (
    <Fragment>
      {/* Adding the Navbar */}
      <Navbar />

      <div className="min-h-screen bg-white text-slate-900 font-sans mb-[100px]">
        <main className="max-w-4xl mx-auto px-4 py-12">
          <AttentionSeeker
            key={animateKey}
            effect="shake"
            cascade
            damping={4000}
            duration={7000}
          >
            {/* Header Section */}
            <div className="mb-10 border-l-4 border-indigo-600 pl-6">
              <h1 className="text-3xl font-bold tracking-tight">
                Engineer Profile
              </h1>
              <p className="text-slate-500 text-xs mt-1 uppercase tracking-widest font-mono">
                Authorized Personnel // Credentials Management
              </p>
            </div>
          </AttentionSeeker>

          {/* Basic checks to ensure the user is on the database. */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : user ? (
            <div className="grid gap-8">
              {/* User Identity Card */}
              <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 bg-indigo-50 rounded-2xl flex items-center justify-center border border-indigo-100 text-indigo-600">
                    <User size={40} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {user.fullname}
                    </h2>
                    <p className="text-indigo-600 font-mono text-sm font-bold uppercase tracking-widest">
                      System Administrator
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-mono font-bold tracking-widest flex items-center gap-2">
                      <Mail size={12} /> Registered Email
                    </label>
                    <p className="text-slate-700 font-medium">{user.email}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-mono font-bold tracking-widest flex items-center gap-2">
                      <ShieldCheck size={12} /> Security Clearance
                    </label>
                    <p className="text-teal-600 font-bold uppercase text-sm">
                      Level 4 // Bio-Auth Verified
                    </p>
                  </div>
                </div>
              </section>

              {/* System stats card */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                  <Database className="text-indigo-500 mb-2" size={20} />
                  <p className="text-[10px] text-slate-500 uppercase font-mono font-bold">
                    Node Identity
                  </p>
                  <p className="text-lg font-bold text-slate-800">
                    THUMB-DB-01
                  </p>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                  <Fingerprint className="text-indigo-500 mb-2" size={20} />
                  <p className="text-[10px] text-slate-500 uppercase font-mono font-bold">
                    ML Framework
                  </p>
                  <p className="text-lg font-bold text-slate-800">
                    TensorFlow Core
                  </p>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                  <Activity className="text-indigo-500 mb-2" size={20} />
                  <p className="text-[10px] text-slate-500 uppercase font-mono font-bold">
                    Status
                  </p>
                  <p className="text-lg font-bold text-teal-600 uppercase tracking-tighter">
                    Active Session
                  </p>
                </div>
              </div>

              {/* Account Actions */}
              <div className="flex flex-col md:flex-row gap-4 pt-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex-1 bg-slate-900 text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg"
                >
                  Update Password
                </button>
                <button className="flex-1 border border-red-200 bg-red-50 text-red-600 py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
                  Request Account Closure
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-red-500 font-mono text-sm uppercase">
                Access Denied // Authentication Failure
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Slide-in Modal Implementation */}
      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isModalOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-slate-900/60"
          onClick={() => setIsModalOpen(false)}
        />

        {/* Sliding Alert Component for feedback */}
        {showAlert && (
          <RightAlertBox status={status} alertMessage={alertMessage} onClose={closeAlert} />
        )}


        {/* Modal Content - Swipe from Left to Right */}
        <div
          className={`absolute top-0 left-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-500 ease-out border-r border-slate-200 ${isModalOpen ? "translate-x-0" : "-translate-x-full"}`}
        >

          <div className="p-8 h-full flex flex-col">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Security Update</h2>
                <p className="text-[10px] text-indigo-600 font-mono uppercase tracking-widest font-bold">Reset Auth Credentials</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={24} className="text-slate-500" />
              </button>
            </div>

            <form className="space-y-6 flex-1">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 uppercase font-mono font-bold tracking-widest">Current Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="password"
                      required
                      className="w-full bg-slate-50 border border-slate-200 py-3 pl-12 pr-4 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      value={passwordData.oldPassword}
                      onClick={closeAlert}
                      onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 uppercase font-mono font-bold tracking-widest">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="password"
                      required
                      className="w-full bg-slate-50 border border-slate-200 py-3 pl-12 pr-4 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      value={passwordData.newPassword}
                      onClick={closeAlert}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 uppercase font-mono font-bold tracking-widest">Confirm New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="password"
                      required
                      className="w-full bg-slate-50 border border-slate-200 py-3 pl-12 pr-4 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      value={passwordData.confirmPassword}
                      onClick={closeAlert}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isUpdating}
                  onClick={handleUpdatePassword}
                  className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg disabled:opacity-50"
                >
                  {isUpdating ? "Processing..." : "Authorize Update"}
                </button>
                <p className="text-[9px] text-slate-400 mt-4 text-center font-mono italic">
                  Note: Updating your password will invalidate existing active sessions on other nodes.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Adding the footer */}
      <Footer />
    </Fragment>
  );
};

// Exporting the profile page
export default Profile;