import LoginUser from "@/app/actions/auth/LoginUser";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import dbConnect, { collectionsNames } from "@/lib/dbConnect";
import { revalidatePath } from "next/cache";

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
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {

            if (account.provider === "google") {
                let uid;
                let exists = true;

                try {
                    const { provider, providerAccountId } = account;
                    const { email, image, name } = user;

                    const customersCollection = dbConnect(collectionsNames.customersCollection);
                    const isUserExist = await customersCollection.findOne({ $or: [{ providerAccountId: providerAccountId }, { email: email }] });

                    if (!isUserExist) {
                        while (exists) {
                            const pin = Math.floor(100000 + Math.random() * 900000);
                            uid = "GSHOP-" + pin;

                            // Check database if this uid already exists
                            const user = await customersCollection.findOne({ uid });
                            exists = !!user;
                        };

                        const userData = {
                            displayName: name,
                            phoneNumber: null,
                            email: email,
                            password: null,
                            photoURL: image,
                            accountType: "Google",
                            createdAt: new Date(),
                            updatedAt: new Date(),
                            uid: uid,
                            role: "user",
                            provider,
                            providerAccountId
                        }
                        await customersCollection.insertOne(userData)
                    }
                }
                catch (error) {
                    console.log(error);
                    return false
                }
            }
            revalidatePath("/");
            return true
        }
    }
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }