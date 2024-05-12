'use client';
import { Button, Tabs, Image, Tab, Card, CardBody, Chip, CardFooter } from "@nextui-org/react";
import { Icon } from '@iconify/react';
import PopularSlider from "./components/PopularSlider/PopularSlider";
import Cover from "../assets/cover.png";
import { StaticImageData } from "next/image";

interface Fruit {
  title: string;
  img: StaticImageData;
  price: string;
}

export default function Home() {
  const tabs = ['All', 'Sub', 'Dub', 'Movies', 'Trending']
  const list: Fruit[] = [
    {
      title: "Orange",
      img: Cover,
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: Cover,
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: Cover,
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: Cover,
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: Cover,
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: Cover,
      price: "$8.00",
    },
    {
      title: "Banana",
      img: Cover,
      price: "$7.50",
    },
    {
      title: "Watermelon",
      img: Cover,
      price: "$12.20",
    },
  ];

  return (
    <main className="min-h-screen text-text-white sm:px-2 lg:px-4">
      <PopularSlider />

      <div className="w-full">
        <h2 className="text-xl font-semibold mb-2">Recently Updated</h2>
        <Tabs variant="underlined" aria-label="Tabs" className="overflow-auto">
          {tabs.map((tab, index) => {
            return (
              <Tab key={index} title={tab}>
                <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                  {list.map((item, index) => (
                    <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
                      <CardBody className="overflow-visible p-0">
                        <Image
                          shadow="sm"
                          radius="lg"
                          width="100%"
                          alt={item.title}
                          className="w-full object-cover"
                          src={item.img.src}
                        />
                      </CardBody>
                      <CardFooter className="text-small justify-between">
                        <b>{item.title}</b>
                        <p className="text-default-500">{item.price}</p>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </Tab>)
          })}
        </Tabs>
      </div>
    </main>
  );
}
