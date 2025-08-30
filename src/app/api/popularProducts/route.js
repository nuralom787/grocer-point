import dbConnect, { collectionsNames } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    const collections = dbConnect(collectionsNames.popularProductsCollection);
    const popularProducts = await collections.find({}).toArray();

    return NextResponse.json(popularProducts);
};