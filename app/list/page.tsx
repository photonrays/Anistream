'use client'
import { Card } from '@/components'
import { AnimeCategoryType, getAnimeByCategory, getAnimeByGenre, getProducerAnimes } from '@/services/aniwatch/api'
import { BreadcrumbItem, Breadcrumbs, CircularProgress, Pagination } from '@nextui-org/react'
import { useQueries } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
interface listProps {
    category?: AnimeCategoryType,
    genre?: string,
    page?: string,
    producer?: string,
}

export default function List({ searchParams }: { searchParams: listProps }) {
    const router = useRouter()
    const [
        { data: animeCategory, isLoading: animeCategoryLoading },
        { data: animeGenre, isLoading: animeGenreLoading },
        { data: producerAnimes, isLoading: producerAnimesLoading }
    ] = useQueries({
        queries: [
            { queryKey: ['anime-category', searchParams.category, searchParams.page], queryFn: () => getAnimeByCategory(searchParams.category!, searchParams.page), enabled: !!searchParams.category },
            { queryKey: ['anime-genre', searchParams.genre, searchParams.page], queryFn: () => getAnimeByGenre(searchParams.genre!, searchParams.page), enabled: !!searchParams.genre },
            { queryKey: ['anime-producer', searchParams.producer, searchParams.page], queryFn: () => getProducerAnimes(searchParams.producer!, searchParams.page), enabled: !!searchParams.producer },
        ],
    })

    return (
        <div className="w-full px-5 min-h-screen pt-[72px]">
            {animeCategory && <Breadcrumbs className="my-3">
                <BreadcrumbItem href='/'>Home</BreadcrumbItem>
                <BreadcrumbItem>Category</BreadcrumbItem>
                <BreadcrumbItem href={`/list?category=${searchParams.category}`}>{animeCategory.category}</BreadcrumbItem>
            </Breadcrumbs>}
            {animeGenre && <Breadcrumbs className="my-3">
                <BreadcrumbItem href='/'>Home</BreadcrumbItem>
                <BreadcrumbItem>Genre</BreadcrumbItem>
                <BreadcrumbItem href={`/list?genre=${animeGenre.genreName}`}>{animeGenre.genreName}</BreadcrumbItem>
            </Breadcrumbs>}
            {producerAnimes && <Breadcrumbs className="my-3">
                <BreadcrumbItem href='/'>Home</BreadcrumbItem>
                <BreadcrumbItem>Producer</BreadcrumbItem>
                <BreadcrumbItem href={`/list?producer=${producerAnimes.producerName}`}>{producerAnimes.producerName}</BreadcrumbItem>
            </Breadcrumbs>}

            <div className='w-full flex flex-col items-center gap-5'>
                {animeCategoryLoading
                    ? <CircularProgress aria-label="Loading..." />
                    : (!animeCategory
                        ? <></>
                        : (animeCategory?.animes.length === 0
                            ? <p>No results found!</p>
                            : <>
                                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 gap-3">
                                    {animeCategory?.animes.map((anime, idx) => <Card anime={anime} key={idx} />)}
                                </div>
                                <Pagination
                                    total={animeCategory?.totalPages || 1}
                                    initialPage={1}
                                    page={Number(searchParams.page) || 1}
                                    variant='light'
                                    showControls
                                    onChange={(p) => router.push(`/list?category=${searchParams.category}&page=${p}`)}
                                />
                            </>))}

                {animeGenreLoading
                    ? <CircularProgress aria-label="Loading..." />
                    : (!animeGenre
                        ? <></>
                        : (animeGenre?.animes.length === 0
                            ? <p>No results found!</p>
                            : <>
                                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 gap-3">
                                    {animeGenre?.animes.map((anime, idx) => <Card anime={anime} key={idx} />)}
                                </div>
                                <Pagination
                                    total={animeGenre?.totalPages || 1}
                                    initialPage={1}
                                    page={Number(searchParams.page) || 1}
                                    variant='light'
                                    showControls
                                    onChange={(p) => router.push(`/list?genre=${searchParams.genre}&page=${p}`)}
                                />
                            </>))}

                {producerAnimesLoading
                    ? <CircularProgress aria-label="Loading..." />
                    : (!producerAnimes
                        ? <></>
                        : (producerAnimes?.animes.length === 0
                            ? <p>No results found!</p>
                            : <>
                                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 gap-3">
                                    {producerAnimes?.animes.map((anime, idx) => <Card anime={anime} key={idx} />)}
                                </div>
                                <Pagination
                                    total={producerAnimes?.totalPages || 1}
                                    initialPage={1}
                                    page={Number(searchParams.page) || 1}
                                    variant='light'
                                    showControls
                                    onChange={(p) => router.push(`/list?producer=${searchParams.producer}&page=${p}`)}
                                />
                            </>))}
            </div>
        </div>
    )
}
