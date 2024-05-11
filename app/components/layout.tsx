import Header from './header'
import Footer from './footer'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className='dark text-foreground bg-background '>
            <Header />
            <div className='bg-black text-white'>{children}</div>
            <Footer />
        </main>
    )
}