import { DetailCard } from '@/components'
import { RelatedAnime } from '@/services/aniwatch/types/anime'

export default function Related({ animeInfo }: { animeInfo?: RelatedAnime[] }) {
    return (
        <div>
            <h1 className="text-xl font-bold mb-2">Related</h1>
            {animeInfo && animeInfo.length > 0 && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                {animeInfo.slice(0, 5).map((anime, index) => (<DetailCard key={index} anime={anime} />))}
            </div>}
        </div>
    )
}
