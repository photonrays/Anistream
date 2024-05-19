'use client'
import { Tab, Tabs } from '@nextui-org/react'
import React from 'react'

interface CustomTabProps extends React.ComponentProps<typeof Tabs> {
    tabs: {
        [key: string]: React.ReactNode
    }
}

export default function CustomTab({ tabs, ...rest }: CustomTabProps) {
    return (
        <Tabs {...rest}>
            {Object.entries(tabs).map(([key, value], index) => (
                <Tab key={key} title={key}>
                    {value}
                </Tab>
            ))}
        </Tabs>
    )
}
