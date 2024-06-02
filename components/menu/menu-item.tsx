import Link from "next/link"

interface Props {
    children: React.ReactNode
    name: string
    href: string
}

const MenuItem = ({ children, name, href }: Props) => {
    return (
        <Link href={href} className="flex py-3 border-b-1 border-dashed border-card cursor-pointer stroke-[0.75] text-foreground hover:text-neutral-100 place-items-center gap-3 hover:bg-neutral-700/30 transition-colors duration-100">
            {children}
            <p className="w-full text-foreground hover:text-neutral-100 font-poppins overflow-clip whitespace-nowrap tracking-wide font-semibold">
                {name}
            </p>
        </Link>
    )
}

export default MenuItem