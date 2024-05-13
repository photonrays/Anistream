import { useEffect, useRef } from "react";
import Artplayer from "artplayer";
import { Option } from "artplayer/types/option";
import Hls from "hls.js";
import artplayerPluginHlsQuality from "artplayer-plugin-hls-quality";

export default function Player({
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
        const art = new Artplayer({
            ...option,
            container: artRef.current,
            type: "m3u8",
            setting: true,
            settings: [
                {
                    html: "Subtitle",
                    width: 250,
                    tooltip: "Indonesia1",
                    selector: [
                        {
                            default: true,
                            html: "Indonesia",
                            url: "https://cc.2cdns.com/9e/2f/9e2f4b2d7a9581a4451e4816a6702a8b/ind-18.vtt",
                        },
                    ],
                    onSelect: function (item, $dom, event) {
                        console.info(item, $dom, event);
                        art.subtitle.url = item.url;
                        return item.html;
                    },
                },
            ],
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
            console.info(art.hls);
        });

        return () => {
            if (art && art.destroy) {
                art.destroy(false);
            }
        };
    }, []);

    return <div ref={artRef} {...rest}></div>;
}
