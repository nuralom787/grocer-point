import dbConnect, { collectionsNames } from "@/lib/dbConnect";
// import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";


export const GET = async (req) => {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    let result;

    switch (query) {
        case "region":
            const regionCollection = dbConnect(collectionsNames.regionCollection);
            result = await regionCollection.find({}).toArray();
            break;

        case "city":
            const cityCollection = dbConnect(collectionsNames.cityCollection);
            result = await cityCollection.find({}).toArray();
            break;

        case "zone":
            const zoneCollection = dbConnect(collectionsNames.zoneCollection);
            result = await zoneCollection.find({}).toArray();
            break;

        default: return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json({ success: true, result });
};