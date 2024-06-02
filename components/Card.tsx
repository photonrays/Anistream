import { Card as NextCard, CardBody, CardFooter, Chip, Image, Skeleton } from '@nextui-org/react';
import Link from 'next/link';
import { Anime } from '@/services/aniwatch/types/anime';
import { Icon } from '@/components';

export default function Card({ anime }: { anime?: Anime }) {
    if (!anime) return (
        <NextCard shadow="sm" radius='sm'>
            <CardBody className="p-0 flex-grow-0">
                <Skeleton className='object-cover w-full h-auto aspect-[3/4]'>
                    <div className="rounded-lg bg-default-300"></div>
                </Skeleton>
            </CardBody>
            <CardFooter className="text-small flex-col items-start bg-card justify-start">
                <Skeleton className="h-[21px] w-2/5 rounded-lg mb-2"></Skeleton>
                <Skeleton className="h-[21px] w-full rounded-lg"></Skeleton>
            </CardFooter>
        </NextCard>
    );

    return (
        <Link href={`/watch/${anime?.id}`} className='flex rounded-xl bg-background'>
            <NextCard shadow="sm" radius='sm' isPressable className='w-full bg-card'>
                <CardBody className="p-0 flex-grow-0">
                    <Image
                        shadow="sm"
                        radius="none"
                        width="100%"
                        height="auto"
                        isZoomed={true}
                        className='object-cover w-full h-auto aspect-[3/4] hover:brightness-75 hover:scale-105 transition-transform duration-300 ease-in-out'
                        classNames={{ wrapper: 'w-full h-auto aspect-[3/4] flex-1' }}
                        title={anime.name || ''}
                        alt={anime.name || ''}
                        src={anime.poster || '@/assets/no_image.jpg'}
                    />
                </CardBody>
                <CardFooter className="text-small flex-col items-start bg-card justify-start px-2">
                    <div className="flex items-center gap-1 mb-1 w-full">
                        <Chip startContent={<Icon icon="bi:badge-cc-fill" className="text-lg mr-1 ml-1" />} color="primary" size="sm" radius="sm" className="px-0 h-[21px]">{anime.episodes.sub}</Chip>
                        {anime.episodes.dub && <Chip startContent={<Icon icon="ion:mic" className="text-lg" />} color="secondary" size="sm" radius="sm" className="px-0 h-[21px]">{anime.episodes.dub}</Chip>}
                        <p className="flex-1 text-right">{anime.type}</p>
                    </div>
                    <b className="text-left line-clamp-2">{anime.name || ''}</b>
                </CardFooter>
            </NextCard>
        </Link>
    )
}
