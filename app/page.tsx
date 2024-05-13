'use client';
import { Tabs, Tab, Button, Skeleton } from "@nextui-org/react";
import PopularSlider from "./components/PopularSlider/PopularSlider";
import Card from "./components/Card";
import TopCard from "./components/TopCard";
import DetailCard from "./components/DetailCard";
import { getAnimeRecentEpisodes, getTopAnime, getTrendingAnime, getRecentlyAdded, getTopUpcoming, getLatestComplete } from "./services/consumet/api";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";

export default function Home() {
  const { data: trendingAnime } = useQuery({ queryKey: ['anilist-trending-anime'], queryFn: () => getTrendingAnime() });
  const { data: recentEpisodes } = useQuery({ queryKey: [`anilist-recent-episodes-${1}`], queryFn: () => getAnimeRecentEpisodes(1) })
  const { data: topAnime } = useQuery({ queryKey: ['anilist-top-anime'], queryFn: () => getTopAnime() })
  const { data: newAdded } = useQuery({ queryKey: ['anilist-new-added'], queryFn: () => getRecentlyAdded() })
  const { data: topUpcoming } = useQuery({ queryKey: ['anilist-top-upcoming'], queryFn: () => getTopUpcoming() })
  const { data: latestComplete } = useQuery({ queryKey: ['anilist-latest-complete'], queryFn: () => getLatestComplete() })

  const tabs = ['All', 'Sub', 'Dub', 'Movies', 'Trending']

  return (
    <main className="min-h-screen text-text-white sm:px-2 lg:px-4 flex flex-col gap-5">
      <PopularSlider animes={trendingAnime} />

      <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_400px]">

        <div>
          <div className="mb-5">
            <h2 className="text-xl font-semibold mb-2">Recently Updated</h2>
            <Tabs variant="underlined" aria-label="Tabs" className="overflow-auto">
              {tabs.map((tab, index) => {
                return (
                  <Tab key={index} title={tab}>
                    <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                      {recentEpisodes ? recentEpisodes.results?.map((anime, index) => (
                        <Card key={index} anime={anime} />
                      )) : Array.from({ length: 25 }).map((_, index) => <Card key={index} />)}
                    </div>
                  </Tab>)
              })}
            </Tabs>
          </div>

          <div className="sm:hidden">
            <Suspense fallback={<p>Loading...</p>}>
              <Tabs aria-label="Options" size="sm" radius="sm" color="primary" fullWidth={true}>
                <Tab key="newAdded" title="New Added">
                  <div className="flex flex-col gap-3">
                    {newAdded && newAdded?.results?.slice(0, 5).map((anime, index) => <DetailCard key={index} anime={anime} />)}
                  </div>
                </Tab>
                <Tab key="topUpcoming" title="Top Upcoming">
                  <div className="flex flex-col gap-3">
                    {topUpcoming?.results?.slice(0, 5).map((anime, index) => <DetailCard key={index} anime={anime} />)}
                  </div>
                </Tab>
                <Tab key="justComplete" title="Just Complete">
                  <div className="flex flex-col gap-3">
                    {latestComplete?.results?.slice(0, 5).map((anime, index) => <DetailCard key={index} anime={anime} />)}
                  </div>
                </Tab>
              </Tabs>
            </Suspense>
          </div>

          <div className="hidden sm:grid grid-cols-1 2xl:grid-cols-3 gap-5">
            <Suspense fallback={<p>Loading ...</p>}>
              <div>
                <h2 className="text-xl font-semibold mb-2">New Added</h2>
                <div className="grid grid-cols-2 2xl:grid-cols-1 gap-3">
                  {newAdded?.results?.slice(0, 5).map((anime, index) => <DetailCard key={index} anime={anime} />)}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Top Upcoming</h2>
                <div className="grid grid-cols-2 2xl:grid-cols-1 gap-3">
                  {topUpcoming?.results?.slice(0, 5).map((anime, index) => <DetailCard key={index} anime={anime} />)}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Just Complete</h2>
                <div className="grid grid-cols-2 2xl:grid-cols-1 gap-3">
                  {latestComplete?.results?.slice(0, 5).map((anime, index) => <DetailCard key={index} anime={anime} />)}
                </div>
              </div>
            </Suspense>
          </div>

        </div>



        {/* Top anime */}
        <div className="block lg:ml-4">
          <div className="flex justify-between mb-2">
            <h2 className="text-xl font-semibold mb-2">Top anime</h2>
            <Button color="primary" size="sm">View more</Button>
          </div>

          <div className="flex flex-col gap-3">
            {topAnime?.results?.slice(0, 9).map((anime, index) => (<TopCard key={index} anime={anime} ranking={index + 1} />))}
          </div>
        </div>
      </div>
    </main>
  );
}
