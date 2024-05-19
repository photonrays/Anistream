import { IAnimeEpisode } from '@/services/consumet/types'
import React from 'react'

interface EpisodesProps {
    episodeList?: IAnimeEpisode[]
    handleChangeEpisode: (id: string) => void
    episodeId?: string
}

export default function Episodes({ episodeList, handleChangeEpisode, episodeId }: EpisodesProps) {
    return (
        <div className="hidden xl:block">
            {episodeList?.map((episode, index) => (
                <button
                    key={index}
                    onClick={() => handleChangeEpisode(episode.id)}
                    className={`${episodeId === episode.id ? 'bg-primary' : 'odd:bg-default-50 even:bg-default-100'} flex text-white p-3 rounded-sm cursor-pointer overflow-hidden w-full`}
                >
                    <p className="line-clamp-1 text-sm text-start">{`${episode.number}:  ${episode.title || `Episode ${episode.number}`}`}</p>
                </button>
            ))}
        </div>
    )
}
