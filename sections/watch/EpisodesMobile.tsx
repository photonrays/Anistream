import { IAnimeEpisode } from '@/services/consumet/types'
import React from 'react'

interface EpisodesMobileProps {
    episodeList?: IAnimeEpisode[];
    handleChangeEpisode: (id: string) => void;
    episodeId?: string;
}

export default function EpisodesMobile({ episodeList, handleChangeEpisode, episodeId }: EpisodesMobileProps) {
    return (
        <div className="xl:hidden flex mt-5">
            <p className="mr-4">Episodes:</p>
            <div className="flex gap-1 flex-wrap">
                {episodeList?.map((episode, index) => (
                    <button onClick={() => handleChangeEpisode(episode.id)}
                        key={index}
                        className={`block ${episodeId === episode.id ? 'bg-primary' : 'bg-gray'} text-white py-1 px-10 rounded-sm cursor-pointer`}
                    >{episode.number}</button>
                ))}
            </div>
        </div>
    )
}
