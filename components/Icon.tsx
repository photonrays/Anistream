"use client"

// icons
import { Icon as Iconify, IconifyIcon, IconProps } from '@iconify/react';

// ----------------------------------------------------------------------

interface Props extends IconProps {
    icon: IconifyIcon | string;
}

export default function Icon({ icon, ...other }: Props) {
    return <Iconify icon={icon} {...other} />
}
