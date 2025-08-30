import dbConnect, { collectionsNames } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    const id = await params.id;

    const productsCollection = dbConnect(collectionsNames.productsCollection);
    const product = await productsCollection.findOne({ _id: new ObjectId(id) });

    return NextResponse.json(product);
};