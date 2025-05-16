import cachified, { Cache, CacheEntry, totalTtl } from "@epic-web/cachified";
import { LRUCache } from "lru-cache";
import {
  AnimeAboutInfo,
  AnimeCategory,
  AnimeEpisodes,
  AnimeEpisodesSources,
  AnimeSearchResult,
  AnimeSearchSuggestions,
  EpisodeServers,
  GenreAnime,
  HomePage,
  ProducerAnime,
} from "./types/parsers";
import { AnimeEpisode, AnimeServers, LatestCompleteAnime } from "./types/anime";
import { AnimeSearchQueryParams } from "./types/controllers";
import { buildQueryString } from "./util";

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

const ApiURL = process.env.NEXT_PUBLIC_API_URL + "api/v2/hianime";

export const getAnimeHomePage = async () => {
  return cachified({
    key: `anime-home-page`,
    cache: lru,
    ttl: 1000 * 60 * 60,
    staleWhileRevalidate: 1000 * 60 * 60,
    async getFreshValue() {
      try {
        const res = await fetch(`${ApiURL}/home`, {
          cache: "no-store",
        });
        const { data } = await res.json();
        return data as HomePage;
      } catch (error) {
        console.error(error);
      }
    },
  });
};

export type AnimeCategoryType =
  | "most-favorite"
  | "most-popular"
  | "subbed-anime"
  | "dubbed-anime"
  | "recently-updated"
  | "recently-added"
  | "top-upcoming"
  | "top-airing"
  | "movie"
  | "special"
  | "ova"
  | "ona"
  | "tv"
  | "completed";

export const getAnimeByCategory = async (
  category: AnimeCategoryType,
  page?: string
) => {
  return cachified({
    key: `anime-by-category-${category}-${page || 1}`,
    cache: lru,
    ttl: 1000 * 60 * 60,
    staleWhileRevalidate: 1000 * 60 * 60 * 24,
    async getFreshValue() {
      try {
        const res = await fetch(
          `${ApiURL}/category/${category}?page=${page || 1}`,
          { cache: "no-store" }
        );
        const { data } = await res.json();
        return data as AnimeCategory;
      } catch (error) {
        console.error(error);
      }
    },
  });
};

export const getAnimeByGenre = async (genre: string, page?: string) => {
  const genreName = genre.replace(/\s/g, "-").toLowerCase();
  return cachified({
    key: `anime-by-genre-${genreName}-${page || 1}`,
    cache: lru,
    ttl: 1000 * 60 * 60,
    staleWhileRevalidate: 1000 * 60 * 60 * 24,
    async getFreshValue() {
      try {
        const res = await fetch(
          `${ApiURL}/genre/${genreName}?page=${page || 1}`,
          { cache: "no-store" }
        );
        const { data } = await res.json();
        return data as GenreAnime;
      } catch (error) {
        console.error(error);
      }
    },
  });
};

export const getProducerAnimes = async (producer: string, page?: string) => {
  const producerName = producer.replace(/\s/g, "-").toLowerCase();
  return cachified({
    key: `anime-by-producer-${producerName}-${page || 1}`,
    cache: lru,
    ttl: 1000 * 60 * 60,
    staleWhileRevalidate: 1000 * 60 * 60 * 24,
    async getFreshValue() {
      try {
        const res = await fetch(
          `${ApiURL}/producer/${producerName}?page=${page || 1}`,
          { cache: "no-store" }
        );
        const { data } = await res.json();
        return data as ProducerAnime;
      } catch (error) {
        console.error(error);
      }
    },
  });
};

export const getAnimeInfoById = async (id: string) => {
  return cachified({
    key: `anime-info-${id}`,
    cache: lru,
    ttl: 1000 * 60 * 60 * 24,
    staleWhileRevalidate: 1000 * 60 * 60 * 24,
    async getFreshValue() {
      try {
        const res = await fetch(`${ApiURL}/anime/${id}`, {
          cache: "no-store",
        });
        const { data } = await res.json();
        return data as AnimeAboutInfo;
      } catch (error) {
        console.error(error);
      }
    },
  });
};

export const getAnimeEpisodes = async (id: string) => {
  return cachified({
    key: `anime-episodes-${id}`,
    cache: lru,
    ttl: 1000 * 60 * 60,
    staleWhileRevalidate: 1000 * 60 * 60 * 24,
    async getFreshValue() {
      try {
        const res = await fetch(`${ApiURL}/anime/${id}/episodes`, {
          cache: "no-store",
        });
        const { data } = await res.json();
        return data as AnimeEpisodes;
      } catch (error) {
        console.error(error);
      }
    },
  });
};

export const getAnimeEpisodesServers = async (episodeId: string) => {
  return cachified({
    key: `anime-episode-servers-${episodeId}`,
    cache: lru,
    ttl: 1000,
    staleWhileRevalidate: 1000,
    async getFreshValue() {
      try {
        const res = await fetch(
          `${ApiURL}/episode/servers?animeEpisodeId=${episodeId}`,
          { cache: "no-store" }
        );
        const { data } = await res.json();
        return data as EpisodeServers;
      } catch (error) {
        console.error(error);
      }
    },
  });
};

function isAnimeServer(value: string): value is AnimeServers {
  return [
    "vidstreaming",
    "megacloud",
    "streamsb",
    "streamtape",
    "vidcloud",
  ].includes(value as AnimeServers);
}

export const getAnimeStreamSources = async (
  episodeId: string,
  server?: string,
  category?: string
) => {
  // const _server = isAnimeServer(server || "vidstreaming") ? server : "vidstreaming"
  const _server =
    server === "hd-1"
      ? "vidstreaming"
      : server === "hd-2"
      ? "vidcloud"
      : server;
  try {
    const res = await fetch(
      `${ApiURL}/episode/sources?animeEpisodeId=${episodeId}&server=${_server}&category=${
        category || "sub"
      }`,
      { cache: "no-store" }
    );
    const { data } = await res.json();
    return data as AnimeEpisodesSources;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const getAnimeSearchSuggestions = async (query?: string) => {
  if (!query || query == "") return null;
  return cachified({
    key: `anime-search-suggestion-${query}`,
    cache: lru,
    ttl: 1000 * 60 * 60,
    staleWhileRevalidate: 1000 * 60 * 60,
    async getFreshValue() {
      try {
        const res = await fetch(`${ApiURL}/search/suggestion?q=${query}`, {
          cache: "no-store",
        });
        const { data } = await res.json();
        return data as AnimeSearchSuggestions;
      } catch (error) {
        console.error(error);
      }
    },
  });
};

export const getAnimeAdvancedResults = async (options: any) => {
  const query = buildQueryString(options);
  return cachified({
    key: `anime-advanced-search-${query}`,
    cache: lru,
    ttl: 1000 * 60 * 60,
    staleWhileRevalidate: 1000 * 60 * 60,
    async getFreshValue() {
      try {
        const res = await fetch(`${ApiURL}/search?q=${query}`, {
          cache: "no-store",
        });
        const { data } = await res.json();
        return data as AnimeSearchResult;
      } catch (error) {
        console.error(error);
      }
    },
  });
};
