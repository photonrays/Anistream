/* eslint-disable @next/next/no-img-element */
import { Button, Chip, Image } from '@nextui-org/react'
import { Icon } from '@iconify/react';
import { IAnimeResult } from '@consumet/extensions';


export default function PopularCard({ anime }: { anime: IAnimeResult }) {
    return (
        <div className="relative flex gap-4 justify-between w-full min-h-[250px] sm:max-h-[300px] lg:max-h-[400px] mb-4 bg-black">
            <div className="hidden lg:block my-auto max-w-[35%] pl-4">
                <p className="font-bold mb-1 lg:text-5xl line-clamp-2">{typeof anime.title === 'string' ? anime.title : anime.title.english}</p>
                <div className="gap-2 flex items-center mb-2">
                    <Chip variant="bordered" size="sm" className="text-text-white rounded-md p-0">PG 13</Chip>
                    <Chip size="sm" className="text-text-white rounded-md p-0">HD</Chip>
                    <Chip size="sm" className="text-text-white rounded-md p-0">CC</Chip>
                    <p className="font-light text-sm">Apr 08, 2024</p>
                </div>
                <p className="mb-4 font-light line-clamp-2">{anime.description}</p>
                <Button color="primary" className="hover:bg-[#5a2e98] font-semibold px-6 text-lg">
                    <Icon icon="solar:play-bold" />Watch Now
                </Button>
            </div>

            <img src={anime.image} alt="NextUI hero Image" className="object-cover flex-1 w-full max-h-[400px] lg:min-w-[66%] rounded-none lg:rounded-lg" />

            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent w-2/3 h-full z-10 lg:hidden"></div>
            <div className="absolute left-2 sm:left-5 bottom-4 sm:bottom-[40px] w-1/2 z-10 lg:hidden">
                <p className="text-2xl font-bold mb-1 md:text-3xl line-clamp-2">{typeof anime.title === 'string' ? anime.title : anime.title.english}</p>
                <div className="gap-2 hidden sm:flex items-center mb-2">
                    <Chip variant="bordered" size="sm" className="text-text-white rounded-md p-0">PG 13</Chip>
                    <Chip size="sm" className="text-text-white rounded-md p-0">HD</Chip>
                    <Chip size="sm" className="text-text-white rounded-md p-0">CC</Chip>
                    <p className="font-light text-sm">Apr 08, 2024</p>
                </div>
                <p className="text-sm font-thin mb-4 sm:text-md sm:font-light line-clamp-2">{anime.description}</p>
                <Button color="primary" className="hover:bg-[#5a2e98] font-semibold sm:px-6 sm:text-lg">
                    <Icon icon="solar:play-bold" />Watch Now</Button>
            </div>
        </div>
    )
}
