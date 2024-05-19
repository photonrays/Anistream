import DetailCardLoading from '@/components/DetailCardLoading'
import React from 'react'

export default async function OtherAnimeLoading() {
    return (
        <div className="grid grid-cols-1 2xl:grid-cols-3 gap-2">
            <div>
                <h2 className="text-xl font-semibold mb-2">New Added</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-1 gap-3">
                    <DetailCardLoading />
                    <DetailCardLoading />
                    <DetailCardLoading />
                    <DetailCardLoading />
                    <DetailCardLoading />
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Top Upcoming</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-1 gap-3">
                    <DetailCardLoading />
                    <DetailCardLoading />
                    <DetailCardLoading />
                    <DetailCardLoading />
                    <DetailCardLoading />
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Just Complete</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-1 gap-3">
                    <DetailCardLoading />
                    <DetailCardLoading />
                    <DetailCardLoading />
                    <DetailCardLoading />
                    <DetailCardLoading />
                </div>
            </div>
        </div>
    )
}