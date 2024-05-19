import { ArtPlayer } from '@/components'
import { ISource } from '@/services/consumet/types'
import { CircularProgress } from '@nextui-org/react'
import React from 'react'

interface PlayerProps {
    streamLink?: ISource,
    handleGetInstance: any
}

export default function Player({ streamLink, handleGetInstance }: PlayerProps) {
    if (!streamLink) return (
        <div className="w-full h-auto aspect-video lg:w-[800px] flex justify-center items-center bg-gray">
            <CircularProgress size="lg" aria-label="Loading..." />
        </div>
    )
    return (
        <ArtPlayer
            key={streamLink.sources[0].url}
            option={{
                url: streamLink?.sources.find((s) => s.quality === 'default')?.url,
            }}
            className="w-full h-auto aspect-video lg:w-[800px]"
            getInstance={handleGetInstance}
        />
    )
}
