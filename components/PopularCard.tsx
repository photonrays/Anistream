/* eslint-disable @next/next/no-img-element */
'use client'
import { Button, Chip, Image } from '@nextui-org/react'
import { Icon } from '@iconify/react';
import { IAnimeResult } from '@consumet/extensions';
import parse from 'html-react-parser';
import { useRouter } from 'next/navigation';
import { SpotlightAnime } from '@/services/aniwatch/types/anime';

export default function PopularCard({ anime }: { anime: SpotlightAnime }) {
    const router = useRouter()
    return (
        <div className="relative flex gap-4 justify-between w-full min-h-[250px] sm:max-h-[400px] lg:max-h-[400px] mb-4 bg-black px-[2px]">
            <div className="hidden lg:block my-auto max-w-[40%] pl-4">
                <p className="font-bold mb-2 lg:text-5xl line-clamp-3">{anime.name}</p>
                <div className="gap-2 flex items-center mb-2">
                    {anime.otherInfo.map((info, index) => <Chip key={index} size="sm" className="text-text-white rounded-md p-0">{info}</Chip>)}
                </div>
                <p className="mb-4 font-light line-clamp-2">{parse(anime.description || '')}</p>
                <Button
                    color="primary"
                    className="hover:bg-[#5a2e98] font-semibold px-6 text-lg"
                    onClick={() => router.push(`/watch/${anime.id}`)}>
                    <Icon icon="solar:play-bold" />Watch Now
                </Button>
            </div>

            <img src={anime.poster || '@/assets/no_image.jpg'} alt="NextUI hero Image" className="object-cover flex-1 w-full h-[400px] lg:min-w-[60%] rounded-none lg:rounded-lg" />

            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent w-3/4 h-full z-10 lg:hidden"></div>
            <div className="absolute left-2 sm:left-5 bottom-4 sm:bottom-[60px] w-1/2 z-10 lg:hidden">
                <p className="text-2xl font-bold mb-1 md:text-3xl line-clamp-2">{anime.name}</p>
                <div className="gap-2 hidden sm:flex items-center mb-2">
                    {anime.otherInfo.map((info, index) => <Chip key={index} size="sm" className="text-text-white rounded-md p-0">{info}</Chip>)}
                </div>
                <p className="text-sm font-thin mb-4 sm:text-md sm:font-light line-clamp-2">{parse(anime.description || '')}</p>
                <Button
                    color="primary"
                    className="hover:bg-[#5a2e98] font-semibold sm:px-6 sm:text-lg"
                    onClick={() => router.push(`/watch/${anime.id}`)}>
                    <Icon icon="solar:play-bold" />Watch Now</Button>
            </div>
        </div>
    )
}
