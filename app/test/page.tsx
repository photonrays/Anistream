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

        (async () => {
            try {
                const data = await getAnimeInfoById("blue-archive-the-animation-19125")
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        })();

        (async () => {
            try {
                const data = await getAnimeEpisodes("blue-archive-the-animation-19125")
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        })();

        (async () => {
            try {
                const data = await getAnimeByCategory("recently-updated")
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        })();
    }, [])


    return (
        <div>

        </div>
    )
}
