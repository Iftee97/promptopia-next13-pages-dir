// NEXT AUTH MIDDLEWARE
export { default } from "next-auth/middleware"

export const config = {
  matcher: ['/profile', '/create-prompt', '/update-prompt'], // pages that need authentication (protected routes)
}
