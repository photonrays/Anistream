// ESM
import { ANIME, IAnimeInfo, IAnimeResult, ISearch, META } from "@consumet/extensions"

export const getSearchAnime = async () => {
    const anilist = new META.Anilist();
    const res = await anilist.advancedSearch()

}

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
): Promise<ISearch<IAnimeInfo> | undefined> => {
    const anilist = new META.Anilist();
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

export const getTrendingAnime = async (): Promise<ISearch<IAnimeInfo> | undefined> => {
    const anilist = new META.Anilist();
    const results = await anilist.fetchTrendingAnime();
    return results;

}

export const getAnimeRecentEpisodes = async (page: number): Promise<ISearch<IAnimeInfo> | undefined> => {
    const anilist = new META.Anilist();
    const results = await anilist.fetchRecentEpisodes(undefined, page);
    return results;
}

export const getTopAnime = async (): Promise<ISearch<IAnimeInfo> | undefined> => {
    const anilist = new META.Anilist();
    const results = await anilist.fetchPopularAnime();
    return results;
}

export const getAnimeSchedule = async (): Promise<ISearch<IAnimeInfo> | undefined> => {
    const anilist = new META.Anilist();
    const results = await anilist.fetchAiringSchedule();
    return results;

}

export const getNewReleases = async (): Promise<ISearch<IAnimeInfo> | undefined> => {
    const zoro = new ANIME.Zoro();
    const results = await zoro.fetchRecentlyAdded();
    return results;
}

export const getNewAdded = async (): Promise<ISearch<IAnimeInfo> | undefined> => {
    const zoro = new ANIME.Zoro('https://cors.proxy.consumet.org/https://aniwatch.to/');
    const results = await zoro.fetchRecentlyUpdated();
    return results;
}

export const getJustCompleted = async (): Promise<ISearch<IAnimeInfo> | undefined> => {
    const zoro = new ANIME.Zoro('https://cors.proxy.consumet.org/https://aniwatch.to/');
    const results = await zoro.fetchLatestCompleted();
    return results;
}