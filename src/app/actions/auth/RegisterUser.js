'use server';

import dbConnect, { collectionsNames } from "@/lib/dbConnect";
import bcrypt from "bcrypt";

const RegisterUser = async (payload) => {
    const customersCollections = dbConnect(collectionsNames.customersCollection);

    try {
        const user = await customersCollections.findOne({ email: payload.email });
        if (user) {
            return { message: "User already exist!" };
        }
        const hashedPassword = await bcrypt.hash(payload.password, 10);
        payload.password = hashedPassword;
        const res = await customersCollections.insertOne(payload);
        res.insertedId = res.insertedId.toString();
        return res
    } catch (error) {
        console.log(error)
        return error
    }
};

export default RegisterUser;