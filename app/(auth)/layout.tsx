import { Header } from "@/components";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className='w-full min-h-screen flex flex-col relative'>
            <Header isFullOption={false} />
            <div className='flex bg-background text-foreground flex-1 justify-center'>
                <div className="min-w-[600px] flex items-center xl:border-r-1 border-card pb-8">{children}</div>
                <div className="hidden xl:flex h-screen w-full items-center justify-center">
                    Content here
                </div>
            </div>
        </main>
    )
}