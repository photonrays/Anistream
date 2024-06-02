import { Image } from '@nextui-org/react'
import Link from 'next/link'
import { AnimeSearchSuggestion } from '@/services/aniwatch/types/anime'
import { Icon } from '@/components'

export default function SearchCard({ anime }: { anime?: AnimeSearchSuggestion }) {
    if (!anime) return null
    return (
        <Link href={`/watch/${anime.id}`} className='blockh-full w-full'>
            <div className='flex gap-4 p-3 group hover:bg-card-light'>
                <Image
                    shadow="sm"
                    radius="none"
                    width={56}
                    height="auto"
                    className='object-cover h-auto aspect-[3/4] min-w-[56px]'
                    alt={anime.name || 'anime poster'}
                    src={anime.poster || '@/assets/no_image.jpg'}
                />
                <div className='flex flex-col'>
                    <p className='font-bold line-clamp-1 group-hover:text-primary-light'>{anime.name}</p>
                    <p className='text-sm text-foreground-darker mb-1 line-clamp-1'>{anime.jname}</p>
                    <p className='text-sm text-foreground-darker flex items-center gap-[2px]'>
                        {anime.moreInfo?.[0]}
                        <Icon icon="mdi:dot" />
                        <span className='group-hover:text-primary-light'>{anime.moreInfo?.[1]}</span>
                        <Icon icon="mdi:dot" />
                        {anime.moreInfo?.[2]}
                    </p>
                </div>
            </div>
        </Link>
    )
}
