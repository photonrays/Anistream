'use client'
import { motion, useCycle } from "framer-motion"
import MenuItem from "./MenuItem"
import ExtensiveMenuItem from "./ExtensiveMenuItem"
import Icon from "../Icon"
import { MenuToggle } from "./MenuToggle"
import { useQuery } from "@tanstack/react-query"
import { getAnimeHomePage } from "@/services/aniwatch/api"
import Link from "next/link"
import { types } from "@/data/anime"

const containerVariants = {
    close: {
        width: "0px",
        padding: "0px",
        transition: {
            duration: 0.2,
        },
    },
    open: {
        width: "16rem",
        transition: {
            duration: 0.2,
        },
    },
}

const Menu = () => {
    const [isOpen, toggleOpen] = useCycle(false, true);
    const { data: animeHome } = useQuery({ queryKey: ['anime-home'], queryFn: () => getAnimeHomePage() })

    return (
        <>
            {isOpen && <div className="w-full h-screen bg-background/40 backdrop-blur-sm fixed z-[99]" onClick={() => toggleOpen()}></div>}
            <motion.nav
                variants={containerVariants}
                animate={isOpen ? "open" : "close"}
                initial="close"
                className="bg-background/80 backdrop-blur-md flex flex-col z-[100] py-5 gap-20 fixed top-0 left-0 h-full shadow shadow-neutral-600"
            >
                <div className="flex flex-row w-full justify-between place-items-center">
                    <MenuToggle toggle={() => toggleOpen()} />
                </div>
                <div className="flex flex-col">
                    <MenuItem name="Home" href="/">
                        <Icon icon="material-symbols:home" className="stroke-inherit stroke-[0.75] w-8" />
                    </MenuItem>
                    <MenuItem name="Subbed anime" href="/list?category=subbed-anime">
                        <Icon icon="mingcute:subtitle-fill" className="stroke-inherit stroke-[0.75] w-8" />
                    </MenuItem>
                    <MenuItem name="Dubbed anime" href="/list?category=dubbed-anime">
                        <Icon icon="mingcute:mic-fill" className="stroke-inherit stroke-[0.75] w-8" />
                    </MenuItem>
                    <MenuItem name="Most popular" href="/list?category=most-popular">
                        <Icon icon="ph:ranking-fill" className="stroke-inherit stroke-[0.75] w-8" />
                    </MenuItem>
                    <ExtensiveMenuItem
                        name="Genres"
                        button={<Icon icon="typcn:th-list" className="stroke-inherit stroke-[0.75] w-8" />}
                    >
                        <div className="w-[130px] xs:w-[300px] max-h-[50vh] grid grid-cols-1 xs:grid-cols-3 gap-2 overflow-auto p-2 bg-background rounded-lg">
                            {animeHome?.genres.map((genre, index) => <Link href={`/list?genre=${genre.replace(/\s/g, '-').toLowerCase()}`} key={index} className="text-sm bg-card-light text-foreground py-1 px-2 rounded-lg overflow-hidden line-clamp-1">{genre}</Link>)}
                        </div>
                    </ExtensiveMenuItem>
                    <ExtensiveMenuItem
                        name="Types"
                        button={<Icon icon="ic:baseline-movie-creation" className="stroke-inherit stroke-[0.75] w-8" />}
                    >
                        <div className="w-[120px] max-h-[50vh] grid grid-cols-1 gap-2 overflow-auto p-2 bg-background rounded-lg">
                            {types.map((type, index) => <Link href={`/list?category=${type.value}`} key={index} className="text-sm bg-card-light text-foreground py-1 px-2 rounded-lg overflow-hidden line-clamp-1">{type.label}</Link>)}
                        </div>
                    </ExtensiveMenuItem>
                </div>
                <div className="flex flex-col gap-3">

                </div>
            </motion.nav>
        </>
    )
}

export default Menu