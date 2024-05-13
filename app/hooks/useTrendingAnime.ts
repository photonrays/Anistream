import { useQuery } from '@tanstack/react-query'
import { getTrendingAnime } from '../services/consumet/anilist/anilist.server'

export default function useTrendingAnime() {
    const { status, data, error } = useQuery({ queryKey: ['anilist-trending-anime'], queryFn: getTrendingAnime })
    return { status, data, error }
}
