'use client'
import ServerList from "@/sections/watch/ServerList";
import { getAnimeEpisodeList, getAnimeInfo, getEpisodeServers, getEpisodeSources } from "@/services/consumet/api";
import { ISource } from "@/services/consumet/types";
import { useQueries } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Player from "@/sections/watch/Player";
import Episodes from "@/sections/watch/Episodes";
import EpisodesMobile from "@/sections/watch/EpisodesMobile";
import Related from "@/sections/watch/Related";
import AnimeInfo from "@/sections/watch/AnimeInfo";

interface WatchProps {
    params: {
        id: string,
    }
    searchParams?: { [key: string]: string | string[] | undefined };
}

export default function Watch({ params, searchParams }: WatchProps) {
    const router = useRouter()
    const [episodeId, setEpisodeId] = useState<string | undefined>(searchParams?.episodeId as string || undefined)
    const [server, setServer] = useState<string>()
    const [streamLink, setStreamLink] = useState<ISource | undefined>(undefined)
    const [player, setPlayer] = useState<Artplayer | null>(null)
    const [
        { data: serverList },
        { data: episodeList },
        { data: animeInfo }
    ] = useQueries({
        queries: [
            { queryKey: [`server-list-${episodeId}`], queryFn: () => getEpisodeServers(episodeId! as string), enabled: !!episodeId, staleTime: 1000 * 60 * 60 * 24 * 7 },
            { queryKey: [`episode-list-${params.id}`], queryFn: () => getAnimeEpisodeList(params.id), staleTime: 1000 * 60 * 60 },
            { queryKey: [`anime-info-${params.id}`], queryFn: () => getAnimeInfo(params.id), staleTime: 1000 * 60 * 60 * 24 },
        ],
    })

    useEffect(() => {
        if (!episodeId && episodeList && episodeList.length > 0) {
            setEpisodeId(episodeList[0].id)
        }
    }, [episodeId, episodeList])

    useEffect(() => {
        if (searchParams?.episodeId) {
            setEpisodeId(searchParams.episodeId as string)
        }
    }, [searchParams])

    useEffect(() => {
        if (serverList && serverList.length > 0 && !server) {
            setServer(serverList[0].name)
        }
    }, [server, serverList])

    useEffect(() => {
        (async () => {
            if (server) {
                const streamLink = await getEpisodeSources(episodeId, server)
                setStreamLink(streamLink)
            }
        })()
    }, [episodeId, params.id, server])

    const handleGetInstance = (instance: any) => {
        setPlayer(instance)
    };

    const handleDestroy = () => {
        if (player) {
            player.destroy();
        }
    };

    const handleChangeEpisode = (episodeId: string) => {
        setEpisodeId(episodeId)
        setStreamLink(undefined)
        router.push(`/watch/${params.id}?episodeId=${episodeId}`)
    }

    const handleChangeServer = (server: string) => {
        handleDestroy();
        setStreamLink(undefined);
        setServer(server);
    }

    return (
        <div className="w-full min-h-full">
            <div className="w-full h-full p-4 grid grid-cols-1 lg:grid-cols-[800px_1fr] xl:grid-cols-[1fr_800px_1fr] gap-4 mb-4">
                <Episodes episodeId={episodeId} episodeList={episodeList} handleChangeEpisode={handleChangeEpisode} />
                <div>
                    <Player streamLink={streamLink} handleGetInstance={handleGetInstance} />
                    <ServerList serverList={serverList} handleChangeServer={handleChangeServer} server={server} />
                    <EpisodesMobile episodeId={episodeId} episodeList={episodeList} handleChangeEpisode={handleChangeEpisode} />
                </div>
                <Related animeInfo={animeInfo} />
            </div>
            <AnimeInfo animeInfo={animeInfo} />
        </div>
    )
}
