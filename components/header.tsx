'use client'
import React, { useState } from 'react'
import { color, easeInOut, motion, useMotionValue, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Icon from './Icon';
import { Image } from '@nextui-org/react';
import Cover from '@/assets/cover.png'
import SearchCard from './SearchCard';

export default function Header() {
    const { scrollY } = useScroll()
    const [isOpen, setOpen] = useState(false)

    const background = useTransform(
        scrollY,
        [0, 72],
        ["rgb(14 14 14 / 0)", "rgb(14 14 14 / 0.8)"],
        { ease: easeInOut }
    )

    const filter = useTransform(
        scrollY,
        [0, 72],
        ["blur(0px)", "blur(10px)"],
        { ease: easeInOut }
    )

    const containerVariants = {
        close: {
            width: "44px",
            borderWidth: "0px",
            transition: {
                ease: "easeInOut",
                duration: 0.2,
            },
        },
        open: {
            width: "50vw",
            borderWidth: "2px",
            transition: {
                ease: "easeInOut",
                duration: 0.2,
            },
        },
    }


    return (
        <>
            {isOpen && <div className="w-full h-screen bg-black/40 backdrop-blur-sm fixed z-[20]" onClick={() => setOpen(false)}></div>}
            <motion.div
                style={{ background, backdropFilter: filter, WebkitBackdropFilter: filter }}
                className='w-full h-[72px] flex items-center justify-between fixed top-0 z-20 py-2 pl-20 pr-5'
            >
                <Link href={'/'} className='hidden sm:block'>Anistream</Link>
                <motion.div
                    variants={containerVariants}
                    animate={isOpen ? "open" : "close"}
                    initial="close"
                    className='rounded-lg flex overflow-hidden bg-cgray border-primary ml-auto p-1'>
                    <motion.div
                        className='w-full flex items-center'
                        variants={{
                            open: { padding: '8px' },
                            close: { padding: '0px' }
                        }}>
                        <input className='w-full bg-transparent p-0 outline-none text-sm' placeholder='Search anime...' />
                    </motion.div>
                    <button className='p-1.5 rounded-lg group hover:bg-cgray' onClick={() => setOpen(!isOpen)}>
                        <Icon icon="gravity-ui:magnifier" className='w-6 h-6 text-text-white group-hover:text-white' />
                    </button>
                    {isOpen && <div className='w-[50vw] min-h-[70px] bg-cgray absolute top-full right-5 rounded-md -mt-2 flex flex-col items-center'>
                        <SearchCard />
                        <SearchCard />
                        <SearchCard />
                        <SearchCard />
                    </div>}
                </motion.div>
            </motion.div>
        </>
    )
}
