import { Tabs, Tab, Button, Skeleton, CardBody, Card, CardFooter } from "@nextui-org/react";
import { getAnimeRecentEpisodes, getTopAnime, getTrendingAnime, getRecentlyAdded, getTopUpcoming, getLatestComplete } from "@/services/consumet/api";
import TrendingAnime from "@/sections/home/TrendingAnime/TrendingAnime";
import TopAnime from "@/sections/home/TopAnime";
import RecentAnime from "@/sections/home/RecentAnime";
import OtherAnimemb from "@/sections/home/OtherAnimemb";
import OtherAnime from "@/sections/home/OtherAnime";

export default async function Home() {
  // const [
  //   { data: trending },
  //   { data: recentEpisodes },
  //   { data: topAnime },
  //   { data: newAdded },
  //   { data: topUpcoming },
  //   { data: latestComplete }
  // ] = useQueries({
  //   queries: [
  //     { queryKey: ['anilist-trending'], queryFn: () => getTrendingAnime(), staleTime: 1000 * 60 * 60 * 24 * 7 },
  //     { queryKey: [`anilist-recent-episodes-${1}`], queryFn: () => getAnimeRecentEpisodes(1), staleTime: 1000 * 60 * 10 },
  //     { queryKey: ['anilist-top-anime'], queryFn: () => getTopAnime(), staleTime: 1000 * 60 * 60 * 24 * 7 },
  //     { queryKey: ['anilist-new-added'], queryFn: () => getRecentlyAdded(), staleTime: 1000 * 60 * 60 * 24 * 7 },
  //     { queryKey: ['anilist-top-upcoming'], queryFn: () => getTopUpcoming(), staleTime: 1000 * 60 * 60 * 24 * 7 },
  //     { queryKey: ['anilist-latest-complete'], queryFn: () => getLatestComplete(), staleTime: 1000 * 60 * 60 * 24 * 7 }
  //   ],
  // })

  const [trendingAnimes, recentEpisodes, topAnime, newAdded, topUpcoming, latestComplete] = await Promise.all([getTrendingAnime(), getAnimeRecentEpisodes(1), getTopAnime(), getRecentlyAdded(), getTopUpcoming(), getLatestComplete()])

  return (
    <main className="min-h-screen text-text-white sm:px-2 lg:px-4 flex flex-col gap-5">
      <TrendingAnime animes={trendingAnimes} />

      <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_400px]">
        <div>
          <RecentAnime animes={recentEpisodes} />
          <OtherAnimemb newAdded={newAdded} latestComplete={latestComplete} topUpcoming={topUpcoming} />
          <OtherAnime newAdded={newAdded} latestComplete={latestComplete} topUpcoming={topUpcoming} />
        </div>

        {/* Top anime */}
        <TopAnime animes={topAnime} />
      </div>
    </main>
  );
}
