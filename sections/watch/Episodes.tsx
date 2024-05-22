import { AnimeEpisodes } from '@/services/aniwatch/types/parsers'
import React from 'react'

interface EpisodesProps {
    episodeList?: AnimeEpisodes
    handleChangeEpisode: (id: string) => void
    episodeId?: string
}

export default function Episodes({ episodeList, handleChangeEpisode, episodeId }: EpisodesProps) {
    return (
        <div className="hidden xl:block max-h-[500px] overflow-x-auto">
            {episodeList?.episodes?.map((episode, index) => {
                if (!episode.episodeId) return null
                return (
                    <button
                        key={index}
                        onClick={() => handleChangeEpisode(episode.episodeId!)}
                        className={`${episodeId === episode.episodeId ? 'bg-primary' : 'odd:bg-default-50 even:bg-default-100'} flex text-white p-3 rounded-sm cursor-pointer overflow-hidden w-full`}
                    >
                        <p className="line-clamp-1 text-sm text-start">{`${episode.number}:  ${episode.title || `Episode ${episode.number}`}`}</p>
                    </button>
                )
            })}
        </div>
    )
}
