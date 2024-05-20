import Header from './header'
import Footer from './footer'
import Menu from './Menu/Menu'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-full min-h-screen flex flex-row relative">
            <Menu />
            <section className="flex flex-col w-full h-full gap-5 dark text-foreground bg-background">
                <Header />
                <div className='bg-black text-white flex-1'>{children}</div>
                <Footer />
            </section>
        </main>
    )
}