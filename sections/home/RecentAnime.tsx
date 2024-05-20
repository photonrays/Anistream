import React from 'react'
import Card from '@/components/Card';
import { Button, Link } from '@nextui-org/react';
import { Anime, LatestEpisodeAnime } from '@/services/aniwatch/types/anime';
import CustomTab from '@/components/CustomTab';

export default async function RecentAnime({ animes, subbed, dubbed }: { animes?: LatestEpisodeAnime[], subbed?: Anime[], dubbed?: Anime[] }) {
    return (
        <div className="mb-5 lg:mr-5">
            <div className='flex items-center justify-between mb-2'>
                <h2 className="text-xl font-semibold">Recently Updated</h2>
                <Link href='/'><Button color='primary' size='sm'>View more</Button></Link>
            </div>
            <CustomTab variant="underlined" tabs={{
                All: <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                    {animes?.slice(0, 12).map((anime, index) => (
                        <Card key={index} anime={anime} />
                    ))}
                </div>,
                Sub: <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                    {subbed?.slice(0, 12).map((anime, index) => (
                        <Card key={index} anime={anime} />
                    ))}
                </div>,
                Dub: <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                    {dubbed?.slice(0, 12).map((anime, index) => (
                        <Card key={index} anime={anime} />
                    ))}
                </div>
            }} />

        </div>
    )
}
