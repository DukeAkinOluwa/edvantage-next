// options.js
import GithupProvider from 'next-auth/providers/github';
import CredentialProvider from 'next-auth/providers/credentials';

export const options = {
    providers: [
        CredentialProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials, req) {
                const user = {
                    id: 1,
                    name: 'Akin',
                    email: 'akin@gmail.com',
                    image: 'https://i.pravatar.cc/150?img=32',
                    password: 'password'
                };

                if (credentials?.email === user.email && credentials?.password === user.password) {
                    return user;
                } else {
                    return null;
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
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account.provider === 'github') {
                console.log(user);
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            return session;
        },
        async redirect({ url, baseUrl }) {
            return baseUrl;
        }
    }
};
