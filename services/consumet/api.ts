'use server'
import { ANIME, META, PROVIDERS_LIST } from "@consumet/extensions"
import { IAnimeInfo, StreamingServers } from "./types";
import cachified, { Cache, CacheEntry, totalTtl } from "@epic-web/cachified";
import { LRUCache } from "lru-cache";

const anilist = new META.Anilist();
const zoro = new ANIME.Zoro();
const gogo = new ANIME.Gogoanime();

const lruInstance = new LRUCache<string, CacheEntry>({ max: 1000 });

const lru: Cache = {
    set(key, value) {
        const ttl = totalTtl(value?.metadata);
        return lruInstance.set(key, value, {
            ttl: ttl === Infinity ? undefined : ttl,
            start: value?.metadata?.createdTime,
        });
    },
    get(key) {
        return lruInstance.get(key);
    },
    delete(key) {
        return lruInstance.delete(key);
    },
};

export const getAnimeAdvancedSearch = (
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
    return cachified({
        key: `anilist-advanced-search-${query}-${type}-${page}-${perPage}-${season}-${format}-${sort}-${genres}-${id}-${year}-${status}`,
        cache: lru,
        async getFreshValue() {
            try {
                const res = await anilist.advancedSearch(
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
                return res;
            } catch (error) {
                console.error(error);
                return {
                    currentPage: 0,
                    hasNextPage: false,
                    results: [],
                };
            }
        },
        ttl: 1000 * 60 * 60,
        staleWhileRevalidate: 1000 * 60 * 60 * 2,
    });
}

export const getTrendingAnime = () => {
    return cachified({
        key: `anilist-trending-anime`,
        cache: lru,
        ttl: 1000 * 60 * 60 * 24,
        staleWhileRevalidate: 1000 * 60 * 60 * 24 * 7,
        async getFreshValue() {
            try {
                const res = await anilist.fetchTrendingAnime();
                return res;
            } catch (error) {
                console.error(error);
                return {
                    currentPage: 0,
                    hasNextPage: false,
                    results: [],
                };
            }
        },
    });
}

export const getGogoTrendingAnime = () => {
    return cachified({
        key: `gogo-trending-anime`,
        cache: lru,
        ttl: 1000 * 60 * 60 * 24,
        staleWhileRevalidate: 1000 * 60 * 60 * 24 * 7,
        async getFreshValue() {
            try {
                const res = await gogo.fetchTopAiring();
                return res;
            } catch (error) {
                console.error(error);
                return {
                    currentPage: 0,
                    hasNextPage: false,
                    results: [],
                };
            }
        },
    });
}

export const getAnimeRecentEpisodes = async (page?: number) => {
    return cachified({
        key: `gogo-recent-episodes-${page}`,
        cache: lru,
        ttl: 1000 * 60 * 60,
        staleWhileRevalidate: 1000 * 60 * 60,
        async getFreshValue() {
            try {
                const res = await gogo.fetchRecentEpisodes(page);
                return res;
            } catch (error) {
                console.error(error);
                return {
                    currentPage: 0,
                    hasNextPage: false,
                    results: [],
                };
            }
        },
    })
}

export const getAnimePopular = () => {
    return cachified({
        key: `anilist-popular-anime`,
        ttl: 1000 * 60 * 60 * 24,
        staleWhileRevalidate: 1000 * 60 * 60 * 24 * 7,
        cache: lru,
        async getFreshValue() {
            try {
                const res = await anilist.fetchPopularAnime();
                return res;
            } catch (error) {
                console.error(error);
                return {
                    currentPage: 0,
                    hasNextPage: false,
                    results: [],
                };
            }
        },
    })
};


export const getRecentlyAdded = () => {
    return cachified({
        key: `zoro-recenty-added`,
        ttl: 1000 * 60 * 60 * 24,
        staleWhileRevalidate: 1000 * 60 * 60 * 24 * 7,
        cache: lru,
        async getFreshValue() {
            try {
                const res = await zoro.fetchRecentlyAdded();
                return res;
            } catch (error) {
                console.error(error);
                return {
                    currentPage: 0,
                    hasNextPage: false,
                    results: [],
                };
            }
        },
    })
}

export const getTopUpcoming = () => {
    return cachified({
        key: `zoro-top-upcoming`,
        ttl: 1000 * 60 * 60 * 24 * 7,
        staleWhileRevalidate: 1000 * 60 * 60 * 24 * 14,
        cache: lru,
        async getFreshValue() {
            try {
                const res = await zoro.fetchTopUpcoming();
                return res;
            } catch (error) {
                console.error(error);
                return {
                    currentPage: 0,
                    hasNextPage: false,
                    results: [],
                };
            }
        },
    })
}

export const getLatestComplete = () => {
    return cachified({
        key: `zoro-latest-complete`,
        ttl: 1000 * 60 * 60 * 24 * 7,
        staleWhileRevalidate: 1000 * 60 * 60 * 24 * 14,
        cache: lru,
        async getFreshValue() {
            try {
                const res = await zoro.fetchLatestCompleted();
                return res;
            } catch (error) {
                console.error(error);
                return {
                    currentPage: 0,
                    hasNextPage: false,
                    results: [],
                };
            }
        },
    })
}

export const getAnimeInfo = (id: string) => {
    const anilist = generateAnilistMeta();
    return cachified({
        key: `anilist-info-${id}`,
        ttl: 1000 * 60 * 60 * 24 * 7,
        staleWhileRevalidate: 1000 * 60 * 60 * 24 * 30,
        cache: lru,
        async getFreshValue() {
            try {
                const res = await anilist.fetchAnilistInfoById(id);
                return res
            } catch (error) {
                console.error(error);
                return undefined;
            }
        },
    });
};

export const getAnimeEpisodeList = async (id: string, fetchFiller?: boolean) => {
    const results = await cachified({
        key: `anilist-episode-${id}-${fetchFiller}`,
        ttl: 1000 * 60 * 60,
        staleWhileRevalidate: 1000 * 60 * 60 * 24,
        cache: lru,
        getFreshValue: async () => {
            try {
                const res = await anilist.fetchEpisodesListById(id, false, fetchFiller);
                return res;
            } catch (error) {
                console.error(error);
                return [];
            }
        },
    });
    return results;
};

export const getEpisodeServers = async (id: string) => {
    return cachified({
        key: `anilist-episode-servers-${id}`,
        ttl: 1000 * 60 * 60 * 24,
        staleWhileRevalidate: 1000 * 60 * 60 * 24 * 7,
        cache: lru,
        async getFreshValue() {
            try {
                const res = await anilist.fetchEpisodeServers(id);
                return res;
            } catch (error) {
                console.error(error);
                return [];
            }
        },
    })
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

export const getEpisodeSources = (id: any, server?: string) => {
    return cachified({
        key: `gogo-episode-stream-${id}-${server}`,
        ttl: 1000 * 60 * 60,
        staleWhileRevalidate: 1000 * 60 * 60 * 3,
        cache: lru,
        getFreshValue: async () => {
            try {
                const res = await gogo.fetchEpisodeSources(id, server as StreamingServers);
                return res;
            } catch (error) {
                console.error(error);
                return undefined;
            }
        },
    });
};

