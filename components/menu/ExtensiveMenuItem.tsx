import { useState } from "react"
import Icon from "../Icon"
import { motion, useCycle } from "framer-motion";


interface Props {
    button: React.ReactNode
    name: string
    children: React.ReactNode
}

const ExtensiveMenuItem = ({ button, name, children }: Props) => {
    const [isMouse, toggleMouse] = useState(false);

    const variants = {
        close: {
            x: -50,
            opacity: 0,
            scale: 0.75,
            transition: {
                duration: 0.2,
            },
            transitionEnd: {
                display: "none"
            }
        },
        open: {
            x: 0,
            opacity: 100,
            scale: 1,
            transition: {
                duration: 0.2
            },
            display: "block"
        },
    }

    return (
        <div
            onClick={() => toggleMouse(true)}
            onMouseLeave={() => toggleMouse(false)}
            className="flex py-3 border-b-1 border-dashed border-card relative cursor-pointer stroke-[0.75] text-foreground hover:text-neutral-100 place-items-center gap-3 hover:bg-neutral-700/30 transition-colors duration-100"
        >
            {button}
            <div className="flex overflow-clip place-items-center justify-between pr-2 w-full">
                <p className="text-inherit truncate whitespace-nowrap tracking-wide font-semibold">
                    {name}
                </p>
                <Icon icon="entypo:chevron-right" />
            </div>
            <motion.nav
                variants={variants}
                initial="close"
                animate={isMouse ? "open" : "close"}
                exit="close"
                transition={{
                    duration: 0.25,
                    ease: "easeInOut",
                }}
                className='rounded-xl absolute bg-background/90 backdrop-blur-md left-64'>
                {children}
            </motion.nav>
        </div>
    )
}

export default ExtensiveMenuItem