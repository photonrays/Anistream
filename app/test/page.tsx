'use client'
import { getAnimeHomePage } from '@/services/aniwatch/api'
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
        })()
    }, [])


    return (
        <div>

        </div>
    )
}
