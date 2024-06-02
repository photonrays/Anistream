'use client'
import { useQueries } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { getAnimeEpisodes, getAnimeEpisodesServers, getAnimeInfoById, getAnimeStreamSources } from "@/services/aniwatch/api";
import { DubEpisode, RawEpisode, SubEpisode } from "@/services/aniwatch/types/anime";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { useWatchHistory } from "@/hooks/useWatchHistory";
import { AnimeInfo, Episodes, EpisodesMobile, ServerList, Player, Related } from "@/sections/watch";

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
    const [episodeId, setEpisodeId] = useState<string | undefined>(searchParams?.ep ? `${params.id}?ep=${searchParams?.ep}` : undefined)
    const [server, setServer] = useState<ServerProps>({ serverName: undefined, category: undefined })
    const { watchHistory, getLatestEpisode, addToWatchHistory, getWatchedEpisodes } = useWatchHistory()

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
        if (searchParams?.ep) {
            if (!watchHistory[params.id] || !watchHistory[params.id][searchParams.ep]) {
                addToWatchHistory(params.id, searchParams.ep)
            }
        } else if (getLatestEpisode(params.id)) {
            redirect(`/watch/${params.id}?ep=${getLatestEpisode(params.id)}`)
        } else if (episodeList && episodeList.episodes[episodeList.episodes.length - 1]?.episodeId) {
            redirect(`/watch/${episodeList.episodes[episodeList.episodes.length - 1].episodeId}`)
        }
    }, [searchParams?.ep, episodeList])

    useEffect(() => {
        setEpisodeId(searchParams?.ep ? `${params.id}?ep=${searchParams?.ep}` : undefined)
    }, [searchParams])

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

    const handleChangeServer = (server: SubEpisode | DubEpisode | RawEpisode, category: string) => {
        setServer({ serverName: server.serverName, category });
    }

    return (
        <div className="w-full min-h-full pt-[72px]">
            <Breadcrumbs className="ml-5 my-2">
                <BreadcrumbItem href="/">Home</BreadcrumbItem>
                <BreadcrumbItem>Watch</BreadcrumbItem>
                <BreadcrumbItem href={`/watch/${params.id}`}>{animeInfo?.anime.info.name}</BreadcrumbItem>
            </Breadcrumbs>
            <div className="w-full h-full p-4 grid grid-cols-1 lg:grid-cols-[800px_1fr] xl:grid-cols-[1fr_800px_1fr] gap-4 mb-4">
                <Episodes episodeId={episodeId} episodeList={episodeList} watchedEpisodeIds={getWatchedEpisodes(params.id)} />
                <div>
                    <Player key={`${episodeId}-${server.serverName}-${server.category}`} streamSources={streamSources} />
                    <ServerList serverList={serverList} handleChangeServer={handleChangeServer} server={server} />
                    <EpisodesMobile episodeId={episodeId} episodeList={episodeList} watchedEpisodeIds={getWatchedEpisodes(params.id)} />
                </div>
                <Related animeInfo={animeInfo?.relatedAnimes} />
            </div>
            <AnimeInfo animeInfo={animeInfo} />
        </div>
    )
}
