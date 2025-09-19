import dbConnect, { collectionsNames } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { setValue, getValue } from "node-global-storage";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const ordersCollection = dbConnect(collectionsNames.ordersCollection);
const url = process.env.NEXT_PUBLIC_BASE_URL;

// Bkash Payment Related url's.
const grant_token_url = process.env.BKASH_GRANT_TOKEN_URL;
const create_url = process.env.BKASH_CREATE_PAYMENT_URL;
const execute_url = process.env.BKASH_EXECUTE_PAYMENT_URL;


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

        case "create-bkash-payment":
            let invoiceId;
            let invoiceExists = true;

            // Create An Unique Invoice Id.
            while (invoiceExists) {
                const pin = Math.floor(100000 + Math.random() * 900000);
                invoiceId = "#" + pin;

                // Check database if this orderId already exists
                const invoice = await ordersCollection.findOne({ invoiceId });
                invoiceExists = !!invoice;
            };
            setValue("invoiceId", invoiceId);

            // Fetch Grand Token.
            const tokenResponse = await fetch(`${grant_token_url}`, {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    username: process.env.BKASH_USERNAME,
                    password: process.env.BKASH_PASSWORD,
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    app_secret: process.env.BKASH_APP_SECRET,
                    app_key: process.env.BKASH_APP_KEY
                })
            });
            const tokenData = await tokenResponse.json();

            if (!tokenData.id_token) {
                return NextResponse.json({ error: "Failed to fetch token" }, { status: 500 });
            }
            else {
                setValue("id_token", tokenData.id_token, { protected: true });

                // Payment Create Options.
                const createResponse = await fetch(`${create_url}`, {
                    method: 'POST',
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${getValue("id_token")}`,
                        'X-APP-Key': process.env.BKASH_APP_KEY,
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        mode: '0011',
                        payerReference: ' ',
                        callbackURL: `${url}/api/payment`,
                        amount: parseFloat(price).toFixed(2),
                        currency: 'BDT',
                        intent: 'sale',
                        merchantInvoiceNumber: invoiceId
                    })
                })
                const createData = await createResponse.json();
                result = createData;
                break;
            }

        default: return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json({ success: true, result });
};


export const GET = async (req) => {
    const { searchParams } = new URL(req.url);
    const paymentID = searchParams.get("paymentID");
    const status = searchParams.get("status");

    // Set Payment ID In The Global Storage.
    setValue("paymentID", paymentID, { protected: true });

    // Check If Payment Cancel Or Fail.
    if (status === "cancel" || status === "failure") {
        // return res.redirect(`http://localhost:5173/error?paymentID=${paymentID}&status=${status}`);
        return NextResponse.redirect(`${url}/user/payment?paymentID=${paymentID}&status=${status}`);
    };

    // Execute Payment If Payment Status Success.
    if (status === "success") {
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${getValue("id_token")}`,
                'X-APP-Key': process.env.BKASH_APP_KEY,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ paymentID })
        };

        const executeResponse = await fetch(`${execute_url}`, options);
        const executeData = await executeResponse.json();


        if (executeData.statusCode === "0000" && executeData.statusMessage === "Successful") {
            const invoice = getValue("invoiceId");
            return NextResponse.redirect(`${url}/user/verify-payments?paymentID=${paymentID}&status=${status}&trxID=${executeData.trxID}&transactionStatus=${executeData.transactionStatus}&invoiceId=${invoice.slice(1, 7)}`);
        }
    }
};