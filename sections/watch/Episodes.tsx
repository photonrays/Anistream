import { AnimeEpisodes } from '@/services/aniwatch/types/parsers'
import Link from 'next/link'
import React from 'react'

interface EpisodesProps {
    episodeList?: AnimeEpisodes
    episodeId?: string
}

export default function Episodes({ episodeList, episodeId }: EpisodesProps) {
    return (
        <div className="hidden xl:block max-h-[500px] overflow-x-auto">
            {episodeList?.episodes?.map((episode, index) => {
                if (!episode.episodeId) return null
                return (
                    <Link
                        href={`/watch/${episode.episodeId}`}
                        key={index}
                        className={`${episodeId === episode.episodeId ? 'bg-primary' : 'odd:bg-default-50 even:bg-default-100'} flex text-white p-3 rounded-sm cursor-pointer overflow-hidden w-full`}
                    >
                        <p className="line-clamp-1 text-sm text-start">{`${episode.number}:  ${episode.title || `Episode ${episode.number}`}`}</p>
                    </Link>
                )
            })}
        </div>
    )
}
