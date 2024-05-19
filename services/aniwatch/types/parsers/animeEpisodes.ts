import { type AnimeEpisode } from "../anime.js";

export interface AnimeEpisodes {
  totalEpisodes: number;
  episodes: Array<AnimeEpisode>;
}
