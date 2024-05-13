'use client'
import ArtPlayer from "@/app/components/ArtPlayer";
import { getEpisodeServers, getEpisodeSources } from "@/app/services/consumet/api";
import { IEpisodeServer, IVideo, StreamingServers } from "@/app/services/consumet/types";
import { Select, SelectItem } from "@nextui-org/react";
import Hls from "hls.js";
import { use, useEffect, useState } from "react"
// import Video from "../../../assets/nuh-uh.mp4"


export default function Watch({ params }: { params: { id: string } }) {
    const [serverList, setServerList] = useState<IEpisodeServer[]>([])
    const [streamLink, setStreamLink] = useState<IVideo>();

    // const handleSelectionChange = (e: { target: { value: string } }) => {
    //     console.log(e.target.value.toLowerCase().replace(/\s/g, ''))
    //     setServer(e.target.value.toLowerCase().replace(/\s/g, ''));
    // };

    useEffect(() => {
        const fetch = async () => {
            const results = await getEpisodeServers(params.id);
            console.log(results)
            setServerList(results)
        }
        fetch()
    }, [])

    useEffect(() => {
        const fetch = async () => {
            const results = await getEpisodeSources(params.id);
            console.log(results)
            setStreamLink(results.sources.find((s) => s.quality === 'default'));
            // const hls = new Hls();
            // hls.loadSource(results.sources);
            // hls.attachMedia(document.getElementById("video") as HTMLMediaElement);
        }
        fetch()
    }, [])

    return (
        <div>
            <div className="w-full h-full">
                {streamLink && <ArtPlayer
                    option={{
                        url: streamLink.url,
                        // subtitle: {
                        //     url: "https://cc.2cdns.com/9e/2f/9e2f4b2d7a9581a4451e4816a6702a8b/ind-18.vtt",
                        //     type: "vtt",
                        //     encoding: "utf-8",
                        //     escape: true,
                        //     style: {
                        //         color: "#fff",
                        //         "font-size": "16px",
                        //         "font-family": "sans-serif",
                        //         "text-shadow": "0px 3px 4px rgba(0, 0, 0, 1)",
                        //     },
                        // },
                    }}
                    className="w-full h-[400px]"
                    getInstance={(art) => console.info(art)}
                />}

                {/* <Select
                    color="primary"
                    items={serverList}
                    label="Select server"
                    className="max-w-xs text-text-white"
                    onChange={handleSelectionChange}
                >
                    {(s) => <SelectItem key={s.name} className="text-text-white">{s.name}</SelectItem>}
                </Select> */}
            </div>

        </div>
    )
}
