import dbConnect, { collectionsNames } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const PATCH = async (req) => {
    const body = await req.json();
    const { email, item } = body;

    const collections = dbConnect(collectionsNames.cartsCollection);
    const user = await collections.findOne({ email });

    try {
        if (!user) {
            const cart = [item];
            const data = {
                email: email,
                cart: cart,
                cartTotalPrice: parseFloat(item.price),
                cartDiscount: parseFloat(0),
                cartTotalItem: cart.length,
                cartTotalQuantity: item.quantity,
                appliedCoupon: null,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            const result = await collections.insertOne(data);
            if (result.insertedId) {
                return NextResponse.json({ message: 'Item Added In The Cart.', result });
            }
        }
        else {
            const existingProductIndex = user.cart.findIndex(p => p._id === item._id);

            if (existingProductIndex !== -1) {
                user.cart[existingProductIndex].quantity += item.quantity;
            }
            else {
                user.cart.push(item);
            }

            // Recalculate totals
            const totalItem = user.cart.length;
            const totalQuantity = user.cart.reduce((sum, p) => sum + p.quantity, 0);
            const totalPrice = user.cart.reduce((sum, p) => sum + (p.price * p.quantity), 0);

            const filter = { email: email };
            const updateDoc = {
                $set: {
                    cart: user.cart,
                    cartTotalPrice: parseFloat(totalPrice),
                    cartDiscount: parseFloat(0),
                    cartTotalItem: totalItem,
                    cartTotalQuantity: totalQuantity,
                    appliedCoupon: null,
                    updatedAt: new Date()
                }
            };
            const result = await collections.updateOne(filter, updateDoc);
            if (result.acknowledged) {
                return NextResponse.json(result);
            }
        }
    }
    catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
};