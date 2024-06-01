'use client'
import { useEffect, useState } from 'react'
import { signIn, signOut, useSession, getProviders, LiteralUnion, ClientSafeProvider } from 'next-auth/react'
import Link from 'next/link';
import Image from 'next/image';
import { BuiltInProviderType } from 'next-auth/providers/index';
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export default function ProfileButton() {
  const { data: session, status } = useSession();
  const router = useRouter()
  const loading = status === 'loading'

  return (
    <div className='sm:flex hidden'>
      {session ? (
        <div className='flex gap-3 md:gap-5'>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">
                My Settings
              </DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">
                Analytics
              </DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem
                href={`/api/signout`}
                key="logout"
                color="danger"
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                  router.push("/");
                }}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      ) : (
        <>
          <Button
            href={`/api/auth/signin`}
            color='primary'
            radius='sm'
            variant="solid"
            className='px-0 h-10 bg-card'
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            Sign in
          </Button>
        </>
      )}
    </div>
  )
}
