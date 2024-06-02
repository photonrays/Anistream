import { AnimeInfoDetail } from '@/components'
import { Chip, Image, Skeleton } from '@nextui-org/react'
import Link from 'next/link'
import React, { useState } from 'react'
import parse from 'html-react-parser'
import { AnimeAboutInfo } from '@/services/aniwatch/types/parsers'
import Icon from '@/components/Icon'

export default function AnimeInfo({ animeInfo }: { animeInfo?: AnimeAboutInfo }) {
    const [descriptionExpand, setDescriptionExpand] = useState(false)
    const info = animeInfo?.anime.info
    const moreInfo = animeInfo?.anime.moreInfo

    if (!info) return (
        <div className='w-full h-[300px] flex gap-4 px-4'>
            <Skeleton className='min-w-[142px] h-[200px] bg-card rounded-md'></Skeleton>

            <div className="w-full flex-shrink flex-grow-0">
                <Skeleton className='h-[21px] w-3/5 rounded-lg mb-2'></Skeleton>
                <Skeleton className='h-[21px] w-full rounded-lg'></Skeleton>
            </div>
        </div>
    )
    return (
        <div className='w-full flex gap-4 xl:gap-6 px-4 mb-5'>
            <Image
                src={info.poster || '@/assets/no_image.jpg'}
                alt={info.name || 'Anime poster'}
                radius='sm'
                classNames={{ wrapper: 'flex-shrink-0 h-[200px] xl:h-[260px] aspect-[3/4]', img: 'object-cover w-full h-full' }}
            />

            <div className='flex-shrink flex-grow-0 flex flex-col gap-4'>
                <div className="-mb-2">
                    <h2 className='text-xl font-bold'>{info.name}</h2>
                    {moreInfo?.japanese && <span className='text-sm mr-1 italic text-default-500'>{moreInfo.japanese};</span>}
                </div>

                <div className="flex gap-1 items-center">
                    {info.stats.quality && <Chip size="sm" className="text-foreground rounded-md px-1 h-[21px]">{info.stats.quality}</Chip>}
                    <Chip startContent={<Icon icon="bi:badge-cc-fill" className="text-lg mr-1 ml-1" />} color="primary" size="sm" radius="sm" className="px-1 h-[21px]">{info.stats.episodes.sub || 0}</Chip>
                    <Chip startContent={<Icon icon="ion:mic" className="text-lg" />} color="secondary" size="sm" radius="sm" className="px-1 h-[21px]">{info.stats.episodes.dub || 0}</Chip>
                </div>

                <div>
                    <p className={`text-sm ${descriptionExpand ? '' : 'line-clamp-2'}`}>{parse(info.description || 'No description')}</p>
                    <button
                        className="mt-2 text-sm text-default-500"
                        onClick={() => setDescriptionExpand(prev => !prev)}
                    >{descriptionExpand ? '[Close]' : '[More]'}</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                        <AnimeInfoDetail title="Type" detail={<p className='brightness-150'>{info.stats.type}</p>} />
                        <AnimeInfoDetail title="Premiered" detail={<p className='brightness-150'>{moreInfo?.premiered}</p>} />
                        <AnimeInfoDetail title="Date aired" detail={<p>{moreInfo?.aired}</p>} />
                        <AnimeInfoDetail title="Status" detail={<p>{moreInfo?.status}</p>} />
                        <AnimeInfoDetail title="Genres" detail={<div className="flex flex-wrap gap-1.5">
                            {(moreInfo?.genres as string[]).map((genre, index) => (<Link href={`/list?genre=${genre.replace(/\s/g, '-').toLowerCase()}`} className='brightness-150' key={index}>
                                <button className='px-2 py-[1px] border-1 border-card-light rounded-xl text-[13px] hover:text-primary-light'>{genre}</button>
                            </Link>))}
                        </div>} />
                    </div>
                    <div>
                        <AnimeInfoDetail title="Rating" detail={<p>{info.stats.rating}</p>} />
                        <AnimeInfoDetail title="MAL score" detail={<p>{moreInfo?.malscore}</p>} />
                        <AnimeInfoDetail title="Durations" detail={<p>{info.stats.duration}</p>} />
                        <AnimeInfoDetail title="Studios" detail={<Link href={`/list?producer=${moreInfo?.studios}`} className='text-primary-light'>{moreInfo?.studios}</Link>} />
                        <AnimeInfoDetail title="Producers" detail={<div className='flex flex-wrap'>
                            {moreInfo?.producers !== undefined
                                && (moreInfo?.producers as string[]).map((producer, index) => {
                                    const producerName = producer.replace(/\s/g, '-').toLowerCase();
                                    return (
                                        <Link href={`/list?producer=${producerName}`} className='text-primary-light' key={index}>
                                            {producer}{index !== (moreInfo?.producers.length || 0) - 1 && <span>,&nbsp;&nbsp;</span>}
                                        </Link>
                                    )
                                })}
                        </div>} />
                    </div>
                </div>
            </div>
        </div>
    )
}
