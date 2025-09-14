import dbConnect, { collectionsNames } from "@/lib/dbConnect";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
const cartsCollection = dbConnect(collectionsNames.cartsCollection);
const couponsCollection = dbConnect(collectionsNames.couponsCollection);

export const PATCH = async (req) => {
    const { searchParams } = new URL(req.url);
    const quantity = searchParams.get("quantity");
    const body = await req.json();
    const { email, item, subtotal, couponCode, action } = body;
    const user = await cartsCollection.findOne({ email });


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

                result = await cartsCollection.insertOne(data);
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
                result = await cartsCollection.updateOne(filter, updateDoc);
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
            result = await cartsCollection.updateOne(filter, updateDoc);
            if (result.acknowledged) {
                revalidatePath("/user/cart");
            }
            break;

        case "apply-coupon":
            // console.log("From API: ", body);
            // Find the coupon in our simulated database
            const foundCoupon = await couponsCollection.findOne({ couponCode: couponCode.toUpperCase() });

            // If no coupon is found with the given code
            if (!foundCoupon) {
                return NextResponse.json({ error: 'Invalid coupon code.' }, { status: 400 });
            };

            // Check if the subtotal meets the minimum purchase requirement for the found coupon
            if (subtotal < foundCoupon.minimumAmount) {
                const message = `The purchase amount is required to be a minimum of $${foundCoupon.minimumAmount} to apply/use this coupon.`;
                return NextResponse.json({ error: message }, { status: 400 });
            };


            // Calculate the discount amount.
            const discountAmount = (subtotal * foundCoupon.discountPercentage) / 100;

            // Update Cart Discount Amount.
            result = await cartsCollection.updateOne({ email }, {
                $set: {
                    cartDiscount: parseFloat(discountAmount),
                    appliedCoupon: couponCode,
                    updatedAt: new Date()
                }
            });

            if (result.modifiedCount > 0) {
                // Send a successful response with the calculated discount and a message
                // res.status(200).send(result);
                revalidatePath("/user/cart");
                revalidatePath("/user/checkout");
            }
            break;

        default: return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json({ success: true, result });
};