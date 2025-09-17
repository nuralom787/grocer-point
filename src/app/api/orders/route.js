import dbConnect, { collectionsNames } from "@/lib/dbConnect";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
const ordersCollection = dbConnect(collectionsNames.ordersCollection);
const cartsCollection = dbConnect(collectionsNames.cartsCollection);

export const GET = async (req) => {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    let orders = [];
    if (email) {
        orders = await ordersCollection.find({ "customerInfo.customer_email": email }).toArray();
    } else {
        orders = await ordersCollection.find({}).toArray();
    }

    return NextResponse.json(orders);
};


export const POST = async (req) => {
    const body = await req.json();
    const { order_information } = body;
    console.log("From API:", order_information);
    const email = order_information.customerInfo.customer_email;
    let orderId;
    let orderExists = true;
    let invoiceId = order_information.invoice;
    let invoiceExists = true;

    // // Froude Checking for duplicate order.
    if (order_information.paymentMethod === "BKASH") {
        const existing = await ordersCollection.findOne({
            $or: [
                { "paymentInfo.paymentID": order_information.paymentInfo.paymentID },
                { "paymentInfo.trxID": order_information.paymentInfo.trxID }
            ]
        });

        if (existing) {
            return NextResponse.json({ message: "This payment has already been used to purchase an order! Please make another payment to place a new order." }, { status: 400 })
        }
    };

    // Create an Unique Order Id.
    while (orderExists) {
        const pin = Math.floor(100000 + Math.random() * 900000);
        orderId = "order-" + pin;

        // Check database if this orderId already exists
        const order = await ordersCollection.findOne({ orderId });
        orderExists = !!order;
    };

    // Create An Unique Invoice Id.
    if (order_information.invoice === null || order_information.invoice === undefined) {
        while (invoiceExists) {
            const pin = Math.floor(100000 + Math.random() * 900000);
            invoiceId = "#" + pin;

            // Check database if this orderId already exists
            const invoice = await ordersCollection.findOne({ invoiceId });
            invoiceExists = !!invoice;
        };
        order_information.invoice = invoiceId;
    };

    order_information.status = "Pending";
    order_information.orderId = orderId;
    order_information.createdAt = new Date();
    order_information.updatedAt = new Date();

    // Insert Order Data in Order Database.
    const result = await ordersCollection.insertOne(order_information);

    // Remove cart item from cart.
    if (result.insertedId) {
        const updateDoc = {
            $set: {
                cart: [],
                cartTotalPrice: 0,
                cartDiscount: 0,
                cartTotalItem: 0,
                cartTotalQuantity: 0,
                appliedCoupon: null,
                updatedAt: new Date()
            }
        };
        const cartResult = await cartsCollection.updateOne({ email }, updateDoc);

        result.orderId = orderId
        result.invoice = invoiceId

        revalidatePath("/");
        revalidatePath("/order/invoice/[invoiceId]");
        revalidatePath("/user/payment");
        return NextResponse.json({ success: true, result });
    }
    else {
        return NextResponse.json({ message: "somethings want's wrong! please try again." }, { status: 500 });
    }
};