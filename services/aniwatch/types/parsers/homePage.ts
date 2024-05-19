import type {
  TrendingAnime,
  SpotlightAnime,
  TopAiringAnime,
  TopUpcomingAnime,
  LatestEpisodeAnime,
} from "../anime.js";
import type { AnimeCategory } from "./animeCategory.js";

export interface HomePage
  extends Pick<AnimeCategory, "genres" | "top10Animes"> {
  spotlightAnimes: Array<SpotlightAnime>;
  trendingAnimes: Array<TrendingAnime>;
  latestEpisodeAnimes: Array<LatestEpisodeAnime>;
  topUpcomingAnimes: Array<TopUpcomingAnime>;
  topAiringAnimes: Array<TopAiringAnime>;
}
