'use client';
import { Button, Tabs, Image, Tab, Card, CardBody, Chip } from "@nextui-org/react";
import { Icon } from '@iconify/react';

export default function Home() {

  const tabs = ['All', 'Sub', 'Dub', 'Movies', 'Trending']

  return (
    <main className="min-h-screen text-text-white">
      {/* <h1 className="text-4xl font-bold">Welcome to My App</h1> */}

      <div className="relative flex w-full min-h-[250px] sm:max-h-[400px] mb-4 bg-red-300">
        <Image
          className="object-cover w-full h-full rounded-none"
          src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
          alt="NextUI hero Image"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent w-2/3 h-full z-10"></div>
        <div className="absolute left-2 md:left-5 bottom-4 md:top-1/2 md:-translate-y-1/2 w-2/3 z-10">
          <p className="text-2xl font-bold mb-1 md:text-3xl">My Hero Academia</p>
          <div className="gap-2 hidden md:flex items-center mb-2">
            <Chip variant="bordered" size="sm" className="text-text-white rounded-md p-0">PG 13</Chip>
            <Chip size="sm" className="text-text-white rounded-md p-0">HD</Chip>
            <Chip size="sm" className="text-text-white rounded-md p-0">CC</Chip>
            <p className="font-light text-sm">Apr 08, 2024</p>
          </div>
          <p className="text-sm font-thin mb-4 md:text-md md:font-light">Seventh season of Boku no Hero Academia...</p>
          <Button color="primary" className="hover:bg-[#5a2e98] font-semibold md:px-6 md:text-lg">
            <Icon icon="solar:play-bold" />Watch Now</Button>
        </div>
      </div>

      <div className="w-full">
        <h2 className="text-xl font-semibold mb-2">Recently Updated</h2>
        <Tabs variant="underlined" aria-label="Tabs" className="overflow-auto">
          {tabs.map((tab, index) => {
            return (
              <Tab key={index} title={tab}>
                <Card>
                  <CardBody>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </CardBody>
                </Card>
              </Tab>)
          })}
        </Tabs>
      </div>
    </main>
  );
}
