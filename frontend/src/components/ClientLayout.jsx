"use client";

import { useEffect } from 'react';

export default function ClientLayout({ children }) {
    useEffect(() => {
        // This useEffect runs only on the client side
        // It helps with any client-side initialization that might cause hydration mismatches
    }, []);

    return (
        <>
            {children}
        </>
    );
}
