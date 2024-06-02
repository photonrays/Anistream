/* eslint-disable @next/next/no-img-element */
import { Button, Chip } from '@nextui-org/react'
import parse from 'html-react-parser';
import { SpotlightAnime } from '@/services/aniwatch/types/anime';
import Link from 'next/link';
import { Icon } from '@/components';

export default function PopularCard({ anime }: { anime: SpotlightAnime }) {
    return (
        <div className="relative flex gap-4 justify-between w-full min-h-[250px] xs:max-h-[500px] lg:max-h-[500px] mb-4 bg-background">
            <div className="absolute w-full h-full z-10 hidden lg:block bg-gradient-to-r from-background to-transparent"></div>
            <div className="hidden lg:block my-auto max-w-[40%] pl-4 z-20">
                <p className="font-bold mb-2 lg:text-5xl line-clamp-3">{anime.name}</p>
                <div className="gap-2 flex items-center mb-2">
                    {anime.otherInfo.map((info, index) => <Chip key={index} size="sm" className="text-foreground rounded-md p-0">{info}</Chip>)}
                </div>
                <p className="mb-4 font-light line-clamp-2">{parse(anime.description || '')}</p>
                <Link href={`/watch/${anime.id}`} className='block'>
                    <Button
                        color="primary"
                        className="hover:bg-primary/80 font-semibold px-6 text-lg"
                    >
                        <Icon icon="solar:play-bold" />Watch Now
                    </Button>
                </Link>
            </div>

            <img src={anime.poster || '@/assets/no_image.jpg'} alt="NextUI hero Image" className="object-cover flex-1 w-full h-[500px] lg:min-w-[60%] rounded-none lg:rounded-l-lg" />

            <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent w-full h-full z-10 lg:hidden"></div>
            <div className="absolute left-2 xs:left-5 bottom-4 xs:bottom-[60px] w-1/2 z-10 lg:hidden">
                <p className="text-2xl font-bold mb-1 md:text-3xl line-clamp-2">{anime.name}</p>
                <div className="gap-2 hidden xs:flex items-center mb-2">
                    {anime.otherInfo.map((info, index) => <Chip key={index} size="sm" className="text-foreground rounded-md p-0">{info}</Chip>)}
                </div>
                <p className="text-sm font-thin mb-4 xs:text-md xs:font-light line-clamp-2">{parse(anime.description || '')}</p>
                <Link href={`/watch/${anime.id}`} className='block'>
                    <Button
                        color="primary"
                        className="hover:bg-primary/80 font-semibold xs:px-6 xs:text-lg"
                    >
                        <Icon icon="solar:play-bold" />Watch Now
                    </Button>
                </Link>
            </div>
        </div>
    )
}
