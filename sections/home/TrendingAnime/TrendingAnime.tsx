'use client'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./TrendingAnime.css";
import { useQuery } from "@tanstack/react-query";
import PopularCard from "@/components/PopularCard";
import { IAnimeInfo, ISearch } from "@/services/consumet/types";
import { getTrendingAnime } from "@/services/consumet/api";
import { SpotlightAnime } from "@/services/aniwatch/types/anime";


export default function TrendingAnime({ animes }: { animes: SpotlightAnime[] }) {
    // const { data: animes } = useQuery({ queryKey: ['anilist-trending'], queryFn: () => getTrendingAnime(), staleTime: 1000 * 60 * 60 * 24 * 7 })
    console.log(animes)

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dotsClass: 'button__bar',
    };
    return (
        <Slider {...settings} className="relative">
            {animes?.map((anime, index) => (<PopularCard key={index} anime={anime} />))}
        </Slider>
    )
}
