import { memo, useEffect, useRef } from "react";
import Player from "artplayer";
import Hls from "hls.js";
import artplayerPluginHlsQuality from "artplayer-plugin-hls-quality";
import { Subtitle } from "@/services/aniwatch/types/extractor";

function ArtPlayer({
    option,
    getInstance,
    subtitles,
    ...rest
}: {
    option: any;
    getInstance: (art: any) => void;
    subtitles?: Subtitle[];
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
            volume: 1,
            setting: true,
            hotkey: true,
            aspectRatio: true,
            autoSize: true,
            fullscreen: true,
            autoOrientation: true,
            autoplayback: true,
            plugins: [
                artplayerPluginHlsQuality({
                    control: false,
                    setting: true,
                    getResolution: (level) => level.height + "P",
                    title: "Quality",
                    auto: "Auto",
                }),
            ],
            settings: [
                {
                    html: "Subtitle",
                    tooltip: "English",
                    selector:
                        subtitles?.map((sub) => ({
                            default: sub.label === "English",
                            html: sub.label,
                            url: sub.file
                        })),
                    onSelect: function (item) {
                        art.subtitle.switch(item.url, {
                            name: item.html,
                        });
                        return item.html;
                    }
                }
            ],
            customType: {
                m3u8: playM3u8,
            },
        });

        if (getInstance && typeof getInstance === "function") {
            getInstance(art);
        }

        art.on("resize", () => {
            art.subtitle.style({
                fontSize: art.height * 0.05 + "px",
                marginBottom: art.height * 0.05 + "px",
            })
        })

        art.on("subtitleUpdate", (text) => {
            art.template.$subtitle.innerHTML = text;
        })

        art.on("ready", () => {
            art.play();
        });

        return () => {
            if (art && art.destroy) {
                art.destroy(false);
            }
        };
    }, []);

    return <div ref={artRef} {...rest}></div>;
}

export default memo(ArtPlayer);
