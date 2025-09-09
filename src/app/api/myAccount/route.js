import dbConnect, { collectionsNames } from "@/lib/dbConnect";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
const customersCollection = dbConnect(collectionsNames.customersCollection);


export const GET = async (req) => {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    const customers = await customersCollection.findOne({ email });
    return NextResponse.json(customers);
};



export const PATCH = async (req) => {
    const body = await req.json();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    const query = { email: email };
    const updatedDoc = {
        $set: {
            displayName: body.displayName,
            email: body.email,
            phoneNumber: body.phoneNumber,
            dob: body.dob,
            gender: body.gender,
            updatedAt: new Date()
        }
    };
    const customers = await customersCollection.updateOne(query, updatedDoc);
    if (customers.modifiedCount) {
        revalidatePath("/user/profile");
        revalidatePath("/user/profile/update");
        return NextResponse.json(customers);
    }
    else {
        return NextResponse.json({ message: "Internal Server Error!!" }).status(500);
    }
};

