'use client'
import { Card, CustomSelect, Icon } from '@/components'
import { getAnimeAdvancedResults, getAnimeHomePage } from '@/services/aniwatch/api'
import { AnimeSearchQueryParams } from '@/services/aniwatch/types/controllers'
import { buildQueryString } from '@/services/aniwatch/util'
import { BreadcrumbItem, Breadcrumbs, Button, CircularProgress, Pagination } from '@nextui-org/react'
import { useQueries } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion, useCycle } from 'framer-motion';
import { types, languages, rated, scores, seasons, sorts, statuses } from '@/data/anime'


export default function Search({ searchParams }: { searchParams: AnimeSearchQueryParams }) {
    const router = useRouter()
    const [
        { data: searchResults, isLoading },
        { data: animeHome }
    ] = useQueries({
        queries: [
            { queryKey: ['search', searchParams], queryFn: () => getAnimeAdvancedResults(searchParams), enabled: !!searchParams.q && searchParams.q !== '' },
            { queryKey: ['anime-home'], queryFn: () => getAnimeHomePage() },
        ],
    })

    console.log(searchResults)

    const [options, setOptions] = useState<AnimeSearchQueryParams>({
        q: searchParams.q || '',
        type: searchParams.type || '',
        status: searchParams.status || '',
        rated: searchParams.rated || '',
        score: searchParams.score || '',
        season: searchParams.season || '',
        language: searchParams.language || '',
        start_date: searchParams.start_date || '',
        end_date: searchParams.end_date || '',
        sort: searchParams.sort || '',
    })
    const [selectedGenres, setGenres] = useState<string[]>(searchParams.genres?.split(',') || [])
    const [showFilter, togglerFilter] = useCycle(false, true)

    const handleSearch = () => {
        const searchParams: AnimeSearchQueryParams = { ...options, page: '1', genres: selectedGenres.join(',') };
        if (searchParams.q !== '' && searchParams.q !== undefined) {
            router.push(`${buildQueryString(searchParams)}`)
        }
    }

    const handleChange = (e: { target: { value: string; }; }) => {
        setOptions(prev => ({ ...prev, q: e.target.value }))
    };

    const onFormSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        handleSearch();
    }
    const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>, key: string) => {
        setOptions(prev => ({ ...prev, [key]: e.target.value }));
    };

    return (
        <div className="w-full px-5 min-h-screen pt-[72px]">
            {/* <button className="flex items-center gap-3 mb-5 cursor-pointer hover:text-primary-light" onClick={() => router.back()}> <Icon icon="ph:arrow-left-bold" width={24} /><h2 className="text-xl">Advanced search</h2></button> */}
            <Breadcrumbs className="my-3">
                <BreadcrumbItem href='/'>Home</BreadcrumbItem>
                <BreadcrumbItem href='/search'>Search</BreadcrumbItem>
            </Breadcrumbs>

            <div className='flex w-full gap-2 items-center mb-3'>
                <div className='w-full rounded-lg flex overflow-hidden bg-card border-2 border-transparent focus-within:border-primary ml-auto p-1'>
                    <form onSubmit={onFormSubmit} className='w-full'>
                        <input className="w-full bg-transparent outline-none text-sm p-2"
                            type="search"
                            placeholder="Enter anime title..."
                            value={options.q}
                            onChange={handleChange} />
                    </form>
                    <button className='p-1.5 rounded-lg group hover:bg-card'>
                        <Icon icon="gravity-ui:magnifier" className='w-6 h-6 text-foreground group-hover:text-white' />
                    </button>
                </div>
                <Button color="primary" radius='sm' variant="solid" onClick={() => togglerFilter()} className='w-[150px] h-[45px]'>
                    <Icon icon="ep:arrow-down-bold" className={`transition-all ${showFilter ? 'rotate-180' : ''}`} />
                    <span>Show filter</span>
                </Button>
            </div>

            <div className='w-full'>
                <motion.div
                    layout
                    variants={{ open: { height: 'auto', marginBottom: '12px' }, close: { height: 0, marginBottom: 0 } }}
                    transition={{ ease: "easeInOut", duration: 0.2 }}
                    animate={showFilter ? "open" : "close"}
                    initial="close"
                    className='overflow-hidden'
                >
                    <div className='bg-card p-5 rounded-lg'>
                        <p className='font-semibold mb-2'>Filter</p>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5'>
                            <CustomSelect label='Select anime type' types={types} type='type' value={options.type} handleSelectionChange={handleSelectionChange} />
                            <CustomSelect label='Select anime status' types={statuses} type='status' value={options.status} handleSelectionChange={handleSelectionChange} />
                            <CustomSelect label='Select anime rating' types={rated} type='rated' value={options.rated} handleSelectionChange={handleSelectionChange} />
                            <CustomSelect label='Select anime score' types={scores} type='score' value={options.score} handleSelectionChange={handleSelectionChange} />
                            <CustomSelect label='Select anime season' types={seasons} type='season' value={options.season} handleSelectionChange={handleSelectionChange} />
                            <CustomSelect label='Select anime language' types={languages} type='language' value={options.language} handleSelectionChange={handleSelectionChange} />
                            <CustomSelect label='Select sort' types={sorts} type='sort' value={options.sort} handleSelectionChange={handleSelectionChange} />
                        </div>
                        <p className='font-semibold mb-2 mt-5'>Genres</p>
                        <div className='flex flex-wrap w-full gap-3'>
                            {animeHome?.genres.map((genre, idx) => {
                                const _genre = genre.replace(/\s/g, '-').toLowerCase();
                                return <Button
                                    size='sm'
                                    key={idx}
                                    className={`${selectedGenres.includes(_genre) ? 'bg-primary text-white' : 'bg-card-light'}  hover:bg-primary hover:text-white`}
                                    onClick={() => setGenres(prev => prev.includes(_genre) ? prev.filter(g => g !== _genre) : [...prev, _genre])}
                                >
                                    {genre}
                                </Button>
                            })}
                        </div>
                    </div>
                </motion.div>
                <div className="flex justify-end gap-2">
                    <Button color="primary" variant="light" radius='sm' onClick={() => setOptions(prev => ({ q: prev.q }))}>
                        Reset filter
                    </Button>
                    <Button color="primary" variant="solid" radius='sm' onClick={handleSearch}>
                        Search
                    </Button>
                </div>
            </div>
            <p className='mt-8 mb-4 font-semibold'>Search result for: <span className='italic text-primary-light'>{searchParams.q}</span></p>
            <div className='w-full flex flex-col items-center gap-5'>
                {isLoading
                    ? <CircularProgress aria-label="Loading..." />
                    : (!searchResults
                        ? <></>
                        : (searchResults?.animes.length === 0
                            ? <p>No results found!</p>
                            : <>
                                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 gap-3">
                                    {searchResults?.animes.map((anime, idx) => <Card anime={anime} key={idx} />)}
                                </div>
                                <Pagination
                                    total={searchResults?.totalPages || 1}
                                    initialPage={1}
                                    page={Number(searchParams.page) || 1}
                                    variant='light'
                                    showControls
                                    onChange={(p) => router.push(buildQueryString({ ...searchParams, page: p.toString() }))}
                                />
                            </>))
                }
            </div>

        </div>
    )
}
