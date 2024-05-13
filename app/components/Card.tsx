import React from 'react'
import { Card as NextCard, CardBody, CardFooter, Chip, Image, Skeleton } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { IAnimeInfo } from '../services/consumet/types';

export default function Card({ anime }: { anime?: IAnimeInfo }) {
    const router = useRouter();

    if (!anime) return (
        <NextCard shadow="sm" radius='sm'>
            <CardBody className="p-0 flex-grow-0">
                <Skeleton className='object-cover w-full h-auto aspect-[3/4]'>
                    <div className="rounded-lg bg-default-300"></div>
                </Skeleton>
            </CardBody>
            <CardFooter className="text-small flex-col items-start text-text-white justify-start">
                <Skeleton className="h-[21px] w-2/5 rounded-lg mb-2"></Skeleton>
                <Skeleton className="h-[21px] w-full rounded-lg"></Skeleton>
            </CardFooter>
        </NextCard>
    );

    return (
        <NextCard shadow="sm" radius='sm' isPressable onPress={() => router.push(`/watch${anime.episodeId}`)}>
            <CardBody className="p-0 flex-grow-0">
                <Image
                    shadow="sm"
                    radius="none"
                    width="100%"
                    height="auto"
                    isZoomed={true}
                    className='object-cover w-full h-auto aspect-[3/4] hover:brightness-75 hover:scale-105 transition-transform duration-300 ease-in-out'
                    title={typeof anime.title === 'string' ? anime.title : anime.title.english}
                    alt={typeof anime.title === 'string' ? anime.title : anime.title.english}
                    src={anime.image}
                />
            </CardBody>
            <CardFooter className="text-small flex-col items-start text-text-white justify-start">
                <div className="flex items-center gap-1 mb-1 w-full">
                    <Chip startContent={<Icon icon="bi:badge-cc-fill" className="text-lg mr-1" />} color="primary" size="sm" radius="sm" className="pl-2 h-[21px]">{anime.episodeNumber}</Chip>
                    {anime.totalEpisodes && <Chip color="default" size="sm" radius="sm" className='h-[21px]'>{anime.totalEpisodes}</Chip>}
                    <p className="flex-1 text-right">{anime.type}</p>
                </div>
                <b className="text-left line-clamp-2">{typeof anime.title === 'string' ? anime.title : anime.title.english}</b>
            </CardFooter>
        </NextCard>
    )
}
