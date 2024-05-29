'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Image from "next/image"
import Icon from "./Icon"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Avatar } from "@nextui-org/react";


export default function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false)
    const { setTheme, resolvedTheme } = useTheme()

    useEffect(() => setMounted(true), [])

    if (!mounted) return (
        <Image
            src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
            width={36}
            height={36}
            sizes="36x36"
            alt="Loading Light/Dark Toggle"
            priority={false}
            title="Loading Light/Dark Toggle"
        />
    )

    return (
        <Dropdown placement="bottom-end" classNames={{ content: 'min-w-[120px]' }}>
            <DropdownTrigger>
                <Button
                    radius='sm'
                    variant="solid"
                    className='px-0 min-w-11 w-11 h-11 bg-card'
                >
                    {resolvedTheme === 'light' ? <Icon icon="ph:sun" className='w-6 h-6' /> : <Icon icon="ph:moon" className='w-6 h-6' />}
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Theme switcher action" variant="flat" onAction={(key) => setTheme(key as string)}>
                <DropdownItem
                    key="light"
                    startContent={<Icon icon="ph:sun" className='w-6 h-6' />}
                >
                    Light
                </DropdownItem>
                <DropdownItem
                    key="dark"
                    startContent={<Icon icon="ph:moon" className='w-6 h-6' />}
                >
                    Dark
                </DropdownItem>
                <DropdownItem
                    key="system"
                    startContent={<Icon icon="grommet-icons:system" className='w-6 h-6' />}
                >
                    System
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )

    // if (resolvedTheme === 'dark') {
    //     return (
    //         <button className='p-2 rounded-lg group hover:bg-card' onClick={() => setTheme('light')}>
    //             <Icon icon="ph:sun" className='text-2xl text-foreground' />
    //         </button>
    //     )
    // }

    // if (resolvedTheme === 'light') {
    //     return <Icon icon="ph:moon" className='h-full' onClick={() => setTheme('dark')} />
    // }

}