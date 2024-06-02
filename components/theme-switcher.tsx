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
        <div className='w-10 h-10 rounded-lg bg-card'>
        </div>
    )

    return (
        <Dropdown placement="bottom-end" classNames={{ content: 'min-w-[120px]' }}>
            <DropdownTrigger>
                <Button
                    radius='sm'
                    variant="solid"
                    className='px-0 min-w-10 w-10 h-10 bg-card'
                >
                    {resolvedTheme === 'light' ? <Icon icon="ph:sun" className='w-6 h-6' /> : <Icon icon="ph:moon" className='w-6 h-6' />}
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Theme switcher action" variant="flat" onAction={(key) => setTheme(key as string)}>
                <DropdownItem
                    key="light"
                    startContent={<Icon icon="ph:sun-light" className='w-6 h-6' />}
                >
                    Light
                </DropdownItem>
                <DropdownItem
                    key="dark"
                    startContent={<Icon icon="ph:moon-light" className='w-6 h-6' />}
                >
                    Dark
                </DropdownItem>
                <DropdownItem
                    key="system"
                    startContent={<Icon icon="fluent:laptop-settings-20-regular" className='w-6 h-6' />}
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