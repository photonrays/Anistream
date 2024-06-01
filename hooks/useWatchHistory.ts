import useLocalStorage from "./useLocalStorage";

export interface WatchHistoryProps {
    [animeId: string]: {
        [episodeId: string]: {
            time: number;
        };
    };

}

export const useWatchHistory = () => {
    const [watchHistory, setWatchHistory] = useLocalStorage<WatchHistoryProps>('anistream-watch-history', {});

    const getLatestEpisode = (animeId: string) => {
        if (!watchHistory[animeId]) return null;
        const episodes = watchHistory[animeId];
        if (!episodes) return null;
        const latestEp = Object.keys(episodes).reduce((acc, curr) => {
            if (acc < Number(curr)) return Number(curr);
            return acc;
        }, 0);
        if (latestEp === 0) return null;
        return latestEp;
    }

    const addToWatchHistory = (animeId: string, episodeId: string) => {
        setWatchHistory((prev) => ({ ...prev, [animeId]: { ...prev[animeId], [episodeId]: { time: 0 } } }))
    };

    const modifyWatchHistory = (animeId: string, episodeId: string, time: number) => {
        setWatchHistory((prev) => ({ ...prev, [animeId]: { ...prev[animeId], [episodeId]: { time } } }))
    }

    const getWatchedEpisodes = (animeId: string) => {
        if (!watchHistory[animeId]) return [];
        return Object.keys(watchHistory[animeId]);
    }

    return {
        watchHistory,
        getLatestEpisode,
        addToWatchHistory,
        modifyWatchHistory,
        getWatchedEpisodes
    };
};