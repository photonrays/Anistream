import { useQuery } from '@tanstack/react-query'
import { getAnimeRecentEpisodes } from '../services/consumet/anilist/anilist.server'

export default function useRecentEpisodes(page: number) {
    const { status, data, error } = useQuery({ queryKey: [`anilist-recent-episodes-${page}`], queryFn: () => getAnimeRecentEpisodes(page) })
    return { status, data, error }
}
