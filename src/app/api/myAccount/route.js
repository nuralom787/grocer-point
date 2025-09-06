import dbConnect, { collectionsNames } from "@/lib/dbConnect";
import { NextResponse } from "next/server";


export const GET = async (req) => {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    const customersCollection = dbConnect(collectionsNames.customersCollection);
    const customers = await customersCollection.findOne({ email });

    return NextResponse.json(customers);
};