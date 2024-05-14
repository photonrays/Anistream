'use client'

import React from 'react'
import { Tabs, Tab, Button, Skeleton } from "@nextui-org/react";
import { useQuery } from '@tanstack/react-query';
import Card from '@/components/Card';
import { IAnimeInfo, ISearch } from '@/services/consumet/types';

const tabs = ['All', 'Sub', 'Dub', 'Movies', 'Trending']


export default function RecentAnime({ animes }: { animes: ISearch<IAnimeInfo> }) {
    return (
        <div className="mb-5 lg:mr-5">
            <h2 className="text-xl font-semibold mb-2">Recently Updated</h2>
            <Tabs variant="underlined" aria-label="Tabs" className="overflow-auto">
                {tabs.map((tab, index) => {
                    return (
                        <Tab key={index} title={tab}>
                            <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                                {animes?.results?.map((anime, index) => (
                                    <Card key={index} anime={anime} />
                                ))}
                            </div>
                        </Tab>)
                })}
            </Tabs>
        </div>
    )
}
