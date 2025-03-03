import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher(['/profile', '/cart'])
const isAuthPage = createRouteMatcher(['/login', '/signup', '/forgot-password'])
const isAdminRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware(async (auth, req) => {

  const authPromise = await auth()

  if (isProtectedRoute(req)) await auth.protect()

  if (isAuthPage(req) && authPromise.userId) {
    return NextResponse.redirect(new URL('/profile', req.url))
  }
  // @ts-expect-error any
  if (isAdminRoute(req) && authPromise.sessionClaims?.metadata?.role !== "admin") {
    return NextResponse.redirect(new URL('/login', req.url))
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
