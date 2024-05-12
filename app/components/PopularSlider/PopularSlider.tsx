import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import PopularCard from "../PopularCard";
import "./PopularSlider.css";


export default function PopularSlider() {
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
            <PopularCard />
            <PopularCard />
            <PopularCard />
            <PopularCard />
            <PopularCard />
            <PopularCard />
            <PopularCard />
            <PopularCard />
        </Slider>
    )
}
