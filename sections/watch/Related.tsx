import { DetailCard } from '@/components'
import { IAnimeInfo } from '@/services/consumet/types'
import React from 'react'

export default function Related({ animeInfo }: { animeInfo?: IAnimeInfo }) {
    return (
        <div>
            <h1 className="text-xl font-bold mb-2">Related</h1>
            {animeInfo?.relations && animeInfo?.relations.length > 0 && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                {animeInfo.relations.filter(anime => anime.type !== 'MANGA' && anime.type !== 'NOVEL')
                    .map((anime, index) => (<DetailCard key={index} anime={anime} />))}
            </div>}
        </div>
    )
}
