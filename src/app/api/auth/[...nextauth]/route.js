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
    }
})

export { handler as GET, handler as POST }