'use client'
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }: { isSidebarOpen: boolean, setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const currentUrl = window.location.href;

    return (
        <div className={`fixed overflow-y-auto text-white w-[256px] h-screen bg-gray flex flex-col shrink-0 items-center gap-2 p-4 top-0 left-0 z-50 transition-all
        ${isSidebarOpen ? "ml-0" : "ml-[-256px]"}`}>
            <div className="flex items-center justify-between w-full">
                <Link href={"/"} className="text-2xl font-bold">
                    Anistream
                </Link>
                <Icon
                    icon="ph:x-bold"
                    className="text-4xl rounded-full p-2 hover:cursor-pointer hover:bg-slate-200"
                    onClick={() => setIsSidebarOpen(false)}
                />
            </div>

            <Link
                href={"/"}
                className={(
                    currentUrl === "http://localhost:3000"
                        ? "w-full bg-primary text-white rounded-md p-2 flex items-center gap-1 hover:bg-primary hover:text-white"
                        : "w-full rounded-md p-2 flex items-center gap-1 hover:bg-primary hover:text-white")}>
                <Icon icon="carbon:home" className="text-xl inline mr-1" />
                Home
            </Link>
            <Link
                href={"/theo-doi"}
                className={(
                    currentUrl === "http://localhost:3000/theo-doi"
                        ? "w-full bg-primary text-white rounded-md p-2 flex items-center gap-1 hover:bg-primary hover:text-white"
                        : "w-full rounded-md p-2 flex items-center gap-1 hover:bg-primary hover:text-white")}>
                <Icon
                    icon="material-symbols:bookmark-outline"
                    className="text-xl inline mr-1"
                />
                Genres
            </Link>
            <Link
                href={"/lich-su"}
                className={(
                    currentUrl === "http://localhost:3000/lich-su"
                        ? "w-full bg-primary text-white rounded-md p-2 flex items-center gap-1 hover:bg-primary hover:text-white"
                        : "w-full rounded-md p-2 flex items-center gap-1 hover:bg-primary hover:text-white")}>
                <Icon icon="ic:baseline-history" className="text-xl inline mr-1" />
                Lịch sử
            </Link>
            <Link
                href={"/tim-kiem"}
                className={(
                    currentUrl === "http://localhost:3000/tim-kiem"
                        ? "w-full bg-primary text-white rounded-md p-2 flex items-center gap-1 hover:bg-primary hover:text-white"
                        : "w-full rounded-md p-2 flex items-center gap-1 hover:bg-primary hover:text-white")}>
                <Icon icon="octicon:book-16" className="text-xl inline mr-1" />
                Tìm kiếm
            </Link>
        </div>
    );
}
