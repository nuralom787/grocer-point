"use server";
import dbConnect, { collectionsNames } from "@/lib/dbConnect";
import bcrypt from "bcrypt";


const LoginUser = async (payload) => {
    const { email, password } = payload;
    const customer = dbConnect(collectionsNames.customersCollection);

    try {
        const user = await customer.findOne({ email: email });
        // const isPasswordOk = await bcrypt.compare(password, user.password);

        if (user) {
            // user._id = user._id.toString();
            const userData = {
                _id: user._id.toString(),
                displayName: user.displayName,
                phoneNumber: user.phoneNumber,
                email: user.email,
                photoURL: user.photoURL,
                accountType: user.accountType,
                createAt: user.createAt,
                updatedAt: user.updatedAt,
                uid: user.uid,
                addresses: user.addresses,
                dob: user.dob,
                gender: user.gender
            }
            return userData;
        }

        return null
    } catch (error) {
        // console.log(error)
        return error
    }
};

export default LoginUser;