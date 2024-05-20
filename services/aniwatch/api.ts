import cachified, { Cache, CacheEntry, totalTtl } from "@epic-web/cachified";
import { LRUCache } from "lru-cache";
import { AnimeAboutInfo, AnimeCategory, AnimeEpisodes, AnimeEpisodesSources, EpisodeServers, HomePage } from "./types/parsers";
import { AnimeEpisode, AnimeServers, LatestCompleteAnime } from "./types/anime";

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

const ApiURL = process.env.ANISTREAM_API_URL;

export const getAnimeHomePage = async () => {
    return cachified({
        key: `anime-home-page`,
        cache: lru,
        ttl: 1000 * 60 * 60,
        staleWhileRevalidate: 1000 * 60 * 60,
        async getFreshValue() {
            try {
                const res = await fetch(`${ApiURL}anime/home`, { cache: 'no-store' });
                const data = await res.json();
                return data as HomePage;
            } catch (error) {
                console.error(error);
                return undefined;
            }
        },
    });
};

export type AnimeCategoryType = "most-favorite" | "most-popular" | "subbed-anime" | "dubbed-anime" | "recently-updated" | "recently-added" | "top-upcoming" | "top-airing" | "movie" | "special" | "ova" | "ona" | "tv" | "completed";

export const getAnimeByCategory = async (category: AnimeCategoryType, page?: number) => {
    return cachified({
        key: `anime-by-category-${category}-${page || 1}`,
        cache: lru,
        ttl: 1000 * 60 * 60,
        staleWhileRevalidate: 1000 * 60 * 60 * 24,
        async getFreshValue() {
            try {
                const res = await fetch(`${ApiURL}anime/${category}?page=${page || 1}`, { cache: 'no-store' });
                const data = await res.json();
                return data as AnimeCategory;
            } catch (error) {
                console.error(error);
                return undefined;
            }
        },
    });
}

export const getAnimeInfoById = async (id: string) => {
    return cachified({
        key: `anime-info-${id}`,
        cache: lru,
        ttl: 1000 * 60 * 60 * 24,
        staleWhileRevalidate: 1000 * 60 * 60 * 24,
        async getFreshValue() {
            try {
                const res = await fetch(`${ApiURL}anime/info?id=${id}`, { cache: 'no-store' });
                const data = await res.json();
                return data as AnimeAboutInfo;
            } catch (error) {
                console.error(error);
                return undefined;
            }
        },
    });
}

export const getAnimeEpisodes = async (id: string) => {
    return cachified({
        key: `anime-episodes-${id}`,
        cache: lru,
        ttl: 1000 * 60 * 60,
        staleWhileRevalidate: 1000 * 60 * 60 * 24,
        async getFreshValue() {
            try {
                const res = await fetch(`${ApiURL}anime/episodes/${id}`, { cache: 'no-store' });
                const data = await res.json();
                return data as AnimeEpisodes;
            } catch (error) {
                console.error(error);
                return undefined;
            }
        },
    });
}

export const getAnimeEpisodesServers = async (episodeId: string) => {
    return cachified({
        key: `anime-episode-servers-${episodeId}`,
        cache: lru,
        ttl: 1000,
        staleWhileRevalidate: 1000,
        async getFreshValue() {
            try {
                const res = await fetch(`${ApiURL}anime/servers?episodeId=${episodeId}`, { cache: 'no-store' });
                const data = await res.json();
                return data as EpisodeServers;
            } catch (error) {
                console.error(error);
                return undefined;
            }
        },
    });
}


function isAnimeServer(value: string): value is AnimeServers {
    return ["vidstreaming", "megacloud", "streamsb", "streamtape", "vidcloud"].includes(value as AnimeServers)
}

export const getAnimeStreamSources = async (episodeId: string, server?: string, category?: string) => {
    const _server = isAnimeServer(server || "vidstreaming") ? server : "vidstreaming"
    return cachified({
        key: `anime-stream-link-${episodeId}-${_server}-${category || "sub"}`,
        cache: lru,
        ttl: 1000 * 60 * 60,
        staleWhileRevalidate: 1000 * 60 * 60,
        async getFreshValue() {
            try {
                const res = await fetch(`${ApiURL}anime/episode-srcs?id=${episodeId}&server=${_server}&category=${category || "sub"}`, { cache: 'no-store' });
                const data = await res.json();
                return data as AnimeEpisodesSources;
            } catch (error) {
                console.error(error);
                return undefined;
            }
        },
    });
}
