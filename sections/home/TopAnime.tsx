'use client'
import React from 'react'
import TopCard from '@/components/TopCard';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@nextui-org/react';
import { IAnimeInfo, ISearch } from '@/services/consumet/types';

export default function TopAnime({ animes }: { animes: ISearch<IAnimeInfo> }) {
    return (
        <div className="block lg:ml-4">
            <div className="flex justify-between mb-2">
                <h2 className="text-xl font-semibold mb-2">Top anime</h2>
                <Button color="primary" size="sm">View more</Button>
            </div>

            <div className="flex flex-col gap-3">
                {animes?.results?.slice(0, 9).map((anime, index) => (<TopCard key={index} anime={anime} ranking={index + 1} />))}
            </div>
        </div>
    )
}
