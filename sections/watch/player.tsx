import ArtPlayer from '@/components/Artplayer'
import { AnimeEpisodesSources } from '@/services/aniwatch/types/parsers'
import { CircularProgress } from '@nextui-org/react'
import type Artplayer from 'artplayer'
import { useEffect, useState } from 'react'

interface PlayerProps {
    streamSources?: AnimeEpisodesSources,
}

export default function Player({ streamSources }: PlayerProps) {
    const [art, setArt] = useState<Artplayer | null>(null)
    useEffect(() => {
        console.log(art)
    }, [art])

    if (!streamSources || streamSources.sources === undefined) return (
        <div className="w-full h-auto aspect-video lg:w-[800px] flex justify-center items-center bg-card">
            <CircularProgress size="lg" aria-label="Loading..." />
        </div>
    )
    return (
        <ArtPlayer
            option={{
                url: `${streamSources?.sources?.[0].url}`,
                subtitle: {
                    url:
                        streamSources.tracks !== undefined
                            ? `${streamSources.tracks.find((sub) => sub.label === "English")?.file}` || ""
                            : "",
                    type: "vtt",
                    style: {
                        color: "#fff",
                    },
                    encoding: "utf-8",
                },
            }}
            subtitles={streamSources.tracks}
            className="w-full h-auto aspect-video lg:w-[800px]"
            getInstance={(art) => setArt(art)}
        />
    )
}
