import { AnimeSearchQueryParams } from "@/services/aniwatch/types/controllers";

const animeSearchKeys = ['q', 'page', 'type', 'status', 'rated', 'score', 'season', 'language', 'start_date', 'end_date', 'sort', 'genres'];

export function buildQueryString(options: any) {
    const queryParams = [];

    if (options === undefined || Object.keys(options).length === 0) {
        return '';
    }

    for (const key of Object.keys(options)) {
        if (animeSearchKeys.includes(key) && options[key as keyof AnimeSearchQueryParams] !== null && options[key as keyof AnimeSearchQueryParams] !== '') {
            queryParams.push(`${key}=${options[key as keyof AnimeSearchQueryParams]}`);
        }
    }

    const ret = `?${queryParams.join('&')}`;
    return ret === '?' ? '' : ret;
}