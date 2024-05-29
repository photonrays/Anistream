import { Card, CardBody, Chip, Image } from '@nextui-org/react'
import React from 'react'
import { Top10Anime } from '@/services/aniwatch/types/anime';
import Icon from './Icon';
import Link from 'next/link';

export default function TopCard({ anime }: { anime: Top10Anime }) {
    return (
        <Link href={`/watch/${anime.id}`} className='bg-card/60 rounded-xl'>
            <Card
                isBlurred
                className="border-none bg-card/60 text-foreground"
                shadow="sm" >
                <CardBody className="p-1">
                    <div className="grid grid-cols-[50px_50px_1fr] items-center justify-center overflow-hidden">
                        <p className="text-6xl text-center font-semibold">{anime.rank}</p>
                        <div className="relative">
                            <Image
                                alt="Album cover"
                                height={65}
                                width={50}
                                className="object-cover"
                                radius="sm"
                                shadow="md"
                                loading='lazy'
                                src={anime.poster || '@/assets/no_image.jpg'}
                            />
                        </div>
                        <div className="ml-3">
                            <p className='text-foreground line-clamp-2 mb-1'>{anime.name}</p>
                            <div className="flex items-center gap-1">
                                {anime.episodes.sub && <Chip startContent={<Icon icon="bi:badge-cc-fill" className="text-lg mr-1 ml-1" />} color="primary" size="sm" radius="sm" className="px-0 h-[21px]">{anime.episodes.sub || 0}</Chip>}
                                {anime.episodes.dub && <Chip startContent={<Icon icon="ion:mic" className="text-lg" />} color="secondary" size="sm" radius="sm" className="px-0 h-[21px]">{anime.episodes.dub || 0}</Chip>}
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Link>
    )
}
