import dbConnect, { collectionsNames } from "@/lib/dbConnect";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
const collections = dbConnect(collectionsNames.cartsCollection);

export const PATCH = async (req) => {
    const { searchParams } = new URL(req.url);
    const quantity = searchParams.get("quantity");
    const body = await req.json();
    const { email, item, action } = body;
    const user = await collections.findOne({ email });


    let result;

    switch (action) {
        case "add-item":
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

                result = await collections.insertOne(data);
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
                result = await collections.updateOne(filter, updateDoc);
            }
            break;

        case "update-quantity":
            const id = item;
            const existingProductIndex = user.cart.findIndex(item => item._id === id);

            if (quantity === "-1") {
                user.cart[existingProductIndex].quantity -= 1;
            }
            else {
                user.cart[existingProductIndex].quantity += 1;
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
            result = await collections.updateOne(filter, updateDoc);
            if (result.acknowledged) {
                revalidatePath("/user/cart");
            }
            break;

        // case "applyCoupon":
        //     result = await collection.updateOne(
        //         { email },
        //         { $set: { appliedCoupon: body.coupon } }
        //     );
        //     break;

        default: return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json({ success: true, result });
};