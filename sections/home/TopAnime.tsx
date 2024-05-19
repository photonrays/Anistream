import React from 'react'
import TopCard from '@/components/TopCard';
import { Button, Link } from '@nextui-org/react';
import { Top10Anime } from '@/services/aniwatch/types/anime';
import CustomTab from '@/components/CustomTab';

interface TopAnimeProps {
    animes?: {
        today: Array<Top10Anime>;
        week: Array<Top10Anime>;
        month: Array<Top10Anime>;
    }
}

export default function TopAnime({ animes }: TopAnimeProps) {
    return (
        <div className="block lg:ml-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold mb-2">Top anime</h2>
                <Link href='/'><Button color="primary" size='sm'>View more</Button></Link>
            </div>
            <CustomTab variant="underlined" tabs={{
                Day: <div className="flex flex-col gap-3">
                    {animes?.today.slice(0, 9).map((anime, index) => (<TopCard key={index} anime={anime} />))}
                </div>,
                Week: <div className="flex flex-col gap-3">
                    {animes?.week.slice(0, 9).map((anime, index) => (<TopCard key={index} anime={anime} />))}
                </div>,
                Month: <div className="flex flex-col gap-3">
                    {animes?.month.slice(0, 9).map((anime, index) => (<TopCard key={index} anime={anime} />))}
                </div>
            }} />
        </div>
    )
}
