import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
    '/sign-in',
    '/sign-up',
    '/',
    '/home'
]);

const isPublicApiRoute = createRouteMatcher([
    '/ai/videos'
]);

export default clerkMiddleware((auth, req) => {
    const {userId } = auth();
    const currentUrl = new URL(req.url);
    
    const isAccessingDashboard = currentUrl.pathname === '/home';
    const isAccessingApi = currentUrl.pathname.startsWith('/api');

    // stop redirect to signIn/LogIn page if user is already signed in
    if(userId && isPublicRoute(req) && !isAccessingDashboard) {
        return NextResponse.redirect(new URL('/home', req?.url));
    }

    // if not logged In
    if(!userId) {
        // trying to access a private route
        if(!isPublicRoute(req) && !isPublicApiRoute(req)) {
            return NextResponse.redirect(new URL('/sign-in', req?.url));
        }
        // if Request for Protected API and not logged in
        if(isAccessingApi && !isPublicApiRoute(req)) {
            return NextResponse.redirect(new URL('/sign-up', req?.url));
        }
    }
    return NextResponse.next();
})

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}