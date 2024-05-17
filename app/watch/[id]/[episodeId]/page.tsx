'use client'
import ArtPlayer from "@/components/ArtPlayer";
import { getAnimeEpisodeList, getEpisodeServers, getEpisodeSources } from "@/services/consumet/api";
import { ISource } from "@/services/consumet/types";
import { CircularProgress } from "@nextui-org/react";
import { useQueries } from "@tanstack/react-query";
import Artplayer from "artplayer";
import Link from "next/link";
import { useEffect, useState } from "react";

interface WatchProps {
    params: {
        id: string,
        episodeId: string
    }
    searchParams?: { [key: string]: string | string[] | undefined };
}

export default function Watch({ params }: WatchProps) {
    const [server, setServer] = useState<string>()
    const [
        { data: serverList },
        { data: episodeList },
    ] = useQueries({
        queries: [
            { queryKey: [`server-list-${params.episodeId}`], queryFn: () => getEpisodeServers(params.episodeId), staleTime: 1000 * 60 * 60 * 24 * 7 },
            { queryKey: [`episode-list-${params.id}`], queryFn: () => getAnimeEpisodeList(params.id), staleTime: 1000 * 60 * 10 },
        ],
    })

    console.log("episodeList: ", episodeList)

    const [streamLink, setStreamLink] = useState<ISource | undefined>(undefined)
    const [player, setPlayer] = useState<Artplayer | null>(null)

    const handleGetInstance = (instance: Artplayer) => {
        setPlayer(instance)
    };

    const handleDestroy = () => {
        if (player) {
            player.destroy();
        }
    };

    useEffect(() => {
        if (serverList && serverList.length > 0 && !server) {
            setServer(serverList[0].name)
        }
    }, [server, serverList])

    useEffect(() => {
        (async () => {
            if (server) {
                const streamLink = await getEpisodeSources(params.episodeId, server)
                setStreamLink(streamLink)
            }
        })()
    }, [params.episodeId, params.id, server])

    return (
        <div>
            <div className="w-full h-full p-4 grid grid-cols-1 lg:grid-cols-[800px_1fr] xl:grid-cols-[1fr_800px_1fr] gap-4">
                <div className="hidden xl:block">
                    {episodeList?.map((episode, index) => (
                        <Link href={`/watch/${params.id}/${episode.id}`}
                            key={index}
                            className={`block ${params.episodeId === episode.id ? 'bg-primary' : 'bg-gray'} text-white p-3 rounded-sm cursor-pointer overflow-hidden`}
                        ><p className="line-clamp-1 text-sm">{episode.number} {episode.title}</p></Link>
                    ))}
                </div>
                <div>
                    {streamLink ? <ArtPlayer
                        key={streamLink.sources[0].url}
                        option={{
                            url: streamLink?.sources.find((s) => s.quality === 'default')?.url,
                        }}
                        className="w-full aspect-video lg:w-[800px]"
                        getInstance={handleGetInstance}
                    />
                        : <div className="w-full aspect-video lg:w-[800px] flex justify-center items-center bg-gray">
                            <CircularProgress size="lg" aria-label="Loading..." />
                        </div>

                    }

                    {/*Server list*/}
                    <div className="flex mt-5">
                        <p className="mr-4">Servers:</p>
                        <div className="flex flex-wrap gap-2 items-center">
                            {serverList?.map((s, index) => (
                                <button onClick={() => { handleDestroy(); setStreamLink(undefined); setServer(s.name); }} className={`${server === s.name ? "bg-primary" : "bg-gray"} py-2 px-5 rounded-md text-sm`} key={index}>
                                    {s.name}
                                </button>))}
                        </div >
                    </div>

                    <div className="xl:hidden flex mt-5">
                        <p className="mr-4">Episodes:</p>
                        <div className="flex gap-1 flex-wrap">
                            {episodeList?.map((episode, index) => (
                                <Link href={`/watch/${params.id}/${episode.id}`}
                                    key={index}
                                    className={`block ${params.episodeId === episode.id ? 'bg-primary' : 'bg-gray'} text-white py-1 px-10 rounded-sm cursor-pointer`}
                                >{episode.number}</Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
