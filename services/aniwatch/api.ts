import cachified, { Cache, CacheEntry, totalTtl } from "@epic-web/cachified";
import { LRUCache } from "lru-cache";
import { AnimeCategory, HomePage } from "./types/parsers";
import { LatestCompleteAnime } from "./types/anime";

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
        staleWhileRevalidate: 1000 * 60 * 60 * 24,
        async getFreshValue() {
            try {
                const res = await fetch(`${ApiURL}anime/home`);
                const data = await res.json();
                return data as HomePage;
            } catch (error) {
                console.error(error);
                return undefined;
            }
        },
    });
};

export const getAnimeByCategory = async (category: string, page?: number) => {
    return cachified({
        key: `anime-by-category-${category}-${page || 1}`,
        cache: lru,
        ttl: 1000 * 60 * 60,
        staleWhileRevalidate: 1000 * 60 * 60 * 24,
        async getFreshValue() {
            try {
                const res = await fetch(`${ApiURL}anime/${category}?page=${page || 1}`);
                const data = await res.json();
                return data as AnimeCategory;
            } catch (error) {
                console.error(error);
                return undefined;
            }
        },
    });
}
