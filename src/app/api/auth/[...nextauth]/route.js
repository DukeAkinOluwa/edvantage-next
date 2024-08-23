import NextAuth from "next-auth";
// import {options} from './options'
import GithupProvider from 'next-auth/providers/github'
import CredentialProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
    providers: [
        CredentialProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },

            async authorize(credentials, req) {
                // const res = await fetch('http://localhost:3000/api/auth', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json'
                //     },
                //     body: JSON.stringify(credentials)
                // })
                const user = {
                    id: 1,
                    name: 'Akin',
                    email: 'akin@gmail.com',
                    image: 'https://i.pravatar.cc/150?img=32',
                    password: 'password'
                }

                if (credentials?.email === user.email && credentials?.password === user.password) {
                    return user
                } else {
                    return null
                }
            }
        }),
        GithupProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/api/auth/login',
        signUp: '/api/auth/signup'
        // signOut: '/auth/signout',
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account.provider === 'github') {
                // const response = await fetch('/api/saveUser', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({
                //         name: profile.name,
                //         email: profile.email,
                //         githubId: profile.id,
                //         institution: null // You'll update this after the user submits the custom form
                //     })
                // });
                // return response.ok;
                console.log(user)
            }
            return true;
        },
        async jwt({ token, user, account, profile }) {
            // Append user information to JWT token
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            // Make sure the session contains the user data
            session.user.id = token.id;
            return session;
        },
        async redirect({ url, baseUrl }) {
            // Handle redirect after login/signup
            return baseUrl;
        }
    }
})

export { handler as GET, handler as POST }