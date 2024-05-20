import TrendingAnime from "@/sections/home/TrendingAnime/TrendingAnime";
import TopAnime from "@/sections/home/TopAnime";
import RecentAnime from "@/sections/home/RecentAnime";
import OtherAnime from "@/sections/home/OtherAnime";
import { Suspense } from "react";
import RecentAnimeLoading from "@/sections/home/RecentAnimeLoading";
import TrendingAnimeLoading from "@/sections/home/TrendingAnime/TrendingAnimeLoading";
import OtherAnimeLoading from "@/sections/home/OtherAnimeLoading";
import TopAnimeLoading from "@/sections/home/TopAnimeLoading";
import { getAnimeByCategory, getAnimeHomePage } from "@/services/aniwatch/api";

export default async function Home() {
  const [animeHome, topAiring, latestCompleted, subbedAnime, dubbedAnime] = await Promise.all([
    getAnimeHomePage(),
    getAnimeByCategory('top-airing'),
    getAnimeByCategory('completed'),
    getAnimeByCategory('subbed-anime'),
    getAnimeByCategory('dubbed-anime')
  ])

  console.log("subbedAnime", subbedAnime)
  console.log("dubbedAnime", dubbedAnime)

  return (
    <main className="min-h-screen text-text-white sm:px-2 lg:px-4 flex flex-col pb-5">
      <div className="min-h-[400px] w-full mb-4">
        <Suspense fallback={<TrendingAnimeLoading />}>
          <TrendingAnime animes={animeHome?.spotlightAnimes} />
        </Suspense>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-5">
        <div className="w-full">
          <Suspense fallback={<RecentAnimeLoading />}>
            <RecentAnime animes={animeHome?.latestEpisodeAnimes} subbed={subbedAnime?.animes} dubbed={dubbedAnime?.animes} />
          </Suspense>

          <Suspense fallback={<OtherAnimeLoading />}>
            <OtherAnime topAiring={topAiring?.animes} latestComplete={latestCompleted?.animes} topUpcoming={animeHome?.topUpcomingAnimes} />
          </Suspense>
        </div>

        {/* Top anime */}
        <Suspense fallback={<TopAnimeLoading />}>
          <TopAnime animes={animeHome?.top10Animes} />
        </Suspense>
      </div>
    </main>
  );
}
