'use client'
import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import Sidebar from './sidebar';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { ThemeSwitcher } from './ThemeSwitcher';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const icons = {
        chevron: <Icon icon="majesticons:burger" />,
        scale: <Icon icon="majesticons:burger" />,
        lock: <Icon icon="majesticons:burger" />,
        activity: <Icon icon="majesticons:burger" />,
        flash: <Icon icon="majesticons:burger" />,
        server: <Icon icon="majesticons:burger" />,
        user: <Icon icon="majesticons:burger" />,
    };

    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];

    return (
        <>
            {/* Sidebar */}
            {/* <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} /> */}

            {/* Header */}
            <Navbar onMenuOpenChange={setIsMenuOpen}>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <p className="font-bold text-inherit">Anistream</p>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <Dropdown>
                        <NavbarItem>
                            <DropdownTrigger>
                                <Button
                                    disableRipple
                                    className="p-0 bg-transparent data-[hover=true]:bg-transparent text-white"
                                    endContent={icons.chevron}
                                    radius="sm"
                                    variant="light"
                                >
                                    Genres
                                </Button>
                            </DropdownTrigger>
                        </NavbarItem>
                        <DropdownMenu
                            aria-label="ACME features"
                            className="w-[340px] text-foreground"
                            itemClasses={{
                                base: "gap-4",
                            }}
                        >
                            <DropdownItem
                                key="autoscaling"
                                description="ACME scales apps to meet user demand, automagically, based on load."
                                startContent={icons.scale}
                            >
                                Autoscaling
                            </DropdownItem>
                            <DropdownItem
                                key="usage_metrics"
                                description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
                                startContent={icons.activity}
                            >
                                Usage Metrics
                            </DropdownItem>
                            <DropdownItem
                                key="production_ready"
                                description="ACME runs on ACME, join us and others serving requests at web scale."
                                startContent={icons.flash}
                            >
                                Production Ready
                            </DropdownItem>
                            <DropdownItem
                                key="99_uptime"
                                description="Applications stay on the grid with high availability and high uptime guarantees."
                                startContent={icons.server}
                            >
                                +99% Uptime
                            </DropdownItem>
                            <DropdownItem
                                key="supreme_support"
                                description="Overcome any challenge with a supporting team ready to respond."
                                startContent={icons.user}
                            >
                                +Supreme Support
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <NavbarItem isActive>
                        <Link href="#" aria-current="page">
                            Customers
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="#">
                            Integrations
                        </Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem className="hidden lg:flex">
                        <Link href="#">Login</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Button as={Link} color="primary" href="#" variant="flat">
                            Sign Up
                        </Button>
                    </NavbarItem>
                </NavbarContent>
                <NavbarMenu>
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                                color={
                                    index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                                }
                                className="w-full"
                                href="#"
                                size="lg"
                            >
                                {item}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar>
        </>
    )
}
