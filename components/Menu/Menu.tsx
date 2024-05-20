'use client'
import { motion, useCycle } from "framer-motion"
import MenuItem from "./MenuItem"
import ExtensiveMenuItem from "./ExtensiveMenuItem"
import Icon from "../Icon"
import { MenuToggle } from "./MenuToogle"

const containerVariants = {
    close: {
        width: "0px",
        padding: "0px",
        transition: {
            ease: "easeInOut",
            duration: 0.3,
        },
    },
    open: {
        width: "16rem",
        transition: {
            ease: "easeInOut",
            duration: 0.3,
        },
    },
}

const Menu = () => {
    const [isOpen, toggleOpen] = useCycle(false, true);

    return (
        <>
            {isOpen && <div className="w-full h-screen bg-black/40 backdrop-blur-sm fixed z-[99]" onClick={() => toggleOpen()}></div>}
            <motion.nav
                variants={containerVariants}
                animate={isOpen ? "open" : "close"}
                initial="close"
                className="bg-black/80 backdrop-blur-md flex flex-col z-[100] py-5 gap-20 fixed top-0 left-0 h-full shadow shadow-neutral-600"
            >
                <div className="flex flex-row w-full justify-between place-items-center">
                    <MenuToggle toggle={() => toggleOpen()} />
                </div>
                <div className="flex flex-col gap-3">
                    <MenuItem name="Dashboard">
                        <Icon icon="ic:round-bar-chart" className="stroke-inherit stroke-[0.75] w-8" />
                    </MenuItem>
                    <MenuItem name="Projects">
                        <Icon icon="heroicons:square-2-stack-16-solid" className="stroke-inherit stroke-[0.75] w-8" />
                    </MenuItem>
                    <MenuItem name="Tasks">
                        <Icon icon="heroicons:document-check-solid" className="stroke-inherit stroke-[0.75] w-8" />
                    </MenuItem>
                    <MenuItem name="Reporting">
                        <Icon icon="tabler:chart-pie-filled" className="stroke-inherit stroke-[0.75] w-8" />
                    </MenuItem>
                    <MenuItem name="Users">
                        <Icon icon="ph:user-fill" className="stroke-inherit stroke-[0.75] w-8" />
                    </MenuItem>
                </div>
                <div className="flex flex-col gap-3">
                    <ExtensiveMenuItem
                        name="Virtual Reality"
                        button={<div className="w-4 mx-2 rounded-full aspect-square bg-pink-700" />}
                    >
                        <div className="w-[100px]">
                            <div>Submenu Item 1</div>
                            <div>Submenu Item 2</div>
                            <div>Submenu Item 3</div>
                            <div>Submenu Item 4</div>
                            <div>Submenu Item 5</div>
                        </div>
                    </ExtensiveMenuItem>
                </div>
            </motion.nav>
        </>
    )
}

export default Menu