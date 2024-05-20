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
        <motion.div
            onClick={() => toggleMouse(true)}
            onMouseLeave={() => toggleMouse(false)}
            className="flex p-2 relative rounded cursor-pointer stroke-[0.75] hover:stroke-neutral-100 stroke-neutral-400 text-neutral-400 hover:text-neutral-100 place-items-center gap-3 hover:bg-neutral-700/30 transition-colors duration-100"
        >
            {button}
            <div className="flex overflow-clip place-items-center justify-between w-full">
                <p className="text-inherit truncate whitespace-nowrap tracking-wide">
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
                className='rounded-xl absolute bg-black/90 backdrop-blur-md left-64 p-5'>
                {children}
            </motion.nav>
        </motion.div>
    )
}

export default ExtensiveMenuItem