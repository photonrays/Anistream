'use client'
import React from 'react'
import { easeInOut, motion, useMotionValue, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

export default function Header() {
    const x = useMotionValue(0)
    const { scrollY } = useScroll()

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


    return (
        <motion.div
            style={{ background, backdropFilter: filter, WebkitBackdropFilter: filter }}
            className='w-full h-[72px] flex items-center justify-between fixed top-0 z-20 py-2 pl-20'
        >
            <Link href={'/'}>Anistream</Link>
            <div></div>
        </motion.div>
    )
}
