import Menu from "@/components/Menu/Menu";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className='w-full min-h-screen flex flex-row relative'>
            <Menu />
            <section className="flex flex-col w-full h-full min-h-screen gap-5 bg-background text-foreground">
                <Header />
                <div className='bg-background text-foreground flex-1'>{children}</div>
                <Footer />
            </section>
        </main>
    )
}