// app/providers.tsx
"use client";

import { NextUIProvider } from '@nextui-org/react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemesProvider } from "next-themes";

const client = new QueryClient();
interface ProvidersProps extends React.PropsWithChildren {
    session: Session | null;
}

export function Providers({ children, session }: ProvidersProps) {
    return (
        <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={true} disableTransitionOnChange>
            <NextUIProvider>
                <QueryClientProvider client={client}>
                    <SessionProvider session={session}>
                        {children}
                    </SessionProvider>
                </QueryClientProvider>
            </NextUIProvider>
        </NextThemesProvider>
    )
}