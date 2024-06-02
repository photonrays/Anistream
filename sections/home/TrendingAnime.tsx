import { Skeleton } from '@nextui-org/react'
import { getAnimeHomePage } from "@/services/aniwatch/api";
import { CustomSlider, PopularCard } from '@/components';

export function TrendingAnimeLoading() {
    return (
        <Skeleton className='w-full h-[400px] min-h-[400px]'>
        </Skeleton>
    )
}

export default async function TrendingAnime() {
    const animeHome = await getAnimeHomePage()

    if (!animeHome) return <TrendingAnimeLoading />
    return (
        <CustomSlider>
            {animeHome.spotlightAnimes.map((anime, index) => (<PopularCard key={index} anime={anime} />))}
        </CustomSlider>
    )
}

