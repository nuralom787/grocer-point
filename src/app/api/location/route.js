import dbConnect, { collectionsNames } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";


export const GET = async (req) => {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const addressId = searchParams.get("addressId");

    let result;

    switch (query) {
        case "region":
            const regionCollection = dbConnect(collectionsNames.regionCollection);
            result = await regionCollection.find({}).toArray();
            break;

        case "city":
            const cityCollection = dbConnect(collectionsNames.cityCollection);
            result = await cityCollection.find({ parentId: addressId }).toArray();
            break;

        case "zone":
            const zoneCollection = dbConnect(collectionsNames.zoneCollection);
            result = await zoneCollection.find({ parentId: addressId }).toArray();
            break;

        default: return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json({ success: true, result });
};


export const PATCH = async (req) => {
    const customersCollection = dbConnect(collectionsNames.customersCollection);
    const body = await req.json();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const query = searchParams.get("query");
    body._id = new ObjectId();

    let result;

    switch (query) {
        case "add-address":
            result = await customersCollection.updateOne({ email }, { $push: { addresses: body } });
            if (result.modifiedCount > 0) {
                revalidatePath("/user/addresses");
            }
            break;

        // case "update-address":
        //     const id = req.query.addressId;
        //     const query = { email: email, "addresses._id": new ObjectId(id) };
        //     const updateDoc = {
        //         $set: {
        //             "addresses.$.fullName": newAddress.fullName,
        //             "addresses.$.phoneNumber": newAddress.phoneNumber,
        //             "addresses.$.address": newAddress.address,
        //             "addresses.$.region": newAddress.region,
        //             "addresses.$.city": newAddress.city,
        //             "addresses.$.zone": newAddress.zone
        //         }
        //     };
        //     result = await customersCollection.updateOne({ email }, { $push: { addresses: body } });
        //     if (result.modifiedCount > 0) {
        //         revalidatePath("/user/addresses");
        //     }
        //     break;

        default: return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json({ success: true, result });
};