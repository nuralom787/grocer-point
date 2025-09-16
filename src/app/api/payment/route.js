import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const POST = async (req) => {
    const { price, action } = await req.json();
    const amount = parseInt(price * 100);

    let result;

    switch (action) {
        case "create-payment-intent":
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: "usd",
                payment_method_types: ["card"]
            });

            result = { clientSecret: paymentIntent.client_secret };
            break;

        default: return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json({ success: true, result });
};