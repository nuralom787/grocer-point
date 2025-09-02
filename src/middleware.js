import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";


const middleware = async (req) => {

    const token = await getToken({
        req,
        // secureCookie: process.env.NODE_ENV === "production" ? true : false
    });

    // console.log("From Token: ", token);
    if (token) {
        return NextResponse.next();
    }
    else {
        return NextResponse.redirect(new URL("/user/login", req.url))
    };
};

export default middleware;

export const config = {
    matcher: [
        '/user/my-account',
        '/user/cart',
        '/user/checkout',
    ],
}