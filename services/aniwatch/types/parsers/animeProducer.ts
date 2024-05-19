import type { HomePage } from "./homePage.js";
import type { AnimeCategory } from "./animeCategory.js";

export interface ProducerAnime
  extends Omit<AnimeCategory, "genres" | "category">,
  Pick<HomePage, "topAiringAnimes"> {
  producerName: string;
}
