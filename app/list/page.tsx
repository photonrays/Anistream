'use client'
import { Card } from '@/components'
import Icon from '@/components/Icon'
import { AnimeCategoryType, getAnimeAdvancedResults, getAnimeByCategory, getAnimeByGenre, getAnimeHomePage } from '@/services/aniwatch/api'
import { AnimeSearchQueryParams } from '@/services/aniwatch/types/controllers'
import { buildQueryString } from '@/services/aniwatch/util'
import { getAnimeAdvancedSearch } from '@/services/consumet/api'
import { BreadcrumbItem, Breadcrumbs, Button, CircularProgress, Pagination, Select, SelectItem } from '@nextui-org/react'
import { useQueries, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface listProps {
    category?: AnimeCategoryType,
    genre?: string,
    page?: string,
}

export default function List({ searchParams }: { searchParams: listProps }) {
    const router = useRouter()
    const [
        { data: animeCategory, isLoading: animeCategoryLoading },
        { data: animeGenre, isLoading: animeGenreLoading }
    ] = useQueries({
        queries: [
            { queryKey: ['anime-category', searchParams.category, searchParams.page], queryFn: () => getAnimeByCategory(searchParams.category!, searchParams.page), enabled: !!searchParams.category },
            { queryKey: ['anime-genre', searchParams.genre, searchParams.page], queryFn: () => getAnimeByGenre(searchParams.genre!, searchParams.page), enabled: !!searchParams.genre },
        ],
    })

    return (
        <div className="w-full px-5 min-h-screen pt-[72px]">
            <Breadcrumbs className="my-3">
                <BreadcrumbItem href='/'>Home</BreadcrumbItem>
                <BreadcrumbItem>List</BreadcrumbItem>
                {animeCategory && <BreadcrumbItem href={`/list?category=${searchParams.category}`}>{animeCategory.category}</BreadcrumbItem>}
                {animeGenre && <BreadcrumbItem href={`/list?genre=${searchParams.genre}`}>{animeGenre.genreName}</BreadcrumbItem>}
            </Breadcrumbs>

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
                            </>))
                }
            </div>

            <div className='w-full flex flex-col items-center gap-5'>
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
                            </>))
                }
            </div>
        </div>
    )
}
