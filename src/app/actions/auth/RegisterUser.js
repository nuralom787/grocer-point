'use server';

import dbConnect, { collectionsNames } from "@/lib/dbConnect";
import bcrypt from "bcrypt";

const RegisterUser = async (payload) => {
    let uid;
    let exists = true;
    const customersCollections = dbConnect(collectionsNames.customersCollection);

    try {
        const user = await customersCollections.findOne({ email: payload.email });

        if (user) {
            return { message: "User already exist!" };
        }
        else {
            while (exists) {
                const pin = Math.floor(100000 + Math.random() * 900000);
                uid = "GSHOP-" + pin;

                // Check database if this uid already exists
                const user = await customersCollections.findOne({ uid });
                exists = !!user;
            };
            const hashedPassword = await bcrypt.hash(payload.password, 10);
            const userData = {
                displayName: payload.name,
                phoneNumber: null,
                email: payload.email,
                password: hashedPassword,
                photoURL: null,
                accountType: "Email&Password",
                createdAt: new Date(),
                updatedAt: new Date(),
                uid: uid
            }
            const res = await customersCollections.insertOne(userData);
            res.insertedId = res.insertedId.toString();
            return res
        }
    }
    catch (error) {
        console.log(error)
        return error
    }
};

export default RegisterUser;