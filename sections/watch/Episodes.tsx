import { AnimeEpisodes } from '@/services/aniwatch/types/parsers'
import Link from 'next/link'

interface EpisodesProps {
    episodeList?: AnimeEpisodes
    episodeId?: string,
    watchedEpisodeIds: string[]
}

export default function Episodes({ episodeList, episodeId, watchedEpisodeIds }: EpisodesProps) {
    return (
        <div className="hidden xl:block max-h-[500px] overflow-x-auto">
            {episodeList?.episodes?.map((episode, index) => {
                if (!episode.episodeId) return null
                const epNumber = episode.episodeId.match(/ep=(\d+)/)?.[1] || '';
                return (
                    <Link
                        href={`/watch/${episode.episodeId}`}
                        key={index}
                        className={`text-foreground ${episodeId === episode.episodeId ? 'bg-primary text-white' : `odd:bg-card/35 even:bg-card ${watchedEpisodeIds.includes(epNumber) && 'opacity-45'}`} flex p-3 rounded-sm cursor-pointer overflow-hidden w-full`}
                    >
                        <p className="line-clamp-1 text-sm text-start">{`${episode.number}:  ${episode.title || `Episode ${episode.number}`}`}</p>
                    </Link>
                )
            })}
        </div>
    )
}
