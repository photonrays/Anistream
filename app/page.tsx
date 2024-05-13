'use client';
import { Tabs, Tab, Button } from "@nextui-org/react";
import { Icon } from '@iconify/react';
import PopularSlider from "./components/PopularSlider/PopularSlider";
import Cover from "../assets/cover.png";
import { StaticImageData } from "next/image";
import Card from "./components/Card";
import { useEffect, useState } from "react";
import TopCard from "./components/TopCard";
import DetailCard from "./components/DetailCard";
import { getAnimeRecentEpisodes, getTrendingAnime, getSearchAnime, getTopAnime, getNewReleases } from "./services/consumet/anilist/anilist.server";
import { IAnimeInfo, ISearch } from "@consumet/extensions";
import useTrendingAnime from "./hooks/useTrendingAnime";
import useRecentEpisodes from "./hooks/useRecentEpisodes";
import useTopAnime from "./hooks/useTopAnime";

interface Fruit {
  title: string;
  img: StaticImageData;
}

export default function Home() {
  const [liked, setLiked] = useState(false);
  const [newRelease, setNewRelease] = useState<ISearch<IAnimeInfo>>();

  const { data: tredingAnime } = useTrendingAnime();
  const { data: recentEpisodes } = useRecentEpisodes(1);
  const { data: topAnime } = useTopAnime();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getNewReleases();
      console.log("new release: ", data)
    }
    fetchData()
  }, []);

  const tabs = ['All', 'Sub', 'Dub', 'Movies', 'Trending']

  return (
    <main className="min-h-screen text-text-white sm:px-2 lg:px-4 flex flex-col gap-5">
      <PopularSlider animes={tredingAnime} />

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
            <Tabs aria-label="Options" size="sm" radius="sm" color="primary" fullWidth={true}>
              <Tab key="newRelease" title="New Release">
                <div className="flex flex-col gap-3">
                  <DetailCard />
                  <DetailCard />
                  <DetailCard />
                  <DetailCard />
                </div>
              </Tab>
              <Tab key="newAdded" title="New Added">
                <div className="flex flex-col gap-3">
                  <DetailCard />
                  <DetailCard />
                  <DetailCard />
                  <DetailCard />
                </div>
              </Tab>
              <Tab key="justComplete" title="Just Complete">
                <div className="flex flex-col gap-3">
                  <DetailCard />
                  <DetailCard />
                  <DetailCard />
                  <DetailCard />
                </div>
              </Tab>
            </Tabs>
          </div>

          <div className="hidden sm:grid grid-cols-1 2xl:grid-cols-3 gap-5">
            <div>
              <h2 className="text-xl font-semibold mb-2">New Release</h2>
              <div className="grid grid-cols-2 2xl:grid-cols-1 gap-3">
                <DetailCard />
                <DetailCard />
                <DetailCard />
                <DetailCard />
                <DetailCard />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">New Added</h2>
              <div className="grid grid-cols-2 2xl:grid-cols-1 gap-3">
                <DetailCard />
                <DetailCard />
                <DetailCard />
                <DetailCard />
                <DetailCard />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Just Complete</h2>
              <div className="grid grid-cols-2 2xl:grid-cols-1 gap-3">
                <DetailCard />
                <DetailCard />
                <DetailCard />
                <DetailCard />
                <DetailCard />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Estimated Schedule</h2>
            <div className="">

            </div>
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
