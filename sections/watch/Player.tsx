import { ArtPlayer } from '@/components'
import { AnimeEpisodesSources } from '@/services/aniwatch/types/parsers'
import { CircularProgress } from '@nextui-org/react'
import React from 'react'

interface PlayerProps {
    streamSources?: AnimeEpisodesSources,
}

export default function Player({ streamSources }: PlayerProps) {
    if (!streamSources) return (
        <div className="w-full h-auto aspect-video lg:w-[800px] flex justify-center items-center bg-gray">
            <CircularProgress size="lg" aria-label="Loading..." />
        </div>
    )
    return (
        <ArtPlayer
            key={streamSources.sources[0].url}
            option={{
                url: streamSources.sources[0].url,
                subtitle: {
                    url:
                        typeof streamSources.tracks !== "undefined"
                            ? streamSources.tracks.find((sub) => sub.label === "English")?.file || ""
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
            getInstance={() => { }}
        />
    )
}
