'use client'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { Children } from 'react'
import Slider, { Settings } from "react-slick";
import "./CustomSlider.css";

interface SliderProps {
    children?: React.ReactNode;
    settings?: Settings
}

export default function CustomSlider({ children, settings, ...rest }: SliderProps) {
    const defaultSettings: Settings = {
        ...settings,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dotsClass: "button__bar",
        autoplay: true,
    }

    return (
        <Slider {...defaultSettings} dotsClass="button__bar" {...rest} className="relative">
            {Children.map(children, child =>
                <>
                    {child}
                </>
            )}
        </Slider>
    )
}
