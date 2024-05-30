// app/providers.tsx
"use client";

import Layout from '@/components/layout';
import { NextUIProvider } from '@nextui-org/react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ThemeProvider as NextThemesProvider } from "next-themes";

const client = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={true} disableTransitionOnChange>
            <NextUIProvider>
                <QueryClientProvider client={client}>
                    <Layout>
                        {children}
                    </Layout>
                </QueryClientProvider>
            </NextUIProvider>
        </NextThemesProvider>
    )
}