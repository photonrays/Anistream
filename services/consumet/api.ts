import { ANIME, META, PROVIDERS_LIST } from "@consumet/extensions"
import { StreamingServers } from "./types";

const anilist = new META.Anilist();
const zoro = new ANIME.Zoro();
const gogo = new ANIME.Gogoanime();

export const getAnimeAdvancedSearch = async (
    query?: string,
    type?: 'ANIME' | 'MANGA',
    page?: number,
    perPage?: number,
    season?: 'WINTER' | 'SPRING' | 'SUMMER' | 'FALL',
    format?: 'TV' | 'TV_SHORT' | 'OVA' | 'ONA' | 'MOVIE' | 'SPECIAL' | 'MUSIC',
    sort?: string[],
    genres?: string[],
    id?: string,
    year?: number,
    status?: 'RELEASING' | 'NOT_YET_RELEASED' | 'FINISHED' | 'CANCELLED' | 'HIATUS',
) => {
    'use server'
    const results = await anilist.advancedSearch(
        query,
        type,
        page,
        perPage,
        format,
        sort,
        genres,
        id,
        year,
        status,
        season,
    );
    return results
};

export const getTrendingAnime = async () => {
    'use server'
    const results = await anilist.fetchTrendingAnime();
    return results;
}

export const getAnimeRecentEpisodes = async (page: number) => {
    'use server'
    const results = await anilist.fetchRecentEpisodes(undefined, page);
    return results;
}

export const getTopAnime = async () => {
    'use server'
    const results = await anilist.fetchPopularAnime();
    return results;
}

export const getAnimeSchedule = async () => {
    'use server'
    const results = await anilist.fetchAiringSchedule();
    return results;
}

export const getRecentlyAdded = async () => {
    const results = await zoro.fetchRecentlyAdded();
    return results;
}

export const getTopUpcoming = async () => {
    const results = await zoro.fetchTopUpcoming();
    return results;

}

export const getLatestComplete = async () => {
    const results = await zoro.fetchLatestCompleted();
    return results
}

export const getEpisodeServers = async (id: string) => {
    const results = await anilist.fetchEpisodeServers(id);
    return results;
}

const generateAnilistMeta = (provider?: string) => {
    if (provider) {
        const possibleProvider = PROVIDERS_LIST.ANIME.find(
            (p) => p.name.toLowerCase() === provider.toLocaleLowerCase(),
        );
        if (!possibleProvider) {
            throw new Error(`Provider ${provider} not found`);
        }
        return new META.Anilist(possibleProvider);
    }
    return new META.Anilist();
};

export const getEpisodeSources = async (id: string, provider?: string) => {
    // const anilist = generateAnilistMeta(provider);
    const results = await gogo.fetchEpisodeSources(id, StreamingServers.VidStreaming);
    return results;
}

