import dbConnect, { collectionsNames } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    // console.log(email);
    const ordersCollection = dbConnect(collectionsNames.ordersCollection);
    let orders = [];
    if (email) {
        orders = await ordersCollection.find({ "customerInfo.customer_email": email }).toArray();
    } else {
        orders = await ordersCollection.find({}).toArray();
    }

    return NextResponse.json(orders);
};


export const POST = async (req) => {
    // const body = await req.json();
    // const { orderInfo } = body;
    // const email = orderInfo.customerInfo.customer_email;
    // let orderId;
    // let orderExists = true;
    // let invoiceId = orderInfo.invoice;
    // let invoiceExists = true;

    // // Froude Checking for duplicate order.
    // // if (orderInfo.paymentMethod === "BKASH") {
    // //     const existing = await ordersCollection.findOne({
    // //         $or: [
    // //             { "paymentInfo.paymentID": orderInfo.paymentInfo.paymentID },
    // //             { "paymentInfo.trxID": orderInfo.paymentInfo.trxID }
    // //         ]
    // //     });

    // //     if (existing) {
    // //         return res.status(403).send({ message: "This payment has already been used to purchase an order! Please make another payment to place a new order." })
    // //     }
    // // };

    // // Create an Unique Order Id.
    // while (orderExists) {
    //     const pin = Math.floor(100000 + Math.random() * 900000);
    //     orderId = "order-" + pin;

    //     // Check database if this orderId already exists
    //     const order = await ordersCollection.findOne({ orderId });
    //     orderExists = !!order;
    // };

    // // Create An Unique Invoice Id.
    // if (orderInfo.invoice === null || orderInfo.invoice === undefined) {
    //     while (invoiceExists) {
    //         const pin = Math.floor(100000 + Math.random() * 900000);
    //         invoiceId = "#" + pin;

    //         // Check database if this orderId already exists
    //         const invoice = await ordersCollection.findOne({ invoiceId });
    //         invoiceExists = !!invoice;
    //     };
    //     orderInfo.invoice = invoiceId;
    // };

    // orderInfo.status = "Pending";
    // orderInfo.orderId = orderId;
    // orderInfo.createdAt = new Date();
    // orderInfo.updatedAt = new Date();

    // // Insert Order Data in Order Database.
    // const result = await ordersCollection.insertOne(orderInfo);

    // // Remove cart item from cart.
    // if (result.insertedId) {
    //     const updateDoc = {
    //         $set: {
    //             cart: [],
    //             cartTotalPrice: 0,
    //             cartDiscount: 0,
    //             cartTotalItem: 0,
    //             cartTotalQuantity: 0,
    //             appliedCoupon: null,
    //             updatedAt: new Date()
    //         }
    //     };
    //     const cartResult = await cartsCollection.updateOne({ email }, updateDoc);

    //     result.orderId = orderId
    //     result.invoice = invoiceId

    //     res.status(200).send(result);
    // }
    // else {
    //     res.status(400).send({ message: "somethings want's wrong! please try again." });
    // }

    // return NextResponse.json(orders);
};