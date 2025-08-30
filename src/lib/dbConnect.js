import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

export const collectionsNames = {
    productsCollection: "products",
    popularProductsCollection: "popularProducts",
    discountProductsCollection: "discountProducts",
    categoriesCollection: "categories",
    couponsCollection: "coupons",
    customersCollection: "customers",
}

const dbConnect = (collectionName) => {
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    return client.db(process.env.MONGODB_COLLECTION).collection(collectionName);
};

export default dbConnect;