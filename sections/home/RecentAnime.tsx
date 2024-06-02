import { Card, CustomTab } from '@/components';
import { Button, Link } from '@nextui-org/react';
import { Card as NextCard, CardBody, CardFooter, Skeleton } from '@nextui-org/react'
import { getAnimeByCategory, getAnimeHomePage } from '@/services/aniwatch/api';

export function RecentAnimeLoading() {
    return (
        <div className="gap-4 grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 lg:mr-5">
            {Array.from({ length: 25 }).map((_, index) => {
                return (
                    <NextCard shadow="sm" radius='sm' key={index}>
                        <CardBody className="p-0 flex-grow-0">
                            <Skeleton className='object-cover w-full h-auto aspect-[3/4]'>
                                <div className="rounded-lg bg-default-300"></div>
                            </Skeleton>
                        </CardBody>
                        <CardFooter className="text-small flex-col items-start text-foreground justify-start">
                            <Skeleton className="h-[21px] w-2/5 rounded-lg mb-2"></Skeleton>
                            <Skeleton className="h-[21px] w-full rounded-lg"></Skeleton>
                        </CardFooter>
                    </NextCard>
                )
            })}
        </div>
    )
}


export default async function RecentAnime() {
    const [animeHome, subbedAnime, dubbedAnime] = await Promise.all([
        getAnimeHomePage(),
        getAnimeByCategory('subbed-anime'),
        getAnimeByCategory('dubbed-anime')
    ])
    if (!animeHome || !subbedAnime || !dubbedAnime) return <RecentAnimeLoading />
    return (
        <div className="mb-5 lg:mr-5">
            <div className='flex items-center justify-between mb-2'>
                <h2 className="text-xl font-semibold">Recently Updated</h2>
                <Link href='/list?category=recently-updated'><Button color='primary' size='sm'>View more</Button></Link>
            </div>
            <CustomTab variant="underlined" tabs={{
                All: <div className="gap-4 grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                    {animeHome.latestEpisodeAnimes.slice(0, 12).map((anime, index) => (
                        <Card key={index} anime={anime} />
                    ))}
                </div>,
                Sub: <div className="gap-4 grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                    {subbedAnime.animes.slice(0, 12).map((anime, index) => (
                        <Card key={index} anime={anime} />
                    ))}
                </div>,
                Dub: <div className="gap-4 grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                    {dubbedAnime.animes.slice(0, 12).map((anime, index) => (
                        <Card key={index} anime={anime} />
                    ))}
                </div>
            }} />

        </div>
    )
}
