import React from 'react'
import Card from '@/components/Card';
import { Button, Link } from '@nextui-org/react';
import { LatestEpisodeAnime } from '@/services/aniwatch/types/anime';

const tabs = ['All', 'Sub', 'Dub', 'Movies', 'Trending']


export default async function RecentAnime({ animes }: { animes?: LatestEpisodeAnime[] }) {
    return (
        <div className="mb-5 lg:mr-5">
            <div className='flex items-center justify-between mb-5'>
                <h2 className="text-xl font-semibold">Recently Updated</h2>
                <Link href='/'><Button color='primary' size='sm'>View more</Button></Link>
            </div>
            <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {animes?.map((anime, index) => (
                    <Card key={index} anime={anime} />
                ))}
            </div>
        </div>
    )
}
