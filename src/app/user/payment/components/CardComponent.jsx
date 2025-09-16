"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CardPayment from "../payOptions/CardPayment";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CardComponent = () => {
    return (
        <Elements stripe={stripePromise}>
            <CardPayment />
        </Elements>
    );
};

export default CardComponent;