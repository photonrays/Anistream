import { Card, CardBody, CardFooter, Skeleton } from '@nextui-org/react'

export default function loading() {
    return (
        <main className="min-h-screen text-foreground sm:px-2 lg:px-4 flex flex-col gap-5">
            <Skeleton className='w-full h-[400px]'></Skeleton>

            <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_400px]">
                <div>
                    <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 lg:mr-5">
                        {Array.from({ length: 25 }).map((_, index) => {
                            return (
                                <Card shadow="sm" radius='sm' key={index}>
                                    <CardBody className="p-0 flex-grow-0">
                                        <Skeleton className='object-cover w-full h-auto aspect-[3/4]'>
                                            <div className="rounded-lg bg-default-300"></div>
                                        </Skeleton>
                                    </CardBody>
                                    <CardFooter className="text-small flex-col items-start text-foreground justify-start">
                                        <Skeleton className="h-[21px] w-2/5 rounded-lg mb-2"></Skeleton>
                                        <Skeleton className="h-[21px] w-full rounded-lg"></Skeleton>
                                    </CardFooter>
                                </Card>
                            )
                        })}
                    </div>
                    <div>Loading...</div>
                    <div>Loading...</div>
                </div>

                {/* Top anime */}
                <div>Loading...</div>
            </div>
        </main>
    )
}
