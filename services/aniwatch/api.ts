import cachified, { Cache, CacheEntry, totalTtl } from "@epic-web/cachified";
import { LRUCache } from "lru-cache";
import { HomePage } from "./types/parsers";

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
    const res = await fetch(`${ApiURL}anime/home`)
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json() as Promise<HomePage>
};

export async function getAllAnime() {
    try {
        const res = await fetch(`${ApiURL}anime/home`);
        const data = await res.json();
        return data as HomePage;
    } catch (error) {
        console.log(error);
    }
}

