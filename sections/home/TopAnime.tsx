import React from 'react'
import TopCard from '@/components/TopCard';
import { Button, Link } from '@nextui-org/react';
import { getAnimePopular } from '@/services/consumet/api';

export default async function TopAnime() {
    const topAnimes = await getAnimePopular()
    return (
        <div className="block lg:ml-4">
            <div className="flex justify-between mb-5 items-center">
                <h2 className="text-xl font-semibold mb-2">Top anime</h2>
                <Link href='/'><Button color="primary" size='sm'>View more</Button></Link>
            </div>

            <div className="flex flex-col gap-3">
                {topAnimes?.results?.slice(0, 9).map((anime, index) => (<TopCard key={index} anime={anime} ranking={index + 1} />))}
            </div>
        </div>
    )
}
