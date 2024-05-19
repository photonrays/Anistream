'use client'
import { Card, CardBody, Chip, Image } from '@nextui-org/react'
import { Icon } from '@iconify/react';
import React from 'react'
import { IAnimeInfo } from '../services/consumet/types';
import Link from 'next/link';

export default function DetailCard({ anime }: { anime: IAnimeInfo }) {
    console.log(anime)
    return (
        <Link href={`/watch/${anime.id}`}>
            <Card
                isBlurred
                className="border-none bg-background/60 dark:bg-default-100/50 text-text-white"
                shadow="sm" >
                <CardBody className="p-2 justify-center">
                    <div className="grid grid-cols-[50px_1fr] items-center justify-center overflow-hidden">
                        <div className="relative">
                            <Image
                                alt="Album cover"
                                className="object-cover h-[65px] w-[50px]"
                                radius="sm"
                                shadow="md"
                                src={anime.image}
                            />
                        </div>
                        <div className="ml-3">
                            {anime.relationType && <p className='text-xs mb-1'>{anime.relationType}</p>}
                            <p className='text-text-white text-sm line-clamp-2 mb-1'>{typeof anime.title === 'string' ? anime.title : anime.title.english}</p>
                            <div className="flex items-center gap-1 justify-between">
                                <div className='flex items-center gap-1'>
                                    {anime.episodes !== undefined && anime.episodes !== null && <Chip startContent={<Icon icon="bi:badge-cc-fill" className="text-lg mr-1" />} color="primary" size="sm" radius="sm" className="pl-2 h-[21px]">{anime.episodes as unknown as string}</Chip>}
                                    {anime.sub !== undefined && anime.sub !== null && <Chip color="default" size="sm" radius="sm" className='h-[21px]'>{anime.sub}</Chip>}
                                </div>
                                <p className="text-xs">{anime.type}</p>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Link>
    )
}
