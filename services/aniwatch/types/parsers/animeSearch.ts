import type {
  AnimeCategory,
  CommonAnimeScrapeTypes,
} from "./animeCategory.js";
import type { MostPopularAnime } from "../anime.js";
import type { SearchFilters } from "../controllers/animeSearch.js";

export interface AnimeSearchResult
  extends Pick<AnimeCategory, CommonAnimeScrapeTypes> {
  mostPopularAnimes: Array<MostPopularAnime>;
  searchQuery: string;
  searchFilters: SearchFilters;
}
