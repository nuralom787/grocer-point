import dbConnect, { collectionsNames } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    console.log(email);
    const ordersCollection = dbConnect(collectionsNames.ordersCollection);
    let orders = [];
    if (email) {
        orders = await ordersCollection.find({ "customerInfo.customer_email": email }).toArray();
    } else {
        orders = await ordersCollection.find({}).toArray();
    }

    return NextResponse.json(orders);
};