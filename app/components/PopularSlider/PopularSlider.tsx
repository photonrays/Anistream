import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import PopularCard from "../PopularCard";
import "./PopularSlider.css";
import { IAnimeResult, ISearch } from "@consumet/extensions";


export default function PopularSlider({ animes }: { animes?: ISearch<IAnimeResult> }) {
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
