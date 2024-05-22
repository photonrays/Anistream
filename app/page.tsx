import TrendingAnime, { TrendingAnimeLoading } from "@/sections/home/TrendingAnime";
import TopAnime, { TopAnimeLoading } from "@/sections/home/TopAnime";
import RecentAnime, { RecentAnimeLoading } from "@/sections/home/RecentAnime";
import OtherAnime, { OtherAnimeLoading } from "@/sections/home/OtherAnime";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="min-h-screen text-text-white flex flex-col pb-5">
      <div className="min-h-[400px] w-full mb-4">
        <Suspense fallback={<TrendingAnimeLoading />}>
          <TrendingAnime />
        </Suspense>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-5  sm:px-2 lg:px-4 ">
        <div className="w-full">
          <Suspense fallback={<RecentAnimeLoading />}>
            <RecentAnime />
          </Suspense>

          <Suspense fallback={<OtherAnimeLoading />}>
            <OtherAnime />
          </Suspense>
        </div>

        {/* Top anime */}
        <Suspense fallback={<TopAnimeLoading />}>
          <TopAnime />
        </Suspense>
      </div>
    </main>
  );
}
