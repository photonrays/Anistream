'use client'
import DetailCard from '@/components/DetailCard'
import { IAnimeInfo, ISearch } from '@/services/consumet/types'
import { Tab, Tabs } from '@nextui-org/react'
import React, { Suspense } from 'react'

export default function OtherAnimemb({ newAdded, topUpcoming, latestComplete }: { newAdded: ISearch<IAnimeInfo>, topUpcoming: ISearch<IAnimeInfo>, latestComplete: ISearch<IAnimeInfo> }) {
    return (
        <div className="sm:hidden">
            <Suspense fallback={<p>Loading...</p>}>
                <Tabs aria-label="Options" size="sm" radius="sm" color="primary" fullWidth={true}>
                    <Tab key="newAdded" title="New Added">
                        <div className="flex flex-col gap-3">
                            {newAdded && newAdded?.results?.slice(0, 5).map((anime, index) => <DetailCard key={index} anime={anime} />)}
                        </div>
                    </Tab>
                    <Tab key="topUpcoming" title="Top Upcoming">
                        <div className="flex flex-col gap-3">
                            {topUpcoming?.results?.slice(0, 5).map((anime, index) => <DetailCard key={index} anime={anime} />)}
                        </div>
                    </Tab>
                    <Tab key="justComplete" title="Just Complete">
                        <div className="flex flex-col gap-3">
                            {latestComplete?.results?.slice(0, 5).map((anime, index) => <DetailCard key={index} anime={anime} />)}
                        </div>
                    </Tab>
                </Tabs>
            </Suspense>
        </div>
    )
}
