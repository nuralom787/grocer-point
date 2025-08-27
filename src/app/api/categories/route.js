import dbConnect, { collectionsNames } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    const collections = dbConnect(collectionsNames.categoriesCollection);
    const categories = await collections.find({}).toArray();

    return NextResponse.json(categories);
};