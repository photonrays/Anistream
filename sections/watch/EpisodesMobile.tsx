import { AnimeEpisodes } from '@/services/aniwatch/types/parsers';
import Link from 'next/link';

interface EpisodesMobileProps {
    episodeList?: AnimeEpisodes
    episodeId?: string;
    watchedEpisodeIds: string[]
}

export default function EpisodesMobile({ episodeList, episodeId, watchedEpisodeIds }: EpisodesMobileProps) {
    return (
        <div className="xl:hidden flex mt-5">
            {episodeList && <>
                <p className="mr-4">Episodes:</p>
                <div className="flex gap-1 flex-wrap">
                    {episodeList.episodes?.map((episode, index) => {
                        if (!episode.episodeId) return null
                        const epNumber = episode.episodeId.match(/ep=(\d+)/)?.[1] || '';
                        return (
                            <Link href={`/watch/${episode.episodeId}`}
                                key={index}
                                className={`block text-foreground ${episodeId === episode.episodeId ? 'bg-primary text-white' : `bg-card ${watchedEpisodeIds.includes(epNumber) && 'opacity-45'}`} py-1 px-10 rounded-sm cursor-pointer`}
                            >{episode.number}</Link>
                        )
                    })}
                </div>
            </>}
        </div>
    )
}
