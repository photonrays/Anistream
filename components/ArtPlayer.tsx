'use client'
import { memo, useEffect, useRef, useState } from "react";
import Player from "artplayer";
import Hls from "hls.js";
import artplayerPluginHlsQuality from "artplayer-plugin-hls-quality";

function ArtPlayer({
    option,
    getInstance,
    ...rest
}: {
    option: any;
    getInstance: (art: any) => void;
    className?: string;
}) {
    const artRef = useRef<HTMLDivElement>(null);

    function playM3u8(
        video: HTMLMediaElement,
        url: string,
        art: {
            hls: Hls;
            on: (arg0: string, arg1: () => void) => void;
            notice: { show: string };
        },
    ) {
        if (Hls.isSupported()) {
            if (art.hls) art.hls.destroy();
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
            art.hls = hls;
            art.on("destroy", () => hls.destroy());
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = url;
        } else {
            art.notice.show = "Unsupported playback format: m3u8";
        }
    }

    useEffect(() => {
        const art = new Player({
            ...option,
            container: artRef.current,
            type: "m3u8",
            setting: true,
            hotkey: true,
            aspectRatio: true,
            autoSize: true,
            fullscreen: true,
            autoOrientation: true,
            plugins: [
                artplayerPluginHlsQuality({
                    control: false,
                    setting: true,
                    getResolution: (level) => level.height + "P",
                    title: "Quality",
                    auto: "Auto",
                }),
            ],
            customType: {
                m3u8: playM3u8,
            },
        });

        if (getInstance && typeof getInstance === "function") {
            getInstance(art);
        }

        art.on("ready", () => {
        });

        return () => {
            if (art && art.destroy) {
                art.destroy(false);
            }
        };
    }, []);

    return <div ref={artRef} {...rest}></div>;
}

export default ArtPlayer;
