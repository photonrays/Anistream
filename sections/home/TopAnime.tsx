import { Button, Link } from '@nextui-org/react';
import { getAnimeHomePage } from '@/services/aniwatch/api';
import { CustomTab, TopCard, TopCardLoading } from '@/components';

export async function TopAnimeLoading() {
    return (
        <div className="block lg:ml-4">
            <div className="flex justify-between mb-5 items-center">
                <h2 className="text-xl font-semibold mb-2">Top anime</h2>
            </div>

            <div className="flex flex-col gap-3">
                <TopCardLoading />
                <TopCardLoading />
                <TopCardLoading />
                <TopCardLoading />
                <TopCardLoading />
                <TopCardLoading />
                <TopCardLoading />
                <TopCardLoading />
                <TopCardLoading />
            </div>
        </div>
    )
}


export default async function TopAnime() {
    const animes = await getAnimeHomePage()
    if (!animes) return <TopAnimeLoading />
    return (
        <div className="block lg:ml-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold mb-2">Popular anime</h2>
                <Link href='/list?category=most-popular'><Button color="primary" size='sm'>View more</Button></Link>
            </div>
            <CustomTab variant="underlined" tabs={{
                Day: <div className="flex flex-col gap-3">
                    {animes.top10Animes.today.slice(0, 9).map((anime, index) => (<TopCard key={index} anime={anime} />))}
                </div>,
                Week: <div className="flex flex-col gap-3">
                    {animes.top10Animes.week.slice(0, 9).map((anime, index) => (<TopCard key={index} anime={anime} />))}
                </div>,
                Month: <div className="flex flex-col gap-3">
                    {animes.top10Animes.month.slice(0, 9).map((anime, index) => (<TopCard key={index} anime={anime} />))}
                </div>
            }} />
        </div>
    )
}
