import { Card, CardBody, Skeleton } from '@nextui-org/react'
import React from 'react'

export default function TopCardLoading() {
    return (
        <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 foreground"
            shadow="sm" >
            <CardBody className="p-1">
                <div className="grid grid-cols-[50px_50px_1fr] items-center justify-center overflow-hidden">
                    <div></div>
                    <Skeleton className='h-[65px] w-[50px] rounded-md' />
                    <div className="ml-3">
                        <Skeleton className='h-4 w-3/4 mb-1' />
                        <div className="flex items-center gap-1">
                            <Skeleton className='h-[21px] w-2/5 rounded-lg'></Skeleton>
                            <Skeleton className='h-[21px] w-2/5 rounded-lg'></Skeleton>
                            <Skeleton className='h-[21px] w-2/5 rounded-lg'></Skeleton>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}
