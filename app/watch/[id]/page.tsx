'use client'
import ArtPlayer from "@/components/ArtPlayer";
import { getEpisodeServers, getEpisodeSources } from "@/services/consumet/api";
import { IEpisodeServer, IVideo, StreamingServers } from "@/services/consumet/types";
import { useQuery } from "@tanstack/react-query";
import { use, useEffect, useState } from "react"

export default function Watch({ params }: { params: { id: string } }) {
    // const [serverList, setServerList] = useState<IEpisodeServer[]>([])
    const [provider, setProvider] = useState<StreamingServers | string>()
    const [streamLink, setStreamLink] = useState<IVideo[]>();
    const [loading, setLoading] = useState<boolean>(true)

    const { data: serverList, isLoading } = useQuery({ queryKey: [`episode-servers-${params.id}`], queryFn: () => getEpisodeServers(params.id), staleTime: 1000 * 60 * 60 * 24 * 7 })

    const handleSelectionChange = (provider: string) => {
        console.log(provider.toLowerCase().replace(/\s/g, ''))
        switch (provider.toLowerCase().replace(/\s/g, '')) {
            case "vidstreaming":
                setProvider(StreamingServers.VidStreaming)
                break;
            case "gogoserver":
                setProvider(StreamingServers.GogoCDN)
                break;
            case "mp4upload":
                setProvider(StreamingServers.Mp4Upload)
                break;
            case "vidcloud":
                setProvider(StreamingServers.VidCloud)
                break;
            case "vizcloud":
                setProvider(StreamingServers.VizCloud)
                break;
            case "mycloud":
                setProvider(StreamingServers.MyCloud)
                break;
            case "filemoon":
                setProvider(StreamingServers.Filemoon)
                break;
            case "streamwish":
                setProvider(StreamingServers.StreamWish)
                break;
            default:
                setProvider(provider.toLowerCase().replace(/\s/g, ''))
                break;
        }
    };

    useEffect(() => {
        if (!isLoading && serverList) {
            setProvider(serverList[0].name)
            setLoading(false)
        }
    }, [isLoading, serverList])

    useEffect(() => {
        const fetch = async () => {
            const results = await getEpisodeSources(params.id, provider);
            console.log("sources: ", results)
            setStreamLink(results.sources);
        }
        fetch()
    }, [provider])

    return (
        <div>
            <div className="w-full h-full p-4 grid grid-cols-1 lg:grid-cols-[1fr_1000px_1fr]">
                <div></div>
                <div>
                    {streamLink && <ArtPlayer
                        option={{
                            url: streamLink.find((s) => s.quality === 'default')?.url,
                        }}
                        className="w-full aspect-video lg:w-[1000px]"
                        getInstance={(art) => console.info(art)}
                        key={streamLink?.find((s) => s.quality === 'default')?.url}
                    />}

                    <div className="flex flex-wrap gap-2 mt-5 items-center">
                        <p className="mr-4">Servers:</p> {serverList?.map((server, index) => (
                            <button className={`${provider === server.name ? "bg-primary" : "bg-gray"} py-2 px-5 rounded-md text-sm`} key={index} onClick={() => setProvider(server.name)}>
                                {server.name}
                            </button>))}
                    </div>
                </div>


            </div>

        </div>
    )
}
