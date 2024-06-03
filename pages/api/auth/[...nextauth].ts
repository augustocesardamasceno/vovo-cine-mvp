import NextAuth, { AuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import prismadb from '@/lib/prismadb'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { compare } from 'bcrypt'

export const authOptions: AuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || ''
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        }),
        Credentials({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password required')
                }

                try {
                    const user = await prismadb.user.findUnique({
                        where: {
                            email: credentials.email
                        }
                    })

                    if (!user || !user.hashedPassword) {
                        throw new Error('Email does not exist')
                    }

                    const isCorrectPassword = await compare(
                        credentials.password,
                        user.hashedPassword
                    )

                    if (!isCorrectPassword) {
                        throw new Error('Incorrect password')
                    }

                    return user
                } catch (error) {
                    console.error('Authorization error:', error)
                    throw new Error('Authorization failed')
                }
            }
        })
    ],
    pages: {
        signIn: '/auth'
    },
    debug: process.env.NODE_ENV === 'development',
    adapter: PrismaAdapter(prismadb),
    session: {
        strategy: 'jwt',
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            console.log("Sign-in attempt", { user, account, profile, email, credentials })
            return true
        },
        async redirect({ url, baseUrl }) {
            // Avoid circular redirects
            if (url.startsWith(baseUrl)) {
                return url
            }
            return baseUrl
        },
        async session({ session, token, user }) {
            console.log("Session details", { session, token, user })
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            console.log("JWT details", { token, user, account, profile, isNewUser })
            return token
        }
    }
}

export default NextAuth(authOptions)
