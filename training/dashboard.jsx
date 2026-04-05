"use client";

import Cookies from 'js-cookie';
import React, { Fragment } from 'react'; 
import { useRouter } from 'next/navigation'; 

const Dashboard = () => {
    // Setting the router object 
    const router = useRouter(); 

    // Creating a function to handle the logout session 
    const handleLogout = () => {
        // Remove the user token 
        Cookies.remove("x-auth-token");

        // Wait for 2 seconds and redirect the user to the home page 
        setInterval(() => {
            // Navigating the user to the home page 
            router.push("/");
        }, 2000);
    }

    // 
    const displayCookie = () => {
        console.log(JSON.parse(Cookies.get("x-auth-token")))
    }
    return (
        <Fragment> 
            <div>Dashboard</div>
            <button onClick={displayCookie}> Display Cookie </button>
            <button onClick={handleLogout} className="bg-amber-950 p-[15px] text-white rounded-2xl w-[150px]"> Logout </button>
        </Fragment>
    )
}

export default Dashboard