import dbConnect, { collectionsNames } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    const productsCollection = dbConnect(collectionsNames.productsCollection);
    // const products = await collections.find({}).toArray();


    // 
    const searchParams = req.nextUrl.searchParams;
    const size = searchParams.get('size')
    const page = searchParams.get('page')
    const title = searchParams.get('title')
    const category = searchParams.get('category')
    const price = searchParams.get('price')
    // const size = parseInt(req.query.size);
    // const page = parseInt(req.query.page);
    // const title = req.query.title;
    // const category = req.query.category;
    // const price = req.query.price;

    let count;
    let products;
    if (page || size) {
        const filter = {
            ...(title && { title: { $regex: title, $options: 'i' } }),
            ...(category && { parent: { $regex: category, $options: 'i' } })
        }

        if (price === 'asc' || price === 'desc') {
            const sortValue = price === "asc" ? 1 : -1;
            products = await productsCollection.find(filter).skip(page * size).limit(size).sort({ price: sortValue }).toArray();
            const productLimit = await productsCollection.find(filter).toArray();
            count = productLimit.length;
        }
        else {
            products = await productsCollection.find(filter).skip(page * size).limit(size).toArray();
            const productLimit = await productsCollection.find(filter).toArray();
            count = productLimit.length;
        }
    }
    else {
        products = await productsCollection.find().toArray();
        count = await productsCollection.estimatedDocumentCount();
    }

    const totalCount = await productsCollection.estimatedDocumentCount();

    // res.send({

    // });

    return NextResponse.json({
        totalCount,
        count,
        products,
    });
};