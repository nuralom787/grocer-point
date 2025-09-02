import dbConnect, { collectionsNames } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
const collections = dbConnect(collectionsNames.cartsCollection);

export const GET = async (req, { params }) => {
    const email = await params.query;
    const query = { email: email };
    const cart = await collections.findOne(query);

    if (cart._id) {
        return NextResponse.json(cart);
    }
    else {
        return NextResponse.json({ message: "No Data Found For This User!!" });
    }
};

export const POST = async (req, { params }) => {
    const carts = await collections.find({}).toArray();

    return NextResponse.json(carts);
};

export const PATCH = async (req, { params }) => {
    const carts = await collections.find({}).toArray();

    return NextResponse.json(carts);
};

export const DELETE = async (req, { params }) => {
    const session = await getServerSession();

    const email = session?.user?.email;
    const id = await params.query;

    const user = await collections.findOne({ email });
    const newCart = user.cart.filter(p => p._id !== id);

    const totalItem = newCart.length;
    const totalQuantity = newCart.reduce((sum, p) => sum + p.quantity, 0);
    const totalPrice = newCart.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    const filter = { email: email };
    const updateDoc = {
        $set: {
            cart: newCart,
            cartTotalPrice: parseFloat(totalPrice),
            cartDiscount: parseFloat(0),
            cartTotalItem: totalItem,
            cartTotalQuantity: totalQuantity,
            appliedCoupon: null,
            updatedAt: new Date()
        }
    };

    const result = await collections.updateOne(filter, updateDoc);


    if (result.acknowledged && result.modifiedCount > 0) {
        revalidatePath("/user/cart");
        return NextResponse.json(result);
    }
    else {
        return NextResponse.json({ message: "Internal server error!!" }).status(500);
    }
};

