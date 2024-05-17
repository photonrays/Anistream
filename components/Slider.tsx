import React from 'react'

export default function Slider({ settings, children }: { settings: any, children: React.ReactNode }) {
    return (
        <Slider {...settings} className="relative">
            {children}
        </Slider>
    )
}
