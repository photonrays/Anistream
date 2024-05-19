import DetailCard from '@/components/DetailCard'
import Icon from '@/components/Icon'
import { Anime, TopUpcomingAnime } from '@/services/aniwatch/types/anime'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

export default async function OtherAnime({ topAiring, topUpcoming, latestComplete }: { topAiring?: Anime[], topUpcoming?: TopUpcomingAnime[], latestComplete?: Anime[] }) {
    return (
        <div className="grid grid-cols-1 2xl:grid-cols-3 gap-2 mt-10">
            <div>
                <Link href='/' className='flex items-center gap-2 hover:text-primary mb-2'>
                    <h2 className="text-xl font-semibold">Top Airing</h2>
                    <Icon icon="formkit:arrowright" className='mt-1' fontSize={14} />
                </Link>
                <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-1 gap-3">
                    {topAiring?.slice(0, 5).map((anime, index) => <DetailCard key={index} anime={anime} />)}
                </div>
            </div>

            <div>
                <Link href='/' className='flex items-center gap-2 hover:text-primary mb-2'>
                    <h2 className="text-xl font-semibold">Top Upcomming</h2>
                    <Icon icon="formkit:arrowright" className='mt-1' fontSize={14} />
                </Link>
                <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-1 gap-3">
                    {topUpcoming?.slice(0, 5).map((anime, index) => <DetailCard key={index} anime={anime} />)}
                </div>
            </div>

            <div>
                <Link href='/' className='flex items-center gap-2 hover:text-primary mb-2'>
                    <h2 className="text-xl font-semibold">Just Completed</h2>
                    <Icon icon="formkit:arrowright" className='mt-1' fontSize={14} />
                </Link>
                <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-1 gap-3">
                    {latestComplete?.slice(0, 5).map((anime, index) => <DetailCard key={index} anime={anime} />)}
                </div>
            </div>
        </div>
    )
}