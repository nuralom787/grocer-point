import dbConnect, { collectionsNames } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    const email = await params.query;
    const query = { email: email };
    const collections = dbConnect(collectionsNames.cartsCollection);
    const cart = await collections.findOne(query);

    if (cart._id) {
        return NextResponse.json(cart);
    }
    else {
        return NextResponse.json({ message: "No Data Found For This User!!" });
    }
};

export const POST = async (req, { params }) => {
    const collections = dbConnect(collectionsNames.cartsCollection);
    const carts = await collections.find({}).toArray();

    return NextResponse.json(carts);
};

export const PATCH = async (req, { params }) => {
    const collections = dbConnect(collectionsNames.cartsCollection);
    const carts = await collections.find({}).toArray();

    return NextResponse.json(carts);
};

export const DELETE = async (req, { params }) => {
    const collections = dbConnect(collectionsNames.cartsCollection);
    const carts = await collections.find({}).toArray();

    return NextResponse.json(carts);
};

