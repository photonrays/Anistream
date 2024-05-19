import React from 'react'
import TopCardLoading from '@/components/TopCardLoading';

export default async function TopAnimeLoading() {
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
