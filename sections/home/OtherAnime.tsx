'use client'
import DetailCard from '@/components/DetailCard'
import { IAnimeInfo, ISearch } from '@/services/consumet/types'
import React, { Suspense } from 'react'

export default function OtherAnime({ newAdded, topUpcoming, latestComplete }: { newAdded: ISearch<IAnimeInfo>, topUpcoming: ISearch<IAnimeInfo>, latestComplete: ISearch<IAnimeInfo> }) {
    return (
        <div className="hidden sm:grid grid-cols-1 2xl:grid-cols-3 gap-5">
            <Suspense fallback={<p>Loading ...</p>}>
                <div>
                    <h2 className="text-xl font-semibold mb-2">New Added</h2>
                    <div className="grid grid-cols-2 2xl:grid-cols-1 gap-3">
                        {newAdded?.results?.slice(0, 5).map((anime, index) => <DetailCard key={index} anime={anime} />)}
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2">Top Upcoming</h2>
                    <div className="grid grid-cols-2 2xl:grid-cols-1 gap-3">
                        {topUpcoming?.results?.slice(0, 5).map((anime, index) => <DetailCard key={index} anime={anime} />)}
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2">Just Complete</h2>
                    <div className="grid grid-cols-2 2xl:grid-cols-1 gap-3">
                        {latestComplete?.results?.slice(0, 5).map((anime, index) => <DetailCard key={index} anime={anime} />)}
                    </div>
                </div>
            </Suspense>
        </div>
    )
}
