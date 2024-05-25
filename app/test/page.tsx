'use client'
import { getAnimeByCategory, getAnimeEpisodes, getAnimeHomePage, getAnimeInfoById } from '@/services/aniwatch/api'
import React, { useEffect } from 'react'

export default function Test() {
    useEffect(() => {
        (async () => {
            try {
                const data = await getAnimeHomePage()
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        })();
    }, [])


    return (
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pt-[72px]">

        </div>
    )
}
