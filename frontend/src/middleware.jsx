// Importing the necessary modules 
import { NextResponse } from 'next/server'

// Creating and exporting the function to handle the routing middleware
export function middleware(request) {
  // Get the user's cookies from the browser
  const token = request.cookies.get("x-auth-token")?.value;

  // console.log("Token in middleware:", token);
  // Get the route path name from the request nextURL 
  const { pathname } = request.nextUrl;

  // Checking if the route path name starts with "/dashboard"
  const isDashboardRoute = pathname.startsWith('/dashboard');

  // Checking if the path name is "/login" or "/register"
  const isAuthPage = pathname === '/login' || pathname === '/register';

  // If the route path name starts with "/dashboard", and the token is not found, 
  // execute the block of code below by redirecting the user to the login page 
  if (isDashboardRoute && !token) {
    // Redirection to the login page 
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // if the route path name is "/login" or "/register", and the token 
  // is found, redirect the user to the dashboard page 
  if (isAuthPage && token) {
    // Redirection to the dashboard page 
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Return the next response. 
  return NextResponse.next();
}

// Exporting the configurations 
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register'
  ],
}