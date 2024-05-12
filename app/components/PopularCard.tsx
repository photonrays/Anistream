import { Button, Chip, Image } from '@nextui-org/react'
import { Icon } from '@iconify/react';


export default function PopularCard() {
    return (
        <div className="relative flex gap-4 justify-between w-full min-h-[250px] sm:max-h-[300px] lg:max-h-[450px] mb-4 bg-black">
            <div className="hidden lg:block my-auto">
                <p className="font-bold mb-1 lg:text-5xl">My Hero Academia</p>
                <div className="gap-2 flex items-center mb-2">
                    <Chip variant="bordered" size="sm" className="text-text-white rounded-md p-0">PG 13</Chip>
                    <Chip size="sm" className="text-text-white rounded-md p-0">HD</Chip>
                    <Chip size="sm" className="text-text-white rounded-md p-0">CC</Chip>
                    <p className="font-light text-sm">Apr 08, 2024</p>
                </div>
                <p className="mb-4 font-light">Seventh season of Boku no Hero Academia...</p>
                <Button color="primary" className="hover:bg-[#5a2e98] font-semibold px-6 text-lg">
                    <Icon icon="solar:play-bold" />Watch Now
                </Button>
            </div>

            <Image
                className="object-cover w-full h-full lg:max-w-[1000px] rounded-none lg:rounded-lg"
                src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                alt="NextUI hero Image"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent w-2/3 h-full z-10 lg:hidden"></div>
            <div className="absolute left-2 sm:left-5 bottom-4 sm:top-1/2 sm:-translate-y-1/2 w-2/3 z-10 lg:hidden">
                <p className="text-2xl font-bold mb-1 md:text-3xl">My Hero Academia</p>
                <div className="gap-2 hidden sm:flex items-center mb-2">
                    <Chip variant="bordered" size="sm" className="text-text-white rounded-md p-0">PG 13</Chip>
                    <Chip size="sm" className="text-text-white rounded-md p-0">HD</Chip>
                    <Chip size="sm" className="text-text-white rounded-md p-0">CC</Chip>
                    <p className="font-light text-sm">Apr 08, 2024</p>
                </div>
                <p className="text-sm font-thin mb-4 sm:text-md sm:font-light">Seventh season of Boku no Hero Academia...</p>
                <Button color="primary" className="hover:bg-[#5a2e98] font-semibold sm:px-6 sm:text-lg">
                    <Icon icon="solar:play-bold" />Watch Now</Button>
            </div>
        </div>
    )
}
