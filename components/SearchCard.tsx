import { Image } from '@nextui-org/react'
import React from 'react'
import Cover from '@/assets/cover.png'
import Link from 'next/link'

export default function SearchCard({ }) {
    return (
        <Link href={'/'} className='blockh-full w-full'>
            <div className='flex gap-4 p-3 group hover:bg-zinc-800'>
                <Image
                    shadow="sm"
                    radius="none"
                    width={56}
                    height="auto"
                    className='object-cover h-auto aspect-[3/4]'
                    alt='cover'
                    src={Cover.src}
                />
                <div className='flex flex-col'>
                    <p className='font-bold line-clamp-1 group-hover:text-primary-light'>Conan</p>
                    <p className='text-sm text-text-light-gray mb-1 line-clamp-1'>Conan Conan Conan Conan Conan Conan Conan</p>
                    <p className='text-sm text-text-light-gray'>Oct 5, 2022 . <span className='group-hover:text-primary-light'>TV</span> . 23m</p>
                </div>
            </div>
        </Link>
    )
}
