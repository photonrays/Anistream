'use client'
import React, { useRef, useState } from 'react'
import { easeInOut, motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Icon from './Icon';
import SearchCard from './SearchCard';
import { useDebounce } from "@uidotdev/usehooks";
import { useQuery } from '@tanstack/react-query';
import { getAnimeSearchSuggestions } from '@/services/aniwatch/api';
import { useRouter } from 'next/navigation';
import { CircularProgress } from '@nextui-org/react';


export default function Header() {
    const { scrollY } = useScroll()
    const [isOpen, setOpen] = useState(false)
    const [search, setSearch] = useState<string>("");
    const debouncedSearch = useDebounce(search, 1000)
    const { data: searchResults, isLoading } = useQuery({ queryKey: [`search-${debouncedSearch}`], queryFn: () => getAnimeSearchSuggestions(debouncedSearch), enabled: !!debouncedSearch && debouncedSearch !== '' })
    const router = useRouter()

    const inputRef = useRef<HTMLInputElement>(null)

    const onFormSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (search !== '') {
            {
                router.push(`/search?q=${search}`)
                setSearch('')
                inputRef.current?.blur()
                setOpen(false)
            }
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };


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
            {isOpen && <div className="w-full h-screen bg-black/40 backdrop-blur-sm fixed z-[97]" onClick={() => setOpen(false)}></div>}
            <motion.div
                style={{ background, backdropFilter: filter, WebkitBackdropFilter: filter }}
                className='w-full h-[72px] flex items-center justify-between fixed top-0 z-[98] py-2 pl-20 pr-5'
            >
                <Link href={'/'} className='hidden sm:block'>Anistream</Link>
                <motion.div
                    variants={containerVariants}
                    animate={isOpen ? "open" : "close"}
                    initial="close"
                    className='rounded-lg flex overflow-hidden bg-cgray border-primary ml-auto p-1'>
                    <form onSubmit={onFormSubmit} className='w-full'>
                        <motion.input
                            ref={inputRef}
                            name="search"
                            className='w-full bg-transparent outline-none text-sm'
                            placeholder='Search anime...'
                            value={search}
                            onChange={handleChange}
                            variants={{
                                open: { padding: '8px' },
                                close: { padding: '0px' }
                            }}
                        />
                    </form>
                    <button className='p-1.5 rounded-lg group hover:bg-cgray' onClick={() => { setOpen(!isOpen); inputRef.current?.focus() }}>
                        <Icon icon="gravity-ui:magnifier" className='w-6 h-6 text-text-white group-hover:text-white' />
                    </button>
                    {isOpen && <div className='w-[50vw] min-h-[70px] overflow-auto bg-cgray absolute top-full right-5 rounded-md -mt-2 flex flex-col justify-center'>
                        {isLoading
                            ? <div className='w-full h-full flex items-center justify-center'><CircularProgress aria-label="Loading..." /></div>
                            : (!searchResults
                                ? <div className='ml-5 text-text-white text-sm'>Enter search query...</div>
                                : (searchResults?.suggestions.length === 0
                                    ? <div className='ml-5 text-text-white text-sm'>No results!</div>
                                    : <div className='w-full h-full'>
                                        {searchResults?.suggestions.map((anime, index) => <SearchCard key={index} anime={anime} />)}
                                        <Link href={`/`} className="flex items-center mx-3 pt-1 pb-2 hover:text-primary-light border-t-1 border-zinc-500 border-dashed"><span className="mr-2">Advanced search</span><Icon icon="ph:arrow-right-bold" /></Link>
                                    </div>))}
                    </div>}
                </motion.div>
            </motion.div>
        </>
    )
}
