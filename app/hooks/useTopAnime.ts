import { useQuery } from '@tanstack/react-query'
import { getTopAnime } from '../services/consumet/anilist/anilist.server'

export default function useTopAnime() {
    const { status, data, error } = useQuery({ queryKey: ['anilist-trending-anime'], queryFn: getTopAnime })
    console.log("top anime", data)
    return { status, data, error }
}
