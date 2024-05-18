'use client'
import ServerList from "@/sections/watch/ServerList";
import { getAnimeEpisodeList, getAnimeInfo, getEpisodeServers, getEpisodeSources } from "@/services/consumet/api";
import { FuzzyDate, ISource } from "@/services/consumet/types";
import { Chip, CircularProgress, Image, Skeleton } from "@nextui-org/react";
import { useQueries } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import parse from 'html-react-parser'
import DetailCard from "@/components/DetailCard";
import { AnimeInfoDetail, ArtPlayer } from "@/components";
import Link from "next/link";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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
    const [descriptionExpand, setDescriptionExpand] = useState(false)
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
    console.log("animeInfo", animeInfo)

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

    function formatDateObject(date?: FuzzyDate) {
        if (!date || !date.day || !date.month || !date.year) {
            return '?'
        }
        const monthIndex = date.month - 1; // Adjust for zero-based indexing

        if (monthIndex < 0 || monthIndex >= months.length || !date.hasOwnProperty('year') || !date.hasOwnProperty('month') || !date.hasOwnProperty('day')) {
            throw new Error('Invalid date object format. Requires properties: year, month, and day.');
        }

        return `${months[monthIndex]} ${date.day}, ${date.year}`;
    }

    return (
        <div className="w-full min-h-full">
            <div className="w-full h-full p-4 grid grid-cols-1 lg:grid-cols-[800px_1fr] xl:grid-cols-[1fr_800px_1fr] gap-4 mb-4">
                <div className="hidden xl:block">
                    {episodeList?.map((episode, index) => (
                        <button
                            key={index}
                            onClick={() => handleChangeEpisode(episode.id)}
                            className={`${episodeId === episode.id ? 'bg-primary' : 'odd:bg-default-50 even:bg-default-100'} flex text-white p-3 rounded-sm cursor-pointer overflow-hidden w-full`}
                        >
                            <p className="line-clamp-1 text-sm text-start">{`${episode.number}:  ${episode.title || `Episode ${episode.number}`}`}</p>
                        </button>
                    ))}
                </div>

                <div>
                    {streamLink
                        ? <ArtPlayer
                            key={streamLink.sources[0].url}
                            option={{
                                url: streamLink?.sources.find((s) => s.quality === 'default')?.url,
                            }}
                            className="w-full h-auto aspect-video lg:w-[800px]"
                            getInstance={handleGetInstance}
                        />
                        : <div className="w-full h-auto aspect-video lg:w-[800px] flex justify-center items-center bg-gray">
                            <CircularProgress size="lg" aria-label="Loading..." />
                        </div>
                    }
                    <ServerList serverList={serverList} handleChangeServer={handleChangeServer} server={server} />

                    <div className="xl:hidden flex mt-5">
                        <p className="mr-4">Episodes:</p>
                        <div className="flex gap-1 flex-wrap">
                            {episodeList?.map((episode, index) => (
                                <button onClick={() => handleChangeEpisode(episode.id)}
                                    key={index}
                                    className={`block ${episodeId === episode.id ? 'bg-primary' : 'bg-gray'} text-white py-1 px-10 rounded-sm cursor-pointer`}
                                >{episode.number}</button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Related */}
                <div className="">
                    <h1 className="text-xl font-bold mb-2">Related</h1>
                    {animeInfo?.relations && animeInfo?.relations.length > 0 && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                        {animeInfo.relations.filter(anime => anime.type !== 'MANGA' && anime.type !== 'NOVEL')
                            .map((anime, index) => (<DetailCard key={index} anime={anime} />))}
                    </div>}
                </div>
            </div>

            {animeInfo
                ? <div className='w-full flex gap-4 px-4'>
                    <Image
                        src={animeInfo.image || '@/assets/no_image.jpg'}
                        alt={typeof animeInfo.title === 'string' ? animeInfo.title : animeInfo.title.english ?? 'No title'}
                        radius='sm'
                        width={142}
                        height={200}
                        classNames={{ wrapper: 'flex-shrink-0', img: 'object-cover w-full h-auto aspect-[3/4]' }}
                    />

                    <div className='flex-shrink flex-grow-0 flex flex-col gap-4'>
                        <div className="-mb-2">
                            <h2 className='text-xl font-bold'>{typeof animeInfo.title === 'string' ? animeInfo.title : animeInfo.title.english ?? 'No title'}</h2>
                            {typeof animeInfo.title !== 'string' && Object.values(animeInfo.title).map((title, index) => (<span key={index} className='text-sm mr-1 italic text-default-500'>{title};</span>))}
                        </div>

                        <div className="flex gap-2 items-center">
                            {!animeInfo.isAdult && <Chip variant="bordered" size="sm" className="text-text-white rounded-md p-0">PG 13</Chip>}
                            <Chip size="sm" className="text-text-white rounded-md p-0">HD</Chip>
                            <Chip size="sm" color="primary" className="text-text-white rounded-md p-0">CC</Chip>
                            <p className="font-light text-sm">Apr 08, 2024</p>
                        </div>

                        <div>
                            <p className={`text-sm ${descriptionExpand ? '' : 'line-clamp-2'}`}>{animeInfo.description ? parse(animeInfo.description) : 'No description'}</p>
                            <button
                                className="mt-2 text-sm text-default-500"
                                onClick={() => setDescriptionExpand(prev => !prev)}
                            >{descriptionExpand ? '[Close]' : '[More]'}</button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div>
                                <AnimeInfoDetail title="Type" detail={<Link href={'/'}>{animeInfo.type}</Link>} />
                                <AnimeInfoDetail title="Country" detail={<Link href={'/'}>{animeInfo.countryOfOrigin}</Link>} />
                                <AnimeInfoDetail title="Premiered" detail={<Link href={'/'}>{animeInfo.season} {animeInfo.releaseDate}</Link>} />
                                <AnimeInfoDetail title="Date aired" detail={<p>{formatDateObject(animeInfo.startDate)} to {formatDateObject(animeInfo.endDate)}</p>} />
                                <AnimeInfoDetail title="Status" detail={<p>{animeInfo.status}</p>} />
                                <AnimeInfoDetail title="Genres" detail={<div className="flex flex-wrap">
                                    {animeInfo.genres?.map((genre, index) => (<Link href={'/'} key={index}>{genre},&nbsp;</Link>))}
                                </div>} />
                            </div>
                            <div>
                                <AnimeInfoDetail title="Rating" detail={<p>{animeInfo.rating}</p>} />
                                <AnimeInfoDetail title="Popularity" detail={<p>{animeInfo.popularity}</p>} />
                                <AnimeInfoDetail title="Durations" detail={<p>{animeInfo.duration} min</p>} />
                                <AnimeInfoDetail title="Episodes" detail={<p>{animeInfo.totalEpisodes}</p>} />
                                <AnimeInfoDetail title="Studios" detail={<p>{animeInfo.studios?.map((studio, index) => <p key={index}>{studio}</p>)}</p>} />
                            </div>
                        </div>
                    </div>
                </div>
                : <div className='w-full h-[300px] flex gap-4 px-4'>
                    <Skeleton className='min-w-[142px] h-[200px] bg-gray rounded-md'></Skeleton>

                    <div className="w-full flex-shrink flex-grow-0">
                        <Skeleton className='h-[21px] w-3/5 rounded-lg mb-2'></Skeleton>
                        <Skeleton className='h-[21px] w-full rounded-lg'></Skeleton>
                    </div>
                </div>
            }
        </div>
    )
}
