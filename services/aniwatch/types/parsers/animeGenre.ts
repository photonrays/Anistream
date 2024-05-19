import type {
  AnimeCategory,
  CommonAnimeScrapeTypes,
} from "./animeCategory.js";
import { type HomePage } from "./homePage.js";

export interface GenreAnime
  extends Pick<AnimeCategory, CommonAnimeScrapeTypes | "genres">,
  Pick<HomePage, "topAiringAnimes"> {
  genreName: string;
}
