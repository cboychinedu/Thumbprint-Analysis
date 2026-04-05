"use client";

import Cookies from 'js-cookie';
import React, { Fragment } from 'react';
import { useRouter } from 'next/navigation'; 

// Login component 
const Login = () => {
    // 
    const router = useRouter(); 

    // Remove the cookies 
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

    // setting the cookies 
    const setCookie = () => {
        Cookies.set("x-auth-token",
            JSON.stringify({ "username": "mike adams", "email": "mikeadams@gmail.com" }),
            {
                expires: 1,
                path: '/' // Ensure the cookie is accessible globally
            }
        );

        alert("Cookie set!");
        // Trigger a redirect or refresh so the middleware sees the new state
    };

    // 
    return (
        <Fragment>
            <div>Login</div>
            <button onClick={setCookie} className="bg-blue-500 p-[15px] text-white rounded-2xl w-[150px]"> Set Cookie </button>
            <button onClick={handleLogout} className="bg-amber-950 p-[15px] text-white rounded-2xl w-[150px]"> Logout </button>
        </Fragment>
    )
}

export default Login