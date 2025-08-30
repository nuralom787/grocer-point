import dbConnect, { collectionsNames } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    const collections = dbConnect(collectionsNames.productsCollection);
    const query = { discount: { $gt: 0 } };
    const discountProducts = await collections.find(query).toArray();

    return NextResponse.json(discountProducts);
};