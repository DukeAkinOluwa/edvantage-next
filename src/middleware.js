export { default as middleware } from 'next-auth/middleware'

export const config = {
    matcher: ['/', '/Contact', '/Assignments', '/Chat', '/Examinations', '/FAQs', '/Profile', '/Settings', '/TermsAndConditions'], // Protect only these routes
};