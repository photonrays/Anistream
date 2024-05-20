'use client'
import ServerList from "@/sections/watch/ServerList";
import { ISource } from "@/services/consumet/types";
import { useQueries } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import Player from "@/sections/watch/Player";
import Episodes from "@/sections/watch/Episodes";
import EpisodesMobile from "@/sections/watch/EpisodesMobile";
import Related from "@/sections/watch/Related";
import AnimeInfo from "@/sections/watch/AnimeInfo";
import { getAnimeEpisodes, getAnimeEpisodesServers, getAnimeInfoById, getAnimeStreamSources } from "@/services/aniwatch/api";
import { AnimeServers, DubEpisode, RawEpisode, SubEpisode } from "@/services/aniwatch/types/anime";

interface WatchProps {
    params: {
        id: string,
    }
    searchParams?: { ep: string };
}

export interface ServerProps {
    serverName?: string
    category?: string
}

export default function Watch({ params, searchParams }: WatchProps) {
    const router = useRouter()
    const [episodeId, setEpisodeId] = useState<string | undefined>(searchParams?.ep ? `${params.id}?ep=${searchParams?.ep}` : undefined)
    const [server, setServer] = useState<ServerProps>({ serverName: undefined, category: undefined })

    const [
        { data: episodeList },
        { data: serverList },
        { data: animeInfo },
        { data: streamSources }
    ] = useQueries({
        queries: [
            { queryKey: [`anime-episodes-${params.id}`], queryFn: () => getAnimeEpisodes(params.id), staleTime: 1000 },
            { queryKey: [`anime-servers-${episodeId}`], queryFn: () => getAnimeEpisodesServers(episodeId!), enabled: !!episodeId, staleTime: 1000 },
            { queryKey: [`anime-info-${params.id}`], queryFn: () => getAnimeInfoById(params.id), staleTime: 1000 },
            { queryKey: [`anime-stream-sources-${episodeId}-${server.serverName}-${server.category}`], queryFn: () => getAnimeStreamSources(episodeId!, server.serverName, server.category), enabled: !!episodeId && !!server.serverName && !!server.category, staleTime: 1000 }
        ],
    })

    useEffect(() => {
        if (episodeList && !episodeId) {
            redirect(`/watch/${episodeList.episodes[episodeList.episodes.length - 1].episodeId}`)
        }
    }, [episodeList])

    useEffect(() => {
        if (serverList) {
            if (serverList.sub && serverList.sub.length > 0) {
                setServer({ serverName: serverList.sub[0].serverName, category: "sub" })
            } else if (serverList.dub && serverList.dub.length > 0) {
                setServer({ serverName: serverList.dub[0].serverName, category: "dub" })
            } else if (serverList.raw && serverList.raw.length > 0) {
                setServer({ serverName: serverList.raw[0].serverName, category: "raw" })
            }
        }
    }, [serverList])

    const handleChangeEpisode = (episodeId: string) => {
        setEpisodeId(episodeId)
        router.push(`/watch/${episodeId}`)
    }

    const handleChangeServer = (server: SubEpisode | DubEpisode | RawEpisode, category: string) => {
        setServer({ serverName: server.serverName, category });
    }

    return (
        <div className="w-full min-h-full">
            <div className="w-full h-full p-4 grid grid-cols-1 lg:grid-cols-[800px_1fr] xl:grid-cols-[1fr_800px_1fr] gap-4 mb-4">
                <Episodes episodeId={episodeId} episodeList={episodeList} handleChangeEpisode={handleChangeEpisode} />
                <div>
                    <Player streamSources={streamSources} />
                    <ServerList serverList={serverList} handleChangeServer={handleChangeServer} server={server} />
                    <EpisodesMobile episodeId={episodeId} episodeList={episodeList} handleChangeEpisode={handleChangeEpisode} />
                </div>
                <Related animeInfo={animeInfo?.relatedAnimes} />
            </div>
            <AnimeInfo animeInfo={animeInfo} />
        </div>
    )
}
