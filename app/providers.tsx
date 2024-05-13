// app/providers.tsx
"use client";

import { NextUIProvider } from '@nextui-org/react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ThemeProvider as NextThemesProvider } from "next-themes";

const client = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="dark">
                <QueryClientProvider client={client}>
                    {children}
                </QueryClientProvider>
            </NextThemesProvider>
        </NextUIProvider>
    )
}