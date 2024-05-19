import type {
  Season,
  RelatedAnime,
  RecommendedAnime,
  AnimeGeneralAboutInfo,
} from "../anime.js";
import { type AnimeSearchResult } from "./animeSearch.js";

export interface AnimeAboutInfo
  extends Pick<AnimeSearchResult, "mostPopularAnimes"> {
  anime: {
    info: AnimeGeneralAboutInfo;
    moreInfo: Record<string, string | string[]>;
  };
  seasons: Array<Season>;
  relatedAnimes: Array<RelatedAnime>;
  recommendedAnimes: Array<RecommendedAnime>;
}
