import Header from './header'
import Footer from './footer'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className='dark text-foreground bg-background min-h-screen flex flex-col'>
            <Header />
            <div className='bg-black text-white flex-1'>{children}</div>
            <Footer />
        </main>
    )
}