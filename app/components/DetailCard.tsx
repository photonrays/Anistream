import { Card, CardBody, Chip, Image } from '@nextui-org/react'
import { Icon } from '@iconify/react';
import React from 'react'

export default function DetailCard() {
    return (
        <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 text-text-white"
            shadow="sm" >
            <CardBody className="p-2">
                <div className="grid grid-cols-[50px_1fr] items-center justify-center overflow-hidden">
                    <div className="relative">
                        <Image
                            alt="Album cover"
                            className="object-cover h-[65px] w-[50px]"
                            radius="sm"
                            shadow="md"
                            src="https://nextui.org/images/album-cover.png"
                        />
                    </div>
                    <div className="ml-3">
                        <p className='text-text-white text-lg line-clamp-2 mb-1'>One Piece</p>
                        <div className="flex items-center gap-1">
                            <Chip startContent={<Icon icon="bi:badge-cc-fill" className="text-lg mr-1" />} color="primary" size="sm" radius="sm" className="pl-2 h-[21px]">3</Chip>
                            <Chip startContent={<Icon icon="ion:mic" className="text-lg mr-1" />} color="secondary" size="sm" radius="sm" className="pl-1 h-[21px]">3</Chip>
                            <Chip color="default" size="sm" radius="sm" className='h-[21px]'>12</Chip>
                            <p className="text-xs">TV</p>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}
