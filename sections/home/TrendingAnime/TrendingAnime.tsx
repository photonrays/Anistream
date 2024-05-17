'use client'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./TrendingAnime.css";
import { useQuery } from "@tanstack/react-query";
import PopularCard from "@/components/PopularCard";
import { IAnimeInfo, ISearch } from "@/services/consumet/types";
import { getTrendingAnime } from "@/services/consumet/api";


export default function TrendingAnime() {
    const { data: animes } = useQuery({ queryKey: ['anilist-trending'], queryFn: () => getTrendingAnime(), staleTime: 1000 * 60 * 60 * 24 * 7 })

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
            {animes?.results?.map((anime, index) => (<PopularCard key={index} anime={anime} />))}
        </Slider>
    )
}
