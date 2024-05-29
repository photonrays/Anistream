import { AnimeEpisodes } from '@/services/aniwatch/types/parsers';
import Link from 'next/link';
import React from 'react'

interface EpisodesMobileProps {
    episodeList?: AnimeEpisodes
    episodeId?: string;
}

export default function EpisodesMobile({ episodeList, episodeId }: EpisodesMobileProps) {
    return (
        <div className="xl:hidden flex mt-5">
            {episodeList && <>
                <p className="mr-4">Episodes:</p>
                <div className="flex gap-1 flex-wrap">
                    {episodeList.episodes?.map((episode, index) => {
                        if (!episode.episodeId) return null
                        return (
                            <Link href={`/watch/${episode.episodeId}`}
                                key={index}
                                className={`block text-foreground ${episodeId === episode.episodeId ? 'bg-primary text-white' : 'bg-card'} py-1 px-10 rounded-sm cursor-pointer`}
                            >{episode.number}</Link>
                        )
                    })}
                </div>
            </>}
        </div>
    )
}
