import { AnimeInfoDetail } from '@/components'
import { FuzzyDate, IAnimeInfo } from '@/services/consumet/types'
import { Chip, Image, Skeleton } from '@nextui-org/react'
import Link from 'next/link'
import React, { useState } from 'react'
import parse from 'html-react-parser'

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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

export default function AnimeInfo({ animeInfo }: { animeInfo?: IAnimeInfo }) {
    const [descriptionExpand, setDescriptionExpand] = useState(false)

    if (!animeInfo) return (
        <div className='w-full h-[300px] flex gap-4 px-4'>
            <Skeleton className='min-w-[142px] h-[200px] bg-gray rounded-md'></Skeleton>

            <div className="w-full flex-shrink flex-grow-0">
                <Skeleton className='h-[21px] w-3/5 rounded-lg mb-2'></Skeleton>
                <Skeleton className='h-[21px] w-full rounded-lg'></Skeleton>
            </div>
        </div>
    )
    return (
        <div className='w-full flex gap-4 xl:gap-6 px-4'>
            <Image
                src={animeInfo.image}
                fallbackSrc='/images/placeholder.png'
                alt={typeof animeInfo.title === 'string' ? animeInfo.title : animeInfo.title.english ?? 'No title'}
                radius='sm'
                classNames={{ wrapper: 'flex-shrink-0 h-[200px] xl:h-[260px] aspect-[3/4]', img: 'object-cover w-full h-full' }}
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
    )
}
