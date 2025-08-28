'use client';
import { SessionProvider } from 'next-auth/react';

const NextAuthSessionProviders = ({ children }) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
};

export default NextAuthSessionProviders;