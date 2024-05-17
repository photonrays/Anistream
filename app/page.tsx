import { getAnimeRecentEpisodes, getTrendingAnime, getRecentlyAdded, getTopUpcoming, getLatestComplete, getAnimePopular } from "@/services/consumet/api";
import TrendingAnime from "@/sections/home/TrendingAnime/TrendingAnime";
import TopAnime from "@/sections/home/TopAnime";
import RecentAnime from "@/sections/home/RecentAnime";
import OtherAnimemb from "@/sections/home/OtherAnimemb";
import OtherAnime from "@/sections/home/OtherAnime";
import { Suspense } from "react";
import { Skeleton } from "@nextui-org/react";
import RecentAnimeLoading from "@/sections/home/RecentAnimeLoading";
import TrendingAnimeLoading from "@/sections/home/TrendingAnime/TrendingAnimeLoading";

export default async function Home() {
  return (
    <main className="min-h-screen text-text-white sm:px-2 lg:px-4 flex flex-col pb-5">
      <div className="min-h-[400px] w-full">
        <Suspense fallback={<TrendingAnimeLoading />}>
          <TrendingAnime />
        </Suspense>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-5">
        <div>
          <Suspense fallback={<RecentAnimeLoading />}>
            <RecentAnime />
          </Suspense>
          {/* <OtherAnimemb newAdded={newAdded} latestComplete={latestComplete} topUpcoming={topUpcoming} /> */}
          <OtherAnime />
        </div>

        {/* Top anime */}
        <Suspense fallback={<p>Loading...</p>}>
          <TopAnime />
        </Suspense>
      </div>
    </main>
  );
}
