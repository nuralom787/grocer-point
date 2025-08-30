import dbConnect, { collectionsNames } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    const productsCollection = dbConnect(collectionsNames.productsCollection);

    const searchParams = req.nextUrl.searchParams;
    // const size = parseInt(searchParams.get('size'));
    // const page = parseInt(searchParams.get('page'));
    const search = searchParams.get('search');
    const parent = searchParams.get('parent');
    const children = searchParams.get('children');
    const price = searchParams.get('price');
    const searchWords = search.split(" ");

    let count;
    let products;
    const sortValue = price === "asc" ? 1 : -1;

    if (search !== "null") {
        const query = { $or: searchWords.map(word => ({ title: { $regex: word, $options: "i" } })) };
        const foundedData = await productsCollection.find(query).sort({ price: sortValue }).toArray();
        products = foundedData
        count = foundedData.length;
    }
    else if (children !== "null") {
        const query = { children: { $regex: children, $options: 'i' } }
        const foundedData = await productsCollection.find(query).sort({ price: sortValue }).toArray();
        products = foundedData
        count = foundedData.length;
    }
    else if (parent !== "null") {
        const query = { parent: { $regex: parent, $options: 'i' } }
        const foundedData = await productsCollection.find(query).sort({ price: sortValue }).toArray();
        products = foundedData
        count = foundedData.length;
    }
    else {
        products = await productsCollection.find().sort({ price: sortValue }).toArray();
        count = await productsCollection.estimatedDocumentCount();
    };

    const totalCount = await productsCollection.estimatedDocumentCount();

    return NextResponse.json({
        totalCount,
        count,
        products,
    });
};