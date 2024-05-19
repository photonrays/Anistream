import DetailCard from '@/components/DetailCard'
import { getLatestComplete, getRecentlyAdded, getTopUpcoming } from '@/services/consumet/api'
import React from 'react'

export default async function OtherAnime() {
    const [newAdded, topUpcoming, latestComplete] = await Promise.all([getRecentlyAdded(), getTopUpcoming(), getLatestComplete()])
    return (
        <div className="grid grid-cols-1 2xl:grid-cols-3 gap-2">
            <div>
                <h2 className="text-xl font-semibold mb-2">New Added</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-1 gap-3">
                    {newAdded?.results?.slice(0, 5).map((anime, index) => <DetailCard key={index} anime={anime} />)}
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Top Upcoming</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-1 gap-3">
                    {topUpcoming?.results?.slice(0, 5).map((anime, index) => <DetailCard key={index} anime={anime} />)}
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Just Complete</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-1 gap-3">
                    {latestComplete?.results?.slice(0, 5).map((anime, index) => <DetailCard key={index} anime={anime} />)}
                </div>
            </div>
        </div>
    )
}