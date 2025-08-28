import LoginUser from "@/app/actions/auth/LoginUser";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import dbConnect, { collectionsNames } from "@/lib/dbConnect";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Email & Password",
            credentials: {
                Email: { label: "Email", type: "email" },
                Password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const user = await LoginUser(credentials);

                if (user) {
                    return user
                }
                else {
                    return null
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    pages: {
        signIn: "/user/login"
    },
    // callbacks: {
    //     async signIn({ user, account, profile, email, credentials }) {
    //         if (account) {
    //             try {
    //                 const { provider, providerAccountId } = account;
    //                 const { email: user_email, image, name } = user;
    //                 const payload = { role: "user", provider, providerAccountId, email, image, name };
    //                 // console.log(payload);

    //                 const customersCollection = dbConnect(collectionsNames.customersCollection);
    //                 const isUserExist = await customersCollection.findOne({
    //                     $or: [
    //                         { providerAccountId: providerAccountId },
    //                         { email: user_email }
    //                     ]
    //                 });
    //                 if (!isUserExist) {
    //                     await customersCollection.insertOne(payload)
    //                 }
    //             } catch (error) {
    //                 console.log(error);
    //                 return false
    //             }
    //         }
    //         return true
    //     }
    // }
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }