'use client'
import { useRef, useState } from 'react'
import { easeInOut, motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useDebounce } from "@uidotdev/usehooks";
import { useQuery } from '@tanstack/react-query';
import { getAnimeSearchSuggestions } from '@/services/aniwatch/api';
import { useRouter } from 'next/navigation';
import { CircularProgress } from '@nextui-org/react';
import { Icon, ProfileButton, SearchCard, ThemeSwitcher, } from '@/components'


export default function Header({ isFullOption = true }: { isFullOption?: boolean }) {
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
        ["rgb(var(--background) / 0)", "rgb(var(--background) / 0.8)"],
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
            width: "40px",
            padding: "0",
            borderWidth: "0px",
            transition: {
                ease: "easeInOut",
                duration: 0.2,
            },
        },
        open: {
            width: "50vw",
            padding: "0 0 0 10px",
            borderWidth: "2px",
            transition: {
                ease: "easeInOut",
                duration: 0.2,
            },
        },
    }


    return (
        <>
            {isOpen && <div className="w-full h-screen bg-background/40 backdrop-blur-sm fixed z-[97]" onClick={() => setOpen(false)}></div>}
            <motion.div
                style={{ background, backdropFilter: filter, WebkitBackdropFilter: filter }}
                className='w-full h-[72px] flex items-center justify-between fixed top-0 z-[98] py-2 pr-5'
            >
                <Link href={'/'} className={`${isFullOption ? 'pl-20' : 'pl-5'} hidden sm:block text-foreground`}>Anistream</Link>
                <div className='ml-auto flex items-center relative gap-1'>
                    {isFullOption && <motion.div
                        variants={containerVariants}
                        animate={isOpen ? "open" : "close"}
                        initial="close"
                        className='rounded-lg flex items-center overflow-hidden bg-card border-primary h-full'>
                        <form onSubmit={onFormSubmit} className='w-full h-full flex items-center relative'>
                            <input
                                ref={inputRef}
                                name="search"
                                className='w-full bg-transparent outline-none text-sm'
                                placeholder='Search anime...'
                                value={search}
                                onChange={handleChange}
                            />
                        </form>
                        <button className='min-w-10 min-h-10 flex items-center justify-center rounded-lg group hover:bg-card' onClick={() => { setOpen(!isOpen); inputRef.current?.focus() }}>
                            <Icon icon="gravity-ui:magnifier" className='w-6 h-6 text-foreground group-hover:text-white' />
                        </button>
                        {isOpen && <div className='z-[100] w-[50vw] min-h-[70px] overflow-auto bg-card absolute top-[125%] left-0 rounded-md -mt-2 flex flex-col justify-center'>
                            {isLoading
                                ? <div className='w-full h-full flex items-center justify-center'><CircularProgress aria-label="Loading..." /></div>
                                : (!searchResults
                                    ? <div className='ml-5 text-foreground text-sm'>Enter search query...</div>
                                    : (searchResults?.suggestions.length === 0
                                        ? <div className='ml-5 text-foreground text-sm'>No results!</div>
                                        : <div className='w-full h-full'>
                                            {searchResults?.suggestions.map((anime, index) => <SearchCard key={index} anime={anime} />)}
                                            <Link href={`/`} className="flex items-center mx-3 pt-1 pb-2 hover:text-primary-light border-t-1 border-foreground-darker border-dashed"><span className="mr-2">Advanced search</span><Icon icon="ph:arrow-right-bold" /></Link>
                                        </div>))}
                        </div>}
                    </motion.div>}
                    <ThemeSwitcher />
                    {isFullOption && <ProfileButton />}
                </div>
            </motion.div>
        </>
    )
}
