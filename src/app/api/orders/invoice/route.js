import dbConnect, { collectionsNames } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";


export const GET = async (req) => {
    const ordersCollection = dbConnect(collectionsNames.ordersCollection);
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const id = searchParams.get("id");

    const query = { _id: new ObjectId(id), "customerInfo.customer_email": email };
    const result = await ordersCollection.findOne(query);

    if (result._id) {
        return NextResponse.json(result);
    }
    else {
        return NextResponse.json({ message: "No Order Found! Please Try with right credential." }, { status: 400 });
    }
};